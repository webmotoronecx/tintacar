import type { PageData } from "@/types/sections";
import { FIND_STORE, interestFreeSections, neanyTestimonial } from "./shared";

export const elitexSurfaceProtectionPage: PageData = {
  path: "/protection-products/elitex-surface-protection/",
  seo: {
    title: "EliteX Ceramic Paint Protection - Tint a Car",
    description:
      "An advanced hydrophobic surface protection, EliteX is extremely durable & gives a super gloss finish. Protect your car paint by calling 13TINT for a free quote!",
  },
  sections: [
    { type: "heading", title: "Car Paint Protection and Interior Surface Protection", as: "h1", spacing: "sm" },
    {
      type: "imageBanner",
      spacing: "sm",
      image: { src: "/images/protection/elitex-combined.png", alt: "elite x car paint and interior protection", width: 1360, height: 647 },
    },
    {
      type: "buttonGroup",
      spacing: "sm",
      align: "left",
      buttons: [
        { ...FIND_STORE, variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline" },
      ],
    },
    {
      type: "heading",
      title: "Discover the importance of both paint and interior surface protection for your car.",
      as: "h2",
      size: "md",
      align: "center",
      spacing: "sm",
    },
    {
      type: "richText",
      spacing: "sm",
      html: "<h3>Elite X Paint Protection:</h3><p>Ceramic surface paint protection provides a durable and high gloss finish to your car that keeps it looking new!</p><h4>For protection against:</h4><ul><li>Weather induced oxidisation, fading &amp; loss of gloss</li><li>Bird &amp; bat droppings</li><li>Road grime</li><li>Tree sap &amp; bug splatter</li><li>Bore water &amp; water marks</li></ul><h4>Why is Elite X Ceramic Paint Protection important?</h4><ul><li>Hydrophobic ceramic technology, makes water bead off your car</li><li>Developed to be extremely tough and durable against the elements</li><li>Helps to protect from the results of harmful UV rays</li><li>Provides an outstanding high gloss mirror-like finish</li><li>Helps keep your vehicle cleaner for longer</li><li>Once-off application</li><li>Professionally applied</li><li>Can help to maximise re-sale value</li><li>Backed by a nationwide limited lifetime warranty**</li></ul>",
    },
    {
      type: "richText",
      spacing: "sm",
      html: "<h3>Elite X Interior Protection:</h3><p>Designed to maintain the condition of your car’s leather, vinyl &amp; fabric areas maintaining the showroom finish of your car.</p><h4>For protection against:</h4><ul><li>Dehydration &amp; Discolouration</li><li>Cracking, splitting and hardening</li><li>Mould and mildew growth</li><li>Food and drink stains</li><li>Make-up &amp; Sunscreen</li></ul><h4>Added benefits of Interior Surface Protection:</h4><ul><li>Once-off application</li><li>Helps to make cleaning easier</li><li>Professionally applied</li><li>Backed by a nationwide limited lifetime warranty**</li></ul>",
    },
    { type: "buttonGroup", spacing: "sm", buttons: [FIND_STORE] },
    {
      type: "mediaText",
      background: "panel",
      imagePosition: "right",
      title: "==A protective coating with double the protection.==",
      size: "md",
      html: "<p>Elite X has been developed to add an incredible 8 microns of protection directly onto your vehicle’s exterior surfaces.</p>",
      image: { src: "/images/protection/elitex-diagram.png", alt: "elite x car paint protection and interior protection", width: 578, height: 169 },
    },
    {
      type: "heading",
      title:
        "To get the most out of your Elite X Car Paint Protection and Interior Surface Protection, ask us in store about our Elite X car care products!",
      as: "h2",
      size: "md",
      align: "center",
      buttons: [{ ...FIND_STORE, variant: "solid" }],
    },
    { type: "video", youtubeId: "7W69tF8sze4", title: "Elite X Ceramic Paint Protection" },
    {
      type: "promoCard",
      image: { src: "/images/protection/elitex-special-offer-bg.png", alt: "", width: 1564, height: 700 },
      html: "<h3>SPECIAL OFFER</h3><h2>Ceramic Bundle!</h2><h3>Elite X Ceramic Surface Paint Protection + Any Car Tint*</h3><h3>Get the total bundle with</h3><h2>Elite X Exterior + Interior Protection!</h2><p>Contact your local store today to find out more.</p>",
      buttons: [
        { ...FIND_STORE, variant: "outline-light" },
        { label: "Quick quote", href: "/contact-a-store/", variant: "white" },
      ],
    },
    { type: "note", text: "*Prices vary depending on tint selection & vehicle size, T&C’s apply ask in store for detail.", spacing: "sm" },
    ...interestFreeSections(
      "Get Elite X Paint or Interior Protection Interest Free!",
      "**Limited Lifetime Warranty: Warranty terms, conditions and exclusions apply, ask in store for details. Limited lifetime warranty is non-transferable.",
    ),
    {
      type: "accordion",
      title: "Some key reasons to buy Elite X Exterior Surface Coating.",
      items: [
        {
          title: "Learn more about Interior Surface Protection by Elite X",
          html: "<p>Elite X Interior Car Protection has three specifically designed formulas for Fabric &amp; Carpet, Vinyl and Leather. This means dedicated protection to all your interior surfaces. Elite X Interior provides protection from common stains such as makeup, food, and drink.<br>Get added peace of mind of a limited lifetime warranty*</p>",
        },
        {
          title: "Learn more about Paint Protection by Elite X",
          html: "<p>Ultimate Durability. Unbelievable Shine. Get that high gloss finish.</p><p>Elite X Ceramic Surface Paint Protection coating, is an extra layer of peace of mind for all car lovers, knowing your paint work is protected from paint fading, bird and bat droppings, bugs and tree sap. Elite X also comes with a non-transferable lifetime warranty, meaning we are with you for as long as your car is!</p><p>To have full Elite X protection take a look at Elite X Interior Surface Protection which provides protection for where you spend most of your time, inside of your vehicle.</p>",
        },
        {
          title: "Lifetime Warranty",
          html: "<p>Both Elite X Interior and Exterior Ceramic Car Paint Protection come with a Limited Lifetime Warranty.</p><p>Elite X Interior Warranty is only available to Vehicles purchased (new) within 24 months (2 years) of first registration of the vehicle. Elite X Exterior Car Paint Protection Warranty is only available to vehicles purchased (new) within 60 months (5 years) of first registration of the vehicle. Warranty Terms Conditions and Exclusions apply, ask in store for more information.</p>",
        },
        {
          title: "Buy Now. Pay Later. Zero Interest.",
          html: "<p>Tint a Car offers Afterpay and ZIP Pay which means you can split your purchase over various payment schedules with ZERO interest. Get the right look, protection and privacy for your Car Home or Office sooner using one of our associated Buy Now, Pay Later partners!</p>",
        },
        {
          title: "30 Day Money Back Guarantee",
          html: "<p>We offer a 30 day money-back guarantee to all of our customers. Yep, you heard it.<br>If you’re not completely satisfied with your automotive tint from any Tint a Car store, we’ll remove the tint and give you your money back. Must claim within 30 days of sale.</p>",
        },
      ],
    },
    neanyTestimonial,
  ],
};
