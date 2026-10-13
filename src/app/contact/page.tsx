import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Al FATEH for corporate tax, outsourced finance and accounting, cost control, and business strategy and market advisory.",
  path: "/contact",
  image: "/images/studio/banner-contact.jpg",
  imageAlt: "A document handed across the office reception",
  keywords: [
    "contact Al FATEH",
    "corporate tax enquiry",
    "outsourced accounting enquiry",
    "business advisory contact",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact Us"
        title="Lets Get In Touch!"
        image="/images/studio/banner-contact.jpg"
        imageAlt="A document handed across the office reception"
        imagePosition="object-center"
        minHeightClass="lg:min-h-[340px] xl:min-h-[370px]"
      />
      <ContactForm />
    </>
  );
}
