import { afterEach, describe, expect, test, vi } from "vitest";
import { quickQuoteConfig } from "@/config/quick-quote";
import { verifyRecaptcha } from "@/lib/quick-quote/recaptcha";
import { createQuickQuoteSchema } from "@/lib/quick-quote/schema";
import { validQuote } from "./fixtures/quick-quote";

const schema = createQuickQuoteSchema(quickQuoteConfig);

describe("quick quote schema", () => {
  test("accepts a complete automotive enquiry", () => {
    expect(schema.safeParse(validQuote).success).toBe(true);
  });

  test("requires at least one product from the chosen interest", () => {
    const none = schema.safeParse({ ...validQuote, products: [] });
    const wrongList = schema.safeParse({ ...validQuote, products: ["Heat Reduction"] });
    expect(none.success).toBe(false);
    expect(wrongList.success).toBe(false);
    expect(none.error?.issues[0].path).toEqual(["products"]);
  });

  test("accepts residential products for a residential enquiry", () => {
    expect(schema.safeParse({ ...validQuote, interest: "residential", products: ["Increased Privacy"], vehicleMake: "", vehicleModel: "" }).success).toBe(true);
  });

  test("rejects missing contact details and unknown interests", () => {
    const result = schema.safeParse({ ...validQuote, interest: "boats", phone: "call me", email: "nope", name: "" });
    const fields = result.error?.issues.map((issue) => issue.path[0]);
    expect(fields).toEqual(expect.arrayContaining(["interest", "phone", "email", "name"]));
  });
});

describe("verifyRecaptcha", () => {
  afterEach(() => vi.unstubAllGlobals());

  test("is skipped when no secret is configured", async () => {
    expect(await verifyRecaptcha("token", "1.1.1.1", { secret: "" })).toBe("skipped");
  });

  test("fails without a token once configured", async () => {
    expect(await verifyRecaptcha(undefined, "1.1.1.1", { secret: "s" })).toBe("failed");
  });

  test("passes a good score for the expected action and fails a low one", async () => {
    const respond = (body: object) => vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status: 200 }));
    vi.stubGlobal("fetch", respond({ success: true, score: 0.9, action: "quick_quote" }));
    expect(await verifyRecaptcha("t", "1.1.1.1", { secret: "s" })).toBe("passed");
    vi.stubGlobal("fetch", respond({ success: true, score: 0.1, action: "quick_quote" }));
    expect(await verifyRecaptcha("t", "1.1.1.1", { secret: "s" })).toBe("failed");
  });

  test("reports Google outages as unavailable instead of failing the enquiry", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("timeout")));
    expect(await verifyRecaptcha("t", "1.1.1.1", { secret: "s" })).toBe("unavailable");
  });
});
