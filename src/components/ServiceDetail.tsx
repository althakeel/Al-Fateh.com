import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { servicePath, visibleServices, type ServiceOffering, type ServiceSection } from "@/data/services";
import { offeringImages, serviceImages, serviceShortLabels } from "@/data/serviceMedia";
import { serviceFaqs } from "@/data/serviceFaqs";
import { expertiseIcons } from "@/data/sectionIcons";
import IconTile from "./IconTile";

interface ServiceDetailProps {
  service: ServiceOffering;
  index: number;
}

function SectionCopy({ section }: { section: ServiceSection }) {
  return (
    <>
      {section.aside && (
        <p className="mt-4 text-[15px] leading-8 text-brand-900/80">{section.aside}</p>
      )}
      {section.detail && (
        <p className="mt-4 text-[15px] leading-8 text-brand-900/75">{section.detail}</p>
      )}
      {section.note && (
        <p className="mt-3 text-sm leading-7 text-brand-900/55">{section.note}</p>
      )}
      {section.points && section.points.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {section.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-7 text-brand-900/75 md:text-[15px]">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
      {section.groups && section.groups.length > 0 && (
        <div className="mt-6 space-y-6 border-t border-brand-900/10 pt-6">
          {section.groups.map((group) => (
            <div key={group.label}>
              <h4 className="text-base font-bold text-brand-900">{group.label}</h4>
              <SectionCopy section={group} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function GroupCards({ groups }: { groups: ServiceSection[] }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.label}
          className="flex h-full flex-col border border-brand-900/10 bg-white p-6 shadow-[0_12px_30px_-24px_rgba(15,39,68,0.45)] md:p-7"
        >
          <h3 className="text-lg font-bold leading-snug text-brand-900">{group.label}</h3>
          <span className="mt-3 block h-px w-10 bg-accent-500" />
          {group.aside && (
            <p className="mt-4 text-sm leading-7 text-brand-900/80">{group.aside}</p>
          )}
          {group.detail && (
            <p className="mt-3 text-sm leading-7 text-brand-900/70">{group.detail}</p>
          )}
          {group.points && group.points.length > 0 && (
            <ul className="mt-4 space-y-2.5">
              {group.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-brand-900/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
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
    const scopedImage = offeringImages[offering.label];
    return {
      ...offering,
      id: offeringId(offering.label),
      number: String(itemIndex + 1).padStart(2, "0"),
      image: scopedImage ?? image,
    };
  });
  const industries = (service.industries ?? []).map((industry, itemIndex) => ({
    ...industry,
    id: offeringId(industry.label),
    number: String(itemIndex + 1).padStart(2, "0"),
  }));
  const featured = offerings[0];
  const rest = offerings.slice(1);
  const faqs = serviceFaqs[service.title] ?? [];
  const grouped = offerings.some((item) => (item.groups?.length ?? 0) > 0);

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
            {service.plain && (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 md:text-[15px]">
                {service.plain}
              </p>
            )}
            {service.note && (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">{service.note}</p>
            )}
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
          {industries.length > 0 && (
            <a
              href="#industry-solutions"
              className="shrink-0 rounded-full border border-transparent bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-900/70 transition-colors hover:border-accent-500/35 hover:bg-white hover:text-accent-700"
            >
              Industry solutions
            </a>
          )}
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

      {grouped ? (
        <section className="bg-frost py-14 md:py-16">
          <div className="container-x flex flex-col gap-16 md:gap-20">
            {offerings.map((item, itemIndex) => {
              const imageFirst = itemIndex % 2 === 0;
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-44 border-t border-brand-900/10 pt-12 first:border-t-0 first:pt-0 md:pt-14"
                >
                  <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className={imageFirst ? "lg:col-span-7" : "lg:order-2 lg:col-span-7"}>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-sm font-semibold tracking-[0.14em] text-accent-600">
                          {item.number}
                        </span>
                        <span className="h-px w-10 bg-accent-500" />
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">
                          {label}
                        </p>
                      </div>
                      <h2 className="text-2xl font-bold leading-tight text-brand-900 md:text-3xl">
                        {item.label}
                      </h2>
                      {item.aside && (
                        <p className="mt-4 max-w-xl text-[15px] leading-8 text-brand-900/80">{item.aside}</p>
                      )}
                      {item.detail && (
                        <p className="mt-3 max-w-xl text-[15px] leading-8 text-brand-900/70">{item.detail}</p>
                      )}
                      {item.note && (
                        <p className="mt-3 max-w-xl text-sm leading-7 text-brand-900/55">{item.note}</p>
                      )}
                    </div>
                    <div
                      className={`relative aspect-[4/3] overflow-hidden bg-brand-900/5 lg:col-span-5 ${
                        imageFirst ? "" : "lg:order-1"
                      }`}
                    >
                      {item.image && (
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                      )}
                    </div>
                  </div>
                  {item.groups && item.groups.length > 0 && <GroupCards groups={item.groups} />}
                </article>
              );
            })}
          </div>
        </section>
      ) : featured && (
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
                  <SectionCopy section={featured} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {!grouped && (
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
                {service.title}
              </h2>
            </div>
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
                      <SectionCopy section={item} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {industries.length > 0 && (
        <section id="industry-solutions" className="scroll-mt-44 border-t border-brand-900/10 bg-ivory py-16 md:py-20">
          <div className="container-x">
            <div className="grid items-end gap-8 border-b border-brand-900/10 pb-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-accent-500" />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
                    Cost control
                  </p>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-brand-900 md:text-4xl">
                  Industry solutions
                </h2>
              </div>
              <ol className="space-y-4 lg:col-span-7 lg:border-s lg:border-brand-900/10 lg:ps-10">
                {service.industryIntro?.map((line, lineIndex) => (
                  <li key={line} className="grid grid-cols-[2.25rem_1fr] gap-3">
                    <span className="pt-0.5 text-[11px] font-semibold tracking-[0.16em] text-accent-600">
                      {String(lineIndex + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-7 text-brand-900/75 md:text-[15px]">{line}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.slice(0, 6).map((industry, industryIndex) => (
                <article
                  key={industry.id}
                  id={industry.id}
                  className="corp-card group relative flex h-full scroll-mt-44 flex-col overflow-hidden p-6 shadow-luxe md:p-7"
                >
                  <span className="ghost-numeral pointer-events-none absolute -right-1 -top-3 select-none text-7xl">
                    {industry.number}
                  </span>
                  <div className="relative flex items-center justify-between gap-4">
                    <IconTile icon={expertiseIcons[industryIndex]} size="md" variant="solid" />
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-accent-600">
                      {industry.number}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-bold tracking-tight text-brand-900">
                    {industry.label}
                  </h3>
                  <span className="relative mt-3 block h-px w-10 bg-accent-500" />
                  {industry.points && (
                    <ul className="relative mt-4 space-y-2.5">
                      {industry.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-6 text-brand-900/70">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>

            {industries[6] && (
              <div className="mt-4 grid gap-4 lg:grid-cols-12">
                <article
                  id={industries[6].id}
                  className="corp-card group relative flex scroll-mt-44 flex-col overflow-hidden p-6 shadow-luxe md:p-7 lg:col-span-7"
                >
                  <span className="ghost-numeral pointer-events-none absolute -right-1 -top-3 select-none text-7xl">
                    {industries[6].number}
                  </span>
                  <div className="relative flex items-center justify-between gap-4">
                    <IconTile icon={expertiseIcons[6]} size="md" variant="solid" />
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-accent-600">
                      {industries[6].number}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-bold tracking-tight text-brand-900">
                    {industries[6].label}
                  </h3>
                  <span className="relative mt-3 block h-px w-10 bg-accent-500" />
                  {industries[6].points && (
                    <ul className="relative mt-4 grid gap-2.5 sm:grid-cols-2">
                      {industries[6].points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-6 text-brand-900/70">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
                {service.industryNote && (
                  <aside className="flex flex-col justify-between bg-brand-900 px-6 py-7 text-white md:px-8 md:py-8 lg:col-span-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-400">
                      Other sectors
                    </p>
                    <p className="mt-4 text-lg font-semibold leading-8 text-white/90">
                      {service.industryNote}
                    </p>
                  </aside>
                )}
              </div>
            )}
          </div>
        </section>
      )}

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
