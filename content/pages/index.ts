import type { PageData } from "@/types/sections";
import { carPages } from "./car";
import { companyPages } from "./company";
import { corePages } from "./core";
import { homeOfficePages } from "./home-office";
import { protectionPages } from "./protection";

// Every content-driven page; each group keeps its own list
export const allPages: PageData[] = [...corePages, ...carPages, ...protectionPages, ...homeOfficePages, ...companyPages];
