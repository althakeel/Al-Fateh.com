import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyUs from "@/components/WhyUs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Why Choose Us",
  description:
    "What clients can expect: clear financial records, tax readiness, cost visibility, management reporting, strategic insight and flexible support, tailored to the agreed scope.",
  path: "/why-us",
  image: "/images/studio/Why us.jpg",
  imageAlt: "Colleagues meeting around a table",
  keywords: [
    "why choose Al FATEH",
    "tax readiness",
    "cost visibility",
    "management reporting",
  ],
});

export default function WhyUsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Us", path: "/why-us" },
        ])}
      />
      <PageHero
        eyebrow="Why Al FATEH"
        title="What Clients Can Expect"
        description="Engagement outputs are tailored to the agreed scope and client requirements."
        image="/images/studio/Why us.jpg"
        imageAlt="Colleagues meeting around a table"
        imagePosition="object-center"
      />
      <WhyUs />
    </>
  );
}
