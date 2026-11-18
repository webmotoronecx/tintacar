import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site.config";
import { enquirySchema, type EnquiryInput, type EnquiryResponse } from "@/lib/enquiry";
import { isRateLimited } from "@/lib/rate-limit";
import { formatAddress, getStoreBySlug } from "@/lib/stores";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const WEBHOOK_TIMEOUT_MS = 10_000;
const FALLBACK_ERROR = `Sorry, we couldn't send your enquiry. Please try again or ${siteConfig.phone.label.toLowerCase()}.`;

function reply(body: EnquiryResponse, status: number) {
  return NextResponse.json(body, { status });
}

// Browsers always send Origin (or Sec-Fetch-Site) on fetch POSTs; anything else is rejected
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") === "same-origin";
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

// Relies on the hosting platform/proxy overwriting these headers (true on Vercel and most proxies)
function clientIp(request: NextRequest): string {
  return request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function fieldErrorsFrom(issues: { path: PropertyKey[]; message: string }[]): EnquiryResponse["fieldErrors"] {
  return Object.fromEntries(issues.map((issue) => [String(issue.path[0]), issue.message]));
}

async function forwardEnquiry(webhookUrl: string, data: EnquiryInput): Promise<boolean> {
  const store = data.store ? getStoreBySlug(data.store) : undefined;
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    store: store ? { slug: store.slug, name: store.name, address: formatAddress(store), phone: store.phone } : undefined,
    submittedAt: new Date().toISOString(),
    source: "website-enquiry",
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });
  return response.ok;
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return reply({ success: false, error: "Invalid request origin." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return reply({ success: false, error: "Unsupported content type." }, 415);
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return reply({ success: false, error: "Enquiry is too long." }, 413);
  }

  if (isRateLimited(`enquiry:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return reply({ success: false, error: `Too many enquiries. Please try again later or ${siteConfig.phone.label.toLowerCase()}.` }, 429);
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) return reply({ success: false, error: "Enquiry is too long." }, 413);

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return reply({ success: false, error: "Invalid request body." }, 400);
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    return reply({ success: false, error: "Please check the highlighted fields.", fieldErrors: fieldErrorsFrom(parsed.error.issues) }, 422);
  }

  // Honeypot filled: pretend success so bots get no signal
  if (parsed.data.company) return reply({ success: true }, 200);

  if (parsed.data.store && !getStoreBySlug(parsed.data.store)) {
    return reply({ success: false, error: "Please choose a valid store." }, 422);
  }

  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[enquiry] ENQUIRY_WEBHOOK_URL is not configured; enquiry was not delivered.");
    return reply({ success: false, error: FALLBACK_ERROR }, 503);
  }

  try {
    const delivered = await forwardEnquiry(webhookUrl, parsed.data);
    if (!delivered) {
      console.error("[enquiry] Webhook responded with a non-2xx status.");
      return reply({ success: false, error: FALLBACK_ERROR }, 502);
    }
    return reply({ success: true }, 200);
  } catch (error: unknown) {
    console.error("[enquiry] Webhook request failed:", error instanceof Error ? error.message : error);
    return reply({ success: false, error: FALLBACK_ERROR }, 502);
  }
}
