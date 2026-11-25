import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ArticleSummary } from "@/types/content";

type ArticleCardProps = {
  article: ArticleSummary;
  basePath?: string;
};

// Text-only article teaser used on the articles index (live shows these unboxed)
export function ArticleCard({ article, basePath = "/articles" }: ArticleCardProps) {
  const href = `${basePath}/${article.slug}/`;

  return (
    <article className="flex h-full flex-col items-center px-4 pb-6 text-center">
      <h3 className="text-[20px] font-bold leading-snug text-heading">
        <Link href={href} className="hover:text-brand">
          {article.title}
        </Link>
      </h3>
      {article.excerpt && <p className="mt-2 line-clamp-4 leading-6">{article.excerpt}</p>}
      <Link
        href={href}
        aria-label={`Read more: ${article.title}`}
        className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-bold uppercase text-[#222] hover:text-brand"
      >
        Read more
        <ChevronRight aria-hidden="true" className="h-3 w-3 fill-current" />
      </Link>
    </article>
  );
}
