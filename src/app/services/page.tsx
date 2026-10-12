import type { Metadata } from "next";
import Services from "@/components/Services";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Accounting & Consultancy Services",
  description:
    "Explore Al FATEH accounting services: bookkeeping, financial reporting, VAT and corporate tax, payroll, budgeting, and financial advisory — plus feasibility, maritime, and AI consultancy.",
  path: "/services",
  image: "/images/hero-boardroom.jpg",
  imageAlt: "Professional accounting and consultancy team in a boardroom meeting",
  keywords: [
    "accounting services",
    "bookkeeping services",
    "VAT and tax compliance",
    "payroll services",
    "financial reporting services",
    "accounting consultancy",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <Services />
    </>
  );
}
