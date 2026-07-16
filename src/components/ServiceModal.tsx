"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";
import type { ServiceOffering } from "@/data/services";
import Logo from "@/components/Logo";

interface ServiceModalProps {
  service: ServiceOffering;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="animate-fade-in absolute inset-0 bg-carbon/70 backdrop-blur-sm" onClick={onClose} aria-label="Close modal" />

      <div className="animate-scale-in relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-platinum bg-ivory shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-platinum bg-ivory/95 px-6 py-4 backdrop-blur-md">
          <Logo linked={false} variant="default" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-platinum text-mute transition-colors hover:border-ink hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="accent-bar" />
          <h2 className="mt-4 text-xl font-bold text-ink">{service.title}</h2>
          <p className="mt-4 leading-relaxed text-mute">{service.description}</p>

          <h3 className="eyebrow mt-8 text-accent-600">What We Offer</h3>
          <ul className="mt-4 space-y-3">
            {service.offerings.map((offering) => {
              const colonIndex = offering.indexOf(":");
              const label = colonIndex > -1 ? offering.slice(0, colonIndex) : offering;
              const detail = colonIndex > -1 ? offering.slice(colonIndex + 1).trim() : "";

              return (
                <li key={offering} className="corp-card flex gap-3 p-4">
                  <span className="icon-tile-accent-solid mt-0.5 inline-flex h-6 w-6 shrink-0 rounded-sm">
                    <Check size={14} strokeWidth={2.5} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    {detail && <p className="mt-1 text-sm text-mute">{detail}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
