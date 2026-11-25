export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Seo = {
  title: string;
  description: string;
};

export type ArticleGroup = "car" | "home";

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  group: ArticleGroup;
  categories: string[];
  image?: ImageAsset;
};

/** Third-party widgets an article can render below its body */
export type ArticleEmbed = "zip-landing";

export type Article = ArticleSummary & {
  modified: string;
  seo: Seo;
  html: string;
  embed?: ArticleEmbed;
};

export type StoreHours = {
  day: string;
  hours: string;
};

export type StoreServiceGroup = {
  title: string;
  items: string[];
};

export type StoreAddress = {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
};

export type Store = {
  slug: string;
  name: string;
  address: StoreAddress;
  phone?: string;
  /** Store inbox that receives Quick Quote enquiries */
  email: string;
  /** Spark store ID used in Quick Quote links and the referrals system */
  sparkId: string;
  lat?: number;
  lng?: number;
  hours: StoreHours[];
  services: StoreServiceGroup[];
  descriptionHtml?: string;
  socials: { facebook?: string; instagram?: string };
  seo: Seo;
};
