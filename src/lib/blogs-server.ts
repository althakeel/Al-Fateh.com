
import "server-only";

import { randomUUID } from "node:crypto";

import { getMongoDb } from "@/lib/mongodb";

import {
  type ManagedBlog,
  type BlogStatus,
  type BlogSection,
  slugify,
} from "@/lib/blog-model";

import { blogHtmlText, sanitizeBlogHtml } from "@/lib/blog-html";

const COLLECTION = "blogs";

type BlogInput = Pick<
  ManagedBlog,
  | "title"
  | "titleAr"
  | "excerpt"
  | "excerptAr"
  | "excerptHtml"
  | "excerptHtmlAr"
  | "contentHtml"
  | "contentHtmlAr"
  | "publicationDate"
  | "bannerImage"
  | "bannerImageAr"
  | "category"
  | "categoryAr"
  | "readTime"
  | "image"
  | "imageAr"
  | "imageAlt"
  | "imageAltAr"
  | "sections"
  | "sectionsAr"
  | "seoTitle"
  | "seoTitleAr"
  | "seoDescription"
  | "seoDescriptionAr"
  | "status"
> & {
  slug: string;
};

function parseSections(value: unknown): BlogSection[] {
  if (!Array.isArray(value)) {
    throw new Error("Invalid article sections.");
  }

  return value.map((section) => {
    if (
      !section ||
      typeof section !== "object" ||
      typeof section.heading !== "string" ||
      !Array.isArray(section.paragraphs) ||
      !section.paragraphs.every(
        (item: unknown) => typeof item === "string"
      ) ||
      (
        section.points !== undefined &&
        (
          !Array.isArray(section.points) ||
          !section.points.every(
            (item: unknown) => typeof item === "string"
          )
        )
      )
    ) {
      throw new Error("Invalid article section.");
    }

    return {
      heading: section.heading,
      paragraphs: section.paragraphs,
      points: section.points || [],
    };
  });
}

