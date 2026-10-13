import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Expertise from "@/components/Expertise";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Expertise",
  description:
    "Industry cost solutions for construction, healthcare, clinics, automotive, hospitality, trading and manufacturing. Tailored to each sector’s operational model and available data.",
  path: "/expertise",
  image: "/images/studio/banner-expertise.jpg",
  imageAlt: "Al FATEH advisors working through a business analysis",
  keywords: [
    "construction cost control",
    "healthcare cost analysis",
    "hospitality costing",
    "manufacturing cost accounting",
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
        title="Industry Solutions"
        description="An adaptable framework for inventory-heavy, production-based and service-oriented businesses."
        image="/images/studio/banner-expertise.jpg"
        imageAlt="Al FATEH advisors working through a business analysis"
        imagePosition="object-center"
      />
      <Expertise />
    </>
  );
}
