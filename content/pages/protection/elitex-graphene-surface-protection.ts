import type { PageData } from "@/types/sections";
import { FIND_STORE, interestFreeSections, neanyTestimonial } from "./shared";

const PROTECTS_AGAINST = "/protection-products/elitex-graphene-surface-protection/#protects-against";

export const elitexGraphenePage: PageData = {
  path: "/protection-products/elitex-graphene-surface-protection/",
  seo: {
    title: "EliteX +GrapheneCeramic Paint Protection - Tint a Car",
    description:
      "Advanced hydrophobic surface protection, EliteX +Graphene is extremely durable & gives a super gloss finish. Call 13TINT for a free quote!",
  },
  sections: [
    {
      type: "heroBanner",
      minHeight: "xs",
      image: { src: "/images/protection/elitex-graphene-banner.webp", alt: "Elite X +Graphene Infused Surface Protection", width: 1920, height: 750 },
      buttons: [
        { ...FIND_STORE, variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline-light" },
      ],
    },
    {
      type: "heading",
      title: "==Elite X +Graphene Infused== Surface Protection.",
      as: "h1",
      size: "lg",
      highlightColor: "brand",
      divider: false,
      bottomRule: true,
      spacing: "sm",
      html: "<h3>Now more durable than ever.</h3><p>ELITE X +Graphene Infused formula brings exceptional levels of hardness and greater defence against fading and oxidation of clear and base coats. Only one atom thick, Graphene helps deliver incredible strength and added durability for longer lasting protection to the surface of your vehicle.</p>",
    },
    {
      type: "featureSplit",
      title: "Elite X +Graphene Infused Exterior Surface Coating",
      layout: "contained",
      featureStyle: "timeline",
      features: [
        {
          title: "EXTREME HARDNESS & RESISTANCE AGAINST THE ELEMENTS",
          text: "Elite X +Graphene Infused Surface Protection now delivers enhanced abrasion resistance, ensuring the coating withstands weathering, dirt, and road grime. With strengthened bonds, increased hardness and exception durability, Elite X +Graphene Infused Surface Protection surpasses and outlasts most other paint protection products.",
        },
        {
          title: "KEEP YOUR VEHICLE LOOKING NEWER FOR LONGER",
          text: "Creating a hybrid formula (Silicon Dioxide + Silicon Carbide, infused with Graphene) Elite X +Graphene bonds deeper into the vehicle’s paintwork and is noticeably smoother to touch and optically shinier.",
        },
        {
          title: "ENHANCED DURABILITY AND PROTECTION",
          text: "Elite X +Graphene Infused Surface Protection offers thermal (heat) properties that are approximately double those of conventional ceramic coatings. This results in outstanding durability and superior protection for your vehicles paintwork.",
        },
        {
          title: "A NEW HYDROPHOBIC INTELLIGENCE",
          text: "Elite X +Graphene Infused Surface Protection offers exceptional hydrophobic properties, creating a low-maintenance, easy-to-clean surface. Engineered with nanotechnology, it forms distinctive water beads that roll off, carrying away dirt, dust, and road grime",
        },
      ],
      button: { label: "See what it protects against", href: PROTECTS_AGAINST },
      image: { src: "/images/protection/elitex-graphene-exterior-feature.png", alt: "", width: 1000, height: 961 },
    },
    {
      type: "heading",
      title: "==Elite X Interior== Surface Protection.",
      as: "h2",
      size: "lg",
      highlightColor: "brand",
      divider: false,
      bottomRule: true,
      spacing: "sm",
      html: "<h3>Advanced protection against common stains.</h3><p>Unmatched protection for your vehicle’s interior surfaces. Elite X Interior Protection forms a powerful barrier against UV damage, spills, stains, dirt, and grime, helping preserve your interior’s look, feel, and value for years to come.</p>",
    },
    {
      type: "featureSplit",
      title: "Elite X Interior Surface Coating",
      imagePosition: "left",
      layout: "contained",
      featureStyle: "timeline",
      features: [
        {
          title: "EXCEPTIONAL DURABILITY AND STAIN RESISTANCE",
          text: "Elite X Interior Surface Protection offers exceptional durability and maximum stain resistance, effectively protecting against common stains caused by makeup, water, coffee, milk, and other frequently consumed foods and liquids.",
        },
        {
          title: "UV PROTECTION",
          text: "Elite X Interior Surface Protection shields against the harmful effects of UV rays, ensuring that your vehicle’s interior is fully protected and giving you complete peace of mind.",
        },
        {
          title: "EFFORTLESS CLEANING",
          text: "Simply wipe away spills with Elite X Interior Surface Protection. Our Teflon-like coating creates a durable, non-stick surface. This advanced technology ensures that liquids and spills slide right off..",
        },
      ],
      button: { label: "See what it protects against", href: PROTECTS_AGAINST },
      image: { src: "/images/protection/elitex-graphene-interior-feature.png", alt: "", width: 982, height: 1037 },
    },
    {
      type: "heading",
      id: "protects-against",
      title: "Discover the importance of both paint and interior surface protection for your car.",
      as: "h2",
      size: "lg",
      align: "center",
      divider: false,
      spacing: "sm",
    },
    {
      type: "richText",
      spacing: "sm",
      headingColor: "brand",
      html: "<h3>Elite X +Graphene Infused Paint Protection:</h3><h4>For protection against:</h4><ul><li>Weather induced oxidisation</li><li>Fading &amp; loss of gloss</li><li>Bird &amp; bat droppings</li><li>Tree sap &amp; bug splatter</li><li>Rail dust &amp; fallen leaves</li></ul><h4>Additional benefits:</h4><ul><li>Once-off application with no inspections</li><li>Professionally applied</li><li>Less maintenance, keeps your vehicle cleaner for longer</li><li>Backed by a nationwide limited lifetime warranty**</li></ul>",
      htmlColumns: [
        "<h3>Elite X Interior Protection:</h3><h4>For protection against:</h4><ul><li>Dehydration &amp; Discolouration</li><li>Cracking, splitting and hardening</li><li>Mould and mildew growth</li><li>Food and drink stains</li><li>Make-up &amp; Sunscreen</li></ul><h4>Added benefits of Interior Surface Protection:</h4><ul><li>Once-off application</li><li>Helps to make cleaning easier</li><li>Professionally applied</li><li>Backed by a nationwide limited lifetime warranty**</li></ul>",
      ],
    },
    { type: "buttonGroup", spacing: "sm", align: "center", buttons: [{ ...FIND_STORE, variant: "solid", size: "sm" }] },
    {
      type: "mediaText",
      background: "panel",
      imagePosition: "right",
      title: "==Evolution of Graphene Technology.==",
      highlightColor: "brand",
      size: "md",
      html: "<p>Elite X was developed to add an incredible 8 microns of protection directly onto your vehicle’s exterior surfaces. Now with an added layer of graphene infused formula, brings exceptional levels of hardness and greater defence against fading and oxidation of clear and base coats.</p>",
      image: { src: "/images/protection/elitex-graphene-diagram.png", alt: "Standard coat, Elite X coating and Elite X +Graphene infusion compared", width: 969, height: 282 },
    },
    {
      type: "heading",
      title:
        "To get the most out of your Elite X +Graphene Car Paint Protection and Interior Surface Protection, ask us in store about our Elite X car care products!",
      as: "h2",
      size: "md",
      align: "center",
      divider: false,
      buttons: [{ ...FIND_STORE, variant: "solid", size: "sm" }],
    },
    {
      type: "imageBanner",
      image: { src: "/images/protection/elitex-promo-banner.png", alt: "", width: 2000, height: 781 },
    },
    { type: "note", text: "*Prices vary depending on tint selection & vehicle size, T&C’s apply ask in store for detail.", spacing: "sm" },
    ...interestFreeSections(
      "Get Elite X Paint or Interior Protection Interest Free!",
      "**Limited Lifetime Warranty: Warranty terms, conditions and exclusions apply, ask in store for details. Limited lifetime warranty is non-transferable.",
    ),
    {
      type: "accordion",
      title: "Some ==key reasons== to buy Elite X + Graphene Infused Exterior Surface Coating.",
      defaultOpen: -1,
      items: [
        {
          title: "Why Choose EliteX +Graphene over Standard EliteX?",
          html: "<p>Both products deliver high quality protection for your vehicle’s surfaces. However, EliteX +Graphene takes it a step further, offering superior durability and longevity. With its remarkable tensile strength, combined with lightweight and flexible properties, EliteX +Graphene provides the highest level of protection for your vehicle, making it the ultimate choice.</p>",
        },
        {
          title: "Learn more about Interior Surface Protection by Elite X",
          html: "<p>Elite X Interior Car Protection has three specifically designed formulas for Fabric &amp; Carpet, Vinyl and Leather. This means dedicated protection to all your interior surfaces. Elite X Interior provides protection from common stains such as makeup, food, and drink.<br>Get added peace of mind of a limited lifetime warranty*</p>",
        },
        {
          title: "Learn more about Paint Protection by Elite X",
          html: "<p>Ultimate Durability. Unbelievable Shine. Get that high gloss finish.</p><p>Elite X Ceramic +Graphene Infused Surface Paint Protection coating, is an extra layer of peace of mind for all car lovers, knowing your paint work is protected from paint fading, bird and bat droppings, bugs and tree sap. Elite X +Graphene also comes with a non-transferable lifetime warranty, meaning we are with you for as long as your car is!</p><p>To have full Elite X protection take a look at Elite X Interior Surface Protection which provides protection for where you spend most of your time, inside of your vehicle.</p>",
        },
        {
          title: "Lifetime Warranty",
          html: "<p>Both Elite X Interior and Exterior Ceramic Car Paint Protection come with a Limited Lifetime Warranty.</p><p>Elite X Interior Warranty is only available to Vehicles purchased (new) within 24 months (2 years) of first registration of the vehicle. Elite X Exterior Car Paint Protection Warranty is only available to vehicles purchased (new) within 60 months (5 years) of first registration of the vehicle. Warranty Terms Conditions and Exclusions apply, ask in store for more information.</p>",
        },
        {
          title: "Buy Now. Pay Later. Zero Interest.",
          html: "<p>Tint a Car offers Afterpay and ZIP Pay which means you can split your purchase over various payment schedules with ZERO interest. Get the right look, protection and privacy for your Car Home or Office sooner using one of our associated Buy Now, Pay Later partners!</p>",
        },
      ],
    },
    neanyTestimonial,
  ],
};
