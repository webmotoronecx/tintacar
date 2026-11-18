import type { PageData } from "@/types/sections";
import { buyNowPayLaterItem, hibaTestimonial, moneyBackItem, productIcons, warrantyNote } from "./shared";

export const sunroofFilmPage: PageData = {
  path: "/car-window-tint/sunroof-film/",
  seo: {
    title: "Sunroof Film",
    description:
      "Sunroof Protection Film from Tint a Car rejects 93% of infrared heat and 99% of UV, custom fitted to your vehicle. Call 13TINT or visit your nearest store.",
  },
  sections: [
    {
      type: "heroBanner",
      minHeight: "sm",
      image: { src: "/images/car-window-tint/sunroof-hero-wordmark.jpg", alt: "Sunroof Protection Film", width: 2560, height: 834 },
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline-light" },
      ],
    },
    {
      type: "featureSplit",
      as: "h1",
      title: "==Maximum heat, glare and UV protection,== keeping your vehicle’s interior cooler and more comfortable.",
      features: [
        { title: "Heat Rejection", text: "Keeps your vehicle’s interior heaps cooler by reducing heat build-up." },
        { title: "Self-healing & Scratch Resistance", text: "Designed to withstand everyday wear and tear. Helps protect against scratches and road debris." },
        { title: "Hydrophobic & Anti-discolouration Properties", text: "Repels water, prevents staining and resists discolouration." },
        { title: "Custom Fit for any Vehicle", text: "Tailored for a seamless fit, delivering top-tier protection without compromising aesthetics." },
        { title: "Clear Visibility", text: "Appears almost clear while offering significant heat and glare reduction." },
      ],
      specs: {
        title: "Technical Specs",
        items: [
          { label: "Infrared Protection", value: 93 },
          { label: "UV Rejected", value: 99 },
        ],
      },
      button: { label: "Find your nearest store", href: "/contact-a-store/" },
      paymentText: "Get Sunroof Protection Film Interest Free with Afterpay or ZIP Pay!",
      image: {
        src: "/images/car-window-tint/sunroof-feature.jpg",
        alt: "View of the sky and mountains from inside a car with a panoramic sunroof, above a close-up of a glass sunroof on a black car",
        width: 1400,
        height: 2162,
      },
    },
    {
      type: "iconFeatures",
      title: "==Sunroof== Protection Film.",
      variant: "divided",
      columns: 3,
      items: [
        { icon: productIcons.uv, title: "Rejects 99% UV" },
        { icon: productIcons.infrared, title: "93% Infrared Rejection" },
        { icon: productIcons.warranty, title: "10 Year Warranty^" },
      ],
    },
    {
      type: "mediaText",
      spacing: "none",
      imagePosition: "left",
      title: "==The most effective protection== under the sun.",
      highlightColor: "brand",
      html: "<p>Unlike aftermarket roof protection sliders, which cost around $1,000 and reduce your sense of light and space, Sunroof Protection Film provides superior protection without compromising your view.</p>",
      image: { src: "/images/car-window-tint/sunroof-sunset.jpg", alt: "White car parked on a lookout at sunset", width: 1400, height: 785 },
    },
    {
      type: "accordion",
      title: "Some key reasons to buy Sunroof Protection Film",
      defaultOpen: -1,
      items: [
        {
          title: "Product Information",
          html: "<p><strong>Maximum heat, glare and UV protection.</strong><br>Tint a Car Sunroof Protection Film rejects heat to help keep your vehicle’s interior cooler and more comfortable.</p><p><strong>The bottom line.</strong><br>Sunroof Protection Film delivers 93% Infrared Protection, blocks 99% harmful UV rays and is custom fitted to your vehicle.</p>",
        },
        {
          title: "10 Year Warranty^",
          html: "<p>Tint a Car have been supplying Australians with all their tinting needs for over 50 years. Sunroof Protection Film comes with a 10 year warranty^, giving you complete peace of mind.</p>",
        },
        buyNowPayLaterItem,
        moneyBackItem,
      ],
    },
    { type: "note", text: warrantyNote },
    {
      type: "heroBanner",
      minHeight: "sm",
      contentPosition: "center",
      title: "Upgrade your sunroof or moonroof today!",
      titleAs: "h2",
      subtitle: "Get the protection you deserve with Sunroof Protection Film. Talk to us for more information.",
      image: { src: "/images/car-window-tint/sunroof-cta.jpg", alt: "", width: 2000, height: 760 },
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline-light" },
      ],
    },
    { type: "testimonial", ...hibaTestimonial },
  ],
};
