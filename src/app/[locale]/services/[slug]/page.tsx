import { translate } from "@/lib/translations";
import { createLocalizedMetadata } from "@/lib/localized-seo";
import { requireLocale } from "@/lib/route-locale";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import JsonLd from "@/components/JsonLd";
import { serviceImages } from "@/data/serviceMedia";
import {
  getVisibleServiceBySlug,
  servicePath,
  serviceSlug,
  visibleServices,
} from "@/data/services";
import { serviceFaqs } from "@/data/serviceFaqs";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return visibleServices.map((service) => ({ slug: serviceSlug(service.title) }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug, locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const service = getVisibleServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found", robots: { index: false, follow: false } };
  }

  const image = serviceImages[service.title];

  return createLocalizedMetadata({
    locale,
    title: service.title,
    description: service.description,
    path: servicePath(service.title),
    image: image?.src,
    imageAlt: image?.alt,
    keywords: [service.title, "Al FATEH consultancy", "Dubai advisory"],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const service = getVisibleServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const index = visibleServices.findIndex((item) => item.title === service.title);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: servicePath(service.title) },
          ], locale),
          ...(serviceFaqs[service.title]
            ? [faqJsonLd(serviceFaqs[service.title].map(({ question, answer }) => ({
                question: translate(locale, question),
                answer: translate(locale, answer),
              })))]
            : []),
        ]}
      />
      <ServiceDetail locale={locale} service={service} index={index} />
    </>
  );
}
