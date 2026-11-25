import type { PageData } from "@/types/sections";

const ENQUIRE = { label: "Enquire", href: "/contact-a-store/", variant: "outline" } as const;

export const extrasPage: PageData = {
  path: "/extras/",
  seo: {
    title: "Car Maintenance Products and Technology - Tint a Car",
    description: "Get extra products to look after your car, including window tint cleaner, a dash camera and headlight restoration. Call 13TINT for a quote.",
  },
  sections: [
    {
      type: "heading",
      title: "Car maintenance products and technology to look after your car.",
      as: "h1",
      divider: false,
      spacing: "sm",
      buttons: [{ label: "Make an enquiry", href: "/contact-a-store/", variant: "solid" }],
    },
    {
      type: "tileGrid",
      variant: "card",
      captionAlign: "left",
      imageSize: "natural",
      columns: 2,
      items: [
        {
          image: { src: "/images/protection/extras-window-tint-cleaner.png", alt: "Window Tint Cleaner", width: 478, height: 341 },
          title: "Window Tint Cleaner",
          text: "Keep your windows clean with Tint a Car Window Tint Cleaner.",
          bullets: ["Specially formulated to clean window tint for cars and homes", "Ensures you keep the clearest view", "Contains no harsh chemicals breaking down your tint"],
          button: ENQUIRE,
        },
        {
          image: { src: "/images/protection/extras-rimgard.png", alt: "RimGard", width: 478, height: 341 },
          title: "RimGard",
          text: "Protect your wheels from damage, including gutter rash and alloy wheel scuffs.",
          bullets: [
            "Provides mounting tracks which are fitted to the inner part of the wheel which just snap in place.",
            "Mounting tracks come in a range of different colours so you can match your paint or add a pop of colour.",
            "Mounting tracks provide curb rash and wheel edge protection.",
          ],
          button: ENQUIRE,
        },
        {
          image: { src: "/images/protection/extras-lensklear.png", alt: "Headlight restoration product Lensklear", width: 478, height: 341 },
          title: "LensKlear Headlight Restoration",
          text: "Restore your headlights to crystal clear vision with Lensklear Headlight Restoration.",
          bullets: ["Enhances your vehicles appearance", "Restores unroadworthy headlights", "Provides crystal clear vision increasing safety on the road", "Tint a Car is an authorised applicator"],
          button: ENQUIRE,
        },
        {
          image: { src: "/images/finevu/gx4k-product-detail-banner.png", alt: "FineVu Dash Camera", width: 1920, height: 750 },
          title: "FineVu Dash Camera",
          text: "For the clearest view of the road.",
          bullets: ["The best possible clarity and ultra-sharp footage", "Powered by industry-leading SONY™ STARVIS™ front & rear image sensors", "Capture every crucial detail, day and night."],
          button: { label: "Enquire", href: "/finevu-dashcams/", variant: "outline" },
        },
      ],
    },
  ],
};
