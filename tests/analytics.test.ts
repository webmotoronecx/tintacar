import { afterEach, describe, expect, test, vi } from "vitest";
import { gtmSnippet, pushDataLayer } from "@/lib/analytics";

type FakeScript = { async?: boolean; src?: string };
type FakeWindow = { location: { hostname: string; search: string }; dataLayer?: unknown[] };

// Runs the inline loader against a stub window/document for the given page URL
function runSnippet(url: string) {
  const { hostname, search } = new URL(url);
  const appended: FakeScript[] = [];
  const win: FakeWindow = { location: { hostname, search } };
  const doc = { createElement: (): FakeScript => ({}), head: { appendChild: (el: FakeScript) => appended.push(el) } };
  new Function("window", "document", gtmSnippet("GTM-TEST1", ["example.com", "www.example.com"]))(win, doc);
  return { appended, dataLayer: win.dataLayer };
}

describe("google tag manager loader", () => {
  test("loads the container on a live host", () => {
    const { appended, dataLayer } = runSnippet("https://example.com/car-window-tint/");
    expect(appended).toHaveLength(1);
    expect(appended[0]).toMatchObject({ async: true, src: "https://www.googletagmanager.com/gtm.js?id=GTM-TEST1" });
    expect(dataLayer?.[0]).toMatchObject({ event: "gtm.js" });
  });

  test("stays off on previews, staging and local hosts", () => {
    expect(runSnippet("https://example.vercel.app/").appended).toHaveLength(0);
    expect(runSnippet("http://localhost:3000/").appended).toHaveLength(0);
  });

  test("loads on any host while GTM preview is active", () => {
    expect(runSnippet("https://example.vercel.app/?gtm_debug=1763520000").appended).toHaveLength(1);
  });

  test("escapes config values so they cannot close the script tag", () => {
    expect(gtmSnippet("GTM-X</script><script>", ["</script>"])).not.toContain("</script>");
  });
});

describe("pushDataLayer", () => {
  afterEach(() => vi.unstubAllGlobals());

  test("queues events for the container", () => {
    vi.stubGlobal("window", {});
    pushDataLayer({ event: "cf7submission", formId: "enquiry" });
    pushDataLayer({ event: "second" });
    expect(window.dataLayer).toEqual([{ event: "cf7submission", formId: "enquiry" }, { event: "second" }]);
  });

  test("does nothing during server rendering", () => {
    expect(() => pushDataLayer({ event: "cf7submission" })).not.toThrow();
  });
});
