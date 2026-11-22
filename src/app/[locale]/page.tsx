import { createLocalizedMetadata } from "@/lib/localized-seo";
import { requireLocale } from "@/lib/route-locale";
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
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return createLocalizedMetadata({
    locale,
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
    image: "/images/studio/Home page(new).png",
    imageAlt: "Business partners collaborating across finance and technology",
    keywords: [
      "corporate tax advisory Dubai",
      "outsourced finance UAE",
      "cost control advisory",
      "business strategy advisory",
      "Al FATEH business services",
      "keep more of what you earn",
    ],
  });
}

export default async function Home({ params }: PageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <div className="relative overflow-hidden">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }], locale)} />
      <HomeAnimatedBackdrop />
      <div className="relative z-10">
        <Hero locale={locale} />
        <CapabilitiesMarquee locale={locale} />
        <StatsStrip locale={locale} />
        <AboutPreview locale={locale} />
        <HomeValues locale={locale} />
        <ServicesPreview locale={locale} />
        <HomeExpertisePreview locale={locale} />
        <HomeWhyUsPreview locale={locale} />
        <HomeRegionalFocus locale={locale} />
      </div>
    </div>
  );
}
