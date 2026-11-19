import type { PageData } from "@/types/sections";
import {
  arpansaItem,
  buyNowPayLaterItem,
  ceramicBundle,
  hibaTestimonial,
  lifetimeWarrantyItem,
  moneyBackItem,
  productIcons,
  quoteStrip,
  warrantyNote,
} from "./shared";

export const ceramicWindowTintPage: PageData = {
  path: "/car-window-tint/ceramic-window-tint/",
  seo: {
    title: "Spectre Car Tint - Ceramic Technology - Tint a Car",
    description:
      "Get superior ceramic window tint technology with the highest infrared heat rejection. Feel the difference with Spectre. Contact your local store or call 13 TINT",
  },
  sections: [
    {
      type: "heroBanner",
      minHeight: "md",
      image: { src: "/images/car-window-tint/spectre-hero.png", alt: "Spectre - Ceramic Film Technology", width: 1920, height: 750 },
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline-light" },
      ],
    },
    {
      type: "featureSplit",
      as: "h1",
      title: "==Ceramic tint technology==\ndelivering superior heat rejection.",
      features: [
        { title: "Rejects 94% Infrared Heat", text: "Noticeably more comfortable" },
        { title: "Rejects 99% UV Rays", text: "To combat the Australian sun" },
        { title: "Deep Black Colour", text: "Perfect next to privacy glass" },
        { title: "Lifetime National Warranty^", text: "For total peace of mind" },
      ],
      notes: ["^Warranty terms and conditions apply. See in store for details."],
      closing: "Come and feel the difference in store!",
      specs: {
        title: "Technical Specs",
        items: [
          { label: "Infrared Heat Rejection", value: 94 },
          { label: "Glare Reduction", value: 53 },
          { label: "UV Rejected", value: 99 },
        ],
        note: "The above specifications are based on Spectre 35VLT Window Film.",
      },
      button: { label: "Find your nearest store", href: "/contact-a-store/" },
      paymentText: "Get Spectre Ceramic Window Tint Interest Free with Afterpay or ZIP Pay!",
      image: { src: "/images/car-window-tint/spectre-feature.png", alt: "Man standing beside a car with Spectre ceramic tint", width: 1000, height: 1300 },
    },
    {
      type: "iconFeatures",
      title: "==Spectre:== Nano-Ceramic Tint.",
      variant: "divided",
      items: [
        { icon: productIcons.colour, title: "Deep Black Colour" },
        { icon: productIcons.uv, title: "Rejects 99% UV" },
        { icon: productIcons.infrared, title: "94% Infrared Rejection" },
        { icon: productIcons.warranty, title: "Lifetime Warranty" },
      ],
    },
    { type: "video", youtubeId: "ohGOQVjXRcE", title: "Spectre ceramic film technology" },
    { type: "ctaStrip", ...quoteStrip },
    { type: "promoCard", ...ceramicBundle },
    { type: "note", text: "*Prices vary depending on tint selection & vehicle size, T&C’s apply ask in store for detail." },
    {
      type: "accordion",
      title: "Some key reasons to buy Spectre Ceramic window tint.",
      defaultOpen: 2,
      items: [
        {
          title: "Product Information",
          html: "<p><strong>For something better … Meet Nano-Ceramic Technology.</strong><br>Spectre nano-ceramic tint maintains all the protective qualities of our darkest legal tint, along with the additional benefit of infrared heat rejection. Infrared heat rejection helps to maintain a consistent temperature inside your car, meaning a more comfortable drive for you and your passengers.</p><p><strong>You don’t have to compromise on great looks.</strong><br>Its appearance matches privacy glass and gives a great looking, uniform colour application for your whole car. You don’t have to compromise for great looks, Spectre gives you clear, uninterrupted viewing through your car’s windows, day, and night.</p>",
        },
        lifetimeWarrantyItem("over 50"),
        arpansaItem("/wp-content/uploads/2026/04/ARPANSA-Spectre-Sheets-2026-VLT35.pdf"),
        buyNowPayLaterItem,
        moneyBackItem,
      ],
    },
    { type: "note", text: warrantyNote },
    { type: "testimonial", ...hibaTestimonial },
  ],
};
