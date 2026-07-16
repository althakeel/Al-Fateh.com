import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whyUsIcons } from "@/data/sectionIcons";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

export default function WhyUs() {
  const reasons = [
    {
      title: "Multi-Disciplinary Expertise",
      description:
        "Six core consultancy disciplines under one roof — feasibility, maritime, media, HR, AI, and project development — so you get integrated advice without juggling multiple vendors.",
    },
    {
      title: "Results-Oriented Approach",
      description:
        "Every engagement is focused on delivering measurable outcomes. We provide strategic advice backed by thorough analysis, not generic recommendations.",
    },
    {
      title: "Client-Centric Partnership",
      description:
        "We work closely with your team to understand your unique challenges, culture, and goals. Your success is our benchmark for excellence.",
    },
    {
      title: "UAE-Based, Globally Minded",
      description:
        "Headquartered in Dubai, we combine local market knowledge with international best practices to help businesses thrive in the UAE and beyond.",
    },
    {
      title: "Integrity & Collaboration",
      description:
        "We value transparency, ethical practice, and open communication. Our consultants become trusted advisors on your journey toward lasting success.",
    },
    {
      title: "Premium Consultancy Standards",
      description:
        "From initial consultation to project delivery, we maintain the highest professional standards expected of a leading UAE business consultancy.",
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
              Ready to Partner with Al FATEH?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Let our consultants help you navigate challenges, seize opportunities,
              and build a foundation for lasting success.
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
