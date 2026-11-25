import nodemailer from "nodemailer";
import type { MailMessage } from "./email";

export type Mailer = { send(message: MailMessage): Promise<void> };

type Env = Record<string, string | undefined>;

const TIMEOUT_MS = 10_000;
const RESEND_URL = "https://api.resend.com/emails";

// Resend's HTTP API; errors carry the status and error name only, never the message (it can echo addresses)
function resendMailer(apiKey: string, from: string, fetchImpl: typeof fetch): Mailer {
  return {
    async send(message) {
      const response = await fetchImpl(RESEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [message.to],
          subject: message.subject,
          html: message.html,
          text: message.text,
          ...(message.replyTo ? { reply_to: message.replyTo } : {}),
          ...(message.bcc?.length ? { bcc: message.bcc } : {}),
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (response.ok) return;
      const body = (await response.json().catch(() => ({}))) as { name?: string };
      throw Object.assign(new Error("Resend rejected the email"), { code: body.name ?? "RESEND_ERROR", responseCode: response.status });
    },
  };
}

function smtpMailer(env: Env, host: string, from: string): Mailer {
  const port = Number(env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: env.SMTP_SECURE === "true" || port === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS ?? "" } : undefined,
    connectionTimeout: TIMEOUT_MS,
    greetingTimeout: TIMEOUT_MS,
    socketTimeout: TIMEOUT_MS,
  });

  return {
    async send(message) {
      await transport.sendMail({ from, ...message, bcc: message.bcc?.length ? message.bcc : undefined });
    },
  };
}

// Resend when RESEND_API_KEY is set, otherwise SMTP (e.g. Mimecast); null until a sender and QUICK_QUOTE_FROM are configured
export function createMailer(env: Env = process.env, fetchImpl: typeof fetch = fetch): Mailer | null {
  const from = env.QUICK_QUOTE_FROM;
  if (!from) return null;
  if (env.RESEND_API_KEY) return resendMailer(env.RESEND_API_KEY, from, fetchImpl);
  if (env.SMTP_HOST) return smtpMailer(env, env.SMTP_HOST, from);
  return null;
}
