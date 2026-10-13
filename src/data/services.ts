export interface ServiceSection {
  label: string;
  detail?: string;
  aside?: string;
  note?: string;
  points?: string[];
  groups?: ServiceSection[];
}

export interface ServiceOffering {
  title: string;
  description: string;
  plain?: string;
  note?: string;
  offerings: ServiceSection[];
  industryIntro?: string[];
  industries?: ServiceSection[];
  industryNote?: string;
}

const accountingLines: ServiceOffering[] = [
  {
    title: "Corporate Tax & Tax Advisory",
    description:
      "Helping businesses understand their obligations and make informed tax decisions under UAE regulations.",
    note: "All tax work must remain within applicable UAE rules and any required professional authorization.",
    offerings: [
      {
        label: "Compliance & Reporting",
        points: [
          "Corporate Tax compliance support",
          "Tax-related financial reporting",
          "Record readiness and documentation reviews",
          "Filing coordination, where within the agreed scope",
        ],
      },
      {
        label: "Planning & Risk Management",
        points: [
          "Corporate Tax impact assessments",
          "Tax health checks and risk identification",
          "Business transaction and structure considerations",
          "Legitimate tax efficiency and after-tax profitability analysis",
        ],
      },
    ],
  },
  {
    title: "Outsourced Finance & Accounting",
    description:
      "Flexible finance support for businesses that want professional accounting without carrying the full overhead of an in-house team.",
    note: "Service scope can range from selected accounting tasks to an agreed outsourced finance function.",
    offerings: [
      {
        label: "Managed Accounting Services",
        points: [
          "Day-to-day bookkeeping and transaction recording",
          "Accounts payable and receivable support",
          "Bank and balance sheet reconciliations",
          "Month-end and year-end close support",
        ],
      },
      {
        label: "Reporting & Finance Operations",
        points: [
          "Monthly management accounts and financial reports",
          "Cash flow tracking and working capital insights",
          "Finance process and system improvements",
          "Customized ongoing finance function support",
        ],
      },
    ],
  },
  {
    title: "Cost Accounting & Cost Control",
    description: "Control Your Costs. Improve Your Profitability.",
    offerings: [
      {
        label: "Understand Costs",
        detail:
          "Assess cost structures and calculate costs by product, service, treatment, vehicle or project.",
      },
      {
        label: "Control Spending",
        detail:
          "Track actual results against budgets, review variances and identify avoidable costs.",
      },
      {
        label: "Improve Margins",
        detail:
          "Analyze pricing, gross margin, break-even points and business-unit profitability.",
      },
      {
        label: "Core service capabilities",
        points: [
          "Cost structure assessment and cost allocation",
          "Budgeting, forecasting and variance analysis",
          "Cost-control procedures and management reports",
          "Pricing, margin and break-even analysis",
        ],
      },
    ],
    industryIntro: [
      "Tailored cost analysis based on each sector’s operational model and available data.",
      "From understanding the cost of a treatment to measuring the margin earned on each vehicle.",
      "An adaptable framework for inventory-heavy, production-based and service-oriented businesses.",
    ],
    industries: [
      {
        label: "Construction & Contracting",
        points: [
          "Project costing and budget control",
          "Materials, labor and subcontractor costs",
          "Budget-versus-actual monitoring",
          "Project profitability and cost variance analysis",
        ],
      },
      {
        label: "Hospitals & Healthcare Facilities",
        points: [
          "Departmental cost analysis",
          "Operating expense monitoring",
          "Medical supplies and consumables cost control",
          "Service-line profitability analysis",
        ],
      },
      {
        label: "Medical Clinics & Dental Centers",
        points: [
          "Cost per consultation and treatment",
          "Consumables and laboratory cost monitoring",
          "Staff and operating cost analysis",
          "Profitability by service or specialty",
        ],
      },
      {
        label: "Car Showrooms & Automotive",
        points: [
          "Vehicle acquisition and landed cost analysis",
          "Profit margin per vehicle",
          "Stock holding and inventory cost monitoring",
          "Sales commissions and operating expense control",
        ],
      },
      {
        label: "Restaurants & Hospitality",
        points: [
          "Food and beverage costing",
          "Recipe costing and wastage analysis",
          "Labor and overhead control",
          "Outlet-level profitability",
        ],
      },
      {
        label: "Trading, Retail & Distribution",
        points: [
          "Product costing and gross margins",
          "Inventory and stock movement analysis",
          "Supplier and purchasing cost analysis",
          "Branch and product profitability",
        ],
      },
      {
        label: "Manufacturing & Industrial",
        points: [
          "Raw material and production costing",
          "Labor and overhead allocation",
          "Waste and variance analysis",
          "Unit cost and product profitability",
        ],
      },
    ],
    industryNote:
      "Other suitable sectors may include logistics, facilities management, professional services and other service businesses.",
  },
  {
    title: "Business Strategy & Market Advisory",
    description:
      "Helping owners understand their position, assess opportunities and choose a clearer direction for growth.",
    note: "Research methods and deliverables should be agreed clearly, including whether analysis uses published data, client records or primary research.",
    offerings: [
      {
        label: "Business Assessment & Market Insight",
        points: [
          "SWOT analysis and business assessment",
          "Market and industry research",
          "Competitor analysis and market positioning",
          "Customer, product and service performance review",
        ],
      },
      {
        label: "Planning & Growth Advisory",
        points: [
          "Strategic planning and growth priorities",
          "Business performance and profitability analysis",
          "Opportunity assessment and decision support",
          "Practical recommendations aligned to business goals",
        ],
      },
    ],
  },
];

