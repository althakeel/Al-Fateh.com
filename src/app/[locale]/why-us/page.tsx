import { translate } from "@/lib/translations";
import { createLocalizedMetadata } from "@/lib/localized-seo";
import { requireLocale } from "@/lib/route-locale";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyUs from "@/components/WhyUs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return createLocalizedMetadata({
    locale,
    title: "Why Choose Us",
    description:
      "What clients can expect: clear financial records, tax readiness, cost visibility, management reporting, strategic insight and flexible support, tailored to the agreed scope.",
    path: "/why-us",
    image: "/images/studio/Strategic Advice(new).png",
    imageAlt: "Business strategy chart under review",
    keywords: [
      "why choose Al FATEH",
      "tax readiness",
      "cost visibility",
      "management reporting",
    ],
  });
}

export default async function WhyUsPage({ params }: PageProps) {
  const locale = requireLocale((await params).locale);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Us", path: "/why-us" },
        ], locale)}
      />
      <PageHero
        eyebrow={translate(locale, "Why Al FATEH")}
        title={translate(locale, "What Clients Can Expect")}
        description={translate(locale, "Engagement outputs are tailored to the agreed scope and client requirements.")}
        image="/images/studio/Strategic Advice(new).png"
        imageAlt={translate(locale, "Business strategy chart under review")}
        imagePosition="object-center"
      />
      <WhyUs locale={locale} />
    </>
  );
}
