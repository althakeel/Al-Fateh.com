import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { servicePath, visibleServices, type ServiceOffering } from "@/data/services";
import { offeringImages, serviceImages, serviceShortLabels } from "@/data/serviceMedia";
import { serviceFaqs } from "@/data/serviceFaqs";

interface ServiceDetailProps {
  service: ServiceOffering;
  index: number;
}

function offeringParts(offering: string) {
  const colonIndex = offering.indexOf(":");
  if (colonIndex === -1) return { label: offering, detail: "" };
  return {
    label: offering.slice(0, colonIndex).trim(),
    detail: offering.slice(colonIndex + 1).trim(),
  };
}

function offeringId(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ServiceDetail({ service, index }: ServiceDetailProps) {
  const image = serviceImages[service.title];
  const number = String(index + 1).padStart(2, "0");
  const label = serviceShortLabels[service.title] ?? service.title;
  const previous = visibleServices[(index + visibleServices.length - 1) % visibleServices.length];
  const next = visibleServices[(index + 1) % visibleServices.length];
  const offerings = service.offerings.map((offering, itemIndex) => {
    const parts = offeringParts(offering);
    const scopedImage =
      service.title === "Maritime Consultancy" && parts.label === "Results-Oriented Solutions"
        ? offeringImages["Maritime results"]
        : service.title === "Human Resources Consultancy" && parts.label === "Training Programs"
          ? offeringImages["HR training"]
          : offeringImages[parts.label];
    return {
      ...parts,
      id: offeringId(parts.label),
      number: String(itemIndex + 1).padStart(2, "0"),
      image: scopedImage ?? image,
    };
  });
  const featured = offerings[0];
  const rest = offerings.slice(1);
  const faqs = serviceFaqs[service.title] ?? [];

  return (
    <>
      <section className="relative min-h-[420px] overflow-hidden bg-brand-900 text-white md:min-h-[480px]">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/92 via-brand-900/78 to-brand-900/25" />
        <div className="container-x relative z-10 grid items-end gap-10 pb-14 pt-8 lg:grid-cols-12 lg:pb-16 lg:pt-10">
          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-accent-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-500">
                Al FATEH · {label}
              </p>
            </div>
            <h1 className="max-w-3xl text-3xl font-bold leading-[1.08] text-white md:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-[15px]">
              {service.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Link href="/contact" className="btn-primary">
              Get a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#scope" className="btn-outline-light">
              Full scope
            </a>
          </div>
        </div>
      </section>

      <div className="border-b border-accent-500/15 bg-frost">
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {offerings.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full border border-transparent bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-900/70 transition-colors hover:border-accent-500/35 hover:bg-white hover:text-accent-700"
            >
              {item.label}
            </a>
          ))}
          {faqs.length > 0 && (
            <a
              href="#faq"
              className="shrink-0 rounded-full border border-transparent bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-900/70 transition-colors hover:border-accent-500/35 hover:bg-white hover:text-accent-700"
            >
              Questions
            </a>
          )}
        </div>
      </div>

      {featured && (
        <section id={featured.id} className="scroll-mt-44 bg-frost py-12 md:py-14">
          <div className="container-x">
            <div className="overflow-hidden rounded-[22px] border border-accent-500/30 bg-white shadow-[0_18px_40px_rgba(15,39,68,0.08)]">
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[280px] lg:min-h-[460px]">
                  {featured.image && (
                    <Image
                      src={featured.image.src}
                      alt={featured.image.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute top-5 left-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent-500/50 bg-brand-900/75 text-lg font-bold text-accent-500 backdrop-blur-sm">
                    {featured.number}
                  </div>
                </div>
                <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-12">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-accent-500" />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
                      {number} / {label}
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold leading-tight text-brand-900 md:text-3xl lg:text-4xl">
                    {featured.label}
                  </h2>
                  {featured.detail && (
                    <p className="mt-4 text-[15px] leading-8 text-brand-900/75">{featured.detail}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="scope" className="scroll-mt-44 bg-ivory py-14 md:py-16">
        <div className="container-x">
          <div className="mb-10 flex flex-col gap-4 border-b border-accent-500/15 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-accent-500" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
                  {label}
                </p>
              </div>
              <h2 className="text-3xl font-bold text-brand-900 md:text-4xl">
                Full scope of this practice
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-brand-900/55">
              {String(offerings.length).padStart(2, "0")} areas of work covered in this engagement.
            </p>
          </div>

          <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
            {rest.map((item, itemIndex) => {
              const reversed = itemIndex % 2 === 1;
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="group scroll-mt-44"
                >
                  <div
                    className={`flex flex-col gap-6 lg:items-center lg:gap-10 ${
                      reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                    }`}
                  >
                    <div className="relative w-full shrink-0 overflow-hidden rounded-[18px] border border-accent-500/25 bg-brand-900/5 lg:w-[46%]">
                      <div className="relative aspect-[16/10]">
                        {item.image && (
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                            sizes="(max-width: 1024px) 100vw, 46vw"
                          />
                        )}
                      </div>
                      <div className="absolute top-4 right-4 flex min-h-[52px] min-w-[52px] items-center justify-center rounded-xl border border-accent-500/55 bg-brand-900/80 px-3 text-xl font-bold tracking-wide text-accent-500 backdrop-blur-sm">
                        {item.number}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-brand-900 md:text-2xl">{item.label}</h3>
                      <span className="mt-3 block h-px w-12 bg-accent-500/55" />
                      {item.detail && (
                        <p className="mt-4 text-sm leading-7 text-brand-900/70 md:text-[15px]">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section id="faq" className="scroll-mt-44 border-t border-platinum bg-frost py-14 md:py-16">
          <div className="container-x">
            <div className="mb-8 max-w-2xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-accent-500" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
                  {label}
                </p>
              </div>
              <h2 className="text-3xl font-bold text-brand-900 md:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="overflow-hidden rounded-[22px] border border-accent-500/25 bg-white">
              {faqs.map((item, itemIndex) => (
                <details
                  key={item.question}
                  open={itemIndex === 0}
                  className="group border-b border-accent-500/15 last:border-b-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 md:px-8 [&::-webkit-details-marker]:hidden">
                    <span className="text-base font-semibold text-brand-900 md:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-accent-600 transition-transform duration-300 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="max-w-3xl px-6 pb-6 text-sm leading-7 text-brand-900/70 md:px-8 md:text-[15px]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <nav aria-label="More services" className="border-t border-platinum bg-frost">
        <div className="container-x grid sm:grid-cols-2">
          <Link
            href={servicePath(previous.title)}
            className="group flex items-center gap-4 border-b border-platinum py-8 sm:border-b-0 sm:border-e sm:pe-8"
          >
            <ArrowLeft className="h-5 w-5 text-accent-600 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">
                Previous
              </span>
              <span className="mt-1 block font-semibold text-brand-900">
                {serviceShortLabels[previous.title]}
              </span>
            </span>
          </Link>
          <Link
            href={servicePath(next.title)}
            className="group flex items-center justify-end gap-4 py-8 text-end sm:ps-8"
          >
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">
                Next
              </span>
              <span className="mt-1 block font-semibold text-brand-900">
                {serviceShortLabels[next.title]}
              </span>
            </span>
            <ArrowRight className="h-5 w-5 text-accent-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </nav>
    </>
  );
}
