import { createLocalizedMetadata } from "@/lib/localized-seo";
import { requireLocale } from "@/lib/route-locale";
import type { Metadata } from "next";
import About from "@/components/About";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return createLocalizedMetadata({
    locale,
    title: "About Us",
    description:
      "Al FATEH is a practical finance partner for business growth, helping UAE businesses keep more of what they earn through corporate tax, outsourced accounting, cost control and business advisory.",
    path: "/about",
    image: "/images/studio/Corporate Tax (bg) new.jpg",
    imageAlt: "Corporate tax documents and financial records on a desk",
    keywords: [
      "about Al FATEH",
      "UAE business partner",
      "corporate tax planning",
      "outsourced accounting",
      "business advisory Dubai",
    ],
  });
}

export default async function AboutPage({ params }: PageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ], locale)}
      />
      <About locale={locale} />
    </>
  );
}
