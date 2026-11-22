import { translate } from "@/lib/translations";
import { createLocalizedMetadata } from "@/lib/localized-seo";
import { requireLocale } from "@/lib/route-locale";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Expertise from "@/components/Expertise";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return createLocalizedMetadata({
    locale,
    title: "Our Expertise",
    description:
      "Industry cost solutions for construction, healthcare, clinics, automotive, hospitality, trading and manufacturing. Tailored to each sector’s operational model and available data.",
    path: "/expertise",
    image: "/images/studio/Industry Solutions(new).jpg",
    imageAlt: "Industry solutions meeting",
    keywords: [
      "construction cost control",
      "healthcare cost analysis",
      "hospitality costing",
      "manufacturing cost accounting",
    ],
  });
}

export default async function ExpertisePage({ params }: PageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
        ], locale)}
      />
      <PageHero
        eyebrow={translate(locale, "Our Expertise")}
        title={translate(locale, "Industry Solutions")}
        description={translate(locale, "An adaptable framework for inventory-heavy, production-based and service-oriented businesses.")}
        image="/images/studio/Industry Solutions(new).jpg"
        imageAlt={translate(locale, "Industry solutions meeting")}
        imagePosition="object-center"
      />
      <Expertise locale={locale} />
    </>
  );
}
