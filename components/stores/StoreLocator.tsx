"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { LocateFixed, MapPin, Phone, Search } from "lucide-react";
import type { LatLng } from "@/lib/geo";
import { ALL, DEFAULT_RADIUS_KM, filterStores, RADIUS_OPTIONS_KM } from "@/lib/locator";
import { cn } from "@/lib/utils";
import { GoogleStoreMap, PlacesSearch } from "./GoogleStoreMap";

export type LocatorStore = {
  slug: string;
  name: string;
  state: string;
  addressLine: string;
  phone?: string;
  lat?: number;
  lng?: number;
  pageHref: string;
  mapUrl: string;
  directionsUrl: string;
  /** Quick Quote link with this store preselected */
  enquireHref: string;
  categories: string[];
  searchText: string;
};

type GeoStatus = "idle" | "locating" | "denied" | "unsupported";

type StoreLocatorProps = {
  stores: LocatorStore[];
  brandName: string;
  region: string;
  categories: string[];
  /** Google Maps JavaScript API key; without one the finder uses a Maps embed and text search */
  mapsApiKey?: string;
  /** Heading above the results list, e.g. "Stores near you" */
  listTitle?: string;
};

const SAVED_ORIGIN_KEY = "store-finder-origin";
const selectClass = "w-full rounded-full border border-line bg-white px-3 py-2 text-[13px] outline-none focus:border-brand disabled:opacity-50";

const GEO_MESSAGES: Record<GeoStatus, string> = {
  idle: "",
  locating: "Finding your location…",
  denied: "We couldn't access your location. Search by suburb or postcode instead.",
  unsupported: "Location isn't available in this browser. Search by suburb or postcode instead.",
};

// The last location is remembered like on live; storage can be blocked, so every access is guarded
let savedRaw: string | null = null;
let savedOrigin: LatLng | null = null;
function readSavedOrigin(): LatLng | null {
  try {
    const raw = window.localStorage.getItem(SAVED_ORIGIN_KEY);
    if (raw !== savedRaw) {
      savedRaw = raw;
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      const point = parsed as Partial<LatLng> | null;
      savedOrigin = point && typeof point.lat === "number" && typeof point.lng === "number" ? { lat: point.lat, lng: point.lng } : null;
    }
    return savedOrigin;
  } catch {
    return null;
  }
}

function writeSavedOrigin(origin: LatLng | null): void {
  try {
    if (origin) window.localStorage.setItem(SAVED_ORIGIN_KEY, JSON.stringify(origin));
    else window.localStorage.removeItem(SAVED_ORIGIN_KEY);
  } catch {
    // Location just isn't remembered
  }
}

