import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whyUsIcons } from "@/data/sectionIcons";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

export default function WhyUs() {
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
    {
      title: "Management reporting",
      description: "Useful reports for decisions on cash, costs and performance.",
    },
    {
      title: "Strategic insight",
      description: "Market and business analysis to help evaluate opportunities.",
    },
    {
      title: "Flexible support",
      description: "Project-based work or recurring support where agreed.",
    },
  ];

  return (
    <section className="bg-frost py-16 lg:py-24">
      <div className="container-x">
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={reason.title}
                className="reveal-child corp-card motion-card relative overflow-hidden p-6 md:p-8 shadow-luxe"
              >
                <div className="flex items-start justify-between gap-4">
                  <IconTile icon={whyUsIcons[index]} size="md" variant="solid" />
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-accent-500 text-sm font-bold text-accent-600">
                    {num}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </RevealStagger>

        <Reveal direction="scale" className="relative mt-16 overflow-hidden border border-white/10 bg-carbon px-8 py-12 sm:px-12">
          <div className="footer-network absolute inset-0 opacity-40" />
          <div className="footer-network-glow absolute inset-0" />
          <div className="relative text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to keep more of what you earn?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Engagement outputs are tailored to the agreed scope and client
              requirements.
            </p>
            <Link href="/contact" className="btn-primary glow-accent group mt-8">
              Get a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
