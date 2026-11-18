import fs from "node:fs";
import path from "node:path";
import type { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Reads and validates a JSON file under /content. Returns null when the file does not exist. */
export function readContentFile<T extends z.ZodType>(relativePath: string, schema: T): z.infer<T> | null {
  const file = path.join(CONTENT_DIR, relativePath);
  if (!file.startsWith(CONTENT_DIR) || !fs.existsSync(file)) return null;

  const raw: unknown = JSON.parse(fs.readFileSync(file, "utf8"));
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid content in ${relativePath}: ${result.error.message}`);
  }
  return result.data;
}
