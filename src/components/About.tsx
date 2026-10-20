import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  ChartColumn,
  Compass,
  Handshake,
  Receipt,
  Target,
  Users,
} from "lucide-react";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";

const statements = [
  {
    label: "Our mission",
    text: "To help businesses keep more of what they earn through smart Corporate Tax planning, reliable accounting outsourcing and strategic business advisory.",
    icon: Target,
  },
  {
    label: "Our vision",
    text: "To be a trusted UAE business partner, turning financial complexity into clarity and helping companies protect profits, unlock opportunities and grow sustainably.",
    icon: Users,
  },
  {
    label: "Our promise",
    text: "Practical, tailored support that helps businesses understand their numbers, manage obligations, control costs and make better decisions.",
    icon: Handshake,
  },
];

const values = [
  {
    title: "Corporate Tax",
    description: "Tax obligations, planning and compliance support.",
    icon: Receipt,
  },
  {
    title: "Outsourced Finance",
    description: "Accounting and structured financial reporting.",
    icon: Calculator,
  },
  {
    title: "Cost Control",
    description: "Clearer visibility into costs and performance.",
    icon: ChartColumn,
  },
  {
    title: "Business Advisory",
    description: "Business analysis and decision support.",
    icon: Compass,
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Keep More of
            <br />
            What You Earn.
          </>
        }
        description="A practical finance partner for business growth across tax, accounting, cost control and business advisory."
        image="/images/studio/Corporate Tax (bg) new.jpg"
        imageAlt="Corporate tax documents and financial records on a desk"
        imagePosition="object-center"
      />

      <section className="overflow-hidden bg-ivory py-16 lg:py-24">
        <div className="container-x grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-5">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/studio/finance partner(new).jpg"
                alt="Business partners reviewing financial information together"
                fill
                className="about-photo object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <h2 className="max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-brand-900 sm:text-5xl">
                A practical finance partner for business growth
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
                Practical, tailored support that helps businesses understand
                their numbers, manage obligations, control costs and make better
                decisions.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <Link href="/contact" className="btn-primary glow-accent group mt-10">
                Get a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative min-h-[520px] overflow-hidden lg:min-h-[560px]">
        <Image
          src="/images/studio/BG (About).jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-900/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/55 via-brand-900/25 to-brand-900/40" />
        <div className="container-x relative z-10 flex min-h-[520px] items-center py-16 lg:min-h-[560px] lg:py-24">
          <div className="grid w-full items-stretch gap-5 md:grid-cols-3 md:gap-6">
            {statements.map((statement) => {
              const Icon = statement.icon;
              return (
                <article
                  key={statement.label}
                  className="flex h-full flex-col rounded-[22px] border border-white/20 bg-white/10 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent-500/55 bg-accent-500/20 text-accent-400">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="text-2xl font-bold leading-none text-white">{statement.label}</h3>
                  </div>
                  <p className="text-base leading-8 text-white/80 sm:text-[17px]">{statement.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16 text-white lg:py-20">
        <div className="container-x">
          <RevealStagger className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="reveal-child flex h-full min-h-[220px] flex-col border border-white/15 bg-white/[0.04] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-colors duration-300 hover:border-accent-500/60 hover:bg-white/[0.07] sm:p-7"
                >
                  <span className="mb-6 flex h-12 w-12 items-center justify-center border border-accent-500/45 bg-accent-500/10 text-accent-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                    {value.title}
                  </h3>
                  <span className="mt-3 block h-px w-10 bg-accent-500" />
                  <p className="mt-4 text-sm leading-6 text-white/70">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
