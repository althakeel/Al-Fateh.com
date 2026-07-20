"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services, type ServiceOffering } from "@/data/services";
import { serviceIcons } from "@/data/sectionIcons";
import ServiceModal from "./ServiceModal";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

interface ServicesPreviewProps {
  limit?: number;
}

export default function ServicesPreview({ limit = 6 }: ServicesPreviewProps) {
  const [selectedService, setSelectedService] = useState<ServiceOffering | null>(null);
  const previewServices = services.slice(0, limit);

  return (
    <section className="section-glass py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-accent-600">At Your Service</p>
            <div className="accent-bar mt-4" />
            <h2 className="mt-3 text-2xl font-bold leading-[1.1] tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Our Consultancy Services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">
              Comprehensive business consultancy across six strategic disciplines,
              delivered from the heart of the UAE.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-ink hover:text-accent-600"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {previewServices.map((service, index) => {
            const num = String(index + 1).padStart(2, "0");
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <article
                key={service.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedService(service)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedService(service);
                  }
                }}
                aria-label={`View details for ${service.title}`}
                className="reveal-child corp-card group relative flex cursor-pointer flex-col overflow-hidden p-6 md:p-8 outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent-500/40"
              >
                <span className="ghost-numeral absolute -right-1 -top-2 select-none text-7xl transition-colors duration-500">
                  {num}
                </span>

                <div className="relative flex items-start justify-between gap-4">
                  <IconTile icon={Icon} size="lg" variant="solid" />
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-sm border border-platinum text-brand-700 transition-all duration-500 group-hover:border-accent-500 group-hover:text-accent-600"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <div className="relative mt-6 flex flex-1 flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">
                    Practice / {num}
                  </p>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-mute">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </RevealStagger>
      </div>

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
}
