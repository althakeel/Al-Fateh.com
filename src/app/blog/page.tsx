import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore practical insights from Al FATEH on feasibility studies, UAE market strategy, business innovation, and informed decision-making.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights & Perspectives"
        title="Business Insights for Better Decisions"
        description="Practical thinking on feasibility, strategy, and innovation for organizations operating in the UAE and beyond."
        image="/images/blog-banner.png"
        imageAlt="Workspace desk with laptop, notebook, and coffee — a space for writing and research"
        imageFit="fill"
      />
      <BlogGrid />
    </>
  );
}
