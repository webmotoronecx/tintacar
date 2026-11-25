import type { BannerCarouselSection } from "@/types/sections";
import { ArtDirectedImage } from "@/components/ui/ArtDirectedImage";
import { Carousel } from "@/components/ui/Carousel";
import type { SectionSpacing } from "@/components/ui/Section";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

type BannerCarouselProps = Omit<BannerCarouselSection, "type">;

// Artwork is capped at the wide container so it isn't stretched on very large screens
const SIZES = "(min-width: 1920px) 1920px, 100vw";

// The banner sits under the header, so spacing only adds room below it
const GAP_BELOW: Record<SectionSpacing, string> = { none: "", sm: "mb-6 md:mb-8", md: "mb-10 md:mb-14", lg: "mb-14 md:mb-20" };

// Rotating full-width banners with the text baked into the artwork; the page heading stays for screen readers
export function BannerCarousel({ id, spacing = "none", title, titleAs: TitleTag = "h1", label = "Featured offers", slides, interval }: BannerCarouselProps) {
  return (
    <>
      {title && <TitleTag className="sr-only">{title}</TitleTag>}
      <section id={id} aria-roledescription="carousel" aria-label={label} className={cn("mx-auto max-w-wide", GAP_BELOW[spacing])}>
        <Carousel interval={interval}>
          {slides.map((slide, index) => {
            // Every slide loads up front so the next one never slides in blank
            const picture = (
              <ArtDirectedImage
                image={slide.image}
                mobileImage={slide.mobileImage}
                sizes={SIZES}
                isPriority={index === 0}
                loading="eager"
                className="block h-auto w-full"
              />
            );
            return slide.href ? (
              <SmartLink key={slide.image.src} href={slide.href} className="block">
                {picture}
              </SmartLink>
            ) : (
              <div key={slide.image.src}>{picture}</div>
            );
          })}
        </Carousel>
      </section>
    </>
  );
}
