import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { getArticleSummaries } from "@/lib/articles";
import { getAllPages } from "@/lib/pages";
import { getStores } from "@/lib/stores";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    ...getAllPages()
      .filter((page) => !page.excludeFromSitemap)
      .map((page) => ({ url: url(page.path), changeFrequency: "monthly" as const, priority: page.path === "/" ? 1 : 0.8 })),
    { url: url("/articles/"), changeFrequency: "weekly" as const, priority: 0.7 },
    ...getArticleSummaries().map((article) => ({ url: url(`/articles/${article.slug}/`), lastModified: article.date, priority: 0.5 })),
    ...getStores().map((store) => ({ url: url(`/store/${store.slug}/`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
