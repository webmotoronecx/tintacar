import { NextResponse, type NextRequest } from "next/server";

export type ApiReply = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export function reply(body: ApiReply, status: number): NextResponse<ApiReply> {
  return NextResponse.json(body, { status });
}

// Browsers always send Origin (or Sec-Fetch-Site) on fetch POSTs; anything else is rejected
export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") === "same-origin";
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

// Relies on the hosting platform/proxy overwriting these headers (true on Vercel and most proxies)
export function clientIp(request: NextRequest): string {
  return request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

// First message per top-level field, keyed by field name
export function fieldErrorsFrom(issues: { path: PropertyKey[]; message: string }[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const field = String(issue.path[0] ?? "form");
    if (!(field in errors)) errors[field] = issue.message;
  }
  return errors;
}

// Reads a same-origin JSON body within a size limit, or returns the error response to send
export async function readJsonBody(request: NextRequest, maxBytes: number): Promise<{ data: unknown } | { response: NextResponse<ApiReply> }> {
  if (!isSameOrigin(request)) return { response: reply({ success: false, error: "Invalid request origin." }, 403) };
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return { response: reply({ success: false, error: "Unsupported content type." }, 415) };
  }
  const tooLong = { response: reply({ success: false, error: "Request is too long." }, 413) };
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes) return tooLong;

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > maxBytes) return tooLong;
  try {
    return { data: JSON.parse(raw) };
  } catch {
    return { response: reply({ success: false, error: "Invalid request body." }, 400) };
  }
}
