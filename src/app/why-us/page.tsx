import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyUs from "@/components/WhyUs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Why Choose Us",
  description:
    "Why businesses choose Al FATEH for accounting and consultancy — accurate bookkeeping, reliable reporting, tax compliance, payroll support, and practical financial advisory.",
  path: "/why-us",
  image: "/images/page-hero.jpg",
  imageAlt: "Professional accounting and consultancy partnership",
  keywords: [
    "why choose Al FATEH",
    "trusted accounting partner",
    "reliable bookkeeping firm",
    "client-focused accounting services",
  ],
});

export default function WhyUsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Us", path: "/why-us" },
        ])}
      />
      <PageHero
        eyebrow="Why Al FATEH"
        title="A Trusted Partner for Business Growth"
        description="We are committed to delivering high-quality consultancy services that exceed our clients' expectations. Here is what sets us apart."
        image="/images/page-hero.jpg"
        imageAlt="Professional accounting and consultancy partnership"
        imagePosition="object-center"
      />
      <WhyUs />
    </>
  );
}
