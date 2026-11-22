import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";

export function requireLocale(value: string) {
  if (!isValidLocale(value)) notFound();
  return value;
}
