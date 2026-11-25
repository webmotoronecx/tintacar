import type { QuickQuoteInput } from "./schema";
import type { QuickQuoteConfig, QuickQuoteReferrals } from "./types";

export type ReferralOutcome = { status: "skipped" | "sent" } | { status: "failed"; reason: string };

type ReferralOptions = {
  config: QuickQuoteConfig;
  /** Marks enquiries from staging and previews so the referrals team can ignore them */
  isTest: boolean;
  env?: Record<string, string | undefined>;
  fetchImpl?: typeof fetch;
};

const TIMEOUT_MS = 8_000;
const JSON_HEADERS = { "Content-Type": "application/json" };

class ReferralError extends Error {
  constructor(readonly reason: string) {
    super(reason);
  }
}

// e.g. "auto#Spectre Tint, Octane Tint", the format the WordPress code meant to send
export function enquiryAbout(data: QuickQuoteInput, config: QuickQuoteConfig): string {
  const interest = config.interests.find((item) => item.value === data.interest);
  return `${interest?.referralCode ?? ""}#${data.products.join(", ")}`;
}

// Same fields and fixed values the WordPress child theme posted, built as an object rather than hand-written JSON
export function buildReferral(data: QuickQuoteInput, storeId: string, config: QuickQuoteConfig, referrals: QuickQuoteReferrals, isTest: boolean) {
  return {
    StoreID: Number(storeId),
    FranchiseID: referrals.franchiseId,
    FirstName: data.name,
    LastName: "",
    ContactNumber: data.phone,
    Email: data.email,
    VehicleMake: data.vehicleMake ?? "",
    VehicleModel: data.vehicleModel ?? "",
    VehicleType: "",
    Comments: (data.comments ?? "").replace(/(\r?\n)+/g, "<BR>"),
    CustomerType: "",
    EnquiryAbout: enquiryAbout(data, config),
    IPAddress: "",
    IsTest: isTest ? "Y" : "N",
    OptIn: "N",
    CollectionStatement: "",
    CampaignID: referrals.campaignId,
  };
}

// Authenticate, then post the enquiry; skipped until credentials are set, and it never throws so the store email is unaffected
export async function pushReferral(data: QuickQuoteInput, storeId: string, { config, isTest, env = process.env, fetchImpl = fetch }: ReferralOptions): Promise<ReferralOutcome> {
  const referrals = config.referrals;
  const userName = env.REFERRALS_API_USERNAME;
  const password = env.REFERRALS_API_PASSWORD;
  if (!referrals || !userName || !password) return { status: "skipped" };
  const base = (env.REFERRALS_API_URL || referrals.url).replace(/\/+$/, "");

  try {
    const auth = await fetchImpl(`${base}/Authenticate`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ UserName: userName, Password: password }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!auth.ok) throw new ReferralError(`authenticate ${auth.status}`);
    const { token } = (await auth.json()) as { token?: string };
    if (!token) throw new ReferralError("authenticate returned no token");

    const enquiry = await fetchImpl(`${base}/Enquiry`, {
      method: "POST",
      headers: { ...JSON_HEADERS, Authorization: `Bearer ${token}` },
      body: JSON.stringify(buildReferral(data, storeId, config, referrals, isTest)),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!enquiry.ok) throw new ReferralError(`enquiry ${enquiry.status}`);
    return { status: "sent" };
  } catch (error: unknown) {
    // Reason only: response bodies can echo the customer's details
    const reason = error instanceof ReferralError ? error.reason : error instanceof Error ? error.name : "unknown error";
    return { status: "failed", reason };
  }
}
