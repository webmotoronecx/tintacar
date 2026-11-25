import type { PageData } from "@/types/sections";
import { carCarePage } from "./car-care";
import { elitexGraphenePage } from "./elitex-graphene-surface-protection";
import { electronicsPage } from "./electronics";
import { elitexSurfaceProtectionPage } from "./elitex-surface-protection";
import { extrasPage } from "./extras";
import { finevuDashcamsPage } from "./finevu-dashcams";
import { paintProtectionFilmPage } from "./paint-protection-film";
import { protectionProductsPage } from "./protection-products";

export const protectionPages: PageData[] = [
  protectionProductsPage,
  elitexGraphenePage,
  paintProtectionFilmPage,
  elitexSurfaceProtectionPage,
  carCarePage,
  electronicsPage,
  finevuDashcamsPage,
  extrasPage,
];
