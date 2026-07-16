import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Al FATEH's mission to empower businesses with strategic insights, innovative solutions, and client-centric consultancy services.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Shaping Success
            <br />
            Through Expertise
          </>
        }
        description="Our mission is to empower businesses and organizations by providing strategic insights and innovative solutions that drive growth and success."
        image="/images/about-hero.jpg"
        imageAlt="Al FATEH consultancy lobby with gold brand mark"
      />
      <About />
    </>
  );
}
