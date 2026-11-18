import type { ArticleSummary } from "@/types/content";
import { ArticleCard } from "./ArticleCard";

type ArticleGridProps = {
  articles: ArticleSummary[];
};

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <ul className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
