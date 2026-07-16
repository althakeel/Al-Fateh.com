import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { valueIcons } from "@/data/sectionIcons";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

export default function About() {
  const values = [
    {
      title: "Strategic Insights",
      description:
        "We empower businesses with innovative solutions that drive growth and success.",
    },
    {
      title: "Industry Experts",
      description:
        "Our team brings years of experience and diverse skills across multiple sectors.",
    },
    {
      title: "Client-Centric",
      description:
        "We work closely with clients to understand their unique needs and challenges.",
    },
    {
      title: "Excellence",
      description:
        "We value integrity, collaboration, and delivering services that exceed expectations.",
    },
  ];

  return (
    <section className="bg-ivory py-16 lg:py-24">
      <div className="container-x">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <Reveal direction="left" className="lg:col-span-6">
            <div className="space-y-4 leading-relaxed text-mute">
              <p>
                Our mission is to empower businesses and organizations by providing
                them with strategic insights and innovative solutions that drive
                growth and success. We believe in the power of knowledge and
                innovation, and we strive to stay at the forefront of industry
                trends and developments.
              </p>
              <p>
                Our team comprises industry experts with years of experience in
                their respective fields. They bring a wealth of knowledge and a
                diverse set of skills to our company, enabling us to offer a
                comprehensive suite of services that cater to the unique needs of
                our clients.
              </p>
              <p>
                We pride ourselves on our client-centric approach. We work closely
                with our clients to understand their needs and challenges.
              </p>
              <p>
                At our consultancy, we value integrity, collaboration, and
                excellence. We are committed to delivering high-quality services
                that exceed our clients&apos; expectations. We look forward to
                partnering with you on your journey towards success.
              </p>
            </div>
            <Link href="/contact" className="btn-primary glow-accent group mt-8">
              Get a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="reveal-child corp-card motion-card relative overflow-hidden p-6 shadow-luxe"
              >
                <span className="ghost-numeral absolute -right-1 -top-1 select-none text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <IconTile icon={valueIcons[index]} size="md" variant="solid" />
                  <h3 className="mt-5 text-lg font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{value.description}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
