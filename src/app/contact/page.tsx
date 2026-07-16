import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Al FATEH for consultancy services. Send us a message and our team will reach out to you soon.",
};

export default function ContactPage() {
  return (
    <>
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