function subscribeStorage(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

// Store finder: address or text search, "near me", radius and category filters, results list and map
export function StoreLocator({ stores, brandName, region, categories, mapsApiKey, listTitle }: StoreLocatorProps) {
  const defaultMap = `https://maps.google.com/maps?q=${encodeURIComponent(region)}&z=4&output=embed`;
  const remembered = useSyncExternalStore(subscribeStorage, readSavedOrigin, () => null);
  const [chosenOrigin, setChosenOrigin] = useState<LatLng | null | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [radiusKm, setRadiusKm] = useState<number | null>(DEFAULT_RADIUS_KM);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const origin = chosenOrigin === undefined ? remembered : chosenOrigin;
  const results = useMemo(() => filterStores(stores, { query, category, origin, radiusKm }), [stores, query, category, origin, radiusKm]);
  const selected = results.find((s) => s.slug === selectedSlug) ?? (query || origin ? results[0] : undefined);
  const isFiltered = Boolean(origin || query || category !== ALL);

  const setOrigin = useCallback((next: LatLng | null) => {
    setChosenOrigin(next);
    writeSavedOrigin(next);
    setRadiusKm(DEFAULT_RADIUS_KM);
    setSelectedSlug(null);
  }, []);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setGeoStatus("unsupported");
      return;
    }
    setGeoStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus("idle");
      },
      () => setGeoStatus("denied"),
      { enableHighAccuracy: false, timeout: 10000 },
    );
  };

  const clearAll = () => {
    setOrigin(null);
    setQuery("");
    setCategory(ALL);
  };

  const emptyMessage =
    origin && radiusKm !== null
      ? `No stores within ${radiusKm} km. Try a larger radius or show all stores.`
      : "No stores match your search. Try a nearby suburb or postcode.";

  return (
    <div className="grid overflow-hidden border border-line bg-white lg:h-[700px] lg:grid-cols-[2fr_1fr]">
      <div className="order-2 h-[320px] bg-panel lg:order-1 lg:h-full">
        {mapsApiKey ? (
          <GoogleStoreMap
            apiKey={mapsApiKey}
            stores={results}
            origin={origin}
            radiusKm={origin ? radiusKm : null}
            selectedSlug={selected?.slug ?? null}
            onSelect={setSelectedSlug}
            className="h-full w-full"
          />
        ) : (
          <iframe
            key={selected?.slug ?? "default"}
            src={selected?.mapUrl ?? defaultMap}
            title={selected ? `Map of ${selected.name}` : `Map of ${brandName} stores`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        )}
      </div>

      <div className="order-1 flex min-h-0 flex-col lg:order-2">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex gap-2 border-b border-line p-4">
          {mapsApiKey ? (
            <PlacesSearch apiKey={mapsApiKey} placeholder="Type address to search for nearby stores" onPlace={(point) => setOrigin(point)} />
          ) : (
            <>
              <label htmlFor="store-search" className="sr-only">
                Search by suburb, postcode or state
              </label>
              <div className="relative flex-1">
                <Search aria-hidden="true" className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="store-search"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedSlug(null);
                  }}
                  placeholder="Suburb, postcode or state"
                  className="w-full rounded-full border border-line py-2.5 pr-4 pl-9 text-[14px] outline-none focus:border-brand"
                />
              </div>
            </>
          )}
          <button
            type="button"
            onClick={locate}
            aria-label="Find stores near me"
            title="Find stores near me"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line hover:border-brand hover:text-brand"
          >
            <LocateFixed className={cn("h-5 w-5", geoStatus === "locating" && "animate-pulse")} />
          </button>
        </form>

        <div className="grid grid-cols-2 gap-2 border-b border-line px-4 py-3">
          <div>
            <label htmlFor="store-category" className="sr-only">
              Category
            </label>
            <select id="store-category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
              <option value={ALL}>All categories</option>
              {categories.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="store-radius" className="sr-only">
              Distance from your location
            </label>
            <select
              id="store-radius"
              value={radiusKm ?? ""}
              disabled={!origin}
              onChange={(e) => setRadiusKm(e.target.value ? Number(e.target.value) : null)}
              className={selectClass}
            >
              {RADIUS_OPTIONS_KM.map((km) => (
                <option key={km} value={km}>
                  Within {km} km
                </option>
              ))}
              <option value="">Any distance</option>
            </select>
          </div>
        </div>

        {listTitle && <h2 className="px-4 pt-4 text-[26px] leading-tight text-accent md:text-[30px]">{listTitle}</h2>}
        <div className="flex items-center justify-between gap-2 px-4 pt-3 text-[12px]">
          <p aria-live="polite" className="text-muted">
            {GEO_MESSAGES[geoStatus] || `${results.length} of ${stores.length} stores`}
          </p>
          <div className="flex gap-3">
            {origin && radiusKm !== null && (
              <button type="button" onClick={() => setRadiusKm(null)} className="py-1 font-bold text-accent hover:underline">
                Show all stores
              </button>
            )}
            {isFiltered && (
              <button type="button" onClick={clearAll} className="py-1 font-bold text-accent hover:underline">
                Clear all
              </button>
            )}
          </div>
        </div>

        <ul className="max-h-[480px] flex-1 overflow-y-auto px-4 pb-4 lg:max-h-none">
          {/* Labels and nesting match the existing GTM listings_cta triggers and .store-location variables */}
          {results.map((store) => (
            <li key={store.slug} className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line py-4 text-[13px] last:border-b-0">
              <button
                type="button"
                onClick={() => setSelectedSlug(store.slug)}
                aria-pressed={selected?.slug === store.slug}
                className={cn("mb-1 block w-full text-left", selected?.slug === store.slug && "text-brand")}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="store-location font-heading text-[16px] font-bold leading-snug">{store.name}</span>
                  {store.distance !== undefined && <span className="shrink-0 text-[12px] text-muted">{store.distance.toFixed(1)} km</span>}
                </span>
                <span className="mt-1 flex gap-1.5 text-[13px] leading-5 text-ink">
                  <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {store.addressLine}
                </span>
              </button>
              {store.phone && (
                <a href={`tel:${store.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1.5 py-1 font-bold hover:text-brand">
                  <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                  {store.phone}
                </a>
              )}
              <span className="flex flex-wrap gap-x-4 gap-y-1 uppercase">
                <Link href={store.pageHref} className="py-1 underline hover:text-brand">
                  Store information
                </Link>
                <Link href={store.enquireHref} className="py-1 underline hover:text-brand">
                  Email
                </Link>
                <a href={store.directionsUrl} target="_blank" rel="noopener noreferrer" className="py-1 underline hover:text-brand">
                  Get directions
                </a>
              </span>
            </li>
          ))}
          {results.length === 0 && <li className="py-6 text-[14px]">{emptyMessage}</li>}
        </ul>
      </div>
    </div>
  );
}
