"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicePath, visibleServices } from "@/data/services";
import { serviceShortLabels } from "@/data/serviceMedia";
import { serviceIconByTitle } from "@/data/sectionIcons";

const serviceLinks = visibleServices.map((service) => ({
  title: service.title,
  href: servicePath(service.title),
  label: serviceShortLabels[service.title] ?? service.title,
}));

interface IndicatorBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

let transitionFrom: string | null = null;
let transitionTo: string | null = null;

function enterClass(pathname: string) {
  if (typeof window === "undefined") return "service-enter-forward";

  if (transitionTo !== pathname) {
    transitionFrom = transitionTo;
    transitionTo = pathname;
  }

  const fromIndex = serviceLinks.findIndex((service) => service.href === transitionFrom);
  const toIndex = serviceLinks.findIndex((service) => service.href === pathname);
  const backward = fromIndex >= 0 && toIndex >= 0 && toIndex < fromIndex;
  return backward ? "service-enter-back" : "service-enter-forward";
}

export default function ServiceFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeIndex = Math.max(
    0,
    serviceLinks.findIndex((service) => service.href === pathname)
  );
  const directionClass = enterClass(pathname);

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [indicator, setIndicator] = useState<IndicatorBox | null>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const item = itemRefs.current[activeIndex];
    if (!nav || !item) return;

    const measure = () => {
      const navRect = nav.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      setIndicator({
        x: itemRect.left - navRect.left,
        y: itemRect.top - navRect.top,
        width: itemRect.width,
        height: itemRect.height,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activeIndex, pathname]);

  return (
    <div className="bg-ivory pt-28">
      <nav aria-label="Services" className="sticky top-28 z-40 border-b border-brand-900/10 bg-ivory">
        <div className="container-x lg:overflow-x-auto [scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
        <div ref={navRef} className="relative">
          {indicator && (
            <span
              aria-hidden
              className="service-indicator pointer-events-none absolute z-0 bg-accent-500/10"
              style={{
                width: indicator.width,
                height: indicator.height,
                transform: `translate(${indicator.x}px, ${indicator.y}px)`,
                boxShadow: "inset 0 -2px 0 #c89d44",
              }}
            />
          )}
          <div className="grid grid-cols-2 lg:flex">
            {serviceLinks.map((service, index) => {
              const Icon = serviceIconByTitle[service.title];
              const active = index === activeIndex;
              const mobileLastRow = Math.floor((serviceLinks.length - 1) / 2) * 2;
              const edge = index % 2 === 0 && index < serviceLinks.length - 1;
              const stacked = index < mobileLastRow;
              const divided = index < serviceLinks.length - 1;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-10 flex items-center justify-center gap-2 border-brand-900/10 px-3 py-4 text-center lg:flex-1 ${
                    edge ? "border-e" : ""
                  } ${stacked ? "border-b lg:border-b-0" : ""} ${
                    divided ? "lg:border-e" : "lg:border-e-0"
                  } ${active ? "text-brand-900" : "text-brand-900/70 hover:text-brand-900"}`}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0 text-accent-500" strokeWidth={1.75} aria-hidden />}
                  <span className="text-[10px] font-bold uppercase tracking-[0.06em] lg:text-[11px]">
                    {service.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        </div>
      </nav>

      <div key={pathname} className={directionClass}>
        {children}
      </div>
    </div>
  );
}
