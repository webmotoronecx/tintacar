"use client";

import { useEffect, useRef } from "react";
import type { LatLng } from "@/lib/geo";

export type MapStore = {
  slug: string;
  name: string;
  addressLine: string;
  phone?: string;
  lat?: number;
  lng?: number;
  pageHref: string;
};

const AUSTRALIA = { center: { lat: -27.5, lng: 134 }, zoom: 4 };
const CALLBACK = "__storeFinderMapsReady";
let loader: Promise<void> | null = null;

// Loads the Maps JavaScript API once (new Places library included)
export function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("Maps can only load in the browser"));
  if (typeof google !== "undefined" && typeof google.maps?.importLibrary === "function") return Promise.resolve();
  loader ??= new Promise<void>((resolve, reject) => {
    (window as unknown as Record<string, () => void>)[CALLBACK] = () => resolve();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=${CALLBACK}`;
    script.async = true;
    script.onerror = () => {
      loader = null;
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(script);
  });
  return loader;
}

function infoContent(store: MapStore): HTMLElement {
  const box = document.createElement("div");
  box.style.cssText = "font:13px/1.5 Lato,Arial,sans-serif;max-width:240px";
  const name = document.createElement("strong");
  name.textContent = store.name;
  const address = document.createElement("div");
  address.textContent = store.addressLine;
  const link = document.createElement("a");
  link.href = store.pageHref;
  link.textContent = "Store information";
  link.style.cssText = "display:inline-block;margin-top:6px;text-decoration:underline";
  box.append(name, address, link);
  return box;
}

type GoogleStoreMapProps = {
  apiKey: string;
  stores: MapStore[];
  origin: LatLng | null;
  radiusKm: number | null;
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  className?: string;
};

// Store pins with the search radius drawn around the visitor's location
export function GoogleStoreMap({ apiKey, stores, origin, radiusKm, selectedSlug, onSelect, className }: GoogleStoreMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef(new Map<string, google.maps.Marker>());
  const circle = useRef<google.maps.Circle | null>(null);
  const info = useRef<google.maps.InfoWindow | null>(null);
  const select = useRef(onSelect);
  useEffect(() => {
    select.current = onSelect;
  }, [onSelect]);

  // Pins and viewport follow the filtered results, origin and radius
  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps(apiKey)
      .then(async () => {
        const { Map: GMap, Circle, InfoWindow } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        const { Marker } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
        if (cancelled || !container.current) return;
        map.current ??= new GMap(container.current, { ...AUSTRALIA, mapTypeControl: false, streetViewControl: false });
        info.current ??= new InfoWindow();

        markers.current.forEach((marker) => marker.setMap(null));
        markers.current.clear();
        const bounds = new google.maps.LatLngBounds();
        for (const store of stores) {
          if (store.lat === undefined || store.lng === undefined) continue;
          const marker = new Marker({ map: map.current, position: { lat: store.lat, lng: store.lng }, title: store.name });
          marker.addListener("click", () => select.current(store.slug));
          markers.current.set(store.slug, marker);
          bounds.extend({ lat: store.lat, lng: store.lng });
        }

        circle.current?.setMap(null);
        circle.current = null;
        if (origin && radiusKm !== null) {
          circle.current = new Circle({ map: map.current, center: origin, radius: radiusKm * 1000, strokeColor: "#eba904", strokeWeight: 2, fillColor: "#eba904", fillOpacity: 0.08 });
          map.current.fitBounds(circle.current.getBounds() ?? bounds);
        } else if (!bounds.isEmpty()) {
          if (origin) bounds.extend(origin);
          map.current.fitBounds(bounds);
        } else {
          map.current.setCenter(origin ?? AUSTRALIA.center);
          map.current.setZoom(origin ? 11 : AUSTRALIA.zoom);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [apiKey, stores, origin, radiusKm]);

  // Selecting a store in the list opens its pin
  useEffect(() => {
    const marker = selectedSlug ? markers.current.get(selectedSlug) : undefined;
    const store = stores.find((item) => item.slug === selectedSlug);
    if (!marker || !store || !map.current || !info.current) return;
    info.current.setContent(infoContent(store));
    info.current.open({ map: map.current, anchor: marker });
  }, [selectedSlug, stores]);

  return <div ref={container} className={className} role="region" aria-label="Map of stores" />;
}

type PlacesSearchProps = {
  apiKey: string;
  onPlace: (origin: LatLng, label: string) => void;
  placeholder: string;
};

// Address search with Places Autocomplete (new Places API), limited to Australia
export function PlacesSearch({ apiKey, onPlace, placeholder }: PlacesSearchProps) {
  const host = useRef<HTMLDivElement>(null);
  const callback = useRef(onPlace);
  useEffect(() => {
    callback.current = onPlace;
  }, [onPlace]);

  useEffect(() => {
    let element: google.maps.places.PlaceAutocompleteElement | null = null;
    loadGoogleMaps(apiKey)
      .then(async () => {
        const { PlaceAutocompleteElement } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
        if (!host.current) return;
        element = new PlaceAutocompleteElement({ includedRegionCodes: ["au"] });
        element.placeholder = placeholder;
        element.addEventListener("gmp-select", async (event) => {
          const place = (event as google.maps.places.PlacePredictionSelectEvent).placePrediction.toPlace();
          await place.fetchFields({ fields: ["location", "formattedAddress"] });
          if (place.location) callback.current({ lat: place.location.lat(), lng: place.location.lng() }, place.formattedAddress ?? "");
        });
        host.current.replaceChildren(element);
      })
      .catch(() => undefined);
    return () => element?.remove();
  }, [apiKey, placeholder]);

  return <div ref={host} className="min-h-11 flex-1" />;
}
