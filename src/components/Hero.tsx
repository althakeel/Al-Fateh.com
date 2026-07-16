import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  LayoutGrid,
  Earth,
  Users,
  Zap,
  Award,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-frost pt-28 pb-10 lg:min-h-[92vh] lg:pt-32 lg:pb-12">
      <div className="pointer-events-none absolute inset-0 pattern-nodes opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-10 h-[420px] w-[420px] animate-float-slower rounded-full bg-[radial-gradient(circle,rgba(200,157,68,0.2),transparent_65%)]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-[320px] w-[320px] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(200,157,68,0.12),transparent_70%)]" />

      <div className="pointer-events-none absolute bottom-24 left-3 z-20 hidden origin-left -rotate-90 lg:block xl:left-5">
        <p className="hero-side-label whitespace-nowrap text-[10px] font-semibold uppercase text-mute">
          Dubai · UAE &nbsp;·&nbsp; Al FATEH
        </p>
      </div>

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-6 xl:col-span-6">
            <div
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-platinum bg-ivory px-3.5 py-1.5 shadow-sm"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-500" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent-500" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
                Consultation Services · Dubai · UAE
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-ink sm:text-5xl xl:text-[3.35rem]">
              <span className="animate-fade-up inline-block" style={{ animationDelay: "0.15s" }}>
                Strategic Insights.
              </span>{" "}
              <span
                className="animate-fade-up inline-block"
                style={{ animationDelay: "0.28s" }}
              >
                <span className="hero-accent-text">Innovative Solutions.</span>
              </span>{" "}
              <span className="animate-fade-up inline-block" style={{ animationDelay: "0.4s" }}>
                Lasting Success.
              </span>
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-lg text-base leading-relaxed text-mute sm:text-lg"
              style={{ animationDelay: "0.52s" }}
            >
              Expert consultancy in feasibility studies, maritime, media, human
              resources, artificial intelligence, and project development.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "0.64s" }}
            >
              <Link
                href="/contact"
                className="btn-primary hero-cta-pulse group"
                style={{ animationDelay: "0.64s" }}
              >
                Get a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="btn-outline-dark animate-fade-up group"
                style={{ animationDelay: "0.74s" }}
              >
                Our Services
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3">
              {[
                { value: "6", label: "Consultancy Areas", icon: LayoutGrid },
                { value: "UAE", label: "Based in Dubai", icon: Earth },
                { value: "100%", label: "Client Focused", icon: Users },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="motion-card hero-stat-float relative border border-platinum bg-ivory px-3 py-3.5 shadow-luxe sm:px-4"
                    style={{ animationDelay: `${0.8 + i * 0.14}s` }}
                  >
                    <Icon
                      className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-accent-500"
                      strokeWidth={1.75}
                    />
                    <p className="text-lg font-bold tracking-tight text-ink sm:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-mute sm:text-[10px]">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="animate-scale-in relative lg:col-span-6"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="hero-frame pointer-events-none absolute -left-3 -top-3 h-16 w-16 border-2 border-accent-500" />
            <div className="hero-frame-delay pointer-events-none absolute -bottom-3 -right-3 h-12 w-12 border border-accent-500/50" />

            <div className="hero-media group relative overflow-hidden border border-platinum bg-ivory shadow-[0_28px_60px_-28px_rgba(17,19,21,0.35)]">
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
                <Image
                  src="/images/hero-desk.jpg"
                  alt="Professional consultancy workspace"
                  fill
                  priority
                  className="hero-media-img object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/20 via-transparent to-transparent" />
              </div>

              <div
                className="hero-overlay-chip absolute left-4 top-4 inline-flex items-center gap-2 border border-white/70 bg-ivory/95 px-3 py-1.5 shadow-sm backdrop-blur-sm"
                style={{ animationDelay: "0.85s" }}
              >
                <Zap className="h-3.5 w-3.5 text-accent-500" strokeWidth={2} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                  Consultation Services
                </span>
              </div>

              <div
                className="hero-overlay-card absolute right-4 top-4 max-w-[200px] border border-white/10 bg-carbon px-4 py-3 shadow-luxe"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent-400" strokeWidth={1.75} />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-400">
                    Client Focused
                  </p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  Expert Industry Team
                </p>
              </div>

              <div
                className="hero-overlay-card absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[240px]"
                style={{ animationDelay: "1.15s" }}
              >
                <div className="flex overflow-hidden border border-platinum bg-ivory/95 shadow-luxe backdrop-blur-sm">
                  <span className="w-1 shrink-0 bg-accent-500" />
                  <div className="px-4 py-3">
                    <p className="text-sm font-bold text-ink">6 Consultancy Areas</p>
                    <p className="mt-1 text-xs leading-relaxed text-mute">
                      Feasibility studies, maritime, media, human resources,
                      artificial intelligence, and project development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
