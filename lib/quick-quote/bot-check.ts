import { checkBotId } from "botid/server";

export type BotCheckResult = "skipped" | "human" | "bot" | "unavailable";

// Vercel BotID: an invisible bot check that needs no keys; it only runs on Vercel and never blocks an enquiry when it can't answer
export async function checkForBot(env: Record<string, string | undefined> = process.env): Promise<BotCheckResult> {
  if (env.VERCEL !== "1") return "skipped";
  try {
    const result = await checkBotId();
    return result.isBot && !result.isVerifiedBot ? "bot" : "human";
  } catch {
    return "unavailable";
  }
}
