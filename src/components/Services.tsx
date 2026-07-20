"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services, type ServiceOffering } from "@/data/services";
import { serviceIcons } from "@/data/sectionIcons";
import ServiceModal from "./ServiceModal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceOffering | null>(null);

  return (
    <section className="bg-frost py-16 lg:py-24">
      <div className="container-x">
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
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
                className="reveal-child corp-card group relative flex cursor-pointer flex-col overflow-hidden p-6 md:p-8 shadow-luxe outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent-500/40"
              >
                <span className="ghost-numeral absolute -right-1 -top-2 select-none text-7xl">
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
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
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
