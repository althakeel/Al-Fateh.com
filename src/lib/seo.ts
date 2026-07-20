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
    category: "Business Consulting",
    classification: "Business & Professional Services",
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
        { url: siteConfig.favicon, sizes: "any", type: "image/x-icon" },
        { url: siteConfig.iconPng, type: "image/png", sizes: "32x32" },
      ],
      shortcut: [{ url: siteConfig.favicon, type: "image/x-icon" }],
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
          type: "image/x-icon",
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
    },
  };
}

export function organizationJsonLd() {
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
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: [
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      {
        "@type": "AdministrativeArea",
        name: "GCC",
      },
    ],
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
      "Feasibility Studies",
      "Maritime Consultancy",
      "Media Consultancy",
      "Human Resources Consultancy",
      "Artificial Intelligence Consultancy",
      "Project Development",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: siteConfig.language,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
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
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
  };
}
