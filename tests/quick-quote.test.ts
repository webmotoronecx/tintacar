import { afterEach, describe, expect, test, vi } from "vitest";
import { quickQuoteConfig } from "@/config/quick-quote";
import { buildAutoreply, buildStoreEmail } from "@/lib/quick-quote/email";
import { createMailer } from "@/lib/quick-quote/mailer";
import { verifyRecaptcha } from "@/lib/quick-quote/recaptcha";
import { createQuickQuoteSchema } from "@/lib/quick-quote/schema";
import { validQuote } from "./fixtures/quick-quote";

const schema = createQuickQuoteSchema(quickQuoteConfig);
const store = { id: "76", name: "Tint a Car Alexandria", street: "966 Elizabeth Street", suburb: "Zetland", postcode: "2017", state: "NSW", phone: "02 9119 7102", email: "Alexandria@tintacar.com.au" };
const parse = (input: object) => schema.parse(input);

describe("quick quote emails", () => {
  test("store email goes to the store inbox, replies reach the customer", () => {
    const mail = buildStoreEmail(parse(validQuote), store, quickQuoteConfig);
    expect(mail).toMatchObject({ to: store.email, replyTo: "sam@example.com", subject: "Tint a Car Sam Citizen" });
    expect(mail.text).toContain("Products: Spectre Tint");
    expect(mail.text).toContain("Vehicle make: Toyota");
  });

  test("residential enquiries leave out vehicle details", () => {
    const mail = buildStoreEmail(parse({ ...validQuote, interest: "residential", products: ["Heat Reduction"] }), store, quickQuoteConfig);
    expect(mail.text).not.toContain("Vehicle");
  });

  test("customer input is escaped in HTML", () => {
    const mail = buildStoreEmail(parse({ ...validQuote, comments: '<img src=x onerror="alert(1)">' }), store, quickQuoteConfig);
    expect(mail.html).not.toContain("<img");
    expect(mail.html).toContain("&lt;img");
  });

  test("autoreply thanks the customer and points replies at the store", () => {
    const mail = buildAutoreply(parse(validQuote), store, quickQuoteConfig);
    expect(mail).toMatchObject({ to: "sam@example.com", replyTo: store.email, subject: "Thanks for contacting Tint a Car Alexandria" });
    expect(mail.text).toMatch(/^Hi Sam,/);
    expect(mail.text).toContain("02 9119 7102");
  });

  test("mailer stays off until SMTP is configured", () => {
    expect(createMailer({})).toBeNull();
    expect(createMailer({ SMTP_HOST: "smtp.example.com", QUICK_QUOTE_FROM: "Tint a Car <noreply@example.com>" })).not.toBeNull();
  });
});

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
