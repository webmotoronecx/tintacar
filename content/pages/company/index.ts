import type { PageData } from "@/types/sections";
import { careersPage } from "./careers";
import { qualityPolicyPage } from "./quality-policy";
import { quickQuotePage } from "./quick-quote";
import { sdsPage } from "./sds";
import { whyChoosePage } from "./why-choose";

export const companyPages: PageData[] = [careersPage, whyChoosePage, sdsPage, qualityPolicyPage, quickQuotePage];
