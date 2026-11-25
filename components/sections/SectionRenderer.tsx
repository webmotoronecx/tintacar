import { Fragment } from "react";
import type { Section } from "@/types/sections";
import { Accordion } from "./Accordion";
import { ButtonGroup } from "./ButtonGroup";
import { CompareCards } from "./CompareCards";
import { ComparisonTable } from "./ComparisonTable";
import { CtaStrip } from "./CtaStrip";
import { Faq } from "./Faq";
import { FeatureSplit } from "./FeatureSplit";
import { GroupBlock } from "./GroupBlock";
import { HeadingBlock } from "./HeadingBlock";
import { HeroBanner } from "./HeroBanner";
import { IconFeatures } from "./IconFeatures";
import { ImageBanner } from "./ImageBanner";
import { InfoCards } from "./InfoCards";
import { MediaText } from "./MediaText";
import { Note } from "./Note";
import { ProductShowcase } from "./ProductShowcase";
import { PromoCard } from "./PromoCard";
import { QuickQuoteBlock } from "./QuickQuoteBlock";
import { Reviews } from "./Reviews";
import { RichTextBlock } from "./RichTextBlock";
import { SpecsPanel } from "./SpecsPanel";
import { SplitHero } from "./SplitHero";
import { StoreLocatorBlock } from "./StoreLocatorBlock";
import { Testimonial } from "./Testimonial";
import { TileGrid } from "./TileGrid";
import { VideoEmbed } from "./VideoEmbed";

function renderSection(section: Section) {
  switch (section.type) {
    case "heroBanner":
      return <HeroBanner {...section} />;
    case "splitHero":
      return <SplitHero {...section} />;
    case "buttonGroup":
      return <ButtonGroup {...section} />;
    case "heading":
      return <HeadingBlock {...section} />;
    case "tileGrid":
      return <TileGrid {...section} />;
    case "imageBanner":
      return <ImageBanner {...section} />;
    case "reviews":
      return <Reviews {...section} />;
    case "comparisonTable":
      return <ComparisonTable {...section} />;
    case "featureSplit":
      return <FeatureSplit {...section} />;
    case "iconFeatures":
      return <IconFeatures {...section} />;
    case "video":
      return <VideoEmbed {...section} />;
    case "ctaStrip":
      return <CtaStrip {...section} />;
    case "note":
      return <Note {...section} />;
    case "accordion":
      return <Accordion {...section} />;
    case "testimonial":
      return <Testimonial {...section} />;
    case "richText":
      return <RichTextBlock {...section} />;
    case "mediaText":
      return <MediaText {...section} />;
    case "infoCards":
      return <InfoCards {...section} />;
    case "promoCard":
      return <PromoCard {...section} />;
    case "storeLocator":
      return <StoreLocatorBlock {...section} />;
    case "quickQuote":
      return <QuickQuoteBlock {...section} />;
    case "productShowcase":
      return <ProductShowcase {...section} />;
    case "compareCards":
      return <CompareCards {...section} />;
    case "faq":
      return <Faq {...section} />;
    case "specsPanel":
      return <SpecsPanel {...section} />;
    case "group": {
      const { sections, ...group } = section;
      return (
        <GroupBlock {...group}>
          <SectionRenderer sections={sections.map((child) => ({ ...child, background: child.background ?? "overlay" }))} />
        </GroupBlock>
      );
    }
    default: {
      const unknown: never = section;
      throw new Error(`Unknown section type: ${JSON.stringify(unknown)}`);
    }
  }
}

type SectionRendererProps = {
  sections: Section[];
};

// Maps page data blocks to their components, in order
export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => (
        <Fragment key={`${section.type}-${index}`}>{renderSection(section)}</Fragment>
      ))}
    </>
  );
}
