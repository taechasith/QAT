import type { MetadataRoute } from "next";

import { getPublishedSitemapContent } from "@/lib/data/content";
import { siteUrl } from "@/lib/metadata";

const staticRoutes = [
  "",
  "game",
  "course",
  "exhibition",
  "research",
  "news",
  "talk",
  "experiment",
  "video",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const content = await getPublishedSitemapContent();

  return [
    ...staticRoutes.map((route) => ({
      url: siteUrl(`/${route}`),
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("daily" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...content.map((item) => ({
      url: siteUrl(`/content/${item.slug}`),
      lastModified: item.updated_at ?? item.published_at ?? now,
      changeFrequency: "weekly" as const,
      priority:
        item.content_type === "news" || item.content_type === "event" ? 0.7 : 0.6,
    })),
  ];
}
