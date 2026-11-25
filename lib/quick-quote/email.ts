import type { QuickQuoteInput } from "./schema";
import type { QuickQuoteConfig, QuickQuoteStore } from "./types";

export type MailMessage = {
  to: string;
  replyTo?: string;
  bcc?: string[];
  subject: string;
  text: string;
  html: string;
};

/** Store fields the emails need, including the inbox */
export type QuickQuoteRecipient = QuickQuoteStore & { email: string };

const EMAIL = /^[^@\s,]+@[^@\s,]+\.[a-z]{2,}$/i;

// BCC list for a store's state group, read from that group's env var
export function bccFor(state: string, config: QuickQuoteConfig, env: Record<string, string | undefined> = process.env): string[] {
  const group = config.bccGroups.find((item) => item.states.includes(state.trim().toUpperCase()));
  if (!group) return [];
  return (env[group.env] ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter((address) => EMAIL.test(address));
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function storeAddress(store: QuickQuoteRecipient): string {
  return [store.street, store.suburb, `${store.state} ${store.postcode}`.trim()].filter(Boolean).join(", ");
}

// Enquiry fields as label/value rows, skipping anything left blank
export function enquiryRows(data: QuickQuoteInput, store: QuickQuoteRecipient, config: QuickQuoteConfig): [string, string][] {
  const interest = config.interests.find((item) => item.value === data.interest);
  const rows: [string, string | undefined][] = [
    ["I'm interested in", interest?.label],
    ["Products", data.products.join(", ")],
    ["Vehicle make", interest?.vehicle ? data.vehicleMake : undefined],
    ["Vehicle model", interest?.vehicle ? data.vehicleModel : undefined],
    ["Full name", data.name],
    ["Preferred store", store.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Address", data.address],
    ["Comments", data.comments],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1]?.trim()));
}

function render(intro: string[], rows: [string, string][], outro: string[]): { text: string; html: string } {
  const text = [...intro, "", ...rows.map(([label, value]) => `${label}: ${value}`), "", ...outro].join("\n").trim();
  const table = rows
    .map(([label, value]) => `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(label)}</th><td style="padding:4px 0;white-space:pre-line">${escapeHtml(value)}</td></tr>`)
    .join("");
  const paragraphs = (lines: string[]) => lines.filter(Boolean).map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#162329">${paragraphs(intro)}<table cellspacing="0">${table}</table>${paragraphs(outro)}</div>`;
  return { text, html };
}

// The enquiry the store works from; replying goes straight to the customer
export function buildStoreEmail(data: QuickQuoteInput, store: QuickQuoteRecipient, config: QuickQuoteConfig, bcc: string[] = []): MailMessage {
  const body = render([`New Quick Quote enquiry for ${store.name}.`], enquiryRows(data, store, config), []);
  return { to: store.email, replyTo: data.email, bcc, subject: `${config.brandName} ${data.name}`, ...body };
}

// Confirmation to the customer; replying reaches their chosen store
export function buildAutoreply(data: QuickQuoteInput, store: QuickQuoteRecipient, config: QuickQuoteConfig): MailMessage {
  const firstName = data.name.trim().split(/\s+/)[0];
  const contact = store.phone ? `If you need us sooner, call the store on ${store.phone}.` : "";
  const body = render(
    [`Hi ${firstName},`, `Thanks for contacting ${store.name}. We've received your enquiry and will be in touch as soon as we can.`, contact, "Your enquiry:"],
    enquiryRows(data, store, config),
    [store.name, storeAddress(store)],
  );
  return { to: data.email, replyTo: store.email, subject: `Thanks for contacting ${store.name}`, ...body };
}
