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
  /** Leave the banner out on phones, as some live pages do */
  hideOnMobile?: boolean;
  subtitle?: string;
  buttons?: Cta[];
  minHeight?: "xs" | "sm" | "md" | "lg";
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
  eyebrowColor?: HighlightColor;
  subtitle?: string;
  tagline?: string;
  taglineColor?: HighlightColor;
  html?: string;
  align?: "left" | "center";
  divider?: boolean;
  dividerColor?: "brand" | "accent" | "llumar";
  highlightColor?: HighlightColor;
  bold?: boolean;
  /** "inline" puts the buttons to the right of the title on wide screens */
  layout?: "stacked" | "inline";
  /** Render only the heading text for screen readers and search engines, as some live pages do */
  visuallyHidden?: boolean;
  topRule?: boolean;
  bottomRule?: boolean;
  buttons?: Cta[];
  stackButtons?: boolean;
  showPaymentLogos?: boolean;
};

export type TileItem = {
  image: ImageAsset;
  href?: string;
  title?: string;
  text?: string;
  /** Trusted HTML caption, used instead of text where the copy has links or emphasis */
  html?: string;
  bullets?: string[];
  link?: TextLink;
  button?: Cta;
};

/** Grid of image tiles. plain = images only, card = centred caption below, story = caption left + button right */
export type TileGridSection = SectionBase & {
  type: "tileGrid";
  columns?: 2 | 3 | 4;
  gap?: "none" | "sm" | "md";
  variant?: "plain" | "card" | "story";
  /** Card captions centred (default) or left-aligned with natural-size images */
  captionAlign?: "center" | "left";
  /** "natural" keeps product shots at their own width instead of filling the column */
  imageSize?: "fill" | "natural";
  items: TileItem[];
};

export type ImageBannerSection = SectionBase & {
  type: "imageBanner";
  image: ImageAsset;
  mobileImage?: ImageAsset;
  href?: string;
  title?: string;
  titleAlign?: "left" | "center";
  width?: "container" | "narrow" | "half" | "full";
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
  /** "bleed" runs the image to the screen edge; "contained" keeps it inside the page width */
  layout?: "bleed" | "contained";
  /** "timeline" lists features with gem markers joined by a line */
  featureStyle?: "plain" | "timeline";
};

export type IconFeaturesSection = SectionBase & {
  type: "iconFeatures";
  eyebrow?: string;
  title?: string;
  highlightColor?: HighlightColor;
  divider?: boolean;
  dividerColor?: "brand" | "accent" | "llumar";
  /** divided = vertical rules, circle = icons in rings, plain = icon and label only */
  variant?: "divided" | "circle" | "plain";
  columns?: 2 | 3 | 4 | 6;
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
  /** Product pages centre the panels; some pages use left-aligned ones */
  align?: "left" | "center";
  /** "toggle" shows each item as its own bordered box with a chevron */
  variant?: "panel" | "toggle";
  columns?: 1 | 2;
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
  highlightColor?: HighlightColor;
  bold?: boolean;
  html: string;
  /** Extra HTML blocks shown side by side with html on wider screens */
  htmlColumns?: string[];
  /** "card" shows each column as a white card */
  columnStyle?: "plain" | "card";
  /** Colour for h3 headings inside the copy */
  headingColor?: HighlightColor;
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
  eyebrowColor?: HighlightColor;
  title?: string;
  as?: HeadingLevel;
  size?: HeadingSize;
  divider?: boolean;
  dividerColor?: "brand" | "accent" | "llumar";
  html?: string;
  buttons?: Cta[];
  showPaymentLogos?: boolean;
  decoration?: "circle";
};

export type InfoCardsSection = SectionBase & {
  type: "infoCards";
  title?: string;
  /** Card title colour; defaults to the heading colour on light bands and brand gold on dark ones */
  titleColor?: "heading" | "brand" | "olive";
  items: { title: string; text: string; link?: TextLink }[];
};

/** Several sections sharing one background colour and photo; children default to the "overlay" band */
export type GroupSection = SectionBase & {
  type: "group";
  backgroundImage?: ImageAsset;
  imagePosition?: "center" | "top";
  sections: Section[];
};

/** Questions and answers; answers are trusted HTML from the content files */
export type FaqSection = SectionBase & {
  type: "faq";
  title?: string;
  highlightColor?: HighlightColor;
  columns?: 1 | 2;
  questionColor?: HighlightColor;
  items: { question: string; answerHtml: string }[];
};

/** Spec bars, short call-outs and a button beside a list of key features */
export type SpecsPanelSection = SectionBase & {
  type: "specsPanel";
  accent?: "accent" | "brand" | "olive";
  specs: { title: string; items: { label: string; value: number }[]; note?: string };
  lines?: string[];
  button?: Cta;
  features: { title: string; text: string }[];
  showPaymentLogos?: boolean;
};

/** Centred offer card with a background image */
export type PromoCardSection = SectionBase & {
  type: "promoCard";
  /** "card" is a centred tile; "band" runs the artwork full width with stacked buttons */
  layout?: "card" | "band";
  image: ImageAsset;
  html: string;
  buttons?: Cta[];
};

export type StoreLocatorSection = SectionBase & {
  type: "storeLocator";
  title?: string;
  /** Keep the H1 for search engines and screen readers but don't show it, as on the live page */
  hideTitle?: boolean;
  intro?: string;
  listTitle?: string;
};

/** Quick Quote form with the selected store panel; the store comes from ?id= or ?store_id= */
export type QuickQuoteSection = SectionBase & {
  type: "quickQuote";
  formTitle: string;
  storeTitle: string;
  /** Trusted HTML under the form, e.g. the privacy statement link */
  privacyHtml?: string;
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
  | QuickQuoteSection
  | ProductShowcaseSection
  | CompareCardsSection
  | GroupSection
  | FaqSection
  | SpecsPanelSection;

export type SectionType = Section["type"];

export type PageData = {
  /** Route path with leading and trailing slash, e.g. "/home-tint/heat/" */
  path: string;
  seo: Seo & { image?: string };
  sections: Section[];
  /** Leave out of sitemap.xml, e.g. pages that only work with query parameters */
  excludeFromSitemap?: boolean;
};
