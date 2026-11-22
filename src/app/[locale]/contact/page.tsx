import { translate } from "@/lib/translations";
import { createLocalizedMetadata } from "@/lib/localized-seo";
import { requireLocale } from "@/lib/route-locale";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return createLocalizedMetadata({
    locale,
    title: "Contact Us",
    description:
      "Contact Al FATEH for corporate tax, outsourced finance and accounting, cost control, and business strategy and market advisory.",
    path: "/contact",
    image: "/images/studio/Corporate Tax (bg) new.jpg",
    imageAlt: "Corporate tax documents and financial records on a desk",
    keywords: [
      "contact Al FATEH",
      "corporate tax enquiry",
      "outsourced accounting enquiry",
      "business advisory contact",
    ],
  });
}

export default async function ContactPage({ params }: PageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ], locale)}
      />
      <PageHero
        eyebrow={translate(locale, "Contact Us")}
        title={translate(locale, "Lets Get In Touch!")}
        image="/images/studio/Corporate Tax (bg) new.jpg"
        imageAlt={translate(locale, "Corporate tax documents and financial records on a desk")}
        imagePosition="object-center"
        minHeightClass="lg:min-h-[340px] xl:min-h-[370px]"
      />
      <ContactForm locale={locale} />
    </>
  );
}
