import type { MetadataRoute } from "next";
import { getProjects, getServices, siteUrl } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/chi-siamo", "/servizi", "/progetti", "/contatti", "/privacy-policy", "/cookie-policy"];
  return [
    ...staticRoutes.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...getServices().map((s) => ({ url: `${siteUrl}/servizi/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getProjects().map((p) => ({ url: `${siteUrl}/progetti/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
