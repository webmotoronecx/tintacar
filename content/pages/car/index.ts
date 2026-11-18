import type { PageData } from "@/types/sections";
import { blackPantherWindowTintPage } from "./black-panther-window-tint";
import { carWindowTintPage } from "./car-window-tint";
import { ceramicWindowTintPage } from "./ceramic-window-tint";
import { darkestLegalTintPage } from "./darkest-legal-tint";
import { midnightExpressTintPage } from "./midnight-express-tint";
import { sunroofFilmPage } from "./sunroof-film";

export const carPages: PageData[] = [
  carWindowTintPage,
  ceramicWindowTintPage,
  darkestLegalTintPage,
  blackPantherWindowTintPage,
  sunroofFilmPage,
  midnightExpressTintPage,
];
