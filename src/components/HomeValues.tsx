import { type Locale } from "@/lib/i18n";
import { translate } from "@/lib/translations";
import { Lightbulb, Users, HeartHandshake, Award } from "lucide-react";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";
import { valueIcons } from "@/data/sectionIcons";

const values = [
  {
    title: "Corporate Tax",
    icon: Lightbulb,
  },
  {
    title: "Outsourced Finance",
    icon: Users,
  },
  {
    title: "Cost Control",
    icon: HeartHandshake,
  },
  {
    title: "Business Advisory",
    icon: Award,
  },
];

export default function HomeValues({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent-600">{translate(locale, "Our Approach")}</p>
          <div className="accent-bar mt-4" />
          <p className="mt-6 text-base leading-relaxed text-mute sm:text-lg">
            {translate(locale, "To help businesses keep more of what they earn through smart Corporate Tax planning, reliable accounting outsourcing and strategic business advisory.")}
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="reveal-child corp-card motion-card p-6 shadow-luxe backdrop-blur-sm"
            >
              <IconTile icon={valueIcons[index]} size="md" variant="solid" />
              <h3 className="mt-5 text-lg font-bold text-ink">{translate(locale, value.title)}</h3>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
