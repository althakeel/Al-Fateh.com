import { expertiseIcons } from "@/data/sectionIcons";
import RevealStagger from "./RevealStagger";
import IconTile from "./IconTile";

export default function Expertise() {
  const areas = [
    {
      title: "Construction & Contracting",
      description:
        "Project costing and budget control. Materials, labor and subcontractor costs. Budget-versus-actual monitoring. Project profitability and cost variance analysis.",
    },
    {
      title: "Hospitals & Healthcare Facilities",
      description:
        "Departmental cost analysis. Operating expense monitoring. Medical supplies and consumables cost control. Service-line profitability analysis.",
    },
    {
      title: "Medical Clinics & Dental Centers",
      description:
        "Cost per consultation and treatment. Consumables and laboratory cost monitoring. Staff and operating cost analysis. Profitability by service or specialty.",
    },
    {
      title: "Car Showrooms & Automotive",
      description:
        "Vehicle acquisition and landed cost analysis. Profit margin per vehicle. Stock holding and inventory cost monitoring. Sales commissions and operating expense control.",
    },
    {
      title: "Restaurants & Hospitality",
      description:
        "Food and beverage costing. Recipe costing and wastage analysis. Labor and overhead control. Outlet-level profitability.",
    },
    {
      title: "Trading, Retail & Distribution",
      description:
        "Product costing and gross margins. Inventory and stock movement analysis. Supplier and purchasing cost analysis. Branch and product profitability.",
    },
    {
      title: "Manufacturing & Industrial",
      description:
        "Raw material and production costing. Labor and overhead allocation. Waste and variance analysis. Unit cost and product profitability.",
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
        <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-mute">
          Tailored cost analysis based on each sector’s operational model and
          available data. From understanding the cost of a treatment to measuring
          the margin earned on each vehicle. Other suitable sectors may include
          logistics, facilities management, professional services and other
          service businesses.
        </p>
      </div>
    </section>
  );
}
