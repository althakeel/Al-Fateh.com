import { requireLocale } from "@/lib/route-locale";
import ServiceFrame from "@/components/ServiceFrame";

export default async function ServiceSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = requireLocale((await params).locale);
  return <ServiceFrame locale={locale}>{children}</ServiceFrame>;
}
