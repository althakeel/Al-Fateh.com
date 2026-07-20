import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyUs from "@/components/WhyUs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Why Choose Us",
  description:
    "Why businesses trust Al FATEH: multi-disciplinary expertise, a client-centric approach, UAE market insight, and results-oriented consultancy from Dubai.",
  path: "/why-us",
  image: "/images/page-hero.jpg",
  imageAlt: "Dubai skyline representing Al FATEH's UAE market focus",
  keywords: [
    "why choose Al FATEH",
    "trusted consultancy Dubai",
    "UAE business partner",
    "client-centric advisory",
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
        imageAlt="Dubai skyline representing Al FATEH's UAE market focus"
        imagePosition="object-center"
      />
      <WhyUs />
    </>
  );
}
