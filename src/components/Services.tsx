"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Users } from "lucide-react";
import { servicePath, serviceSlug, visibleServices } from "@/data/services";
import { serviceImages, serviceShortLabels } from "@/data/serviceMedia";
import { serviceIconByTitle } from "@/data/sectionIcons";
import Reveal from "./Reveal";

const chipIcons = [ShieldCheck, Users, Compass];

const trustPoints = [
  { title: "Tax readiness", text: "Organized records and structured support for tax compliance" },
  { title: "Cost visibility", text: "A clearer view of cost drivers and spending patterns" },
  { title: "Flexible support", text: "Project-based work or recurring support where agreed" },
];

function chipLabel(offering: { label: string }) {
  return offering.label;
}

export default function Services() {
  const firstId = serviceSlug(visibleServices[0]?.title ?? "services");

  return (
    <>
      <section className="relative flex min-h-[620px] items-end overflow-hidden lg:min-h-[700px]">
        <Image
          src="/images/studio/services-banner.jpg"
          alt="Advisors in a professional meeting"
          fill
          priority
          quality={90}
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/82 via-brand-900/45 to-brand-900/15" />
        <div className="container-x relative z-10 pb-14 pt-32 lg:pb-20 lg:pt-36">
          <div className="animate-fade-up mb-5 flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-500">
              Al FATEH
            </span>
            <span className="h-px w-10 bg-accent-500" />
          </div>
          <h1 className="animate-fade-up-delay-1 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Four core
            <br />
            <span className="text-accent-500">service</span> lines
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-base leading-8 text-white/75">
            Accounting services cover tax, finance, cost control and market
            advisory. With them: feasibility studies, maritime consultancy, and
            innovation and artificial intelligence.
          </p>
          <div className="animate-fade-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`#${firstId}`} className="btn-outline-light">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      <nav className="sticky top-28 z-40 border-b border-brand-900/10 bg-ivory">
        <div className="container-x grid grid-cols-2 lg:flex lg:overflow-x-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
          {visibleServices.map((service, index) => {
            const Icon = serviceIconByTitle[service.title];
            const mobileLastRow = Math.floor((visibleServices.length - 1) / 2) * 2;
            return (
              <Link
                key={service.title}
                href={servicePath(service.title)}
                className={`group flex items-center justify-center gap-2 border-brand-900/10 px-3 py-4 text-center lg:flex-1 ${
                  index % 2 === 0 && index < visibleServices.length - 1 ? "border-e" : ""
                } ${index < mobileLastRow ? "border-b lg:border-b-0" : ""} ${
                  index < visibleServices.length - 1 ? "lg:border-e" : ""
                }`}
              >
                {Icon && <Icon className="h-4 w-4 shrink-0 text-accent-500" strokeWidth={1.75} aria-hidden />}
                <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-brand-900/80 transition-colors group-hover:text-accent-600 lg:text-[11px]">
                  {serviceShortLabels[service.title] ?? service.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {visibleServices.map((service, index) => {
        const image = serviceImages[service.title];
        const imageFirst = index % 2 === 0;
        const words = service.title.toUpperCase().split(" ");
        const lead = words.slice(0, -1).join(" ");
        const accent = words[words.length - 1];
        const number = String(index + 1).padStart(2, "0");
        const highlights =
          service.offerings.length <= 4 ? service.offerings : service.offerings.slice(0, 3);

        return (
          <section
            key={service.title}
            id={serviceSlug(service.title)}
            className="scroll-mt-44 overflow-hidden bg-frost py-12 lg:py-16"
          >
            <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal direction={imageFirst ? "left" : "right"} className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                <div className="relative">
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-2 z-0 select-none text-[6rem] font-bold leading-none text-brand-900/[0.05] md:text-[8rem] ${
                      imageFirst ? "start-0" : "end-0"
                    }`}
                  >
                    {number}
                  </span>
                  <div className={`relative pt-1.5 ${imageFirst ? "ps-1.5" : "pe-1.5"}`}>
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-0 z-0 h-1.5 w-full bg-accent-500 ${
                        imageFirst ? "start-0" : "end-0"
                      }`}
                    />
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-0 z-0 h-full w-1.5 bg-accent-500 ${
                        imageFirst ? "start-0" : "end-0"
                      }`}
                    />
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute bottom-0 z-20 h-16 w-16 opacity-40 ${
                        imageFirst ? "start-0" : "end-0"
                      }`}
                      style={{
                        backgroundImage: "radial-gradient(#0a1c30 1.15px, transparent 1.15px)",
                        backgroundSize: "8px 8px",
                      }}
                    />
                    <div className="group relative z-10 min-h-[280px] overflow-hidden bg-frost shadow-[0_18px_40px_-24px_rgba(15,39,68,0.45)] sm:min-h-[340px] lg:min-h-[430px]">
                      {image && (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover object-center scale-110 transition-transform duration-700 ease-out group-hover:scale-100"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction={imageFirst ? "right" : "left"} delay={80} className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tracking-[0.08em] text-accent-600">{number}</span>
                  <span className="h-px w-12 bg-accent-500" />
                </div>
                <h2 className="mt-5 text-3xl font-bold uppercase leading-tight tracking-[0.03em] text-brand-900 md:text-4xl">
                  {lead} <span className="text-accent-500">{accent}</span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate">{service.description}</p>
                {service.plain && (
                  <p className="mt-3 max-w-xl text-base leading-8 text-slate/80">{service.plain}</p>
                )}
                <div
                  className={`mt-8 grid grid-cols-2 gap-x-4 gap-y-5 ${
                    highlights.length === 4 ? "" : "sm:grid-cols-3"
                  }`}
                >
                  {highlights.map((offering, chipIndex) => {
                    const Icon = chipIcons[chipIndex % chipIcons.length];
                    return (
                      <div
                        key={offering.label}
                        className={chipIndex > 0 ? "sm:border-s sm:border-brand-900/15 sm:ps-5" : undefined}
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
                          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                        </span>
                        <p className="mt-3 text-sm font-bold leading-snug text-brand-900">
                          {chipLabel(offering)}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href={servicePath(service.title)}
                  className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-700 transition-colors hover:text-brand-900"
                >
                  View full scope
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="bg-brand-900 py-16 text-white lg:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-500">
                Get in touch
              </span>
              <span className="h-px w-12 bg-accent-500" />
            </div>
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Ready to keep more of <span className="text-accent-500">what you earn?</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
              Practical, tailored support across accounting, feasibility
              studies, maritime consultancy, and innovation.
            </p>
            <Link href="/contact" className="btn-primary mt-8">
              Get a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-8">
            {trustPoints.map((point) => (
              <div key={point.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent-500/70 text-accent-500">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-white">{point.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
