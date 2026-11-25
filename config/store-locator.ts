import type { LocatorCategory } from "@/lib/locator";

// Store finder categories as on live (Car Tinting / Home Tinting / Elite X), matched to each store's services
export const locatorCategories: LocatorCategory[] = [
  { label: "Car Tinting", serviceGroup: "Car Tinting" },
  { label: "Home Tinting", serviceGroup: "Home Window Tinting by Tint a Car" },
  { label: "Elite X", serviceItem: "Elite X Ceramic Surface Paint Protection" },
];
