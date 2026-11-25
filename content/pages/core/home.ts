import type { PageData } from "@/types/sections";
import { googleReviews } from "@/content/reviews";

export const homePage: PageData = {
  path: "/",
  seo: {
    title: "Window Tinting for Car, Home & Office - Tint a Car",
    description:
      "Get window tinting for your car, home & office. Call 13TINT for a free measure & quote! Improve privacy, reflect 99% of UV & reject solar heat and more.",
  },
  sections: [
    {
      // Live rotates these every 5 seconds and both link to the sunroof film offer
      type: "bannerCarousel",
      spacing: "md",
      title: "Window Tinting for Car, Home & Office.",
      label: "Tint a Car offers",
      slides: [
        {
          image: { src: "/images/home/banner-protects-best.webp", alt: "Tint a Car Protects Best. Because your car & home deserve it.", width: 2100, height: 600 },
          href: "/car-window-tint/sunroof-film/",
        },
        {
          image: { src: "/images/home/banner-sunroof.webp", alt: "Protect all your glass. Add Sunroof Protection Film with Window Tint and save $100.", width: 2100, height: 600 },
          href: "/car-window-tint/sunroof-film/",
        },
      ],
    },
    {
      type: "buttonGroup",
      align: "spread",
      spacing: "none",
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/" },
        { label: "Enquire now", href: "/contact-a-store/" },
      ],
    },
    {
      type: "heading",
      title: "Take a look at our most popular products!",
      align: "center",
      spacing: "sm",
    },
    {
      type: "tileGrid",
      columns: 3,
      gap: "md",
      items: [
        {
          image: { src: "/images/home/tile-black-panther.webp", alt: "Black Panther - Simply Wild Tint", width: 532, height: 517 },
          href: "/car-window-tint/black-panther-window-tint/",
          title: "Black Panther Window Tint",
        },
        {
          image: { src: "/images/home/tile-octane.webp", alt: "Octane - Darkest Legal Tint", width: 540, height: 525 },
          href: "/car-window-tint/darkest-legal-tint/",
          title: "Octane Darkest Legal Tint",
        },
        {
          image: { src: "/images/home/tile-spectre.webp", alt: "Spectre - Ceramic Film Technology", width: 532, height: 517 },
          href: "/car-window-tint/ceramic-window-tint/",
          title: "Spectre Ceramic Tint",
        },
      ],
    },
    {
      type: "buttonGroup",
      spacing: "md",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/" }],
    },
    {
      type: "imageBanner",
      spacing: "sm",
      href: "/protection-products/elitex-graphene-surface-protection/",
      image: { src: "/images/home/elitex-banner.webp", alt: "Elite X - Surface protection with ceramic technology", width: 1124, height: 459 },
    },
    {
      type: "reviews",
      title: "See what people are saying about us.",
      reviews: googleReviews,
    },
    {
      type: "heading",
      title: "See the difference between our car window tints.",
      subtitle: "From reducing glare to protecting your loved ones from UV, there's a tint for everyone.",
      topRule: true,
      spacing: "sm",
    },
    {
      type: "imageBanner",
      width: "narrow",
      href: "/home-tint/",
      image: { src: "/images/home/home-tinting-banner.webp", alt: "Home tinting by Tint a Car", width: 842, height: 344 },
    },
    {
      type: "buttonGroup",
      spacing: "sm",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/" }],
    },
  ],
};
