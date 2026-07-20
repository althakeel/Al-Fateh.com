import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Expertise from "@/components/Expertise";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Expertise",
  description:
    "Discover Al FATEH's strategic consultancy expertise across feasibility studies, maritime, media, HR, AI innovation, and project development for organizations in the UAE and GCC.",
  path: "/expertise",
  image: "/images/regional-insight.jpg",
  imageAlt: "Strategic business analysis and sector expertise",
  keywords: [
    "consultancy expertise UAE",
    "strategic planning Dubai",
    "sector advisory UAE",
    "feasibility and risk analysis",
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
        description="Al FATEH delivers premium business advisory services from Dubai, combining deep sector knowledge with a results-driven approach tailored to the UAE market."
        image="/images/regional-insight.jpg"
        imageAlt="Strategic business analysis and sector expertise"
      />
      <Expertise />
    </>
  );
}
