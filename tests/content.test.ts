import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { loadRedirects } from "@/config/redirects";
import { siteConfig } from "@/config/site.config";
import { getArticle, getArticleSummaries, getArticlesByGroup } from "@/lib/articles";
import { getAllPages } from "@/lib/pages";
import { directionsUrl, formatAddress, getStoreBySlug, getStores, mapEmbedUrl } from "@/lib/stores";

const PUBLIC_DIR = path.join(process.cwd(), "public");

// Collects every string value under a key from nested page data
function collect(value: unknown, key: string, found: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((item) => collect(item, key, found));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === key && typeof v === "string") found.push(v);
      else collect(v, key, found);
    }
  }
  return found;
}

function knownRoutes(): Set<string> {
  return new Set([
    ...getAllPages().map((page) => page.path),
    "/articles/",
    ...getArticleSummaries().map((article) => `/articles/${article.slug}/`),
    ...getStores().map((store) => `/store/${store.slug}/`),
  ]);
}

describe("page registry", () => {
  const pages = getAllPages();

  test("paths are unique and wrapped in slashes", () => {
    const paths = pages.map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);
    paths.forEach((p) => expect(p).toMatch(/^\/([a-z0-9-]+\/)*$/));
  });

  test("every page has SEO title, description and at least one section", () => {
    pages.forEach((page) => {
      expect(page.seo.title, page.path).not.toBe("");
      expect(page.seo.description, page.path).not.toBe("");
      expect(page.sections.length, page.path).toBeGreaterThan(0);
    });
  });

  test("local images referenced by pages exist in /public", () => {
    const missing = collect(pages, "src")
      .concat(collect(pages, "icon"))
      .filter((src) => src.startsWith("/") && !fs.existsSync(path.join(PUBLIC_DIR, src)));
    expect(missing).toEqual([]);
  });

  test("internal links in pages and navigation point to real routes", () => {
    const routes = knownRoutes();
    const hrefs = [...collect(pages, "href"), ...collect(siteConfig, "href")];
    const broken = hrefs
      .filter((href) => href.startsWith("/") && !href.startsWith("//"))
      .map((href) => href.split(/[?#]/)[0])
      .filter((href) => !routes.has(href) && !fs.existsSync(path.join(PUBLIC_DIR, href)));
    expect([...new Set(broken)]).toEqual([]);
  });
});

describe("articles", () => {
  const summaries = getArticleSummaries();

  test("every listed article has a valid content file", () => {
    expect(summaries.length).toBeGreaterThan(0);
    summaries.forEach((summary) => expect(getArticle(summary.slug), summary.slug).not.toBeNull());
  });

  test("groups split the full list", () => {
    expect(getArticlesByGroup("car").length + getArticlesByGroup("home").length).toBe(summaries.length);
  });

  test("article bodies only reference local images that exist", () => {
    const missing = summaries.flatMap((summary) => {
      const html = getArticle(summary.slug)?.html ?? "";
      return [...html.matchAll(/src="(\/[^"]+)"/g)].map((m) => m[1]).filter((src) => !fs.existsSync(path.join(PUBLIC_DIR, src)));
    });
    expect(missing).toEqual([]);
  });

  test("rejects unsafe slugs", () => {
    expect(getArticle("../stores")).toBeNull();
    expect(getArticle("not-a-real-article")).toBeNull();
  });
});

describe("stores", () => {
  const stores = getStores();

  test("stores have unique slugs, a state and coordinates", () => {
    const slugs = stores.map((store) => store.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    stores.forEach((store) => {
      expect(store.address.state, store.slug).toMatch(/^(NSW|VIC|QLD|WA|SA|TAS|ACT|NT)$/);
      expect(typeof store.lat, store.slug).toBe("number");
      expect(typeof store.lng, store.slug).toBe("number");
    });
  });

  test("helpers build address and map links", () => {
    const store = getStoreBySlug("milton");
    expect(store).toBeDefined();
    if (!store) return;
    expect(formatAddress(store)).toBe("6 Heussler Terrace, Milton, QLD 4064");
    expect(mapEmbedUrl(store)).toContain("output=embed");
    expect(directionsUrl(store)).toContain("destination=");
    expect(getStoreBySlug("nowhere")).toBeUndefined();
  });
});

describe("redirects", () => {
  const redirects = loadRedirects();

  test("sources are unique and never shadow a real page", () => {
    const routes = knownRoutes();
    const sources = redirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
    expect(sources.filter((s) => routes.has(s))).toEqual([]);
  });

  test("internal destinations point to real routes", () => {
    const routes = knownRoutes();
    const missing = redirects
      .map((r) => r.destination)
      .filter((d) => d.startsWith("/") && !routes.has(d.split("?")[0]));
    expect([...new Set(missing)]).toEqual([]);
  });
});
