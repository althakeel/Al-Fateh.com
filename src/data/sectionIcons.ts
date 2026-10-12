import {
  Lightbulb,
  Users,
  HeartHandshake,
  Award,
  ChartColumn,
  Ship,
  Megaphone,
  Cpu,
  Workflow,
  Receipt,
  Compass,
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
  ChartColumn,
  Ship,
  Megaphone,
  Users,
  Cpu,
  Workflow,
];

export const serviceIconByTitle: Record<string, LucideIcon> = {
  "Accounting Services": Receipt,
  "Feasibility Studies Consultancy": ChartColumn,
  "Maritime Consultancy": Ship,
  "Media Studies & Consultancy": Megaphone,
  "Human Resources Consultancy": Users,
  "Innovation & Artificial Intelligence Consultancy": Cpu,
  "Project Development Consultancy": Workflow,
};

export const expertiseIcons: LucideIcon[] = [
  Compass,
  Building2,
  ShieldCheck,
  Users,
  Cpu,
  Earth,
];

export const whyUsIcons: LucideIcon[] = [
  LayoutGrid,
  ChartColumn,
  HeartHandshake,
  Earth,
  ShieldCheck,
  Award,
];
