import type { Metadata } from "next";
import { allPages } from "@/content/pages";
import type { PageData } from "@/types/sections";

// Page repository over the typed content files in /content/pages
export function getAllPages(): PageData[] {
  return allPages;
}

export function getPageByPath(path: string): PageData | undefined {
  const normalised = `/${path.replace(/^\/+|\/+$/g, "")}/`.replace(/^\/\/$/, "/");
  return allPages.find((page) => page.path === normalised);
}

export function pathToSegments(path: string): string[] {
  return path.split("/").filter(Boolean);
}

export function pageMetadata(page: PageData): Metadata {
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: page.path,
      ...(page.seo.image ? { images: [{ url: page.seo.image }] } : {}),
    },
  };
}
