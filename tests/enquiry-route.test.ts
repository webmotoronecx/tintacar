import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { POST } from "@/app/api/enquiry/route";

const valid = { name: "Sam Citizen", email: "sam@example.com", phone: "0400 123 456", message: "Quote for a sedan please", store: "milton" };
let ipCounter = 0;

function enquiryRequest(body: unknown, headers: Record<string, string> = {}) {
  ipCounter += 1;
  return new NextRequest("http://localhost:3000/api/enquiry/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      host: "localhost:3000",
      origin: "http://localhost:3000",
      "x-real-ip": `10.0.0.${ipCounter}`,
      ...headers,
    },
  });
}

describe("POST /api/enquiry", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("rejects cross-origin requests", async () => {
    const response = await POST(enquiryRequest(valid, { origin: "https://evil.example" }));
    expect(response.status).toBe(403);
  });

  test("rejects requests without Origin or same-origin fetch metadata", async () => {
    const request = enquiryRequest(valid);
    request.headers.delete("origin");
    expect((await POST(request)).status).toBe(403);
  });

  test("returns field errors for invalid input", async () => {
    const response = await POST(enquiryRequest({ ...valid, email: "nope" }));
    const body = await response.json();
    expect(response.status).toBe(422);
    expect(body.fieldErrors.email).toBeDefined();
  });

  test("rejects an unknown store", async () => {
    const response = await POST(enquiryRequest({ ...valid, store: "atlantis" }));
    expect(response.status).toBe(422);
  });

  test("silently accepts honeypot submissions without forwarding", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.com/enquiry");
    const response = await POST(enquiryRequest({ ...valid, company: "Spam Co" }));
    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("reports 503 when no webhook is configured", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "");
    const response = await POST(enquiryRequest(valid));
    expect(response.status).toBe(503);
  });

  test("forwards a valid enquiry with store details to the webhook", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.com/enquiry");

    const response = await POST(enquiryRequest(valid));
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(payload.store.name).toBe("Tint a Car Milton");
    expect(payload).not.toHaveProperty("company");
  });

  test("returns 502 when the webhook fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })));
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.com/enquiry");
    expect((await POST(enquiryRequest(valid))).status).toBe(502);
  });

  test("rate limits repeated requests from one IP", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "");
    const statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      statuses.push((await POST(enquiryRequest(valid, { "x-real-ip": "203.0.113.9" }))).status);
    }
    expect(statuses.at(-1)).toBe(429);
  });

  test("accepts same-origin fetch metadata when Origin is absent", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "");
    const request = enquiryRequest(valid, { "sec-fetch-site": "same-origin" });
    request.headers.delete("origin");
    expect((await POST(request)).status).toBe(503);
  });

  test("rejects a malformed Origin header", async () => {
    expect((await POST(enquiryRequest(valid, { origin: "null" }))).status).toBe(403);
  });

  test("rejects non-JSON content types and bodies", async () => {
    expect((await POST(enquiryRequest(valid, { "content-type": "text/plain" }))).status).toBe(415);
    const broken = new NextRequest("http://localhost:3000/api/enquiry/", {
      method: "POST",
      body: "{not json",
      headers: { "content-type": "application/json", host: "localhost:3000", origin: "http://localhost:3000", "x-real-ip": "10.9.9.9" },
    });
    expect((await POST(broken)).status).toBe(400);
  });

  test("rejects oversized bodies", async () => {
    const big = { ...valid, message: "x".repeat(20_000) };
    expect((await POST(enquiryRequest(big))).status).toBe(413);
    expect((await POST(enquiryRequest(valid, { "content-length": "999999" }))).status).toBe(413);
  });

  test("returns 502 when the webhook request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.com/enquiry");
    expect((await POST(enquiryRequest(valid))).status).toBe(502);
  });
});
