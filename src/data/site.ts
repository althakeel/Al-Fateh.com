import { contact } from "@/data/contact";

export const siteConfig = {
  name: "Al FATEH",
  shortName: "Al FATEH",
  legalName: "Al-Fateh for Consultation Services",
  tagline: "For Consultation Services",
  title: "Al FATEH | For Consultation Services",
  description:
    "Al FATEH delivers professional accounting services — bookkeeping, financial reporting, VAT and corporate tax, payroll, budgeting, and financial advisory — with consultancy support across feasibility, maritime, media, HR, AI, and project development.",
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
  ogImage: "/images/hero-boardroom.jpg",
  ogImageAlt: "Al FATEH consultancy team in a professional boardroom meeting",
  themeColor: "#0b3d4a",
  keywords: [
    "Al FATEH",
    "Al Fateh accounting services",
    "accounting services",
    "bookkeeping services",
    "financial reporting",
    "VAT and corporate tax",
    "payroll management",
    "financial advisory",
    "accounting consultancy",
    "feasibility studies consultancy",
    "maritime consultancy",
    "media consultancy",
    "HR consultancy",
    "AI consulting",
    "project development consultancy",
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
