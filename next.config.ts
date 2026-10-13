import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: "/services/corporate-tax-and-tax-advisory", destination: "/services/accounting-services", permanent: true },
      { source: "/services/outsourced-finance-and-accounting", destination: "/services/accounting-services", permanent: true },
      { source: "/services/cost-accounting-and-cost-control", destination: "/services/accounting-services", permanent: true },
      { source: "/services/business-strategy-and-market-advisory", destination: "/services/accounting-services", permanent: true },
      { source: "/services/media-studies-and-consultancy", destination: "/services", permanent: true },
      { source: "/services/human-resources-consultancy", destination: "/services", permanent: true },
      { source: "/services/project-development-consultancy", destination: "/services", permanent: true },
      { source: "/blog/building-a-decision-ready-feasibility-study", destination: "/blog/agreeing-a-market-advisory-brief", permanent: true },
      { source: "/blog/planning-for-uae-market-entry", destination: "/blog/agreeing-a-market-advisory-brief", permanent: true },
      { source: "/blog/turning-ai-ambition-into-a-practical-roadmap", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
