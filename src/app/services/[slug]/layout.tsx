import ServiceFrame from "@/components/ServiceFrame";

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceFrame>{children}</ServiceFrame>;
}
