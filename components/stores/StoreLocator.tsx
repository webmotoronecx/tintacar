"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LocateFixed, MapPin, Phone, Search } from "lucide-react";
import { distanceKm, type LatLng } from "@/lib/geo";
import { cn } from "@/lib/utils";

export type LocatorStore = {
  slug: string;
  name: string;
  state: string;
  addressLine: string;
  phone?: string;
  lat?: number;
  lng?: number;
  mapUrl: string;
  directionsUrl: string;
  /** Quick Quote link with this store preselected */
  enquireHref: string;
  searchText: string;
};

type GeoStatus = "idle" | "locating" | "denied" | "unsupported";

type StoreLocatorProps = {
  stores: LocatorStore[];
  brandName: string;
  region: string;
};

const GEO_MESSAGES: Record<GeoStatus, string> = {
  idle: "",
  locating: "Finding your location…",
  denied: "We couldn't access your location. Search by suburb or postcode instead.",
  unsupported: "Location isn't available in this browser. Search by suburb or postcode instead.",
};

// Client-side finder: text search, state filter and "near me" sorting
export function StoreLocator({ stores, brandName, region }: StoreLocatorProps) {
  const defaultMap = `https://maps.google.com/maps?q=${encodeURIComponent(region)}&z=4&output=embed`;
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const states = useMemo(() => ["ALL", ...Array.from(new Set(stores.map((s) => s.state))).sort()], [stores]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = stores
      .filter((s) => stateFilter === "ALL" || s.state === stateFilter)
      .filter((s) => !q || s.searchText.includes(q))
      .map((s) => ({
        ...s,
        distance: origin && s.lat !== undefined && s.lng !== undefined ? distanceKm(origin, { lat: s.lat, lng: s.lng }) : undefined,
      }));
    return origin ? [...matches].sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)) : matches;
  }, [stores, query, stateFilter, origin]);

  const selected = results.find((s) => s.slug === selectedSlug) ?? (query || origin ? results[0] : undefined);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setGeoStatus("unsupported");
      return;
    }
    setGeoStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStateFilter("ALL");
        setSelectedSlug(null);
        setGeoStatus("idle");
      },
      () => setGeoStatus("denied"),
      { enableHighAccuracy: false, timeout: 10000 },
    );
  };

  return (
    <div className="grid overflow-hidden border border-line bg-white lg:h-[700px] lg:grid-cols-[2fr_1fr]">
      <div className="order-2 h-[320px] bg-panel lg:order-1 lg:h-full">
        <iframe
          key={selected?.slug ?? "default"}
          src={selected?.mapUrl ?? defaultMap}
          title={selected ? `Map of ${selected.name}` : `Map of ${brandName} stores`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>

      <div className="order-1 flex min-h-0 flex-col lg:order-2">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex gap-2 border-b border-line p-4">
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

        <div className="flex flex-wrap gap-1.5 border-b border-line px-4 py-3">
          {states.map((state) => (
            <button
              key={state}
              type="button"
              onClick={() => {
                setStateFilter(state);
                setSelectedSlug(null);
              }}
              aria-pressed={stateFilter === state}
              className={cn(
                "rounded-full border px-3 py-1 text-[12px] font-bold uppercase",
                stateFilter === state ? "border-brand bg-brand text-white" : "border-line hover:border-brand",
              )}
            >
              {state === "ALL" ? "All" : state}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="px-4 pt-3 text-[12px] text-muted">
          {GEO_MESSAGES[geoStatus] || `${results.length} of ${stores.length} stores`}
        </p>

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
                <Link href={`/store/${store.slug}/`} className="py-1 underline hover:text-brand">
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
          {results.length === 0 && <li className="py-6 text-[14px]">No stores match your search. Try a nearby suburb or postcode.</li>}
        </ul>
      </div>
    </div>
  );
}
