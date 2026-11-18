import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getAllPages, getPageByPath, pageMetadata, pathToSegments } from "@/lib/pages";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

// Only paths defined in /content/pages are generated
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPages()
    .filter((page) => page.path !== "/")
    .map((page) => ({ slug: pathToSegments(page.path) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByPath(slug.join("/"));
  return page ? pageMetadata(page) : {};
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageByPath(slug.join("/"));
  if (!page) notFound();

  return <SectionRenderer sections={page.sections} />;
}