function readString(value: unknown, max = 10000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function normalizeInput(
  input: Record<string, unknown>
): BlogInput {
  const title = readString(input.title, 200);
  const titleAr = readString(input.titleAr, 200);
  const slug = slugify(
    readString(input.slug, 200) || title
  );

  if (!title || !slug) {
    throw new Error("English title and slug are required.");
  }

  const status: BlogStatus =
    input.status === "published"
      ? "published"
      : "draft";

  const richFields: Partial<BlogInput> = {};
  for (const field of ["excerptHtml", "excerptHtmlAr", "contentHtml", "contentHtmlAr"] as const) {
    if (!(field in input)) continue;
    const html = input[field];
    if (typeof html !== "string" || html.length > 500_000) {
      throw new Error("Invalid rich text or content exceeds 500,000 characters.");
    }
    richFields[field] = sanitizeBlogHtml(html);
  }

  const publicationDate = readString(input.publicationDate);
  if (publicationDate && (
    !/^\d{4}-\d{2}-\d{2}$/.test(publicationDate) ||
    !Number.isFinite(Date.parse(publicationDate)) ||
    new Date(publicationDate).toISOString().slice(0, 10) !== publicationDate
  )) throw new Error("Invalid publication date.");

  const normalized: BlogInput = {
    slug,
    title,
    titleAr,
    ...richFields,
    excerpt: readString(richFields.excerptHtml === undefined ? input.excerpt : blogHtmlText(richFields.excerptHtml), 1000),
    excerptAr: readString(richFields.excerptHtmlAr === undefined ? input.excerptAr : blogHtmlText(richFields.excerptHtmlAr), 1000),
    ...(input.publicationDate !== undefined && { publicationDate }),
    ...(input.bannerImage !== undefined && { bannerImage: readImage(input.bannerImage) }),
    ...(input.bannerImageAr !== undefined && { bannerImageAr: readImage(input.bannerImageAr) }),
    category: readString(input.category, 120),
    categoryAr: readString(input.categoryAr, 120),
    readTime: readString(input.readTime, 50),
    image: readImage(input.image),
    imageAr: readImage(input.imageAr),
    imageAlt: readString(input.imageAlt, 300),
    imageAltAr: readString(input.imageAltAr, 300),
    seoTitle: readString(input.seoTitle, 200),
    seoTitleAr: readString(input.seoTitleAr, 200),
    seoDescription: readString(
      input.seoDescription,
      400
    ),
    seoDescriptionAr: readString(
      input.seoDescriptionAr,
      400
    ),
    sections: parseSections(input.sections),
    sectionsAr: parseSections(input.sectionsAr),
    status,
  };

  if (status === "published") {
    if (
      !normalized.titleAr ||
      !normalized.excerpt ||
      !normalized.excerptAr ||
      !normalized.image ||
      !hasBody(normalized.contentHtml, normalized.sections) ||
      !hasBody(normalized.contentHtmlAr, normalized.sectionsAr)
    ) {
      throw new Error(
        "Complete both languages, including titles, short descriptions and article bodies, and add the English card image before publishing."
      );
    }
  }

  return normalized;
}

function readImage(value: unknown) {
  const url = readString(value, 2000);
  if (!url || /^\/(?![/\\])[^\u0000-\u001f\u007f\\]+$/.test(url)) return url;
  if (URL.canParse(url) && /^https:\/\//i.test(url)) return url;
  throw new Error("Invalid image URL. Use an HTTPS URL or a local image path.");
}

function hasBody(html: string | undefined, sections: BlogSection[]) {
  if (html !== undefined) return Boolean(blogHtmlText(html) || /<(img|iframe)\b/.test(html));
  return sections.some(({ heading, paragraphs, points }) =>
    [heading, ...paragraphs, ...(points ?? [])].some((text) => text.trim())
  );
}

async function collection() {
  const db = await getMongoDb();
  const blogs = db.collection<ManagedBlog>(COLLECTION);

  await Promise.all([
    blogs.createIndex({ slug: 1 }, { unique: true }),
    blogs.createIndex({ id: 1 }, { unique: true }),
    blogs.createIndex({ status: 1, publishedAt: -1 }),
  ]);

  return blogs;
}

export async function listAdminBlogs() {
  const blogs = await collection();

  return blogs
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

export async function listPublishedBlogs() {
  const blogs = await collection();

  const published = await blogs.find({ status: "published" }).toArray();
  return published.sort((a, b) => publicationTime(b) - publicationTime(a));
}

function publicationTime(blog: ManagedBlog) {
  return blog.publicationDate ? Date.parse(blog.publicationDate) : blog.publishedAt || blog.createdAt;
}

export async function getPublishedBlog(
  slug: string
) {
  const blogs = await collection();

  return blogs.findOne({
    slug,
    status: "published",
  });
}

export async function createBlog(
  input: Record<string, unknown>,
  adminUid: string
) {
  const blogs = await collection();
  const data = normalizeInput(input);
  const now = Date.now();

  const blog: ManagedBlog = {
    ...data,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    publishedAt:
      data.status === "published" ? now : undefined,
    createdBy: adminUid,
    updatedBy: adminUid,
  };

  await blogs.insertOne(blog, { ignoreUndefined: true });

  return blog;
}

export async function updateBlog(
  id: string,
  input: Record<string, unknown>,
  adminUid: string
) {
  const blogs = await collection();

  const existing = await blogs.findOne({ id });

  if (!existing) return null;

  const data = normalizeInput({ ...existing, ...input });
  if (input.contentHtml !== undefined) data.sections = existing.sections;
  if (input.contentHtmlAr !== undefined) data.sectionsAr = existing.sectionsAr;
  const now = Date.now();
  const result = await blogs.findOneAndUpdate(
    { id },
    {
      $set: {
        ...data,
        updatedAt: now,
        updatedBy: adminUid,
        ...(data.status === "published" && { publishedAt: existing.publishedAt || now }),
      },
    },
    { returnDocument: "after" }
  );

  return result;
}

export async function deleteBlog(id: string) {
  const blogs = await collection();

  const result = await blogs.deleteOne({ id });

  return result.deletedCount > 0;
}
