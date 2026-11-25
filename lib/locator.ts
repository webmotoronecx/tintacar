import { distanceKm, type LatLng } from "./geo";

export const RADIUS_OPTIONS_KM = [5, 10, 25, 50] as const;
export const DEFAULT_RADIUS_KM = 25;
export const ALL = "ALL";

export type FilterableStore = {
  searchText: string;
  categories: string[];
  lat?: number;
  lng?: number;
};

export type LocatorFilter = {
  query: string;
  category: string;
  origin: LatLng | null;
  /** null shows every matching store, still sorted by distance */
  radiusKm: number | null;
};

// Text and category filters, then distance from the origin with an optional radius cut-off
export function filterStores<T extends FilterableStore>(stores: T[], { query, category, origin, radiusKm }: LocatorFilter): (T & { distance?: number })[] {
  const q = query.trim().toLowerCase();
  const matches = stores
    .filter((store) => category === ALL || store.categories.includes(category))
    .filter((store) => !q || store.searchText.includes(q))
    .map((store) => ({
      ...store,
      distance: origin && store.lat !== undefined && store.lng !== undefined ? distanceKm(origin, { lat: store.lat, lng: store.lng }) : undefined,
    }));
  if (!origin) return matches;
  const inRange = radiusKm === null ? matches : matches.filter((store) => store.distance !== undefined && store.distance <= radiusKm);
  return [...inRange].sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
}

/** Locator categories, matched against a store's service groups or items */
export type LocatorCategory = { label: string; serviceGroup?: string; serviceItem?: string };

export function storeCategories(services: { title: string; items: string[] }[], categories: LocatorCategory[]): string[] {
  return categories
    .filter((category) =>
      services.some((group) => (category.serviceGroup && group.title === category.serviceGroup) || (category.serviceItem && group.items.includes(category.serviceItem))),
    )
    .map((category) => category.label);
}
