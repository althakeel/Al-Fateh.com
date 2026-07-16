import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Al FATEH consultancy services including feasibility studies, maritime, media, HR, AI innovation, project development, and accounting services.",
};

export default function ServicesPage() {
  return (
    <>
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
