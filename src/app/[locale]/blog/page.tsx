
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogGrid from "@/components/BlogGrid";

import { listPublishedBlogs } from "@/lib/blogs-server";

import {
  isValidLocale,
} from "@/lib/i18n";

import {
  createLocalizedMetadata,
} from "@/lib/localized-seo";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { robots: { index: false } };
  }

  const isAr = locale === "ar";

  return createLocalizedMetadata({
    locale,
    path: "/blog",
    title: isAr
      ? "المدونة والرؤى | الفاتح"
      : "Blog & Insights | Al FATEH",
    description: isAr
      ? "مقالات ورؤى حول خدمات الأعمال والمحاسبة والضرائب والاستشارات التجارية."
      : "Explore insights on business services, accounting, corporate tax and advisory.",
  });
}

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const blogs = await listPublishedBlogs();

  return (
    <div className="min-h-screen bg-frost">
      <BlogGrid
        blogs={blogs}
        locale={locale}
      />
    </div>
  );
}
