import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CapabilitiesMarquee from "@/components/CapabilitiesMarquee";
import StatsStrip from "@/components/StatsStrip";
import AboutPreview from "@/components/AboutPreview";
import HomeValues from "@/components/HomeValues";
import ServicesPreview from "@/components/ServicesPreview";
import HomeExpertisePreview from "@/components/HomeExpertisePreview";
import HomeWhyUsPreview from "@/components/HomeWhyUsPreview";
import HomeRegionalFocus from "@/components/HomeRegionalFocus";
import HomeAnimatedBackdrop from "@/components/HomeAnimatedBackdrop";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  image: "/images/hero-desk.jpg",
  imageAlt: "Al FATEH professional accounting and consultancy workspace",
  keywords: [
    "professional accounting services",
    "bookkeeping and payroll",
    "VAT and corporate tax filing",
    "financial statements preparation",
    "Al FATEH accounting services",
    "business accounting consultancy",
  ],
});

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />
      <HomeAnimatedBackdrop />
      <div className="relative z-10">
        <Hero />
        <CapabilitiesMarquee />
        <StatsStrip />
        <AboutPreview />
        <HomeValues />
        <ServicesPreview />
        <HomeExpertisePreview />
        <HomeWhyUsPreview />
        <HomeRegionalFocus />
      </div>
    </div>
  );
}
