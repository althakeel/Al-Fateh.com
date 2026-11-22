
export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isValidLocale(
  value: string
): value is Locale {
  return value === "en" || value === "ar";
}

export function getLocaleDirection(
  locale: Locale
): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getLocaleFromPathname(
  pathname: string | null | undefined
): Locale | null {
  if (!pathname) return null;

  const firstSegment =
    pathname.split("/").filter(Boolean)[0];

  return firstSegment && isValidLocale(firstSegment)
    ? firstSegment
    : null;
}

export function getLocalizedPathname(
  pathname: string,
  locale: Locale
): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length && isValidLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join("/")}`;
}

export function resolveLocale(
  pathname: string | null | undefined,
  fallback: string = defaultLocale
): Locale {
  const pathLocale = getLocaleFromPathname(pathname);

  if (pathLocale) return pathLocale;

  return isValidLocale(fallback)
    ? fallback
    : defaultLocale;
}
