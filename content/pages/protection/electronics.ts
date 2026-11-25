import type { PageData } from "@/types/sections";

const IMG = "/images/electronics";
const STORE = { label: "Find your nearest store", href: "/contact-a-store/" };
const ELITEX = "/protection-products/elitex-surface-protection/";
// Live's RoadView product links 301 to the FineVu range, so the tiles link there directly
const FINEVU = "/finevu-dashcams/";

export const electronicsPage: PageData = {
  path: "/electronics/",
  seo: {
    title: "Electronics - Tint a Car",
    description:
      "Our dash cameras are designed to help keep you and your family safe while on the road. Call 13TINT or contact your local store to learn more.",
  },
  sections: [
    { type: "heading", title: "Electronics", as: "h1", visuallyHidden: true },
    {
      type: "heading",
      as: "h2",
      spacing: "sm",
      title: "Never miss a moment on the road with a RoadView Dash Camera.",
      buttons: [
        { ...STORE, variant: "solid" },
        { label: "Enquire now", href: "/quick-quote/", variant: "outline" },
      ],
    },
    {
      id: "carTintMedia",
      type: "tileGrid",
      variant: "card",
      columns: 2,
      gap: "none",
      items: [
        {
          image: { src: `${IMG}/tile-m4.webp`, alt: "Tint a Car Dash Camera", width: 1080, height: 1350 },
          href: FINEVU,
          title: "M4 RoadView Dash Cam",
          text: "Quality 4K recording with our M4 Dash Camera.",
          link: { label: "Learn more about M4 RoadView", href: FINEVU },
          button: STORE,
        },
        {
          image: { src: `${IMG}/tile-mx.webp`, alt: "Tint a Car Dash Camera MX", width: 1080, height: 1350 },
          href: FINEVU,
          title: "MX RoadView Dash Cam",
          text: "Step up your protection with our MX Dash Camera.",
          link: { label: "Learn more about MX RoadView", href: FINEVU },
          button: STORE,
        },
      ],
    },
    {
      type: "imageBanner",
      title: "Discover the importance of Elite X Paint and Interior Surface Protection for your car.",
      titleLink: { label: "Elite X Paint and Interior Surface Protection", href: ELITEX },
      href: ELITEX,
      image: { src: `${IMG}/elitex-banner.webp`, alt: "Elite X Surface Protection by Tint a Car", width: 1498, height: 612 },
      mobileImage: { src: `${IMG}/elitex-banner-mobile.webp`, alt: "Elite X Surface Protection by Tint a Car", width: 1080, height: 1350 },
    },
    {
      type: "heading",
      topRule: true,
      spacing: "sm",
      title: "Check out our range of car window tints.",
      subtitle: "From reducing glare to protecting your loved ones from UV, there's a tint for everyone.",
    },
    { type: "video", youtubeId: "OPCsURGZUpw", title: "Tint a Car Product Info Guide.", spacing: "sm" },
    { type: "buttonGroup", align: "left", spacing: "md", buttons: [{ ...STORE }] },
  ],
};
