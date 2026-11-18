import type { PageData } from "@/types/sections";
import { homeTintPage } from "./home-tint";
import { homeTintHeatPage } from "./heat";
import { homeTintGlarePage } from "./glare";
import { homeTintFadePage } from "./fade";
import { homeTintSecurityPage } from "./security";
import { homeTintPrivacyPage } from "./privacy";
import { homeTintSafetyPage } from "./safety";
import { homeTintDecorativeFilmPage } from "./decorative-film";
import { officePage } from "./office";

export const homeOfficePages: PageData[] = [
  homeTintPage,
  homeTintHeatPage,
  homeTintGlarePage,
  homeTintFadePage,
  homeTintSecurityPage,
  homeTintPrivacyPage,
  homeTintSafetyPage,
  homeTintDecorativeFilmPage,
  officePage,
];
