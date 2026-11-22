import type { Metadata } from "next";
import { siteConfig, type PageSeoInput } from "@/data/site";
import { getLocalizedPathname, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { translate } from "@/lib/translations";

export function createLocalizedMetadata({
  locale,
  ...input
}: PageSeoInput & { locale: Locale }): Metadata {
  const title = translate(locale, input.title);
  const description = translate(locale, input.description);
  const imageAlt = translate(locale, input.imageAlt ?? siteConfig.ogImageAlt);
  const metadata = createPageMetadata({
    ...input,
    title,
    description,
    imageAlt,
    keywords: input.keywords?.map((keyword) => translate(locale, keyword)),
  });
  const en = new URL(getLocalizedPathname(input.path, "en"), siteConfig.url).href;
  const ar = new URL(getLocalizedPathname(input.path, "ar"), siteConfig.url).href;
  const canonical = locale === "ar" ? ar : en;
  const arabicTitle = input.path === "/" ? title : `${title} | الفاتح`;
  const socialTitle = locale === "ar" ? arabicTitle : metadata.openGraph?.title;

  return {
    ...metadata,
    title: locale === "ar" ? { absolute: arabicTitle } : metadata.title,
    alternates: { canonical, languages: { en, ar, "x-default": en } },
    openGraph: {
      ...metadata.openGraph,
      title: socialTitle,
      url: canonical,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      alternateLocale: locale === "ar" ? "en_AE" : "ar_AE",
    },
    twitter: { ...metadata.twitter, title: socialTitle },
  };
}
