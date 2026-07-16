import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Al FATEH | For Consultation Services",
    template: "%s | Al FATEH",
  },
  description:
    "Al FATEH provides top-notch consultancy services across feasibility studies, maritime, media, HR, AI innovation, and project development.",
  keywords: [
    "consultancy",
    "Al FATEH",
    "feasibility studies",
    "maritime consultancy",
    "AI consulting",
    "HR consultancy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
