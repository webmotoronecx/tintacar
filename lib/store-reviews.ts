import { z } from "zod";
import reviewsData from "@/content/store-reviews.json";
import type { Review } from "@/types/sections";

// Google reviews per store, copied from the old WordPress reviews widget cache; swap this file for a live feed later
const storeReviewsSchema = z.record(
  z.string(),
  z.object({
    placeId: z.string().min(1),
    url: z.url(),
    reviews: z.array(
      z.object({
        author: z.string().min(1),
        rating: z.number().int().min(1).max(5),
        date: z.iso.date(),
        text: z.string().min(1),
      }),
    ),
  }),
);

export type StoreReviews = {
  reviews: Review[];
  /** The store's Google Maps listing */
  url: string;
  writeReviewUrl: string;
};

let cache: z.infer<typeof storeReviewsSchema> | null = null;

function allStoreReviews() {
  if (!cache) {
    const result = storeReviewsSchema.safeParse(reviewsData);
    if (!result.success) throw new Error(`Invalid content in store-reviews.json: ${result.error.message}`);
    cache = result.data;
  }
  return cache;
}

const MONTH_YEAR = new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric", timeZone: "UTC" });

export function getStoreReviews(slug: string): StoreReviews | undefined {
  const entry = allStoreReviews()[slug];
  if (!entry || entry.reviews.length === 0) return undefined;
  return {
    reviews: entry.reviews.map((review) => ({ ...review, date: MONTH_YEAR.format(new Date(review.date)) })),
    url: entry.url,
    writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(entry.placeId)}`,
  };
}

export function storeReviewSlugs(): string[] {
  return Object.keys(allStoreReviews());
}
