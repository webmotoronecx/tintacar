import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ArticleSummary } from "@/types/content";

type ArticleCardProps = {
  article: ArticleSummary;
  basePath?: string;
};

// Text-only article teaser used on the articles index
export function ArticleCard({ article, basePath = "/articles" }: ArticleCardProps) {
  const href = `${basePath}/${article.slug}/`;

  return (
    <article className="flex h-full flex-col items-center border border-[#efefef] bg-white px-6 py-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
      <h3 className="text-[20px] font-semibold leading-snug text-heading">
        <Link href={href} className="hover:text-brand">
          {article.title}
        </Link>
      </h3>
      {article.excerpt && <p className="mt-2 line-clamp-4 text-[13px] leading-6">{article.excerpt}</p>}
      <Link
        href={href}
        aria-label={`Read more: ${article.title}`}
        className="mt-auto inline-flex items-center gap-1 pt-5 text-[11px] font-bold uppercase tracking-wide text-heading hover:text-brand"
      >
        Read more
        <ChevronRight aria-hidden="true" className="h-3 w-3 fill-current" />
      </Link>
    </article>
  );
}
