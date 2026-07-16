import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutPreview() {
  return (
    <section className="section-glass py-20 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="relative order-2 lg:order-1 lg:col-span-5">
            <div className="group relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/about-office.jpg"
                alt="Modern professional office interior"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/40 via-transparent to-transparent" />
            </div>
            <div className="corp-card motion-card absolute -bottom-5 -right-3 hidden px-5 py-4 sm:block lg:-right-6">
              <span className="icon-tile-accent-solid mb-3 inline-flex h-9 w-9 rounded-sm">
                <MapPin size={16} strokeWidth={1.75} aria-hidden />
              </span>
              <p className="text-2xl font-bold tracking-tight text-brand-700">UAE</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-mute">
                Based in Dubai
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="order-1 lg:order-2 lg:col-span-7">
            <p className="eyebrow text-accent-600">About Us</p>
            <div className="accent-bar mt-4" />
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Your Vision, Our Expertise
            </h2>
            <p className="mt-6 text-base leading-relaxed text-mute sm:text-lg">
              Our mission is to empower businesses and organizations by providing
              them with strategic insights and innovative solutions that drive
              growth and success. We believe in the power of knowledge and
              innovation, and we strive to stay at the forefront of industry trends
              and developments.
            </p>
            <p className="mt-5 text-base leading-relaxed text-mute sm:text-lg">
              We pride ourselves on our client-centric approach. We work closely
              with our clients to understand their needs and challenges. At our
              consultancy, we value integrity, collaboration, and excellence.
            </p>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:text-accent-600"
            >
              <Sparkles className="h-4 w-4 text-accent-500" />
              Learn more about us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