const costLine = accountingLines.find((line) => line.title === "Cost Accounting & Cost Control");

export const services: ServiceOffering[] = [
  {
    title: "Accounting Services",
    description: "Corporate Tax | Accounting | Cost Control | Business Advisory",
    offerings: accountingLines.map((line) => ({
      label: line.title,
      detail: line.description,
      note: line.note,
      groups: line.offerings,
    })),
    industryIntro: costLine?.industryIntro,
    industries: costLine?.industries,
    industryNote: costLine?.industryNote,
  },
  {
    title: "Feasibility Studies Consultancy",
    description:
      "Before capital is committed, we test whether a project can stand commercially and financially. The study covers the market, the cost, the risks and the return, and ends with a recommendation to proceed, revise or stop.",
    offerings: [
      {
        label: "Market Potential Analysis",
        detail:
          "We judge demand against the audience you can reach and the competitors already there, so the project is sized to a market that can support it, not to a hopeful total.",
      },
      {
        label: "Cost-Benefit Analysis",
        detail:
          "The likely cost is set beside the return the project can reasonably support. Assumptions are written on the page, so you can see what the result depends on.",
      },
      {
        label: "Risk Assessment",
        detail:
          "Each material risk is named, with what it would take to reduce it, or with the reason it should stop the plan. Risks are not left as a list at the back of the file.",
      },
      {
        label: "Strategic Advice",
        detail:
          "The findings become a short set of priorities: what to do first, what to leave, and how the plan should change if the market or the cost moves.",
      },
      {
        label: "Result-Oriented Solutions",
        detail:
          "You receive a position you can defend: the evidence, the assumptions, and a clear recommendation. The study is written so a board can decide.",
      },
    ],
  },
  {
    title: "Maritime Consultancy",
    description:
      "For owners and operators who need a commercial plan they can run. We work from the trade, the assets and the clients you can serve, then carry that plan into risk, daily operations and how the business is presented.",
    offerings: [
      {
        label: "Maritime Business Strategy",
        detail:
          "The plan is specific to your trade, vessels or assets, and the clients you can win. It says where to compete, what to decline, and how the commercial result will be judged.",
      },
      {
        label: "Risk Management & Process Improvement",
        detail:
          "We identify the risks that delay or expose the operation, then tighten the process so work moves with a clearer response when something goes wrong.",
      },
      {
        label: "Operations and Management",
        detail:
          "From the first plan through daily management, targets are set, the work is measured, and corrections are made against the commercial plan rather than left to habit.",
      },
      {
        label: "Development and Marketing",
        detail:
          "The offer is described in the terms your clients already use, so the business is easier to place, and the message matches the service you can actually deliver.",
      },
      {
        label: "Results-Oriented Solutions",
        detail:
          "A recommendation closes on a decision the management team can put to work: what should change, who owns it, and what good looks like once it is done.",
      },
    ],
  },
  {
    title: "Innovation & Artificial Intelligence Consultancy",
    description:
      "We begin with the decision the business needs to make, then judge whether artificial intelligence earns a place in it. The work covers where to start, how a programme is introduced, and whether it is worth keeping.",
    offerings: [
      {
        label: "AI Strategy Development",
        detail:
          "The strategy says where to begin, what to leave, and how success will be judged. It is tied to your priorities, the data you have, and the way teams already work.",
      },
      {
        label: "AI Program Implementation",
        detail:
          "A programme is introduced so it fits current operations, rather than sitting beside them. Adoption is part of the work, because a system people do not use has not been implemented.",
      },
      {
        label: "AI Assessments",
        detail:
          "We review the work directly: what is sound, what is fragile, and whether the result justifies the effort. The finding is written so leadership can act on it.",
      },
      {
        label: "Training Programs",
        detail:
          "Where the skills are missing, training stays with the tasks those teams perform. The aim is a programme that is used, not only installed and demonstrated once.",
      },
      {
        label: "AI Analytics",
        detail:
          "The figures are tied back to the original decision, so you can see whether the programme is performing, and what should change if it is not.",
      },
    ],
  },
];

export const visibleServices = services;

export function serviceSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function servicePath(title: string) {
  return `/services/${serviceSlug(title)}`;
}

export function getVisibleServiceBySlug(slug: string) {
  return visibleServices.find((service) => serviceSlug(service.title) === slug);
}
