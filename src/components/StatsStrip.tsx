"use client";

import Image from "next/image";
import {
  LayoutGrid,
  Earth,
  Award,
  Users,
  type LucideIcon,
} from "lucide-react";
import RevealStagger from "./RevealStagger";

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "6", label: "Consultancy Areas", icon: LayoutGrid },
  { value: "UAE", label: "Based in Dubai", icon: Earth },
  { value: "Expert", label: "Industry Team", icon: Award },
  { value: "100%", label: "Client Focused", icon: Users },
];

export default function StatsStrip() {
  return (
    <section className="metric-band relative overflow-hidden text-white">
      <Image
        src="/images/network-metric.webp"
        alt=""
        aria-hidden
        fill
        className="object-cover opacity-[0.18] mix-blend-screen"
        sizes="100vw"
        priority={false}
      />
      <div className="metric-band-blob absolute -top-32 -right-24 h-[520px] w-[520px] animate-float-slower rounded-full opacity-70" />
      <div className="metric-band-blob absolute -bottom-40 -left-28 h-[380px] w-[380px] animate-float-slow rounded-full opacity-35" />
      <div className="metric-band-accent absolute inset-x-0 top-0 h-[3px]" />
      <div className="metric-band-accent absolute inset-x-0 bottom-0 h-px opacity-50" />

      <div className="container-x relative py-16 sm:py-20 lg:py-[5.25rem]">
        <RevealStagger className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-6 lg:gap-x-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="metric-item reveal-child group relative border-l-2 border-accent-500 pl-5 sm:pl-6"
              >
                <span className="absolute -top-1 left-3 text-accent-500 transition-transform duration-500 group-hover:-translate-y-0.5 sm:left-3.5">
                  <Icon size={16} strokeWidth={2} aria-hidden />
                </span>
                <div className="mt-7 text-[2.75rem] font-bold leading-none tracking-tight text-white tabular-nums sm:text-5xl md:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-3.5 max-w-[11rem] text-[10px] font-medium uppercase leading-relaxed tracking-[0.18em] text-white/72 sm:mt-4 sm:text-[11px]">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
