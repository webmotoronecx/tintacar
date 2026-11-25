import type { PageData } from "@/types/sections";

export const contactStorePage: PageData = {
  path: "/contact-a-store/",
  seo: {
    title: "Contact a Store - Tint a Car",
    description: "Find your nearest Tint a Car store. With almost 100 stores nationally, there's always a Tint a Car near you.",
  },
  sections: [{ type: "storeLocator", title: "Contact a Store", hideTitle: true, listTitle: "Stores near you" }],
};
