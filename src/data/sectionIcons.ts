import {
  Lightbulb,
  Users,
  HeartHandshake,
  Award,
  ChartColumn,
  Workflow,
  Receipt,
  Compass,
  Ship,
  Building2,
  ShieldCheck,
  LayoutGrid,
  Earth,
  type LucideIcon,
} from "lucide-react";

export const valueIcons: LucideIcon[] = [
  Lightbulb,
  Users,
  HeartHandshake,
  Award,
];

export const serviceIcons: LucideIcon[] = [
  Receipt,
  Compass,
  Ship,
  Lightbulb,
];

export const serviceIconByTitle: Record<string, LucideIcon> = {
  "Accounting Services": Receipt,
  "Feasibility Studies Consultancy": Compass,
  "Maritime Consultancy": Ship,
  "Innovation & Artificial Intelligence Consultancy": Lightbulb,
};

export const expertiseIcons: LucideIcon[] = [
  Building2,
  ShieldCheck,
  HeartHandshake,
  Award,
  ChartColumn,
  LayoutGrid,
  Workflow,
];

export const whyUsIcons: LucideIcon[] = [
  LayoutGrid,
  ChartColumn,
  HeartHandshake,
  Earth,
  ShieldCheck,
  Award,
];
