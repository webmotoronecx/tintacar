import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** True for links that should open outside the Next.js router */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Lower-cases only the first letter, so "Call 13 TINT" can sit mid-sentence as "call 13 TINT" */
export function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
