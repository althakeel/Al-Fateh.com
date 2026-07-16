import type { ReactNode } from "react";
import Image from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image = "/images/page-hero.jpg",
  imageAlt = "",
  imagePosition = "object-center",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-platinum bg-frost pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block xl:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={95}
            className={`object-cover ${imagePosition}`}
            sizes="50vw"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-frost to-transparent" />
        </div>
      </div>

      <div className="container-x relative">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl">
          {eyebrow && (
            <div className="animate-fade-up flex items-center gap-3">
              <span className="h-0.5 w-8 bg-accent-500" />
              <p className="eyebrow text-accent-600">{eyebrow}</p>
            </div>
          )}
          <h1 className="animate-fade-up-delay-1 mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          {description && (
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="container-x relative mt-8 lg:hidden">
        <div className="relative aspect-[16/10] overflow-hidden border border-platinum shadow-luxe">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={95}
            className={`object-cover ${imagePosition}`}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
