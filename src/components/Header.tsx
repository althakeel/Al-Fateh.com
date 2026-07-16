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
  Mail,
  Menu,
  X,
} from "lucide-react";
import { navLinks } from "@/data/navigation";
import Logo from "@/components/Logo";

const navIcons = [House, Building2, Briefcase, Target, Award, Mail];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
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
      <div className="container-x relative grid grid-cols-[1fr_auto] items-center py-4 lg:grid-cols-[1fr_auto_1fr] lg:py-5">
        <div className="justify-self-start">
          <Logo priority variant="default" />
        </div>

        <nav className="hidden items-center gap-1.5 justify-self-center lg:flex">
          {navLinks.map((link, index) => {
            const Icon = navIcons[index];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 rounded-[2px] px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent-500/15 text-ink"
                    : "text-mute hover:text-ink"
                }`}
              >
                <Icon size={18} strokeWidth={1.75} className="text-accent-500" aria-hidden />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="justify-self-end">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-platinum text-ink lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="animate-fade-in border-t border-platinum bg-ivory px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const Icon = navIcons[index];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 rounded-[2px] px-3 py-2.5 text-sm font-medium ${
                    isActive(link.href) ? "bg-frost text-ink" : "text-mute"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={16} strokeWidth={1.75} className="text-accent-500" aria-hidden />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
