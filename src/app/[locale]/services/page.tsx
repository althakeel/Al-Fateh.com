import { createLocalizedMetadata } from "@/lib/localized-seo";
import { requireLocale } from "@/lib/route-locale";
import type { Metadata } from "next";
import Services from "@/components/Services";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return createLocalizedMetadata({
    locale,
    title: "Business Services & Advisory",
    description:
      "Four practices: accounting services, feasibility studies, maritime consultancy, and innovation and artificial intelligence.",
    path: "/services",
    image: "/images/studio/Cost Accounting & Cost Control(new).jpg",
    imageAlt: "Cost and sales charts used to review business performance",
    keywords: [
      "corporate tax advisory",
      "outsourced finance",
      "cost accounting",
      "feasibility studies",
      "maritime consultancy",
      "artificial intelligence consultancy",
    ],
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ], locale)}
      />
      <Services locale={locale} />
    </>
  );
}
