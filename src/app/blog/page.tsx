import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog & Insights",
  description:
    "Practical insights from Al FATEH on feasibility studies, UAE market strategy, business innovation, and informed decision-making for organizations in Dubai and beyond.",
  path: "/blog",
  image: "/images/blog-banner.png",
  imageAlt:
    "Workspace desk with laptop, notebook, and coffee — Al FATEH insights",
  keywords: [
    "Al FATEH blog",
    "business insights UAE",
    "feasibility study articles",
    "UAE market strategy",
    "consultancy insights Dubai",
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
        description="Practical insights on feasibility, strategy, and innovation."
        image="/images/blog-banner.png"
        imageAlt="Workspace desk with laptop, notebook, and coffee — a space for writing and research"
        imagePosition="object-center"
      />
      <BlogGrid />
    </>
  );
}
