import { getLocalizedPathname, type Locale } from "@/lib/i18n";
import { translate } from "@/lib/translations";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function Quote({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="relative overflow-hidden bg-carbon py-20 lg:py-28">
      <Image
        src="/images/marina.jpg"
        alt=""
        fill
        className="object-cover opacity-30"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-carbon/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,154,92,0.18),transparent_55%)]" />

      <div className="container-x relative text-center">
        <Reveal direction="scale" className="mx-auto max-w-2xl">
          <p className="eyebrow text-accent-400">{translate(locale, "Ready to Get Started?")}</p>
          <div className="accent-bar mx-auto mt-4" />
          <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {translate(locale, "Get Your Quote Today!")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            {locale === "ar" ? translate(locale, "Let us help you turn your vision into reality. Reach out today for a personalized consultation tailored to your organization&apos;s needs.") : "Let us help you turn your vision into reality. Reach out today for a personalized consultation tailored to your organization's needs."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={getLocalizedPathname("/contact", locale)} className="btn-primary">
              {translate(locale, "Get a Consultation")}
            </Link>
            <Link href={getLocalizedPathname("/services", locale)} className="btn-outline-light">
              {translate(locale, "Our Services")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
