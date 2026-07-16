"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/videos/hero-slide-1.mp4",
    poster: "/images/hero-poster-1.jpg",
    label: "Corporate advisory",
  },
  {
    src: "/videos/hero-slide-2.mp4",
    poster: "/images/hero-poster-2.jpg",
    label: "Advisory consultation",
  },
  {
    src: "/videos/hero-slide-3.mp4",
    poster: "/images/hero-poster-3.jpg",
    label: "Professional collaboration",
  },
  {
    src: "/videos/hero-slide-4.mp4",
    poster: "/images/hero-poster-4.jpg",
    label: "Strategic planning",
  },
] as const;

const SLIDE_DURATION_MS = 8000;

export default function HeroBannerSlideshow() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [useStatic, setUseStatic] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => setUseStatic(motionQuery.matches);
    updateMode();
    motionQuery.addEventListener("change", updateMode);
    return () => motionQuery.removeEventListener("change", updateMode);
  }, []);

  useEffect(() => {
    if (useStatic) return;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active) {
        video.currentTime = 0;
        video.play().catch(() => setUseStatic(true));
      } else {
        video.pause();
      }
    });
  }, [active, useStatic]);

  useEffect(() => {
    if (useStatic) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [useStatic]);

  if (useStatic) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={SLIDES[0].poster}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {SLIDES.map((slide, index) => {
        const isActive = index === active;
        return (
          <video
            key={slide.src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            muted
            playsInline
            preload={index <= 1 ? "auto" : "metadata"}
            poster={slide.poster}
            aria-hidden
            className={`hero-banner-slide absolute inset-0 h-full w-full object-cover object-center ${
              isActive ? "hero-banner-slide-active" : ""
            }`}
          >
            <source src={slide.src} type="video/mp4" />
          </video>
        );
      })}

      <div className="pointer-events-auto absolute bottom-8 right-6 z-20 flex items-center gap-3 sm:right-10 lg:bottom-10">
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show ${slide.label}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goToSlide(index)}
              className={`hero-banner-dot rounded-full transition-all duration-500 ${
                index === active
                  ? "h-1.5 w-8 bg-accent-400"
                  : "h-1.5 w-1.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 sm:inline">
          {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
