
import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

import { siteConfig } from "@/data/site";
import {
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

import {
  isValidLocale,
  getLocaleDirection,
} from "@/lib/i18n";

// ========================================
// FONTS
// ========================================

// English font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Arabic font
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ========================================
// DEFAULT SEO METADATA
// ========================================

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [...siteConfig.keywords],

  applicationName: siteConfig.name,

  authors: [
    {
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,

  category: "Business Services & Advisory",
  classification: "Business Services & Advisory",

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Localized canonical URLs will be generated
  // within each /[locale] page.
  icons: {
    icon: [
      {
        url: "/images/favicon.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/images/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],

    shortcut: [
      {
        url: "/images/favicon.png",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],

    apple: [
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },

  openGraph: {
    type: "website",

    locale: siteConfig.locale,

    url: siteConfig.url,

    title: siteConfig.title,

    description: siteConfig.description,

    siteName: siteConfig.name,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
      {
        url: siteConfig.favicon,
        width: 48,
        height: 48,
        alt: `${siteConfig.name} favicon`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  other: {
    "msapplication-TileColor": siteConfig.themeColor,
    "msapplication-TileImage": "/images/favicon.png",
    "theme-color": siteConfig.themeColor,
  },
};

// ========================================
// ROOT LAYOUT
// ========================================

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the language set by middleware.ts
  const headersList = await headers();

  const localeHeader = headersList.get("x-locale");

  // Validate language
  const locale =
    localeHeader && isValidLocale(localeHeader)
      ? localeHeader
      : "en";

  // Arabic = RTL, English = LTR
  const direction = getLocaleDirection(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`
          ${poppins.variable}
          ${cairo.variable}
          font-sans
          antialiased
        `}
        suppressHydrationWarning
      >
        {/* ==================================
            GOOGLE ADS TRACKING
        ================================== */}

        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              window.dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'AW-18514851490');
          `}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18514851490"
          strategy="afterInteractive"
        />

        {/* ==================================
            STRUCTURED SEO DATA
        ================================== */}

        <JsonLd
          data={[
            organizationJsonLd(),
            websiteJsonLd(locale),
          ]}
        />

        {/* ==================================
            WEBSITE HEADER
        ================================== */}

        <Header />

        {/* ==================================
            WEBSITE CONTENT
        ================================== */}

        <main>{children}</main>

        {/* ==================================
            WEBSITE FOOTER
        ================================== */}

        <Footer locale={locale} />

        {/* ==================================
            WHATSAPP FLOATING BUTTON
        ================================== */}

        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
} 
