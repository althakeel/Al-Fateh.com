import { contact } from "@/data/contact";

export const siteConfig = {
  name: "Al FATEH",
  shortName: "Al FATEH",
  legalName: "Al-Fateh for Consultation Services",
  tagline: "Accounting & Consultation Services",
  title: "Al FATEH | Accounting & Consultation Services",
  description:
    "Al FATEH provides professional accounting services including bookkeeping, financial reporting, VAT and corporate tax, payroll, budgeting, and financial advisory — plus consultancy support for growing businesses.",
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
  ogImageAlt: "Al FATEH accounting and consultancy team in a professional boardroom",
  themeColor: "#0b3d4a",
  keywords: [
    "Al FATEH",
    "Al Fateh accounting",
    "accounting services",
    "bookkeeping services",
    "financial accounting",
    "financial reporting",
    "VAT services",
    "corporate tax",
    "payroll management",
    "budgeting and forecasting",
    "financial advisory",
    "accounting consultancy",
    "management reporting",
    "cost control and analysis",
    "accounting system setup",
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
