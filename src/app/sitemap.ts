import { getLocalizedPathname, locales } from "@/lib/i18n";
import type { MetadataRoute } from "next";
import { blogPosts, hasArabicBlogPost } from "@/data/blog";
import { type ServiceOffering, type ServiceSection, servicePath, visibleServices } from "@/data/services";
import { serviceFaqs } from "@/data/serviceFaqs";
import { siteConfig } from "@/data/site";
import { hasArabicCopy } from "@/lib/translations";

type LocalizedRoute = MetadataRoute.Sitemap[number] & { hasArabic: boolean };

function hasArabicServiceSection(section: ServiceSection): boolean {
  const { label, aside, detail, note, points = [], groups = [] } = section;
  return [label, aside, detail, note, ...points].every((text) => !text || hasArabicCopy(text))
    && groups.every(hasArabicServiceSection);
}

function hasArabicService(service: ServiceOffering): boolean {
  const { title, description, plain, note, industryIntro = [], industryNote, offerings, industries = [] } = service;
  return [title, description, plain, note, industryNote, ...industryIntro].every((text) => !text || hasArabicCopy(text))
    && [...offerings, ...industries].every(hasArabicServiceSection)
    && (serviceFaqs[title] ?? []).every(({ question, answer }) => hasArabicCopy(question) && hasArabicCopy(answer));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: LocalizedRoute[] = [
    "",
    "/about",
    "/services",
    "/expertise",
    "/why-us",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${siteConfig.url}${path || "/"}`,
    lastModified,
    hasArabic: true,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contact" || path === "/services" ? 0.9 : 0.8,
  }));

  const serviceRoutes: LocalizedRoute[] = visibleServices.map((service) => ({
    url: `${siteConfig.url}${servicePath(service.title)}`,
    lastModified,
    hasArabic: hasArabicService(service),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: LocalizedRoute[] = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified,
    hasArabic: hasArabicBlogPost(post),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes].flatMap(({ hasArabic, ...route }) => {
    const path = new URL(route.url).pathname;
    const en = new URL(getLocalizedPathname(path, "en"), siteConfig.url).href;
    const ar = new URL(getLocalizedPathname(path, "ar"), siteConfig.url).href;
    const languages = hasArabic ? { en, ar, "x-default": en } : { en, "x-default": en };
    return locales.filter((locale) => locale === "en" || hasArabic).map((locale) => ({
      ...route,
      url: locale === "ar" ? ar : en,
      alternates: { languages },
    }));
  });
}
