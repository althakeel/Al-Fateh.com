import { contact } from "@/data/contact";

export const siteConfig = {
  name: "Al FATEH",
  shortName: "Al FATEH",
  legalName: "Al-Fateh for Consultation Services",
  tagline: "Business Services & Advisory",
  title: "Al FATEH | Business Services & Advisory",
  description:
    "A practical finance partner for business growth across corporate tax, outsourced accounting, cost control and business advisory. Keep more of what you earn.",
  url: contact.website,
  locale: "en_AE",
  language: "en",
  email: contact.email,
  phone: contact.phoneDisplay,
  phoneHref: contact.phoneHref,
  address: {
    street: "Al Saqr Business Tower",
    locality: "Dubai",
    region: "Dubai",
    country: "AE",
    countryName: "United Arab Emirates",
    full: contact.location.address,
  },
  favicon: "/images/favicon.png",
  iconPng: "/icon.png",
  ogImage: "/images/studio/team.jpg",
  ogImageAlt: "The Al FATEH team",
  themeColor: "#0b3d4a",
  keywords: [
    "Al FATEH",
    "business services and advisory",
    "corporate tax advisory",
    "UAE corporate tax",
    "outsourced finance",
    "outsourced accounting",
    "management reporting",
    "cost accounting",
    "cost control",
    "margin analysis",
    "business strategy",
    "market advisory",
    "Dubai business advisory",
  ],
} as const;

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};
