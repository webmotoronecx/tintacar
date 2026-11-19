import { describe, expect, test } from "vitest";
import { optimizeHtmlImages } from "@/lib/rich-text";

const banner = '<p><img src="/images/articles/banner.png" alt="Tints from $295" width="2100" height="600"></p>';
const photo = '<img class="right" src="/images/articles/photo.jpg" alt="Photo" width="310" height="207">';

describe("optimizeHtmlImages", () => {
  test("serves local raster images through the image optimizer", () => {
    const html = optimizeHtmlImages(banner + photo, 840);
    expect(html).toContain('srcset="/_next/image?url=%2Fimages%2Farticles%2Fbanner.png&amp;w=');
    expect(html).toContain('sizes="(min-width: 840px) 840px, 100vw"');
    // Narrow images keep their own size, so they get density candidates instead of sizes
    expect(html).toMatch(/url=%2Fimages%2Farticles%2Fphoto\.jpg&amp;w=\d+&amp;q=75 1x, [^"]+ 2x"/);
    expect(html.match(/sizes="/g)).toHaveLength(1);
    expect(html).toContain('alt="Tints from $295" width="2100" height="600"');
    expect(html).toContain('class="right"');
  });

  test("keeps the first image eager and lazy-loads the rest", () => {
    const html = optimizeHtmlImages(banner + photo);
    const loading = [...html.matchAll(/loading="(\w+)"/g)].map((m) => m[1]);
    expect(loading).toEqual(["eager", "lazy"]);
  });

  test("leaves external, animated, vector, unsized and pre-optimised images alone", () => {
    const untouched = [
      '<img src="https://example.com/a.png" width="10" height="10">',
      '<img src="/images/a.gif" width="10" height="10">',
      '<img src="/images/a.svg" width="10" height="10">',
      '<img src="/images/a.png">',
      '<img src="/images/a.png" srcset="/images/a.png 1x" width="10" height="10">',
    ].join("");
    expect(optimizeHtmlImages(untouched)).toBe(untouched);
  });
});
