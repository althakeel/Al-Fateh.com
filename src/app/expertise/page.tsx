import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Expertise from "@/components/Expertise";

export const metadata: Metadata = {
  title: "Our Expertise",
  description:
    "Discover Al FATEH's strategic consultancy expertise across feasibility studies, maritime, media, HR, AI innovation, and project development in the UAE.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Our Expertise"
        title="Strategic Consultancy Across Key Sectors"
        description="Al FATEH delivers premium business advisory services from Dubai, combining deep sector knowledge with a results-driven approach tailored to the UAE market."
        image="/images/regional-insight.jpg"
        imageAlt="Strategic business analysis and sector expertise"
      />
      <Expertise />
    </>
  );
}
