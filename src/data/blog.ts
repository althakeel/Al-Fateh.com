export interface BlogSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "corporate-tax-readiness",
    title: "What Corporate Tax Readiness Looks Like",
    excerpt:
      "Tax readiness starts with organized records and a clear view of the obligation, before filing is coordinated within the agreed scope.",
    category: "Corporate Tax",
    readTime: "4 min read",
    image: "/images/studio/Corporate Tax (bg) new.jpg",
    imageAlt: "Corporate tax documents and financial records on a desk",
    sections: [
      {
        heading: "Start with the records",
        paragraphs: [
          "Corporate tax work depends on records that can be reviewed. Readiness means the documentation is in order before compliance support, tax-related reporting, or filing coordination begins.",
          "All tax work remains within applicable UAE rules and any required professional authorization.",
        ],
      },
      {
        heading: "Separate compliance from planning",
        paragraphs: [
          "Compliance support and tax-related financial reporting answer what is due. Planning looks at impact, risk, and whether a transaction or structure changes the after-tax result.",
        ],
        points: [
          "Corporate Tax compliance support and filing coordination, where within the agreed scope.",
          "Record readiness and documentation reviews.",
          "Tax health checks and risk identification.",
          "Legitimate tax efficiency and after-tax profitability analysis.",
        ],
      },
    ],
  },
  {
    slug: "cost-visibility-and-margin",
    title: "From Cost Visibility to a Clearer Margin",
    excerpt:
      "Cost control is the work of seeing what a product, treatment, vehicle or project actually costs, then comparing that with the budget and the margin.",
    category: "Cost Control",
    readTime: "5 min read",
    image: "/images/studio/Cost Accounting & Cost Control(new).jpg",
    imageAlt: "Cost and sales charts used to review business margins",
    sections: [
      {
        heading: "Understand the cost first",
        paragraphs: [
          "The starting point is the cost structure: what it costs to deliver a product, a service, a treatment, a vehicle or a project. Without that, a budget variance is only a number.",
        ],
      },
      {
        heading: "Then control the spend",
        paragraphs: [
          "Tracking actual results against the budget shows which costs were planned and which can be avoided. Margin work then looks at pricing, gross margin, break-even and business-unit profitability.",
        ],
        points: [
          "Cost structure assessment and cost allocation.",
          "Budgeting, forecasting and variance analysis.",
          "Pricing, margin and break-even analysis.",
          "A method matched to the sector and the data available.",
        ],
      },
    ],
  },
  {
    slug: "agreeing-a-market-advisory-brief",
    title: "Agree the Market Advisory Brief Before the Research",
    excerpt:
      "A useful market and strategy engagement states how the analysis will be done, and what the business will receive, before the work starts.",
    category: "Market Advisory",
    readTime: "4 min read",
    image: "/images/studio/Business Strategy & Market Advisory(new).jpg",
    imageAlt: "Market and financial charts reviewed during business planning",
    sections: [
      {
        heading: "Name the question",
        paragraphs: [
          "Owners use this work to understand their position, assess an opportunity, and choose a clearer direction. The brief should say which of those questions the engagement is answering.",
        ],
      },
      {
        heading: "Agree the evidence",
        paragraphs: [
          "Research methods and deliverables should be agreed clearly, including whether the analysis uses published data, client records or primary research.",
        ],
        points: [
          "SWOT analysis and business assessment.",
          "Market, industry and competitor research.",
          "Customer, product and service performance.",
          "Recommendations aligned to the business goals.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
