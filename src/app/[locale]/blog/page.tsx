import { translate } from "@/lib/translations";
import { createLocalizedMetadata } from "@/lib/localized-seo";
import { requireLocale } from "@/lib/route-locale";
import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return createLocalizedMetadata({
    locale,
    title: "Blog & Insights",
    description:
      "Practical notes from Al FATEH on corporate tax readiness, cost visibility, and market advisory for UAE businesses.",
    path: "/blog",
    image: "/images/blog-banner.png",
    imageAlt: "Al FATEH accounting and business insights",
    keywords: [
      "Al FATEH insights",
      "corporate tax readiness",
      "cost visibility",
      "market advisory",
    ],
  });
}

export default async function BlogPage({ params }: PageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ], locale)}
      />
      <PageHero
        eyebrow={translate(locale, "Insights & Perspectives")}
        title={translate(locale, "Business Insights for Better Decisions")}
        description={translate(locale, "Notes on corporate tax, cost control, and market advisory.")}
        image="/images/blog-banner.png"
        imageAlt={translate(locale, "Workspace desk with laptop, notebook, and coffee — a space for writing and research")}
        imagePosition="object-center"
      />
      <BlogGrid locale={locale} />
    </>
  );
}
