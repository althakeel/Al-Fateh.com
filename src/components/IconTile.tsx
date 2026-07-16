import type { LucideIcon } from "lucide-react";

interface IconTileProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "soft" | "blue" | "graphite";
  className?: string;
}

const sizeMap = {
  sm: { tile: "h-9 w-9", icon: 16 },
  md: { tile: "h-11 w-11", icon: 20 },
  lg: { tile: "h-12 w-12", icon: 24 },
};

const variantMap = {
  solid: "icon-tile-accent-solid",
  soft: "icon-tile",
  blue: "icon-tile-blue",
  graphite: "icon-tile-graphite",
};

export default function IconTile({
  icon: Icon,
  size = "md",
  variant = "solid",
  className = "",
}: IconTileProps) {
  const { tile, icon } = sizeMap[size];

  return (
    <span
      className={`${variantMap[variant]} ${tile} rounded-md transition-all duration-500 ${className}`}
    >
      <Icon size={icon} strokeWidth={1.75} aria-hidden />
    </span>
  );
}
