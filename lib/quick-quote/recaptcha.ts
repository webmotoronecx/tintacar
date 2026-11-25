const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const TIMEOUT_MS = 5_000;
const MIN_SCORE = 0.5;

export type RecaptchaResult = "skipped" | "passed" | "failed" | "unavailable";

// reCAPTCHA v3 check: skipped without a secret, and an outage never blocks a genuine enquiry
export async function verifyRecaptcha(
  token: string | undefined,
  ip: string,
  { secret = process.env.RECAPTCHA_SECRET_KEY, action = "quick_quote" }: { secret?: string; action?: string } = {},
): Promise<RecaptchaResult> {
  if (!secret) return "skipped";
  if (!token) return "failed";

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return "unavailable";
    const result = (await response.json()) as { success?: boolean; score?: number; action?: string };
    const scoreOk = result.score === undefined || result.score >= MIN_SCORE;
    const actionOk = !result.action || result.action === action;
    return result.success === true && scoreOk && actionOk ? "passed" : "failed";
  } catch {
    return "unavailable";
  }
}
