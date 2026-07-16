import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function Quote() {
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
          <p className="eyebrow text-accent-400">Ready to Get Started?</p>
          <div className="accent-bar mx-auto mt-4" />
          <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Get Your Quote Today!
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Let us help you turn your vision into reality. Reach out today for a
            personalized consultation tailored to your organization&apos;s needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Get a Consultation
            </Link>
            <Link href="/services" className="btn-outline-light">
              Our Services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
