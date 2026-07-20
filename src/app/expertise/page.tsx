import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Expertise from "@/components/Expertise";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Expertise",
  description:
    "Discover Al FATEH expertise in accounting, financial reporting, tax compliance, payroll, and strategic consultancy for organizations that need reliable financial and advisory support.",
  path: "/expertise",
  image: "/images/regional-insight.jpg",
  imageAlt: "Strategic accounting and business analysis expertise",
  keywords: [
    "accounting expertise",
    "financial advisory expertise",
    "tax and payroll specialists",
    "strategic accounting consultancy",
  ],
});

export default function ExpertisePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
        ])}
      />
      <PageHero
        eyebrow="Our Expertise"
        title="Expertise Across Key Sectors"
        description="Premium business advisory combining deep sector knowledge with a results-driven approach."
        image="/images/regional-insight.jpg"
        imageAlt="Strategic business analysis and sector expertise"
        imagePosition="object-center"
      />
      <Expertise />
    </>
  );
}
