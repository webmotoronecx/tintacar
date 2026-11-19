import type { PageData } from "@/types/sections";
import { arpansaItem, buyNowPayLaterItem, lifetimeWarrantyItem, moneyBackItem, productIcons, quoteStrip } from "./shared";

export const darkestLegalTintPage: PageData = {
  path: "/car-window-tint/darkest-legal-tint/",
  seo: {
    title: "Octane Window Tint - Darkest Legal Tint - Tint a Car",
    description:
      "Get the darkest legal car tint in Australia with Octane Window Tint. Improve privacy while protecting yourself from heat, glare & UV. Call 13TINT for a free quote!",
  },
  sections: [
    {
      type: "heroBanner",
      minHeight: "md",
      image: { src: "/images/car-window-tint/octane-hero.png", alt: "Octane - Darkest Legal Tint", width: 1920, height: 750 },
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline-light" },
      ],
    },
    {
      type: "featureSplit",
      as: "h1",
      title: "==The darkest legal tint==\non the market.",
      features: [
        { title: "Darkest Legal black colour tint", text: "for great looks and ultimate privacy." },
        { title: "Rejects 99% of UV", text: "protecting you and your car." },
        { title: "Reduces Glare", text: "helping to keep your eyes on the road." },
        { title: "Our most popular tint", text: "combining great looks, privacy & protection." },
        { title: "Lifetime Nationwide Warranty^", text: "giving you peace of mind." },
      ],
      notes: ["^Warranty terms, conditions and exclusions apply. See in store for more information."],
      specs: {
        title: "Technical Specs",
        items: [
          { label: "Solar Energy Rejection", value: 60 },
          { label: "Glare Reduction", value: 60 },
          { label: "UV Rejected", value: 99 },
        ],
        note: "The above specifications are based on Octane 20VLT Window Film.",
      },
      button: { label: "Find your nearest store", href: "/contact-a-store/" },
      paymentText: "Get Octane Darkest Legal Window Tint Interest Free with Afterpay or ZIP Pay!",
      image: { src: "/images/car-window-tint/octane-feature.png", alt: "Octane darkest legal tint", width: 1000, height: 1300 },
    },
    {
      type: "iconFeatures",
      title: "==Octane:== Darkest Legal Tint.",
      variant: "divided",
      items: [
        { icon: productIcons.colour, title: "Deep Black Colour" },
        { icon: productIcons.twoShades, title: "Available in 2 shades" },
        { icon: productIcons.uv, title: "Rejects 99% of UV" },
        { icon: productIcons.certified, title: "ARPANSA Certified" },
      ],
    },
    {
      type: "heading",
      title: "Find out how the Darkest Legal Tint can protect and enhance your driving experience.",
      as: "h2",
      size: "md",
      align: "center",
      divider: false,
      spacing: "sm",
    },
    { type: "video", youtubeId: "_AnhzscST7s", title: "Octane darkest legal tint", spacing: "sm" },
    { type: "ctaStrip", ...quoteStrip },
    {
      type: "accordion",
      title: "Some key reasons to buy Darkest Legal window tint.",
      defaultOpen: 2,
      items: [
        {
          title: "Product Information",
          html: "<p><strong>Protecting you from harmful UV Rays.</strong><br>Octane Darkest Legal Tint is our most popular tint. Providing 99% UV protection, keeping you and your car protected from the harmful Australian sun. Not only do you get UV protection, but the Darkest Legal colour also reduces glare entering your line of sight, helping to keep your attention on the road.</p><p><strong>Maintaining your privacy.</strong><br>No one wants people to look through our car windows to see what’s inside. Our Darkest Legal Tint helps to prevent prying eyes. With the deep black colour, you really have to look to see in! Have peace of mind knowing that strangers will find it hard to look through your windows.</p>",
        },
        lifetimeWarrantyItem("almost 50"),
        arpansaItem("/wp-content/uploads/2021/06/Octane-40.pdf"),
        buyNowPayLaterItem,
        moneyBackItem,
      ],
    },
    {
      type: "testimonial",
      quote:
        "Got the darkest legal on my Navara today, service was friendly and helpful. Even offered to drop me home if I couldn’t get a lift while the job was being done. Cheers to Mark and the crew, car is looking mint.",
      author: "Sam, VIC",
    },
  ],
};
