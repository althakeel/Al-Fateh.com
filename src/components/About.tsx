import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Users } from "lucide-react";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";

const statements = [
  {
    label: "Our mission",
    text: "Our mission is to empower businesses and organizations by providing them with strategic insights and innovative solutions that drive growth and success. We believe in the power of knowledge and innovation, and we strive to stay at the forefront of industry trends and developments.",
    icon: Target,
  },
  {
    label: "Our team",
    text: "Our team comprises industry experts with years of experience in their respective fields. They bring a wealth of knowledge and a diverse set of skills to our company, enabling us to offer a comprehensive suite of services that cater to the unique needs of our clients.",
    icon: Users,
  },
];

const values = [
  {
    title: "Strategic Insight",
  },
  {
    title: "Industry Experts",
  },
  {
    title: "Client-Centric",
  },
  {
    title: "Excellence",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Strategic Insights.
            <br />
            Innovative Solutions.
            <br />
            Lasting Success.
          </>
        }
        description="Expert consultancy in feasibility studies, maritime, media, human resources, artificial intelligence, and project development."
        image="/images/brand-logo-dark.png"
        imageAlt="Al FATEH brand logo"
        imageFit="contain"
        imageBg="bg-frost"
        imagePosition="object-center"
      />

      <section className="overflow-hidden bg-ivory py-16 lg:py-24">
        <div className="container-x grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-5">
            <div className="relative h-full min-h-[320px] overflow-hidden lg:min-h-[420px]">
              <Image
                src="/images/about-office.jpg"
                alt="Al FATEH office"
                fill
                className="about-photo object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <h2 className="max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-brand-900 sm:text-5xl">
                Your Vision, Our Expertise
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
                Our mission is to empower businesses and organizations by
                providing them with strategic insights and innovative solutions
                that drive growth and success. We believe in the power of
                knowledge and innovation, and we strive to stay at the forefront
                of industry trends and developments.
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
          src="/images/regional-insight.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-900/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/55 via-brand-900/25 to-brand-900/40" />
        <div className="container-x relative z-10 flex min-h-[520px] items-center py-16 lg:min-h-[560px] lg:py-24">
          <div className="grid w-full items-stretch gap-5 md:grid-cols-2 md:gap-6">
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
          <RevealStagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {values.map((value) => (
              <article key={value.title} className="reveal-child">
                <h3 className="text-xl font-bold tracking-tight">{value.title}</h3>
                <span className="mt-4 block h-px w-10 bg-accent-500" />
              </article>
            ))}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
