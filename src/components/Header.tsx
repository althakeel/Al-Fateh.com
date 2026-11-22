
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Building2,
  Briefcase,
  Target,
  Award,
  Newspaper,
  Mail,
  Menu,
  X,
} from "lucide-react";

import Logo from "@/components/Logo";
import { navLinks } from "@/data/navigation";

import {
  getLocaleFromPathname,
  getLocalizedPathname,
  type Locale,
} from "@/lib/i18n";

import { translations } from "@/lib/translations";

// ========================================
// NAVIGATION ICONS
// ========================================

const navIcons = [
  House,
  Building2,
  Briefcase,
  Target,
  Award,
  Newspaper,
  Mail,
];

// ========================================
// HEADER COMPONENT
// ========================================

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const locale = getLocaleFromPathname(pathname) ?? "en";
  const t = translations[locale];

  const navLabels = [
    t.nav.home,
    t.nav.about,
    t.nav.services,
    t.nav.expertise,
    t.nav.whyUs,
    t.nav.blog,
    t.nav.contact,
  ];

  // ========================================
  // LANGUAGE SWITCHING
  // ========================================

  function switchLanguage(nextLocale: Locale) {
    if (nextLocale === locale) return;

    const localizedPath = getLocalizedPathname(
      pathname || "/",
      nextLocale
    );

    const query = window.location.search;
    const hash = window.location.hash;

    setMenuOpen(false);

    // Full document navigation ensures the correct
    // HTML lang and dir attributes from first render.
    window.location.assign(`${localizedPath}${query}${hash}`);
  }

  // ========================================
  // ACTIVE NAVIGATION
  // ========================================

  function isActive(href: string) {
    const localized = getLocalizedPathname(href, locale);

    if (href === "/") {
      return pathname === localized;
    }

    return (
      pathname === localized ||
      pathname.startsWith(`${localized}/`)
    );
  }

  // ========================================
  // SCROLL EFFECT
  // ========================================

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === `/${locale}`;
  const lightHome = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-platinum bg-ivory/95 shadow-sm backdrop-blur-xl"
          : lightHome
            ? "border-b border-transparent bg-frost/80 backdrop-blur-md"
            : "border-b border-transparent bg-[#f7f6f3]/90 backdrop-blur-md"
      }`}
    >
      {/* ========================================
          MAIN HEADER CONTAINER
      ======================================== */}

      <div
        className="
          container-x relative
          flex flex-wrap items-center justify-between
          gap-x-2 gap-y-2
          py-4
          max-[374px]:!px-3
          sm:gap-x-3
          lg:py-5
          xl:flex-nowrap xl:gap-x-8
        "
      >
        {/* ========================================
            LOGO
        ======================================== */}

        <div className="shrink-0">
          <Logo
            priority
            variant="default"
            locale={locale}
          />
        </div>

        {/* ========================================
            DESKTOP NAVIGATION
        ======================================== */}

        <nav
          className="
            hidden min-w-0 items-center
            gap-1 whitespace-nowrap
            xl:flex
          "
          aria-label={
            locale === "ar"
              ? "التنقل الرئيسي"
              : "Main navigation"
          }
        >
          {navLinks.map((link, index) => {
            const Icon = navIcons[index];

            return (
              <Link
                key={link.href}
                href={getLocalizedPathname(
                  link.href,
                  locale
                )}
                aria-current={
                  isActive(link.href)
                    ? "page"
                    : undefined
                }
                className={`
                  inline-flex items-center gap-2
                  rounded-[2px]
                  px-2 py-2.5
                  text-sm font-medium
                  transition-colors
                  2xl:px-3
                  ${
                    isActive(link.href)
                      ? "bg-accent-500/15 text-ink"
                      : "text-mute hover:text-ink"
                  }
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  className="text-accent-500"
                  aria-hidden
                />

                {navLabels[index]}
              </Link>
            );
          })}
        </nav>

        {/* ========================================
            RIGHT SIDE CONTROLS
        ======================================== */}

        <div
          className="
            ms-auto flex shrink-0 items-center
            gap-1 sm:gap-2
          "
        >
          {/* ====================================
              LANGUAGE SWITCHER
              Inspired by Almahy,
              styled for Al Fateh
          ==================================== */}

          <div
            className="
              inline-flex shrink-0 items-center
              gap-0.5
              rounded-full
              border border-accent-500/70
              bg-ivory/90
              p-0.5
              shadow-[0_2px_10px_rgba(30,30,30,0.04)]
              backdrop-blur-md
              sm:p-1
            "
            role="group"
            aria-label={
              locale === "ar"
                ? "اختيار لغة الموقع"
                : "Select website language"
            }
            dir="ltr"
          >
            {/* ENGLISH */}

            <button
              type="button"
              onClick={() => switchLanguage("en")}
              aria-label="Switch to English"
              aria-pressed={locale === "en"}
              lang="en"
              className={`
                cursor-pointer
                rounded-full
                px-2.5 py-1.5
                text-[11px] font-semibold
                leading-none
                transition-all duration-300 ease-in-out
                sm:px-3.5 sm:py-2 sm:text-xs
                ${
                  locale === "en"
                    ? "bg-accent-500 text-white shadow-sm"
                    : "bg-transparent text-mute hover:bg-accent-500/10 hover:text-ink"
                }
              `}
            >
              ENG
            </button>

            {/* ARABIC */}

            <button
              type="button"
              onClick={() => switchLanguage("ar")}
              aria-label="التبديل إلى العربية"
              aria-pressed={locale === "ar"}
              lang="ar"
              className={`
                cursor-pointer
                rounded-full
                px-2.5 py-1.5
                font-[family-name:var(--font-cairo)]
                text-[11px] font-semibold
                leading-none
                transition-all duration-300 ease-in-out
                sm:px-3.5 sm:py-2 sm:text-xs
                ${
                  locale === "ar"
                    ? "bg-accent-500 text-white shadow-sm"
                    : "bg-transparent text-mute hover:bg-accent-500/10 hover:text-ink"
                }
              `}
            >
              العربي
            </button>
          </div>

          {/* ====================================
              MOBILE MENU BUTTON
          ==================================== */}

          <button
            type="button"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-[2px]
              border border-platinum
              text-ink
              transition-colors hover:bg-frost
              sm:h-11 sm:w-11
              xl:hidden
            "
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              locale === "ar"
                ? "فتح القائمة"
                : "Toggle menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================
          MOBILE NAVIGATION
      ======================================== */}

      {menuOpen && (
        <nav
          className="
            animate-fade-in
            border-t border-platinum
            bg-ivory
            px-5 py-4
            xl:hidden
          "
          aria-label={
            locale === "ar"
              ? "القائمة الرئيسية"
              : "Mobile navigation"
          }
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const Icon = navIcons[index];

              return (
                <Link
                  key={link.href}
                  href={getLocalizedPathname(
                    link.href,
                    locale
                  )}
                  onClick={() => setMenuOpen(false)}
                  aria-current={
                    isActive(link.href)
                      ? "page"
                      : undefined
                  }
                  className={`
                    inline-flex items-center gap-2
                    rounded-[2px]
                    px-3 py-2.5
                    text-sm font-medium
                    transition-colors
                    ${
                      isActive(link.href)
                        ? "bg-frost text-ink"
                        : "text-mute hover:bg-frost hover:text-ink"
                    }
                  `}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className="text-accent-500"
                    aria-hidden
                  />

                  {navLabels[index]}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
