import { z } from "zod";
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

export function getArticle(slug: string): Article | null {
  if (!SLUG_PATTERN.test(slug)) return null;
  return readContentFile(`articles/${slug}.json`, articleSchema);
}
