import { afterEach, describe, expect, test, vi } from "vitest";
import { distanceKm } from "@/lib/geo";
import { getPageByPath, pageMetadata, pathToSegments } from "@/lib/pages";
import { isRateLimited } from "@/lib/rate-limit";
import { cn, formatDate, isExternalHref, stripHtml } from "@/lib/utils";

describe("utils", () => {
  test("isExternalHref treats web, tel and mailto links as external", () => {
    expect(isExternalHref("https://example.com")).toBe(true);
    expect(isExternalHref("//cdn.example.com/x.js")).toBe(true);
    expect(isExternalHref("tel:138468")).toBe(true);
    expect(isExternalHref("mailto:a@b.com")).toBe(true);
    expect(isExternalHref("/car-window-tint/")).toBe(false);
    expect(isExternalHref("#enquire")).toBe(false);
  });

  test("cn merges conflicting tailwind classes", () => {
    expect(cn("px-2 text-sm", false, "px-4")).toBe("text-sm px-4");
  });

  test("stripHtml removes tags and collapses whitespace", () => {
    expect(stripHtml("<p>Hello <strong>tint</strong></p>\n<p>world</p>")).toBe("Hello tint world");
  });

  test("formatDate renders an Australian long date", () => {
    expect(formatDate("2024-10-16T10:00:00")).toBe("16 October 2024");
  });
});

describe("geo", () => {
  test("distanceKm returns ~714 km between Sydney and Melbourne", () => {
    const sydney = { lat: -33.8688, lng: 151.2093 };
    const melbourne = { lat: -37.8136, lng: 144.9631 };
    expect(distanceKm(sydney, melbourne)).toBeGreaterThan(700);
    expect(distanceKm(sydney, melbourne)).toBeLessThan(730);
  });

  test("distanceKm is zero for the same point", () => {
    expect(distanceKm({ lat: -27.46, lng: 153.0 }, { lat: -27.46, lng: 153.0 })).toBe(0);
  });
});

describe("rate limit", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("blocks requests over the limit inside the window", () => {
    const key = `test-${Math.random()}`;
    expect(isRateLimited(key, 2, 60_000)).toBe(false);
    expect(isRateLimited(key, 2, 60_000)).toBe(false);
    expect(isRateLimited(key, 2, 60_000)).toBe(true);
  });

  test("resets after the window passes", () => {
    vi.useFakeTimers();
    const key = `test-${Math.random()}`;
    isRateLimited(key, 1, 1_000);
    expect(isRateLimited(key, 1, 1_000)).toBe(true);
    vi.advanceTimersByTime(1_001);
    expect(isRateLimited(key, 1, 1_000)).toBe(false);
  });
});

describe("pages", () => {
  test("getPageByPath normalises slashes", () => {
    expect(getPageByPath("/")?.path).toBe("/");
    expect(getPageByPath("contact-a-store")?.path).toBe("/contact-a-store/");
    expect(getPageByPath("/contact-a-store/")?.path).toBe("/contact-a-store/");
    expect(getPageByPath("does-not-exist")).toBeUndefined();
  });

  test("pathToSegments splits a route path", () => {
    expect(pathToSegments("/home-tint/heat/")).toEqual(["home-tint", "heat"]);
  });

  test("pageMetadata uses the page SEO fields", () => {
    const page = getPageByPath("/contact-a-store/");
    expect(page).toBeDefined();
    const meta = page ? pageMetadata(page) : {};
    expect(meta.alternates?.canonical).toBe("/contact-a-store/");
    expect(meta.description).toBe(page?.seo.description);
  });
});
