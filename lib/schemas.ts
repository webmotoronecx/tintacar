import { z } from "zod";

// Build-time validation for the JSON content files

export const imageAssetSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
  width: z.number().int().nonnegative(),
  height: z.number().int().nonnegative(),
});

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const articleSummarySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string(),
  date: z.string(),
  group: z.enum(["car", "home"]),
  categories: z.array(z.string()),
  image: imageAssetSchema.optional(),
});

export const articleSchema = articleSummarySchema.extend({
  modified: z.string(),
  seo: seoSchema,
  html: z.string(),
  embed: z.enum(["zip-landing"]).optional(),
});

export const storeSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  address: z.object({
    street: z.string(),
    suburb: z.string(),
    state: z.string(),
    postcode: z.string(),
  }),
  phone: z.string().optional(),
  email: z.string().email(),
  // Store ID used by the Quick Quote link (?id=) and the referrals system
  sparkId: z.string().regex(/^\d+$/),
  lat: z.number().optional(),
  lng: z.number().optional(),
  hours: z.array(z.object({ day: z.string(), hours: z.string() })),
  services: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
  descriptionHtml: z.string().optional(),
  socials: z.object({ facebook: z.string().optional(), instagram: z.string().optional() }),
  seo: seoSchema,
});
