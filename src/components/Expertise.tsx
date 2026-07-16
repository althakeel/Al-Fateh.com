import { expertiseIcons } from "@/data/sectionIcons";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

export default function Expertise() {
  const areas = [
    {
      title: "Strategic Planning",
      description:
        "We help organizations define clear objectives, assess market opportunities, and build actionable roadmaps for sustainable growth across the UAE and wider region.",
    },
    {
      title: "Sector-Specific Advisory",
      description:
        "From maritime operations to media campaigns and AI adoption, our consultants bring deep domain expertise tailored to your industry challenges.",
    },
    {
      title: "Feasibility & Risk Analysis",
      description:
        "Make informed investment decisions with comprehensive feasibility studies, cost-benefit analysis, and risk assessments before you commit resources.",
    },
    {
      title: "Organizational Development",
      description:
        "Strengthen your human capital and project management capabilities with structured HR strategies, training programs, and performance systems.",
    },
    {
      title: "Innovation & Digital Transformation",
      description:
        "Leverage artificial intelligence and emerging technologies to modernize operations, improve decision-making, and stay ahead of industry trends.",
    },
    {
      title: "UAE Market Insight",
      description:
        "Based in Dubai at Al Saqr Business Tower, we understand the local business landscape and regulatory environment, giving your projects a strategic home-ground advantage.",
    },
  ];

  return (
    <section className="bg-frost py-16 lg:py-24">
      <div className="container-x">
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => {
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={area.title}
                className="reveal-child corp-card group relative overflow-hidden p-6 md:p-8 shadow-luxe"
              >
                <span className="ghost-numeral absolute -right-1 -top-2 select-none text-7xl">
                  {num}
                </span>
                <div className="relative">
                  <IconTile icon={expertiseIcons[index]} size="lg" variant="solid" />
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">
                    Focus / {num}
                  </p>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-ink">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">
                    {area.description}
                  </p>
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
