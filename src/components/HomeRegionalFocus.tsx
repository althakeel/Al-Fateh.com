import Image from "next/image";
import Link from "next/link";
import { Earth, LayoutGrid, Users, Gem } from "lucide-react";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";

const stats = [
  { value: "6", label: "Consultancy Areas", icon: LayoutGrid },
  { value: "UAE", label: "Based in Dubai", icon: Earth },
  { value: "Expert", label: "Industry Team", icon: Users },
];

export default function HomeRegionalFocus() {
  return (
    <section className="section-glass py-20 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="relative lg:col-span-6">
            <div className="group relative aspect-[16/10] overflow-hidden shadow-[0_24px_60px_rgba(17,19,21,0.12)]">
              <Image
                src="/images/regional-insight.jpg"
                alt="Consultants reviewing business analysis and strategic documents"
                fill
                className="animate-ken-burns object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-frost/90 via-frost/20 to-transparent" />
              <div className="absolute inset-0 bg-brand-900/10" />
              <div className="absolute -top-8 right-1/3 hidden h-16 w-16 animate-spin-slow opacity-70 md:block">
                <Gem className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-accent-500" />
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="lg:col-span-6">
            <p className="eyebrow text-accent-600">Regional Focus</p>
            <div className="accent-bar mt-4" />
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              UAE Market Insight
            </h2>
            <p className="mt-6 text-base leading-relaxed text-mute sm:text-lg">
              Our team comprises industry experts with years of experience in
              their respective fields. They bring a wealth of knowledge and a
              diverse set of skills to our company, enabling us to offer a
              comprehensive suite of services that cater to the unique needs of
              our clients.
            </p>
            <p className="mt-5 text-base leading-relaxed text-mute sm:text-lg">
              Based in Dubai at Al Saqr Business Tower, we understand the local
              business landscape and regulatory environment, giving your projects
              a strategic home-ground advantage.
            </p>

            <RevealStagger className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="reveal-child corp-card motion-card px-4 py-4"
                  >
                    <span className="icon-tile h-8 w-8 rounded-sm">
                      <Icon size={16} strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="mt-3 text-xl font-bold tracking-tight text-ink">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-mute">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </RevealStagger>

            <Link href="/contact" className="btn-primary glow-accent mt-8">
              Get a Consultation
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
