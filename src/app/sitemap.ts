import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { servicePath, visibleServices } from "@/data/services";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
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
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contact" || path === "/services" ? 0.9 : 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = visibleServices.map((service) => ({
    url: `${siteConfig.url}${servicePath(service.title)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
