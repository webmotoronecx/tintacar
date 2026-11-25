import { z } from "zod";
import { articleCategoryNames } from "@/content/article-categories";
import type { Article, ArticleGroup, ArticleSummary } from "@/types/content";
import { readContentFile } from "./content-file";
import { articleSchema, articleSummarySchema } from "./schemas";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

let summaries: ArticleSummary[] | null = null;

// Article repository over /content/articles; swap for a CMS source later
export function getArticleSummaries(): ArticleSummary[] {
  if (!summaries) {
    summaries = readContentFile("articles.json", z.array(articleSummarySchema)) ?? [];
  }
  return summaries;
}

export function getArticlesByGroup(group: ArticleGroup): ArticleSummary[] {
  return getArticleSummaries().filter((article) => article.group === group);
}

export const ARTICLES_PER_PAGE = 10;

export type ArticleCategory = { slug: string; name: string; count: number };

// Categories that have articles, named as on live
export function getArticleCategories(): ArticleCategory[] {
  const counts = new Map<string, number>();
  getArticleSummaries().forEach((article) => article.categories.forEach((slug) => counts.set(slug, (counts.get(slug) ?? 0) + 1)));
  return [...counts].map(([slug, count]) => ({ slug, name: articleCategoryNames[slug] ?? slug, count })).sort((a, b) => a.name.localeCompare(b.name));
}

export function getArticleCategory(slug: string): ArticleCategory | undefined {
  return getArticleCategories().find((category) => category.slug === slug);
}

// Newest first, like the WordPress category archive
export function getArticlesByCategory(slug: string): ArticleSummary[] {
  return getArticleSummaries()
    .filter((article) => article.categories.includes(slug))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function categoryPageCount(slug: string): number {
  return Math.max(1, Math.ceil(getArticlesByCategory(slug).length / ARTICLES_PER_PAGE));
}

export function getArticle(slug: string): Article | null {
  if (!SLUG_PATTERN.test(slug)) return null;
  return readContentFile(`articles/${slug}.json`, articleSchema);
}
