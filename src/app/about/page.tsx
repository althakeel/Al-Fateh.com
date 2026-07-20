import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Al FATEH — an accounting and consultation firm helping organizations with bookkeeping, financial reporting, tax compliance, payroll, and strategic advisory services.",
  path: "/about",
  image: "/images/brand-logo-dark.png",
  imageAlt: "Al FATEH brand logo",
  keywords: [
    "about Al FATEH",
    "accounting consultancy firm",
    "financial advisory company",
    "professional accountants",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
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
        image="/images/brand-logo-dark.png"
        imageAlt="Al FATEH brand logo"
        imageFit="contain"
        imageBg="bg-frost"
        imagePosition="object-center"
      />
      <About />
    </>
  );
}
