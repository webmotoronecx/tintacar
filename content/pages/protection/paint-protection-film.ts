import type { PageData } from "@/types/sections";
import { FIND_STORE, interestFreeSections, neanyTestimonial } from "./shared";

export const paintProtectionFilmPage: PageData = {
  path: "/protection-products/paint-protection-film/",
  seo: {
    title: "Elite X Paint Protection Film (PPF) - Manufactured by LLumar - Tint a Car",
    description:
      "Elite X Paint Protection Film (PPF) protects your vehicles most vulnerable areas against environmental elements, scratches and road debris. Call 13TINT today!",
  },
  sections: [
    {
      type: "heroBanner",
      image: { src: "/images/protection/ppf-banner.png", alt: "TAC_LLumar-PPF_Product-Page-Banner", width: 1920, height: 750 },
    },
    {
      type: "imageBanner",
      spacing: "sm",
      image: { src: "/images/protection/ppf-llumar-icons.png", alt: "", width: 1536, height: 120 },
    },
    {
      type: "mediaText",
      imagePosition: "right",
      eyebrow: "COMPLETE SURFACE PROTECTION",
      title: "Protection where you need it most.",
      as: "h1",
      html: "<p>Our high-performance, self-healing film acts as a barrier against scratches, stone ships, bug splatter and everyday wear.</p>",
      buttons: [{ ...FIND_STORE, variant: "outline" }],
      image: { src: "/images/protection/ppf-protection-pack.png", alt: "", width: 600, height: 363 },
    },
    {
      type: "mediaText",
      imagePosition: "left",
      eyebrow: "WHY CHOOSE PAINT PROTECTION FILM?",
      title: "More than just a clear coat.",
      html: "<p>LLumar Paint Protection Film delivers advanced technology for superior durability, self-healing properties and a flawless finish.</p><ul><li>Self-healing, scratch resistant surface</li><li>Hydrophobic for easier cleaning</li><li>High-gloss, crystal clear finish</li><li>Stain, UV and chemical resistant</li><li>Professionally installed for perfect fit</li><li>Backed by a nationwide 10 year warranty*</li></ul>",
      image: { src: "/images/protection/ppf-closeup.png", alt: "", width: 600, height: 363 },
    },
    {
      type: "heading",
      eyebrow: "HOW PAINT PROTECTION FILM WORKS",
      title: "Helps protect against:",
      as: "h2",
      size: "md",
      align: "center",
      spacing: "sm",
      html: "<p>LLumar Paint Protection Film helps offer durable, long-term protection of your car from everyday environmental contaminants.</p>",
    },
    {
      type: "iconFeatures",
      columns: 3,
      spacing: "sm",
      items: [
        { icon: "/images/protection/ppf-icon-fallen-leaves.png", title: "Fallen leaves" },
        { icon: "/images/protection/ppf-icon-bug-splatter.png", title: "Bug splatter" },
        { icon: "/images/protection/ppf-icon-road-debris.png", title: "Road debris" },
        { icon: "/images/protection/ppf-icon-tree-sap.png", title: "Tree Sap" },
        { icon: "/images/protection/ppf-icon-uv-rays.png", title: "UV Rays" },
        { icon: "/images/protection/ppf-icon-salt-sand.png", title: "Salt & Sand" },
      ],
    },
    {
      type: "imageBanner",
      width: "full",
      spacing: "none",
      image: { src: "/images/protection/ppf-highlight-banner-1.png", alt: "LL_Highlight-Banner_2", width: 1920, height: 800 },
    },
    {
      type: "heading",
      background: "mist",
      title: "Compare Ceramic Paint Protection with PPF.",
      as: "h2",
      size: "md",
      align: "center",
      spacing: "sm",
      html: "<p>Ask your installer for a bundle offer on PPF and Ceramic Paint Protection.</p>",
    },
    {
      type: "richText",
      background: "mist",
      spacing: "sm",
      html: "<h3>Ceramic Paint Protection</h3><p>Adds a hydrophobic layer that helps preserve gloss and keep your car cleaner for longer.</p><h4>Benefits</h4><ul><li>Protects against contaminants, tree sap, bird and bat poo</li><li>Easier to clean and maintain surface appearance</li><li>Reduces maintenance, less wash and wax</li><li>Helps retain glossy surface</li><li>Delivers advanced hydrophobicity, water sheets off</li></ul>",
    },
    {
      type: "richText",
      background: "mist",
      spacing: "sm",
      html: "<h3>Paint Protection Film (PPF)</h3><p>Adds an extra layer that delivers high-impact, durable protection for the painted surfaces of your new vehicle.</p><h4>Benefits</h4><ul><li>Protects against contaminants, tree sap, bird and bat poo, will not discolour or stain</li><li>Protects against scratches and chips caused by road debris</li><li>Hydrophobic characteristics, water just sheets off</li><li>Self-healing, marks simply disappear with heat</li><li>Available in gloss or matte</li></ul>",
    },
    { type: "note", text: "*T&C’s apply ask in store for detail.", spacing: "sm" },
    ...interestFreeSections(
      "Get Paint Protection Film Interest Free!",
      "*10 year Warranty: Warranty terms, conditions and exclusions apply, ask in store for details. Warranty is non-transferable.",
    ),
    {
      type: "accordion",
      title: "Some key reasons to buy Paint Protection Film",
      items: [
        {
          title: "Learn more about Paint Protection Film",
          html: "<p>Tough and durable car protection where you need it most.</p><p>Provides a physical barrier between the paint surface of your vehicle to the environmental elements, scratches and road debris commonly around your car.</p><p>Protection from common hazards such as bug splatter, tree sap and UV rays, gives you the peace of mind that your car will remain looking new for longer.</p><p>The added bonus of hydrophobic qualities that helps to reduce the amount of cleaning required and protect the paint surface of your vehicle from hard water.</p><p>The best part, is Paint Protection Film can be applied to be invisible, the seamless application is undetectable to the human eye and they high-gloss finish helps to keep your paint looking like paint.</p><p>Paint Protection Film comes with a non-transferrable 10 year warranty*</p>",
        },
        {
          title: "10 Year Warranty",
          html: "<p>Paint Protection Film comes with a 10 year warranty.</p><p>This means you have peace of mind knowing that your protection is going to last.</p><p>Warranty terms conditions and exclusions apply, ask in store for more information.</p>",
        },
        {
          title: "Buy Now. Pay Later. Zero Interest.",
          html: "<p>Selected Tint a Car stores offer Afterpay and ZIP Pay which means you can split your purchase over various payment schedules with ZERO interest. Get the right look, protection and privacy for your Car Home or Office sooner using one of our associated Buy Now, Pay Later partners!</p><p>Click <a href=\"https://www.afterpay.com/en-AU/stores/134840/locations\">here</a> to see where you can get <a href=\"https://www.afterpay.com/en-AU/stores/134840/locations\">Afterpay</a> and ask in store about ZIP Pay.</p>",
        },
      ],
    },
    {
      type: "heading",
      background: "ink",
      title: "Ask in store how you can get total vehicle protection.",
      as: "h3",
      size: "sm",
      spacing: "sm",
      html: "<h4>Pair with LLumar Window Film and Elite X Interior Protection for the complete package and peace of mind.</h4>",
      buttons: [{ ...FIND_STORE, variant: "white" }],
    },
    {
      type: "imageBanner",
      width: "full",
      spacing: "none",
      image: { src: "/images/protection/ppf-highlight-banner-2.png", alt: "LL_Highlight-Banner", width: 1920, height: 800 },
    },
    neanyTestimonial,
  ],
};
