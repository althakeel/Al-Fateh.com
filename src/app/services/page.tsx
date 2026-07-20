import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Consultancy Services",
  description:
    "Explore Al FATEH consultancy services in Dubai: accounting, feasibility studies, maritime, media, HR, AI innovation, and project development tailored for UAE businesses.",
  path: "/services",
  image: "/images/hero-boardroom.jpg",
  imageAlt: "Professional consultancy team in a boardroom meeting",
  keywords: [
    "consultancy services Dubai",
    "accounting services UAE",
    "feasibility studies consultancy",
    "maritime consultancy Dubai",
    "HR consultancy UAE",
    "AI consulting Dubai",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        eyebrow="At Your Service"
        title="Our Consultancy Services"
        description="Comprehensive solutions tailored to help your organization thrive across every sector we serve."
        image="/images/hero-boardroom.jpg"
        imageAlt="Professional consultancy team in a boardroom meeting"
      />
      <Services />
    </>
  );
}
