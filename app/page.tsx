import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getPageByPath, pageMetadata } from "@/lib/pages";

export function generateMetadata(): Metadata {
  const page = getPageByPath("/");
  return page ? pageMetadata(page) : {};
}

export default function HomePage() {
  const page = getPageByPath("/");
  if (!page) notFound();

  return <SectionRenderer sections={page.sections} />;
}
