"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/images/studio/practical finance partner (new ) homepage.png",
    alt: "Business partners shaking hands beside financial technology",
    position: "object-center",
  },
  {
    src: "/images/studio/Home page(new).png",
    alt: "Business partners collaborating across finance and technology",
    position: "object-center",
  },
] as const;

const INTERVAL_MS = 10000;

export default function HeroMediaSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, active]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setPaused(false);
        }
      }}
      aria-roledescription="carousel"
      aria-label="Al FATEH"
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${(index - active) * 100}%)` }}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            fill
            priority={index === 0}
            className={`object-cover ${slide.position} ${index === active ? "hero-media-img" : ""}`}
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/25 via-transparent to-transparent" />

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show photo ${index + 1} of ${SLIDES.length}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-500 ${
              index === active ? "h-2.5 w-8 bg-white" : "h-2.5 w-2.5 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
