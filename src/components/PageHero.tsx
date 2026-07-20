import type { ReactNode } from "react";
import Image from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  image?: string | null;
  imageAlt?: string;
  imagePosition?: string;
  /** cover = crop to fill; contain = letterbox; fill = stretch to banner bounds */
  imageFit?: "cover" | "contain" | "fill";
  imageBg?: string;
  /** Tailwind aspect class for contain frames */
  imageAspect?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image = null,
  imageAlt = "",
  imagePosition = "object-center",
  imageFit = "cover",
  imageBg = "bg-ivory",
  imageAspect,
}: PageHeroProps) {
  const fitClass =
    imageFit === "contain"
      ? "object-contain"
      : imageFit === "fill"
        ? "object-fill"
        : "object-cover";
  const isContain = imageFit === "contain";
  const isFill = imageFit === "fill";
  const containAspect = imageAspect ?? "aspect-[22/7]";
  const mobileAspect = isContain
    ? containAspect
    : isFill
      ? imageAspect ?? "aspect-[2/1]"
      : "aspect-[16/10]";
  const hasImage = Boolean(image);

  return (
    <section className="relative overflow-hidden border-b border-platinum bg-frost pt-32 pb-16 lg:pt-40 lg:pb-24">
      {hasImage && (
        <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:flex xl:w-[58%]">
          {isContain ? (
            <div className={`flex w-full items-center justify-center ${imageBg} px-4`}>
              <div className={`relative w-full max-w-none overflow-hidden ${containAspect} ${imageBg}`}>
                <Image
                  src={image!}
                  alt={imageAlt}
                  fill
                  priority
                  quality={95}
                  unoptimized
                  className={`${fitClass} ${imagePosition}`}
                  sizes="58vw"
                />
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full">
              {isFill ? (
                <div
                  className={`absolute inset-0 bg-center bg-no-repeat ${imageBg} ${
                    imageAspect ? "bg-contain" : "bg-[length:100%_100%]"
                  }`}
                  style={{ backgroundImage: `url("${image}")` }}
                  role={imageAlt ? "img" : undefined}
                  aria-label={imageAlt || undefined}
                />
              ) : (
                <>
                  <Image
                    src={image!}
                    alt={imageAlt}
                    fill
                    priority
                    quality={95}
                    className={`${fitClass} ${imagePosition}`}
                    sizes="58vw"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-frost to-transparent" />
                </>
              )}
            </div>
          )}
        </div>
      )}

      <div className="container-x relative">
        <div className={`max-w-xl lg:max-w-xl ${hasImage ? "xl:max-w-2xl" : "xl:max-w-4xl"}`}>
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

      {hasImage && (
        <div className="container-x relative mt-8 lg:hidden">
          <div
            className={`relative overflow-hidden border border-platinum shadow-luxe ${imageBg} ${mobileAspect}`}
          >
            {isFill ? (
              <div
                className={`absolute inset-0 bg-center bg-no-repeat ${imageBg} ${
                  imageAspect ? "bg-contain" : "bg-[length:100%_100%]"
                }`}
                style={{ backgroundImage: `url("${image}")` }}
                role={imageAlt ? "img" : undefined}
                aria-label={imageAlt || undefined}
              />
            ) : (
              <Image
                src={image!}
                alt={imageAlt}
                fill
                priority
                quality={95}
                unoptimized={isContain}
                className={`${fitClass} ${imagePosition}`}
                sizes="100vw"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
