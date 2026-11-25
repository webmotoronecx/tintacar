import { describe, expect, test } from "vitest";
import { locatorCategories } from "@/config/store-locator";
import { ALL, filterStores, storeCategories } from "@/lib/locator";
import { getStores } from "@/lib/stores";

const melbourneCbd = { lat: -37.8136, lng: 144.9631 };
const stores = [
  { name: "A", searchText: "tint a car richmond vic 3121", categories: ["Car Tinting"], lat: -37.82, lng: 144.99 },
  { name: "B", searchText: "tint a car geelong vic 3220", categories: ["Car Tinting", "Elite X"], lat: -38.15, lng: 144.36 },
  { name: "C", searchText: "tint a car milton qld 4064", categories: ["Home Tinting"], lat: -27.47, lng: 153.0 },
];
const none = { query: "", category: ALL, origin: null, radiusKm: null };

describe("store finder filters", () => {
  test("text search and category narrow the list", () => {
    expect(filterStores(stores, { ...none, query: "QLD" }).map((s) => s.name)).toEqual(["C"]);
    expect(filterStores(stores, { ...none, category: "Elite X" }).map((s) => s.name)).toEqual(["B"]);
  });

  test("radius keeps nearby stores, sorted by distance", () => {
    const within25 = filterStores(stores, { ...none, origin: melbourneCbd, radiusKm: 25 });
    expect(within25.map((s) => s.name)).toEqual(["A"]);
    expect(within25[0].distance).toBeLessThan(5);
    expect(filterStores(stores, { ...none, origin: melbourneCbd, radiusKm: 100 }).map((s) => s.name)).toEqual(["A", "B"]);
  });

  test("show all keeps every store but still sorts by distance", () => {
    expect(filterStores(stores, { ...none, origin: melbourneCbd, radiusKm: null }).map((s) => s.name)).toEqual(["A", "B", "C"]);
  });

  test("every store gets its categories from its services", () => {
    const categories = getStores().map((store) => storeCategories(store.services, locatorCategories));
    expect(categories.every((list) => list.length > 0)).toBe(true);
    expect(storeCategories([{ title: "Car Tinting", items: [] }], locatorCategories)).toEqual(["Car Tinting"]);
  });
});
