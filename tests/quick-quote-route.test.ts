import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { POST } from "@/app/api/quick-quote/route";
import { checkForBot } from "@/lib/quick-quote/bot-check";
import type { MailMessage } from "@/lib/quick-quote/email";
import { createMailer } from "@/lib/quick-quote/mailer";
import { pushReferral } from "@/lib/quick-quote/referrals";
import { validQuote } from "./fixtures/quick-quote";

vi.mock("@/lib/quick-quote/mailer", () => ({ createMailer: vi.fn() }));
vi.mock("@/lib/quick-quote/bot-check", () => ({ checkForBot: vi.fn() }));
vi.mock("@/lib/quick-quote/referrals", () => ({ pushReferral: vi.fn() }));
// Runs after() work straight away and keeps the promise, since tests have no request scope
const afterTasks: Promise<unknown>[] = [];
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return { ...actual, after: (task: () => Promise<unknown>) => afterTasks.push(task()) };
});

const sent: MailMessage[] = [];
const send = vi.fn(async (message: MailMessage) => {
  sent.push(message);
});
let ipCounter = 0;

function quoteRequest(body: unknown, headers: Record<string, string> = {}) {
  ipCounter += 1;
  return new NextRequest("http://localhost:3000/api/quick-quote/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      host: "localhost:3000",
      origin: "http://localhost:3000",
      "x-real-ip": `10.1.0.${ipCounter}`,
      ...headers,
    },
  });
}

describe("POST /api/quick-quote", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    sent.length = 0;
    afterTasks.length = 0;
    send.mockClear();
    vi.mocked(createMailer).mockReturnValue({ send });
    vi.mocked(checkForBot).mockResolvedValue("skipped");
    vi.mocked(pushReferral).mockReset().mockResolvedValue({ status: "sent" });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("rejects cross-origin and non-JSON requests", async () => {
    expect((await POST(quoteRequest(validQuote, { origin: "https://evil.example" }))).status).toBe(403);
    expect((await POST(quoteRequest(validQuote, { "content-type": "text/plain" }))).status).toBe(415);
  });

  test("returns field errors for invalid input", async () => {
    const response = await POST(quoteRequest({ ...validQuote, products: [], email: "nope" }));
    const body = await response.json();
    expect(response.status).toBe(422);
    expect(Object.keys(body.fieldErrors)).toEqual(expect.arrayContaining(["products", "email"]));
  });

  test("rejects a store that does not exist", async () => {
    const response = await POST(quoteRequest({ ...validQuote, store: "999999" }));
    expect(response.status).toBe(422);
    expect((await response.json()).fieldErrors.store).toBeDefined();
  });

  test("silently accepts honeypot submissions", async () => {
    const response = await POST(quoteRequest({ ...validQuote, company: "Spam Co" }));
    expect(response.status).toBe(200);
  });

  test("rejects a failed spam check once reCAPTCHA is configured", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "secret");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 })));
    const response = await POST(quoteRequest({ ...validQuote, recaptchaToken: "bad" }));
    expect(response.status).toBe(400);
  });

  test("emails the chosen store, then the customer", async () => {
    const response = await POST(quoteRequest(validQuote));
    expect(response.status).toBe(200);
    expect(sent.map((mail) => mail.to)).toEqual(["Alexandria@tintacar.com.au", "sam@example.com"]);
  });

  test("copies the store email to its state group only", async () => {
    vi.stubEnv("QUICK_QUOTE_BCC_NSW_QLD_ACT", "nsw-manager@example.com");
    vi.stubEnv("QUICK_QUOTE_BCC_VIC_TAS", "vic-manager@example.com");
    await POST(quoteRequest(validQuote));
    expect(sent[0].bcc).toEqual(["nsw-manager@example.com"]);
    expect(sent[1].bcc).toBeUndefined();
  });

  test("rejects bots flagged by BotID, and carries on when BotID cannot answer", async () => {
    vi.mocked(checkForBot).mockResolvedValueOnce("bot");
    expect((await POST(quoteRequest(validQuote))).status).toBe(400);
    vi.mocked(checkForBot).mockResolvedValueOnce("unavailable");
    expect((await POST(quoteRequest(validQuote))).status).toBe(200);
  });

  test("pushes the referral after the store email, flagged as a test off the live domain", async () => {
    await POST(quoteRequest(validQuote));
    await Promise.all(afterTasks);
    expect(pushReferral).toHaveBeenCalledWith(expect.objectContaining({ store: "76", email: "sam@example.com" }), "76", expect.objectContaining({ isTest: true }));

    await POST(quoteRequest(validQuote, { host: "www.tintacar.com.au", origin: "https://www.tintacar.com.au" }));
    await Promise.all(afterTasks);
    expect(vi.mocked(pushReferral).mock.calls[1][2]).toMatchObject({ isTest: false });
  });

  test("skips the referral when the store email fails, and logs referral failures without customer details", async () => {
    send.mockRejectedValueOnce(Object.assign(new Error("rejected"), { code: "EENVELOPE" }));
    await POST(quoteRequest(validQuote));
    expect(pushReferral).not.toHaveBeenCalled();

    vi.mocked(pushReferral).mockResolvedValueOnce({ status: "failed", reason: "enquiry 500" });
    expect((await POST(quoteRequest(validQuote))).status).toBe(200);
    await Promise.all(afterTasks);
    const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logged).toContain("enquiry 500");
    expect(logged).not.toContain("sam@example.com");
  });

  test("sends staging enquiries to the test inbox, but never on the live domain", async () => {
    vi.stubEnv("QUICK_QUOTE_TEST_INBOX", "qa@example.com");
    await POST(quoteRequest(validQuote));
    expect(sent.map((mail) => mail.to)).toEqual(["qa@example.com", "sam@example.com"]);
    expect(sent[1].replyTo).toBe("qa@example.com");

    sent.length = 0;
    await POST(quoteRequest(validQuote, { host: "tintacar.com.au", origin: "https://tintacar.com.au" }));
    expect(sent[0].to).toBe("Alexandria@tintacar.com.au");
  });

  test("fails loudly when email is not configured", async () => {
    vi.mocked(createMailer).mockReturnValue(null);
    expect((await POST(quoteRequest(validQuote))).status).toBe(503);
  });

  test("reports a failed store email but tolerates a failed autoreply", async () => {
    send.mockRejectedValueOnce(Object.assign(new Error("rejected sam@example.com"), { code: "EENVELOPE" }));
    expect((await POST(quoteRequest(validQuote))).status).toBe(502);

    send.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("mailbox full"));
    expect((await POST(quoteRequest(validQuote))).status).toBe(200);
  });

  test("never writes customer details to the logs", async () => {
    send.mockRejectedValueOnce(Object.assign(new Error("550 rejected sam@example.com"), { code: "EENVELOPE", responseCode: 550 }));
    await POST(quoteRequest(validQuote));
    const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logged).toContain("EENVELOPE 550");
    expect(logged).not.toContain("sam@example.com");
  });

  test("rate limits repeated submissions from one address", async () => {
    const statuses = [];
    for (let i = 0; i < 6; i += 1) statuses.push((await POST(quoteRequest({ ...validQuote, products: [] }, { "x-real-ip": "10.9.9.9" }))).status);
    expect(statuses.at(-1)).toBe(429);
  });
});
