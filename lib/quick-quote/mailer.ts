import nodemailer from "nodemailer";
import type { MailMessage } from "./email";

export type Mailer = { send(message: MailMessage): Promise<void> };

const TIMEOUT_MS = 10_000;

// SMTP mailer (e.g. Mimecast) built from env vars; null until SMTP_HOST and QUICK_QUOTE_FROM are set
export function createMailer(env: Record<string, string | undefined> = process.env): Mailer | null {
  const host = env.SMTP_HOST;
  const from = env.QUICK_QUOTE_FROM;
  if (!host || !from) return null;

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
