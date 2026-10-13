import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
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

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        eyebrow="Insights & Perspectives"
        title="Business Insights for Better Decisions"
        description="Notes on corporate tax, cost control, and market advisory."
        image="/images/blog-banner.png"
        imageAlt="Workspace desk with laptop, notebook, and coffee — a space for writing and research"
        imagePosition="object-center"
      />
      <BlogGrid />
    </>
  );
}
