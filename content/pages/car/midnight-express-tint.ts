import type { PageData } from "@/types/sections";
import { arpansaItem, lifetimeWarrantyItem, moneyBackItem, productIcons } from "./shared";

export const midnightExpressTintPage: PageData = {
  path: "/car-window-tint/midnight-express-tint/",
  seo: {
    title: "Midnight Express Window Tint - Tint a Car",
    description:
      "One of our most popular car tints, Midnight Express is excellent value for money - offering 99% UV rejection from the sun. Call 13TINT for a free quote!",
  },
  sections: [
    {
      type: "heroBanner",
      minHeight: "sm",
      contentPosition: "center",
      title: "Charcoal Colour Tint",
      subtitle: "THE NEW SEXY. From Only $295! Buy Now, Pay Later with Openpay, Afterpay and Zip.",
      image: { src: "/images/car-window-tint/midnight-express-hero.png", alt: "Charcoal colour tint - Midnight Express", width: 1920, height: 750 },
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline-light" }],
    },
    {
      type: "featureSplit",
      title: "Killing the tint game with ==great looks & best value.==",
      highlightColor: "accent",
      button: { label: "Enquire today", href: "/contact-a-store/" },
      features: [
        { title: "Charcoal colour film", text: "get that glow-up on a budget." },
        { title: "Rejects 99% of UV", text: "because skin cancer isn’t cool." },
        { title: "Reduces heat", text: "for a more comfortable drive." },
        { title: "Reduces 60% glare", text: "reduces resting b*tch face." },
        { title: "Lifetime Nationwide Warranty^", text: "because we want to give you peace of mind." },
      ],
      notes: ["^Warranty terms, conditions and exclusions apply. See in store for more information."],
      paymentText: "Get Midnight Express Interest Free!",
      image: { src: "/images/car-window-tint/midnight-express-feature.png", alt: "Friends enjoying dinner together", width: 1880, height: 1253 },
    },
    {
      type: "ctaStrip",
      text: "Ready to get a quote?",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" }],
    },
    {
      type: "iconFeatures",
      title: "==Midnight Express:== Great Value Tint.",
      variant: "divided",
      items: [
        { icon: productIcons.colour, title: "Blue Charcoal Colour" },
        { icon: productIcons.uv, title: "Rejects 99% of UV" },
        { icon: productIcons.glare, title: "Reduces 60% Glare" },
        { icon: productIcons.value, title: "Value for Money" },
      ],
    },
    {
      type: "testimonial",
      background: "navy",
      quote:
        "Very happy with the service provided by Zelijko at Tint a Car Capalaba. I got my car tinted there today, he was a really friendly old-school businessman, makes you feel like a valued customer.",
      author: "Samuel, QLD",
    },
    {
      type: "accordion",
      title: "Some key reasons to buy Midnight Express window tint.",
      defaultOpen: 2,
      items: [
        lifetimeWarrantyItem("almost 50"),
        arpansaItem("https://tintacar.com.au/wp-content/uploads/2021/06/MIDNIGHT-EXPRESS.pdf"),
        {
          title: "Buy Now. Pay Later. Zero Interest.",
          html: '<p>Both Zip Pay and Open Pay are a fast, simple, and flexible service that allows you to easily manage your finances through an App. You can split your purchases on products such as Octane Darkest Legal Tint, Elite X Hydrophobic Surface Protection, Vehicle Wrap your purchase over 3,6,9, or 12 months with ZERO interest. It’s never been easier to pay up to 80% of the purchase price after instalment of your car tint, surface protection, or wrap. Get the right look, protection and privacy for your ride sooner using <a href="/articles/afterpay/">Open Pay</a>, <a href="/articles/afterpay/">Afterpay</a> or <a href="/articles/zip-pay/">Zip</a> to pay later!</p>',
        },
        moneyBackItem,
      ],
    },
  ],
};
