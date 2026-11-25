import { z } from "zod";
import storesData from "@/content/stores.json";
import type { QuickQuoteStore } from "@/lib/quick-quote/types";
import type { Store } from "@/types/content";
import { storeSchema } from "./schemas";

let cache: Store[] | null = null;

// Store repository; bundled JSON so serverless routes (e.g. the enquiry API) can read it
export function getStores(): Store[] {
  if (!cache) {
    const result = z.array(storeSchema).safeParse(storesData);
    if (!result.success) throw new Error(`Invalid content in stores.json: ${result.error.message}`);
    cache = result.data;
  }
  return cache;
}

export function getStoreBySlug(slug: string): Store | undefined {
  return getStores().find((store) => store.slug === slug);
}

export function getStoreBySparkId(sparkId: string): Store | undefined {
  return getStores().find((store) => store.sparkId === sparkId);
}

// Browser-safe store details for the Quick Quote form (no inbox address)
export function toQuickQuoteStore(store: Store): QuickQuoteStore {
  const { street, suburb, postcode, state } = store.address;
  return { id: store.sparkId, name: store.name, street, suburb, postcode, state, phone: store.phone };
}

export function quickQuoteUrl(store: Store): string {
  return `/quick-quote/?store_id=${store.sparkId}&id=${store.sparkId}`;
}

export function formatAddress(store: Store): string {
  const { street, suburb, state, postcode } = store.address;
  return [street, suburb, `${state} ${postcode}`.trim()].filter(Boolean).join(", ");
}

export function mapEmbedUrl(store: Store): string {
  const query = store.lat && store.lng ? `${store.lat},${store.lng}` : `${store.name}, ${formatAddress(store)}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

export function directionsUrl(store: Store): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${store.name}, ${formatAddress(store)}`)}`;
}
