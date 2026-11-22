
import { NextRequest, NextResponse } from "next/server";

import {
  defaultLocale,
  getLocaleFromPathname,
  isValidLocale,
  type Locale,
} from "@/lib/i18n";

const legacyRoutes = new Set(["about", "services", "expertise", "why-us", "blog", "contact"]);

const COOKIE_NAME = "alfateh-locale";

function detectLocale(request: NextRequest): Locale {
  const savedLocale =
    request.cookies.get(COOKIE_NAME)?.value;

  if (savedLocale && isValidLocale(savedLocale)) {
    return savedLocale;
  }

  const acceptLanguage =
    request.headers.get("accept-language") ?? "";

  const preferences = acceptLanguage
    .split(",")
    .map((part) => {
      const [language, quality] = part.trim().split(";q=");

      const parsedQuality =
        quality === undefined ? 1 : Number(quality);

      return {
        language: language.toLowerCase().split("-")[0],
        quality: Number.isFinite(parsedQuality)
          ? parsedQuality
          : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const preference of preferences) {
    if (preference.quality <= 0) continue;

    if (preference.language === "ar") return "ar";
    if (preference.language === "en") return "en";
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPathname(pathname);

  if (!locale) {
    const [segment] = pathname.split("/").filter(Boolean);
    if (segment && !legacyRoutes.has(segment)) return NextResponse.next();
    const preferredLocale = segment ? defaultLocale : detectLocale(request);

    const url = request.nextUrl.clone();

    url.pathname =
      pathname === "/"
        ? `/${preferredLocale}`
        : `/${preferredLocale}${pathname}`;

    const response = NextResponse.redirect(url, segment ? 308 : 307);
    if (!segment) response.headers.set("Cache-Control", "private, no-store");

    response.cookies.set(COOKIE_NAME, preferredLocale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      secure: request.nextUrl.protocol === "https:",
    });

    return response;
  }

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-locale", locale);
  requestHeaders.set(
    "x-dir",
    locale === "ar" ? "rtl" : "ltr"
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set(COOKIE_NAME, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    secure: request.nextUrl.protocol === "https:",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|icon.png|images|assets|.*\\..*).*)",
  ],
};
