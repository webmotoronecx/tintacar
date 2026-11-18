import type { PageData } from "@/types/sections";
import { FIND_STORE } from "./shared";

export const protectionProductsPage: PageData = {
  path: "/protection-products/",
  seo: {
    title: "Car Protection - Exterior & Interior Surfaces - Tint a Car",
    description:
      "Protect your car for life with our range of exterior & interior surface coatings. Contact your local Tint a Car store to find out more and for a free quote!",
  },
  sections: [
    {
      type: "heading",
      title: "Exterior and interior car protection products.",
      as: "h1",
      subtitle: "Protect your car for life.",
      spacing: "sm",
      buttons: [
        { ...FIND_STORE, label: "Find your nearest store", variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline" },
      ],
    },
    {
      type: "tileGrid",
      variant: "card",
      columns: 3,
      gap: "md",
      items: [
        {
          image: { src: "/images/protection/tile-elitex-graphene.webp", alt: "Elite X +Graphene Car Protection", width: 1080, height: 1350 },
          href: "/protection-products/elitex-graphene-surface-protection/",
          title: "Elite X +Graphene Car Protection",
          button: { ...FIND_STORE, variant: "outline" },
        },
        {
          image: { src: "/images/protection/tile-paint-protection-film.png", alt: "Paint protection film (PPF)", width: 1080, height: 1350 },
          href: "/protection-products/paint-protection-film/",
          title: "Paint Protection Film (PPF)",
          button: { ...FIND_STORE, variant: "outline" },
        },
        {
          image: { src: "/images/protection/tile-car-care-range.png", alt: "Tint a Car. Car care protection products", width: 1080, height: 1350 },
          href: "/car-care/",
          title: "Elite X Car Care Range",
          button: { ...FIND_STORE, variant: "outline" },
        },
      ],
    },
  ],
};
