import type { NextRequest } from "next/server";
import { quickQuoteConfig } from "@/config/quick-quote";
import { siteConfig } from "@/config/site.config";
import { clientIp, fieldErrorsFrom, readJsonBody, reply } from "@/lib/api";
import { isRateLimited } from "@/lib/rate-limit";
import { buildAutoreply, buildStoreEmail } from "@/lib/quick-quote/email";
import { createMailer } from "@/lib/quick-quote/mailer";
import { verifyRecaptcha } from "@/lib/quick-quote/recaptcha";
import { createQuickQuoteSchema } from "@/lib/quick-quote/schema";
import { getStoreBySparkId, toQuickQuoteStore } from "@/lib/stores";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const CALL_US = siteConfig.phone.label.toLowerCase();
const FALLBACK_ERROR = `Sorry, we couldn't send your enquiry. Please try again or ${CALL_US}.`;
const schema = createQuickQuoteSchema(quickQuoteConfig);

// SMTP error codes only: messages can echo recipient addresses, and customer data must stay out of logs
function mailError(error: unknown): string {
  const { code, responseCode } = (error ?? {}) as { code?: string; responseCode?: number };
  return [code, responseCode].filter(Boolean).join(" ") || "unknown error";
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request, MAX_BODY_BYTES);
  if ("response" in body) return body.response;

  const ip = clientIp(request);
  if (isRateLimited(`quick-quote:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return reply({ success: false, error: `Too many enquiries. Please try again later or ${CALL_US}.` }, 429);
  }

  const parsed = schema.safeParse(body.data);
  if (!parsed.success) {
    return reply({ success: false, error: "Please check the highlighted fields.", fieldErrors: fieldErrorsFrom(parsed.error.issues) }, 422);
  }
  const data = parsed.data;

  // Honeypot filled: pretend success so bots get no signal
  if (data.company) return reply({ success: true }, 200);

  const captcha = await verifyRecaptcha(data.recaptchaToken, ip);
  if (captcha === "failed") return reply({ success: false, error: `We couldn't verify your request. Please try again or ${CALL_US}.` }, 400);
  if (captcha === "unavailable") console.warn("[quick-quote] reCAPTCHA could not be reached; continuing without it.");

  const store = getStoreBySparkId(data.store);
  if (!store) return reply({ success: false, error: "Please check the highlighted fields.", fieldErrors: { store: "Please choose a store" } }, 422);

  const mailer = createMailer();
  if (!mailer) {
    console.error("[quick-quote] SMTP is not configured; enquiry was not delivered.");
    return reply({ success: false, error: FALLBACK_ERROR }, 503);
  }

  // The store email must go out; the customer autoreply is best effort
  const recipient = { ...toQuickQuoteStore(store), email: store.email };
  try {
    await mailer.send(buildStoreEmail(data, recipient, quickQuoteConfig));
  } catch (error: unknown) {
    console.error("[quick-quote] Store email failed:", mailError(error));
    return reply({ success: false, error: FALLBACK_ERROR }, 502);
  }
  try {
    await mailer.send(buildAutoreply(data, recipient, quickQuoteConfig));
  } catch (error: unknown) {
    console.error("[quick-quote] Customer autoreply failed:", mailError(error));
  }
  return reply({ success: true }, 200);
}
