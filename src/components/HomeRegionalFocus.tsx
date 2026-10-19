import Image from "next/image";
import Link from "next/link";
import { Gem } from "lucide-react";
import Reveal from "./Reveal";

export default function HomeRegionalFocus() {
  return (
    <section className="section-glass py-12 lg:py-16">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="relative lg:col-span-6">
            <div className="group relative aspect-[16/10] overflow-hidden shadow-[0_24px_60px_rgba(17,19,21,0.12)]">
              <Image
                src="/images/studio/Home_New.jpg"
                alt="Al FATEH advisors meeting in the office"
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
              A trusted UAE business partner
            </h2>
            <p className="mt-6 text-base leading-relaxed text-mute sm:text-lg">
              From Al Saqr Business Tower we help businesses turn financial
              complexity into clarity, protect profits, unlock opportunities and
              grow sustainably.
            </p>
            <p className="mt-5 text-base leading-relaxed text-mute sm:text-lg">
              The work covers corporate tax, outsourced accounting, cost control
              and business advisory, within applicable UAE rules.
            </p>

            <Link href="/contact" className="btn-primary glow-accent mt-8">
              Get a Consultation
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
