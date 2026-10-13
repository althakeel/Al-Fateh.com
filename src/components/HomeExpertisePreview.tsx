import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { expertiseIcons } from "@/data/sectionIcons";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

const areas = [
  {
    title: "Construction & Contracting",
    description:
      "Project costing and budget control, including materials, labor, subcontractors, and budget-versus-actual monitoring.",
  },
  {
    title: "Hospitals & Healthcare Facilities",
    description:
      "Departmental cost analysis, operating expense monitoring, and service-line profitability.",
  },
  {
    title: "Medical Clinics & Dental Centers",
    description:
      "Cost per consultation and treatment, consumables, and profitability by service or specialty.",
  },
];

export default function HomeExpertisePreview() {
  return (
    <section className="section-glass py-12 lg:py-16">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-accent-600">Our Expertise</p>
            <div className="accent-bar mt-4" />
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Industry Solutions
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/expertise"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-ink hover:text-accent-600"
            >
              Explore our expertise
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {areas.map((area, index) => {
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={area.title}
                className="reveal-child corp-card group relative overflow-hidden p-6 md:p-8 shadow-luxe"
              >
                <span className="ghost-numeral absolute -right-1 -top-2 select-none text-7xl">
                  {num}
                </span>
                <div className="relative">
                  <IconTile icon={expertiseIcons[index]} size="lg" variant="solid" />
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">
                    Focus / {num}
                  </p>
                  <h3 className="mt-4 text-lg font-bold text-ink">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{area.description}</p>
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
