import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Al FATEH for accounting and consultation services. Request bookkeeping, tax, payroll, or financial advisory support by phone, email, WhatsApp, or our online form.",
  path: "/contact",
  image: "/images/contact-banner.jpg",
  imageAlt: "Contact Al FATEH for accounting consultation",
  keywords: [
    "contact Al FATEH",
    "accounting consultation request",
    "bookkeeping enquiry",
    "tax and payroll support contact",
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
        title="Let's Get In Touch!"
        description="Have a question or ready to start your next project? We'd love to hear from you."
        image="/images/contact-banner.jpg"
        imageAlt="Modern consultancy meeting room"
        imagePosition="object-center"
      />
      <ContactForm />
    </>
  );
}
