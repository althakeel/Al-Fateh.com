import type { Metadata } from "next";
import Services from "@/components/Services";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Business Services & Advisory",
  description:
    "Four practices: accounting services, feasibility studies, maritime consultancy, and innovation and artificial intelligence.",
  path: "/services",
  image: "/images/studio/services-banner.jpg",
  imageAlt: "Advisors in a professional meeting",
  keywords: [
    "corporate tax advisory",
    "outsourced finance",
    "cost accounting",
    "feasibility studies",
    "maritime consultancy",
    "artificial intelligence consultancy",
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
