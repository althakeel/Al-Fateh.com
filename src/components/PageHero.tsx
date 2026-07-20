import type { ReactNode } from "react";
import Image from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string | null;
  imageAlt?: string;
  imagePosition?: string;
  /** cover = fill panel; contain = letterbox for logos */
  imageFit?: "cover" | "contain";
  imageBg?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image = null,
  imageAlt = "",
  imagePosition = "object-center",
  imageFit = "cover",
  imageBg = "bg-frost",
}: PageHeroProps) {
  const isContain = imageFit === "contain";
  const fitClass = isContain ? "object-contain" : "object-cover";
  const hasImage = Boolean(image);

  return (
    <section className="page-hero overflow-x-hidden border-b border-platinum bg-ivory pt-24 lg:pt-32">
      <div
        className={
          hasImage
            ? "lg:grid lg:min-h-[280px] lg:grid-cols-2 lg:items-stretch xl:min-h-[300px]"
            : undefined
        }
      >
        <div
          className={`container-x flex items-center py-6 sm:py-8 lg:py-10 xl:py-12 ${
            hasImage ? "lg:pl-16 lg:pr-10 xl:pl-24 xl:pr-14" : ""
          }`}
        >
          <div
            className={`w-full max-w-xl ${
              hasImage ? "lg:ml-auto lg:max-w-lg xl:max-w-xl" : ""
            }`}
          >
            {eyebrow && (
              <div className="animate-fade-up flex items-center gap-3">
                <span className="h-0.5 w-8 bg-accent-500" />
                <p className="eyebrow text-accent-600">{eyebrow}</p>
              </div>
            )}
            <h1 className="animate-fade-up-delay-1 mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:mt-5 lg:text-[2.1rem] lg:leading-[1.14] xl:text-[2.45rem]">
              {title}
            </h1>
            {description &&
              (typeof description === "string" ? (
                <p className="animate-fade-up-delay-2 mt-4 max-w-lg text-base leading-relaxed text-mute sm:text-[16px] sm:leading-7 lg:mt-5">
                  {description}
                </p>
              ) : (
                <div className="animate-fade-up-delay-2 mt-4 lg:mt-5">
                  {description}
                </div>
              ))}
          </div>
        </div>

        {hasImage && (
          <div
            className={`page-hero-media relative w-full ${imageBg} ${
              isContain ? "page-hero-media--contain" : "page-hero-media--cover"
            }`}
          >
            <div className="page-hero-media__frame relative aspect-[16/9] w-full sm:aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src={image!}
                alt={imageAlt}
                fill
                priority
                quality={90}
                unoptimized={isContain}
                className={`${fitClass} ${imagePosition}`}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="page-hero-media__fade pointer-events-none absolute inset-0" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
