import type { Metadata } from "next";
import About from "@/components/About";
import Team from "@/components/Team";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Al FATEH — a Dubai consultancy for accounting, feasibility, maritime, media, human resources, artificial intelligence, and project development.",
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
      <About />
      <Team />
    </>
  );
}
