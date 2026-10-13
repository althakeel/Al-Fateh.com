import Image from "next/image";
import { teamMembers, type TeamMember } from "@/data/team";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";

const [lead, ...rest] = teamMembers;

function MemberHoverCard({ member }: { member: TeamMember }) {
  if (!member.name) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-3 bg-carbon/95 px-3 py-3.5 text-center opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:px-4 sm:py-4">
      <p className="text-[11px] font-bold uppercase leading-snug tracking-[0.04em] text-white sm:text-sm">
        {member.name}
      </p>
      {member.role && (
        <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55 sm:text-[10px]">
          {member.role}
        </p>
      )}
    </div>
  );
}

export default function Team() {
  const side = rest.slice(0, 4);
  const below = rest.slice(4);

  return (
    <section className="relative overflow-hidden bg-ivory py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 pattern-nodes opacity-20" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <Reveal>
            <p className="eyebrow text-accent-600">Our Team</p>
            <div className="accent-bar mt-4" />
            <h2 className="mt-5 whitespace-nowrap text-[clamp(1rem,4.4vw,3rem)] font-bold leading-none tracking-tight text-ink">
              The Experts Behind Al FATEH
            </h2>
          </Reveal>
          <Reveal delay={100} className="max-w-sm lg:pb-1">
            <p className="text-base leading-relaxed text-mute">
              Industry specialists united by a shared commitment to integrity,
              collaboration, and results that last.
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 lg:mt-14 lg:gap-4">
          <div className="reveal-child group relative col-span-2 row-span-2 min-h-[300px] overflow-hidden border border-platinum bg-frost sm:min-h-[380px] lg:min-h-[520px]">
            <Image
              src={lead.image}
              alt={lead.alt}
              fill
              priority
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-12 border-l-2 border-t-2 border-accent-500" />
            <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-12 w-12 border-b-2 border-r-2 border-accent-500 transition-opacity duration-500 group-hover:opacity-0" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition duration-500 group-hover:ring-accent-500/45" />
            <MemberHoverCard member={lead} />
          </div>

          {side.map((member, index) => (
            <div
              key={member.image}
              className="reveal-child group relative aspect-[4/5] overflow-hidden border border-platinum bg-frost"
            >
              <Image
                src={member.image}
                alt={member.alt}
                fill
                priority={index < 2}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition duration-500 group-hover:ring-accent-500/45" />
              <MemberHoverCard member={member} />
            </div>
          ))}

          {below.map((member) => (
            <div
              key={member.image}
              className="reveal-child group relative aspect-[4/5] overflow-hidden border border-platinum bg-frost"
            >
              <Image
                src={member.image}
                alt={member.alt}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition duration-500 group-hover:ring-accent-500/45" />
              <MemberHoverCard member={member} />
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
