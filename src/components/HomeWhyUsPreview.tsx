import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whyUsIcons } from "@/data/sectionIcons";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

const reasons = [
  {
    title: "Clear financial records",
    description: "More reliable accounting information and reconciliations.",
  },
  {
    title: "Tax readiness",
    description: "Organized records and structured support for tax compliance.",
  },
  {
    title: "Cost visibility",
    description: "Better understanding of cost drivers and spending patterns.",
  },
];

export default function HomeWhyUsPreview() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-accent-600">Why Al FATEH</p>
            <div className="accent-bar mt-4" />
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              What clients can expect
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/why-us"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-ink hover:text-accent-600"
            >
              Why choose us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={reason.title}
                className="reveal-child corp-card motion-card p-6 md:p-8 shadow-luxe backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <IconTile icon={whyUsIcons[index]} size="md" variant="solid" />
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-accent-500 text-sm font-bold text-accent-600">
                    {num}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{reason.description}</p>
              </div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
