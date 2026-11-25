import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ArticleSummary } from "@/types/content";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ArticleListProps = {
  articles: ArticleSummary[];
  basePath?: string;
};

// Archive list: one boxed teaser per article, like the WordPress category pages
export function ArticleList({ articles, basePath = "/articles" }: ArticleListProps) {
  return (
    <ul className="space-y-[30px]">
      {articles.map((article) => {
        const href = `${basePath}/${article.slug}/`;
        return (
          <li key={article.slug} className="border border-[#efefef] px-6 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:px-[50px]">
            <h2 className="text-[24px] font-bold leading-tight text-heading md:text-[28px]">
              <Link href={href} className="hover:text-brand">
                {article.title}
              </Link>
            </h2>
            {article.excerpt && <p className="mt-3 line-clamp-3 text-[13px] leading-6">{article.excerpt}</p>}
            <Link href={href} aria-label={`Read more: ${article.title}`} className={cn(buttonClasses("outline", "sm"), "mt-6 border-[#dddddd] px-6 hover:border-brand")}>
              Read more
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

type PaginationProps = {
  page: number;
  pageCount: number;
  /** Builds the URL for a page number; page 1 is the archive root */
  hrefFor: (page: number) => string;
};

// Numbered archive pagination with previous/next links
export function Pagination({ page, pageCount, hrefFor }: PaginationProps) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const pill = "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[13px]";

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={hrefFor(page - 1)} className="inline-flex items-center gap-1 px-2 py-2 text-[13px] hover:text-brand">
          <ChevronLeft aria-hidden="true" className="h-3 w-3" /> Prev
        </Link>
      )}
      {pages.map((n) =>
        n === page ? (
          <span key={n} aria-current="page" className={cn(pill, "border-brand bg-brand text-white")}>
            {n}
          </span>
        ) : (
          <Link key={n} href={hrefFor(n)} aria-label={`Page ${n}`} className={cn(pill, "border-line hover:border-brand hover:text-brand")}>
            {n}
          </Link>
        ),
      )}
      {page < pageCount && (
        <Link href={hrefFor(page + 1)} className="inline-flex items-center gap-1 px-2 py-2 text-[13px] hover:text-brand">
          Next <ChevronRight aria-hidden="true" className="h-3 w-3" />
        </Link>
      )}
    </nav>
  );
}
