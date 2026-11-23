
export type BlogStatus = "draft" | "published";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface ManagedBlog {
  id: string;
  slug: string;

  title: string;
  titleAr: string;

  excerpt: string;
  excerptAr: string;

  excerptHtml?: string;
  excerptHtmlAr?: string;
  contentHtml?: string;
  contentHtmlAr?: string;
  publicationDate?: string;
  bannerImage?: string;
  bannerImageAr?: string;
  category: string;
  categoryAr: string;

  readTime: string;

  image: string;
  imageAr?: string;

  imageAlt: string;
  imageAltAr?: string;

  sections: BlogSection[];
  sectionsAr: BlogSection[];

  seoTitle?: string;
  seoTitleAr?: string;

  seoDescription?: string;
  seoDescriptionAr?: string;

  status: BlogStatus;

  createdAt: number;
  updatedAt: number;
  publishedAt?: number;

  createdBy: string;
  updatedBy: string;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function localizedBlog(
  blog: ManagedBlog,
  locale: "en" | "ar"
) {
  const arabic = locale === "ar";

  return {
    ...blog,
    title: arabic ? blog.titleAr : blog.title,
    excerpt: arabic ? blog.excerptAr : blog.excerpt,
    excerptHtml: arabic ? blog.excerptHtmlAr : blog.excerptHtml,
    contentHtml: arabic ? blog.contentHtmlAr : blog.contentHtml,
    bannerImage: arabic
      ? blog.bannerImageAr || blog.imageAr || blog.bannerImage || blog.image
      : blog.bannerImage || blog.image,
    category: arabic ? blog.categoryAr : blog.category,
    image:
      arabic && blog.imageAr
        ? blog.imageAr
        : blog.image,
    imageAlt:
      arabic && blog.imageAltAr
        ? blog.imageAltAr
        : blog.imageAlt,
    sections:
      arabic ? blog.sectionsAr : blog.sections,
    seoTitle:
      arabic ? blog.seoTitleAr : blog.seoTitle,
    seoDescription:
      arabic
        ? blog.seoDescriptionAr
        : blog.seoDescription,
  };
}

function escapeBlogText(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function plainTextToBlogHtml(text: string) {
  return text ? "<p>" + escapeBlogText(text).replace(/\r?\n/g, "<br>") + "</p>" : "";
}

export function sectionsToBlogHtml(sections: BlogSection[]) {
  return sections.map(({ heading, paragraphs, points }) => [
    heading ? "<h2>" + escapeBlogText(heading) + "</h2>" : "",
    ...paragraphs.map(plainTextToBlogHtml),
    points?.some(Boolean)
      ? "<ul>" + points.filter(Boolean).map((point) => "<li>" + plainTextToBlogHtml(point) + "</li>").join("") + "</ul>"
      : "",
  ].join("")).join("");
}
