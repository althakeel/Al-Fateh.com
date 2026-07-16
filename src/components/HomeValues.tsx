import { Lightbulb, Users, HeartHandshake, Award } from "lucide-react";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";
import { valueIcons } from "@/data/sectionIcons";

const values = [
  {
    title: "Strategic Insights",
    description:
      "We empower businesses with innovative solutions that drive growth and success.",
    icon: Lightbulb,
  },
  {
    title: "Industry Experts",
    description:
      "Our team brings years of experience and diverse skills across multiple sectors.",
    icon: Users,
  },
  {
    title: "Client-Centric",
    description:
      "We work closely with clients to understand their unique needs and challenges.",
    icon: HeartHandshake,
  },
  {
    title: "Excellence",
    description:
      "We value integrity, collaboration, and delivering services that exceed expectations.",
    icon: Award,
  },
];

export default function HomeValues() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent-600">Our Approach</p>
          <div className="accent-bar mt-4" />
          <p className="mt-6 text-base leading-relaxed text-mute sm:text-lg">
            At our consultancy, we value integrity, collaboration, and excellence.
            We are committed to delivering high-quality services that exceed our
            clients&apos; expectations.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="reveal-child corp-card motion-card p-6 shadow-luxe backdrop-blur-sm"
            >
              <IconTile icon={valueIcons[index]} size="md" variant="solid" />
              <h3 className="mt-5 text-lg font-bold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{value.description}</p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
