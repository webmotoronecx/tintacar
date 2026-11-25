import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleList, Pagination } from "@/components/articles/ArticleList";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site.config";
import { ARTICLES_PER_PAGE, categoryPageCount, getArticleCategory, getArticlesByCategory } from "@/lib/articles";

export const categoryPath = (slug: string, page = 1) => `/articles/category/${slug}/${page > 1 ? `page/${page}/` : ""}`;

// Same title and robots as the live archive (noindex; later pages also nofollow)
export function categoryMetadata(slug: string, page: number): Metadata {
  const category = getArticleCategory(slug);
  if (!category) return {};
  return {
    title: { absolute: `${category.name} - ${siteConfig.name}${page > 1 ? ` - ${page}` : ""}` },
    description: `${category.name} articles from ${siteConfig.name}.`,
    alternates: { canonical: categoryPath(slug, page) },
    robots: { index: false, follow: page === 1 },
  };
}

// One page of a category archive, newest first
export function CategoryArchive({ slug, page }: { slug: string; page: number }) {
  const category = getArticleCategory(slug);
  const pageCount = categoryPageCount(slug);
  if (!category || page < 1 || page > pageCount) notFound();
  const articles = getArticlesByCategory(slug).slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  return (
    <Section spacing="md">
      <h1 className="mb-8 text-[28px] font-bold leading-tight text-heading md:text-[32px]">{category.name}</h1>
      <ArticleList articles={articles} />
      <Pagination page={page} pageCount={pageCount} hrefFor={(n) => categoryPath(slug, n)} />
    </Section>
  );
}
