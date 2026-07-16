import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyUs from "@/components/WhyUs";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Learn why businesses trust Al FATEH for premium consultancy services — multi-disciplinary expertise, client-centric approach, and UAE-based strategic insight.",
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Al FATEH"
        title="A Trusted Partner for Business Growth"
        description="We are committed to delivering high-quality consultancy services that exceed our clients' expectations. Here is what sets us apart."
        image="/images/why-us-hero.jpg"
        imageAlt="Client consultation and strategic advisory partnership"
        imagePosition="object-center"
      />
      <WhyUs />
    </>
  );
}
