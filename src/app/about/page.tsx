import type { Metadata } from "next";
import About from "@/components/About";
import Team from "@/components/Team";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Al FATEH is a practical finance partner for business growth, helping UAE businesses keep more of what they earn through corporate tax, outsourced accounting, cost control and business advisory.",
  path: "/about",
  image: "/images/brand-logo-dark.png",
  imageAlt: "Al FATEH brand logo",
  keywords: [
    "about Al FATEH",
    "UAE business partner",
    "corporate tax planning",
    "outsourced accounting",
    "business advisory Dubai",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <About />
      <Team />
    </>
  );
}
