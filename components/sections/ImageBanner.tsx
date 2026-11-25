import type { ImageBannerSection } from "@/types/sections";
import { ArtDirectedImage } from "@/components/ui/ArtDirectedImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

type ImageBannerProps = Omit<ImageBannerSection, "type">;

// Single wide promo image, optionally linked and titled
export function ImageBanner({ id, background, spacing = "sm", image, mobileImage, href, title, titleAlign = "left", width = "container" }: ImageBannerProps) {
  const picture = (
    <ArtDirectedImage
      image={image}
      mobileImage={mobileImage}
      sizes={width === "full" ? "100vw" : "(min-width: 1200px) 1170px, 100vw"}
      className="block h-auto w-full"
    />
  );

  return (
    <Section id={id} background={background} spacing={spacing} width={width === "full" ? "full" : "container"}>
      {title && <SectionHeading title={title} size="md" align={titleAlign} divider={false} className="mb-4" />}
      <div className={cn(width === "narrow" && "mx-auto max-w-[842px]", width === "half" && "mx-auto max-w-[585px]")}>
        {href ? (
          <SmartLink href={href} className="block transition-opacity hover:opacity-90" aria-label={image.alt || title || "Learn more"}>
            {picture}
          </SmartLink>
        ) : (
          picture
        )}
      </div>
    </Section>
  );
}
