"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return /^\/(?:en|ar)\/dashboard(?:\/|$)/.test(pathname) ? null : children;
}
