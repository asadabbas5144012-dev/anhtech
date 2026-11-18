import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.legal.lastUpdated);
  const entry = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    entry("/about", 0.8),
    entry("/services", 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/portfolio", 0.7),
    ...projects.map((p) => entry(`/portfolio/${p.slug}`, 0.5)),
    entry("/contact", 0.8),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
