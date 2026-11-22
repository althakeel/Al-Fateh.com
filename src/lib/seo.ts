import { getLocalizedPathname, type Locale } from "@/lib/i18n";
import { getTranslations, translate } from "@/lib/translations";
import type { Metadata } from "next";
import { contact } from "@/data/contact";
import { siteConfig, type PageSeoInput } from "@/data/site";

function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteConfig.url).toString();
}

export function createPageMetadata({ 
  title,
  description,
  path, 
  keywords = [],
  image = siteConfig.ogImage,
  imageAlt = siteConfig.ogImageAlt,
  type = "website",
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const faviconUrl = absoluteUrl(siteConfig.favicon);
  const mergedKeywords = Array.from(
    new Set([...siteConfig.keywords, ...keywords])
  );
  const isHome = path === "/";
  const fullTitle = isHome ? siteConfig.title : `${title} | ${siteConfig.name}`;
  const imageType = image.toLowerCase().endsWith(".png")
    ? "image/png"
    : image.toLowerCase().endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";

  return {  
    title: isHome
      ? {
          absolute: siteConfig.title,
        }
      : title,
    description,
    keywords: mergedKeywords,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    category: "Business Services & Advisory",
    classification: "Business Services & Advisory",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,  
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,     
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { 
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    icons: {
      icon: [
        { url: siteConfig.favicon, type: "image/png", sizes: "32x32" },
        { url: siteConfig.iconPng, type: "image/png", sizes: "32x32" },
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      ],
      shortcut: [{ url: siteConfig.favicon, type: "image/png" }],
      apple: [{ url: siteConfig.iconPng, type: "image/png" }],
      other: [
        {
          rel: "mask-icon",
          url: siteConfig.favicon,
        },
      ],
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: imageType,
        },
        {
          url: faviconUrl,
          width: 48,
          height: 48,
          alt: `${siteConfig.name} favicon`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
    other: {
      "msapplication-TileColor": siteConfig.themeColor,
      "msapplication-TileImage": siteConfig.favicon,
      "theme-color": siteConfig.themeColor,
      "geo.region": "AE",
      "business:contact_data:email": siteConfig.email,
      "business:contact_data:phone_number": siteConfig.phone,
      "og:email": siteConfig.email,
      "og:phone_number": siteConfig.phone,
      "article:publisher": siteConfig.legalName,
      "service:type": "Business Services & Advisory",
    },
  };
}

export function organizationJsonLd(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: ["Al Fateh", "Al-Fateh for Consultation Services"],
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.iconPng),
    image: [
      absoluteUrl(siteConfig.ogImage),
      absoluteUrl(siteConfig.favicon),
    ],
    description: translate(locale, siteConfig.description),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        email: siteConfig.email,
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    sameAs: [contact.whatsappHref],
    knowsAbout: [
      "Accounting Services",
      "Corporate Tax & Tax Advisory",
      "Outsourced Finance & Accounting",
      "Cost Accounting & Cost Control",
      "Business Strategy & Market Advisory",
      "Feasibility Studies Consultancy",
      "Maritime Consultancy",
      "Innovation & Artificial Intelligence Consultancy",
    ],
  };
}

export function websiteJsonLd(locale: Locale = "en") {
  const url = absoluteUrl(getLocalizedPathname("/", locale));
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name: siteConfig.name,
    description: translate(locale, siteConfig.description),
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: locale,
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function localizeNavigationName(name: string, locale: Locale) {
  const { nav } = getTranslations(locale);
  const english = getTranslations("en").nav;
  const key = (Object.keys(english) as (keyof typeof english)[]).find((key) => english[key] === name);
  return key ? nav[key] : translate(locale, name);
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  locale: Locale = "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: localizeNavigationName(item.name, locale),
      item: absoluteUrl(getLocalizedPathname(item.path, locale)),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  image,
  locale = "en",
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: translate(locale, title),
    description: translate(locale, description),
    image: [absoluteUrl(image), absoluteUrl(siteConfig.favicon)],
    author: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.iconPng),
      },
    },
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(getLocalizedPathname(path, locale)),
    url: absoluteUrl(getLocalizedPathname(path, locale)),
  };
}
