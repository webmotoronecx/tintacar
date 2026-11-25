import { z } from "zod";
import type { QuickQuoteConfig } from "./types";

const PHONE = /^[0-9+()\s-]{6,20}$/;
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

// Builds the enquiry contract from the site's interests, so product ticks are checked against that interest's list
export function createQuickQuoteSchema(config: QuickQuoteConfig) {
  const interestValues = config.interests.map((interest) => interest.value) as [string, ...string[]];

  return z
    .object({
      interest: z.enum(interestValues, { message: "Please choose an option" }),
      products: z.array(z.string().max(100)).max(20).default([]),
      vehicleMake: optionalText(60),
      vehicleModel: optionalText(60),
      name: z.string().trim().min(2, "Please enter your full name").max(100),
      store: z.string().regex(/^\d+$/, "Please choose a store"),
      phone: z.string().trim().regex(PHONE, "Please enter a valid phone number"),
      email: z.email("Please enter a valid email address").max(200),
      address: optionalText(200),
      comments: optionalText(2000),
      // Honeypot: real visitors never see or fill this field
      company: z.string().max(200).optional(),
      recaptchaToken: z.string().max(4000).optional(),
    })
    .superRefine((data, ctx) => {
      const interest = config.interests.find((item) => item.value === data.interest);
      if (!interest) return;
      const allowed = data.products.filter((product) => interest.products.includes(product));
      if (allowed.length === 0 || allowed.length !== data.products.length) {
        ctx.addIssue({ code: "custom", path: ["products"], message: "Please select at least one product." });
      }
    });
}

export type QuickQuoteInput = z.infer<ReturnType<typeof createQuickQuoteSchema>>;
