import type { Metadata } from "next";
import { CategoryArchive, categoryMetadata } from "@/components/articles/CategoryArchive";
import { categoryPageCount, getArticleCategories } from "@/lib/articles";

type CategoryPagedProps = {
  params: Promise<{ category: string; page: string }>;
};

export const dynamicParams = false;

// Page 1 lives at the archive root; /page/1/ redirects there as on live
export function generateStaticParams() {
  return getArticleCategories().flatMap((category) =>
    Array.from({ length: categoryPageCount(category.slug) - 1 }, (_, i) => ({ category: category.slug, page: String(i + 2) })),
  );
}

export async function generateMetadata({ params }: CategoryPagedProps): Promise<Metadata> {
  const { category, page } = await params;
  return categoryMetadata(category, Number(page));
}

export default async function CategoryPaged({ params }: CategoryPagedProps) {
  const { category, page } = await params;
  return <CategoryArchive slug={category} page={Number(page)} />;
}
