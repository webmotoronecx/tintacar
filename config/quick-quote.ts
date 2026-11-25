import type { QuickQuoteConfig } from "@/lib/quick-quote/types";

// Quick Quote options copied from the live Contact Form 7 form (ID 6401)
export const quickQuoteConfig: QuickQuoteConfig = {
  brandName: "Tint a Car",
  bccGroups: [
    { states: ["VIC", "TAS"], env: "QUICK_QUOTE_BCC_VIC_TAS" },
    { states: ["NSW", "QLD", "ACT"], env: "QUICK_QUOTE_BCC_NSW_QLD_ACT" },
    { states: ["WA", "SA", "NT"], env: "QUICK_QUOTE_BCC_WA_SA_NT" },
  ],
  interests: [
    {
      value: "automotive",
      label: "Automotive Products",
      productsLabel: "Which automotive products are you interested in?",
      products: ["Octane Tint", "Spectre Tint", "Black Panther Tint", "Elite X Ceramic Surface Protection", "Paint Protection Film (PPF)", "Dash Cameras"],
      vehicle: true,
    },
    {
      value: "residential",
      label: "Residential & Commercial Products",
      productsLabel: "What are you interested in?",
      products: [
        "Heat Reduction",
        "UV Protection & Fade Prevention",
        "Enhanced Security",
        "Increased Privacy",
        "Decorative Window Films",
        "Office/Commercial Tinting Solutions",
      ],
    },
  ],
};
