import {
  Compass,
  Lightbulb,
  Receipt,
  Ship,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

const items: { label: string; icon: LucideIcon }[] = [
  { label: "Accounting", icon: Receipt },
  { label: "Feasibility", icon: Compass },
  { label: "Maritime", icon: Ship },
  { label: "Innovation", icon: Lightbulb },
];

export default function CapabilitiesMarquee() {
  const loop = [...items, ...items];

  return (
    <Reveal as="section" className="relative -mt-4 overflow-hidden bg-transparent pb-6 pt-2 lg:-mt-6 lg:pb-8 lg:pt-0">
      <div className="container-x relative">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-mute">
          <span className="h-[2px] w-8 shrink-0 bg-accent-500" />
          Service Capabilities
        </div>

        <div className="marquee capabilities-marquee">
          <div className="marquee-track !gap-5">
            {loop.map((item, index) => {
              const Icon = item.icon;
              return (
                <span
                  key={`${item.label}-${index}`}
                  className="inline-flex h-[42px] w-max shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md border border-platinum bg-white px-4 text-sm font-medium text-[#3a4756] transition-all hover:border-accent-500 hover:text-accent-600 hover:shadow-luxe"
                >
                  <Icon
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-accent-500"
                    aria-hidden
                  />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
