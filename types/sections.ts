import type { ButtonSize, ButtonVariant } from "@/components/ui/Button";
import type { HighlightColor } from "@/components/ui/Highlight";
import type { SectionBackground, SectionSpacing } from "@/components/ui/Section";
import type { HeadingLevel, HeadingSize } from "@/components/ui/SectionHeading";
import type { ImageAsset, Seo } from "./content";

export type Cta = {
  label: string;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export type TextLink = {
  label: string;
  href: string;
};

export type Review = {
  author: string;
  text: string;
  rating: number;
  date?: string;
};

/** Shared by every section: anchor id, background and vertical spacing */
export type SectionBase = {
  id?: string;
  background?: SectionBackground;
  spacing?: SectionSpacing;
};

/** Full-bleed image banner; text baked into the image can stay as a hidden H1 */
export type HeroBannerSection = SectionBase & {
  type: "heroBanner";
  image: ImageAsset;
  mobileImage?: ImageAsset;
  title?: string;
  titleAs?: "h1" | "h2";
  hideTitle?: boolean;
  subtitle?: string;
  buttons?: Cta[];
  minHeight?: "sm" | "md" | "lg";
  contentPosition?: "center" | "bottom";
  overlay?: boolean;
};

/** Split banner: coloured text panel beside a photo */
export type SplitHeroSection = SectionBase & {
  type: "splitHero";
  title: string;
  eyebrow?: string;
  quote?: string;
  buttons?: Cta[];
  image: ImageAsset;
};

export type ButtonGroupSection = SectionBase & {
  type: "buttonGroup";
  buttons: Cta[];
  align?: "left" | "center" | "spread";
  stack?: boolean;
};

export type HeadingSection = SectionBase & {
  type: "heading";
  title: string;
  as?: HeadingLevel;
  size?: HeadingSize;
  eyebrow?: string;
  subtitle?: string;
  html?: string;
  align?: "left" | "center";
  divider?: boolean;
  dividerColor?: "brand" | "accent";
  highlightColor?: HighlightColor;
  bold?: boolean;
  topRule?: boolean;
  buttons?: Cta[];
  stackButtons?: boolean;
  showPaymentLogos?: boolean;
};

export type TileItem = {
  image: ImageAsset;
  href?: string;
  title?: string;
  text?: string;
  link?: TextLink;
  button?: Cta;
};

/** Grid of image tiles. plain = images only, card = centred caption below, story = caption left + button right */
export type TileGridSection = SectionBase & {
  type: "tileGrid";
  columns?: 2 | 3 | 4;
  gap?: "none" | "sm" | "md";
  variant?: "plain" | "card" | "story";
  items: TileItem[];
};

export type ImageBannerSection = SectionBase & {
  type: "imageBanner";
  image: ImageAsset;
  mobileImage?: ImageAsset;
  href?: string;
  title?: string;
  titleAlign?: "left" | "center";
  width?: "container" | "narrow" | "full";
};

export type ReviewsSection = SectionBase & {
  type: "reviews";
  title: string;
  reviews: Review[];
};

export type ComparisonTableSection = SectionBase & {
  type: "comparisonTable";
  title?: string;
  rowHeader: string;
  columns: { label: string; href?: string; highlight?: boolean }[];
  rows: { label: string; values: string[] }[];
  buttonLabel?: string;
};

/** Product detail block: features, spec bars and CTA beside a tall image */
export type FeatureSplitSection = SectionBase & {
  type: "featureSplit";
  title: string;
  as?: HeadingLevel;
  highlightColor?: HighlightColor;
  features?: { title: string; text?: string }[];
  notes?: string[];
  closing?: string;
  specs?: { title: string; items: { label: string; value: number }[]; note?: string };
  button?: Cta;
  paymentText?: string;
  image: ImageAsset;
  imagePosition?: "left" | "right";
};

export type IconFeaturesSection = SectionBase & {
  type: "iconFeatures";
  eyebrow?: string;
  title?: string;
  highlightColor?: HighlightColor;
  divider?: boolean;
  dividerColor?: "brand" | "accent";
  variant?: "divided" | "circle";
  columns?: 2 | 3 | 4;
  items: { icon: string; title: string; text?: string }[];
  button?: Cta;
};

export type VideoSection = SectionBase & {
  type: "video";
  youtubeId: string;
  title: string;
  poster?: ImageAsset;
  width?: "narrow" | "container";
};

export type CtaStripSection = SectionBase & {
  type: "ctaStrip";
  text?: string;
  buttons: Cta[];
  link?: TextLink;
};

export type NoteSection = SectionBase & {
  type: "note";
  text: string;
  align?: "left" | "center";
};

export type AccordionSection = SectionBase & {
  type: "accordion";
  title?: string;
  highlightColor?: HighlightColor;
  items: { title: string; html: string }[];
  defaultOpen?: number;
};

export type TestimonialSection = SectionBase & {
  type: "testimonial";
  quote: string;
  author: string;
};

export type RichTextSection = SectionBase & {
  type: "richText";
  title?: string;
  as?: HeadingLevel;
  size?: HeadingSize;
  html: string;
  align?: "left" | "center";
  width?: "container" | "narrow";
};

export type MediaTextSection = SectionBase & {
  type: "mediaText";
  image: ImageAsset;
  highlightColor?: HighlightColor;
  imageHref?: string;
  imagePosition?: "left" | "right";
  eyebrow?: string;
  title?: string;
  as?: HeadingLevel;
  size?: HeadingSize;
  html?: string;
  buttons?: Cta[];
  showPaymentLogos?: boolean;
  decoration?: "circle";
};

export type InfoCardsSection = SectionBase & {
  type: "infoCards";
  title?: string;
  items: { title: string; text: string; link?: TextLink }[];
};

/** Centred offer card with a background image */
export type PromoCardSection = SectionBase & {
  type: "promoCard";
  image: ImageAsset;
  html: string;
  buttons?: Cta[];
};

export type StoreLocatorSection = SectionBase & {
  type: "storeLocator";
  title?: string;
  intro?: string;
};

/** Product showcase: logo, intro, video, wide banner, then image tiles with captions */
export type ProductShowcaseSection = SectionBase & {
  type: "productShowcase";
  logo: ImageAsset;
  title: string;
  text?: string;
  youtubeId?: string;
  videoTitle?: string;
  banner?: ImageAsset;
  tiles?: { image: ImageAsset; title: string; subtitle?: string; text?: string }[];
};

/** Side-by-side comparison cards over a background image */
export type CompareCardsSection = SectionBase & {
  type: "compareCards";
  image: ImageAsset;
  title: string;
  subtitle?: string;
  cards: { logo: ImageAsset; lines: string[]; button?: Cta }[];
};

export type Section =
  | HeroBannerSection
  | SplitHeroSection
  | ButtonGroupSection
  | HeadingSection
  | TileGridSection
  | ImageBannerSection
  | ReviewsSection
  | ComparisonTableSection
  | FeatureSplitSection
  | IconFeaturesSection
  | VideoSection
  | CtaStripSection
  | NoteSection
  | AccordionSection
  | TestimonialSection
  | RichTextSection
  | MediaTextSection
  | InfoCardsSection
  | PromoCardSection
  | StoreLocatorSection
  | ProductShowcaseSection
  | CompareCardsSection;

export type SectionType = Section["type"];

export type PageData = {
  /** Route path with leading and trailing slash, e.g. "/home-tint/heat/" */
  path: string;
  seo: Seo & { image?: string };
  sections: Section[];
};
