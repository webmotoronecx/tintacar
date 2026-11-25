import type { Metadata } from "next";
import { CategoryArchive, categoryMetadata } from "@/components/articles/CategoryArchive";
import { getArticleCategories } from "@/lib/articles";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  return categoryMetadata(category, 1);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  return <CategoryArchive slug={category} page={1} />;
}
