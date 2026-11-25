import type { PageData } from "@/types/sections";

const IMG = "/images/car-window-tint";
const STORE = { label: "Find your nearest store", href: "/contact-a-store/" };

export const carWindowTintPage: PageData = {
  path: "/car-window-tint/",
  seo: {
    title: "Car Tinting - Window Tinting - Tint a Car",
    description:
      "Suitable for any lifestyle, our tinted films have the latest technology & best durability. Call 13TINT for a free quote, or contact your local store to learn more.",
  },
  sections: [
    {
      type: "heroBanner",
      title: "Window Tinting for Car, Home & Office.",
      hideTitle: true,
      image: { src: `${IMG}/sunroof-bundle-hero.webp`, alt: "Complete your vehicle's glass protection. Bundle tint and Sunroof Protection Film and save $100.", width: 2100, height: 600 },
      mobileImage: { src: "/images/home/hero-mobile.png", alt: "Tint a Car - Protects Best. Because your car & home deserve it.", width: 1080, height: 1350 },
    },
    {
      type: "heading",
      as: "h2",
      spacing: "sm",
      title: "Choose from our range of car tints, then select your nearest store.",
      subtitle: "From $295* (Shop Now, Pay Later with Afterpay or Zip Pay)",
      buttons: [
        { ...STORE, variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline" },
      ],
    },
    {
      id: "carTintMedia",
      type: "tileGrid",
      variant: "card",
      columns: 3,
      gap: "none",
      items: [
        {
          image: { src: `${IMG}/tile-spectre.png`, alt: "Tint a Car Spectre Car Window Tint", width: 1080, height: 1350 },
          href: "/car-window-tint/ceramic-window-tint/",
          title: "Nano-Ceramic Window Tint",
          text: "Delivering superior heat rejection and 99% UV Protection.",
          link: { label: "Learn more about Spectre", href: "/car-window-tint/ceramic-window-tint/" },
          button: STORE,
        },
        {
          image: { src: `${IMG}/tile-octane.png`, alt: "Tint a Car Octane Darkest Legal Window Tint", width: 1080, height: 1350 },
          href: "/car-window-tint/darkest-legal-tint/",
          title: "Darkest Legal Window Tint",
          text: "99% UV protection in a darkest legal black colour.",
          link: { label: "Learn more about Octane", href: "/car-window-tint/darkest-legal-tint/" },
          button: STORE,
        },
        {
          image: { src: `${IMG}/tile-black-panther.png`, alt: "Tint a Car Black Panther Car Window Tint", width: 1080, height: 1350 },
          href: "/car-window-tint/black-panther-window-tint/",
          title: "World Leading Hybrid-Matrix Tint",
          text: "Our highest performing world leading tint.",
          link: { label: "Learn more about Black Panther", href: "/car-window-tint/black-panther-window-tint/" },
          button: STORE,
        },
      ],
    },
    {
      type: "comparisonTable",
      title: "Compare the differences between our car window tints.",
      rowHeader: "Feature",
      buttonLabel: "Learn more",
      columns: [
        { label: "Black Panther", href: "/car-window-tint/black-panther-window-tint/" },
        { label: "Octane", href: "/car-window-tint/darkest-legal-tint/" },
        { label: "Spectre", href: "/car-window-tint/ceramic-window-tint/", highlight: true },
      ],
      rows: [
        { label: "Colour Options", values: ["Deep Black", "Deep Black (2 Shades)", "Deep Black"] },
        { label: "UV Rejection", values: ["99%", "99%", "99%"] },
        { label: "Glare Reduction", values: ["81%", "78%", "53%"] },
        { label: "Scratch Resistance", values: ["Yes", "Yes", "Yes"] },
        { label: "Signal Interference", values: ["No Interference", "No Interference", "No Interference"] },
        { label: "Technology Type", values: ["Hydro-Matrix Nano-Ceramic", "Standard Tint Technology", "Nano-Ceramic"] },
        { label: "Warranty", values: ["Lifetime (transferable)", "Lifetime (Nationwide)", "Lifetime (Nationwide)"] },
        { label: "Cancer Council Rating", values: ["ARPANSA Certified", "ARPANSA Certified", "ARPANSA Certified"] },
        { label: "Starting Price", values: ["Varies by Vehicle", "Varies by Vehicle", "Varies by Vehicle"] },
        { label: "Key Benefit", values: ["", "Darkest Legal Tint & Privacy", "Superior IR Heat Rejection"] },
        {
          label: "Other Notes",
          values: ["World's leading hybrid-matrix technology film.", "Popular entry-level choice.", "Great balance of performance & aesthetics."],
        },
      ],
    },
    {
      type: "imageBanner",
      title: "Discover the importance of Elite X +Graphene Infused Exterior and Interior Surface Protection for your car.",
      href: "/protection-products/elitex-graphene-surface-protection/",
      image: { src: `${IMG}/elitex-banner.png`, alt: "Elite X - Ceramic + Graphene infused surface protection", width: 1498, height: 612 },
      mobileImage: { src: `${IMG}/elitex-banner-mobile.png`, alt: "Elite X - Ceramic + Graphene infused surface protection", width: 1080, height: 1350 },
    },
    {
      type: "heading",
      topRule: true,
      spacing: "sm",
      title: "See the difference between our car window tints.",
      subtitle: "From reducing glare to protecting your loved ones from UV, there's a tint for everyone.",
    },
    { type: "video", youtubeId: "OPCsURGZUpw", title: "See the difference between our car window tints", spacing: "sm" },
    { type: "buttonGroup", spacing: "md", buttons: [{ ...STORE }] },
  ],
};
