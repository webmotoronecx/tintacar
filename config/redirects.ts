import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];
type RedirectEntry = { source: string; destination: string };

const REDIRECTS_FILE = path.join(process.cwd(), "config", "redirect-list.json");

function isRedirectEntry(value: unknown): value is RedirectEntry {
  const entry = value as RedirectEntry;
  return typeof entry?.source === "string" && entry.source.startsWith("/") && typeof entry.destination === "string";
}

// Permanent redirects carried over from the WordPress site; add new ones to redirect-list.json
export function loadRedirects(): Redirect[] {
  const list: unknown = JSON.parse(fs.readFileSync(REDIRECTS_FILE, "utf8"));
  if (!Array.isArray(list) || !list.every(isRedirectEntry)) {
    throw new Error(`Invalid redirect list in ${REDIRECTS_FILE}`);
  }
  return list.map(({ source, destination }) => ({ source, destination, permanent: true }));
}
