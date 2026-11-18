import type { ArticleGroup, ImageAsset, Seo } from "@/types/content";

export type ArticlesIndexContent = {
  seo: Seo;
  title: string;
  intro: string;
  groups: { group: ArticleGroup; title: string; banner: ImageAsset; bannerHref: string }[];
};

// Copy and banners for the /articles/ listing page
export const articlesIndex: ArticlesIndexContent = {
  seo: {
    title: "Window Tinting Articles - Tint a Car",
    description:
      "Tint a Car information centre - a collection of useful articles relating to our window tinting products & services. Read these articles to find out more.",
  },
  title: "Window Tinting Articles",
  intro:
    "For over 40 years Tint a Car have been window tinting cars, homes, and offices across Australia. With lifetime warranties, interest-free payment plans, and a 30-day money-back guarantee, we are committed to quality. Find the answers to any of your questions about window tinting with Tint a Car articles. Read these articles for up-to-date information and trustworthy expertise!",
  groups: [
    {
      group: "car",
      title: "Car Window Tinting & Protection Products",
      banner: { src: "/images/articles/listing-car-banner.png", alt: "Tints from $295. Drive now, pay later with Afterpay or Zip", width: 2100, height: 600 },
      bannerHref: "/car-window-tint/",
    },
    {
      group: "home",
      title: "Home & Office Window Tinting",
      banner: { src: "/images/articles/listing-home-banner.png", alt: "Home solar window tint", width: 2100, height: 600 },
      bannerHref: "/home-tint/",
    },
  ],
};
