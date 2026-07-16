"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HeroBannerVideoProps {
  fullBleed?: boolean;
}

export default function HeroBannerVideo({ fullBleed = false }: HeroBannerVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setPlaybackMode = () => {
      const prefersReduced = motionQuery.matches;
      setUseStatic(prefersReduced);
      const video = videoRef.current;
      if (!video) return;
      if (prefersReduced) {
        video.pause();
      } else {
        video.play().catch(() => setUseStatic(true));
      }
    };

    setPlaybackMode();
    motionQuery.addEventListener("change", setPlaybackMode);
    return () => motionQuery.removeEventListener("change", setPlaybackMode);
  }, []);

  const mediaClass = fullBleed
    ? "absolute inset-0 h-full w-full object-cover object-center"
    : "absolute inset-0 h-full w-full object-cover object-center";

  if (useStatic) {
    return (
      <Image
        src="/images/hero-banner-poster.jpg"
        alt=""
        fill
        priority
        className={mediaClass}
        sizes="100vw"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/hero-banner-poster.jpg"
      className={mediaClass}
      aria-hidden
    >
      <source src="/videos/hero-banner.mp4" type="video/mp4" />
    </video>
  );
}
