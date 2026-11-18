import type { HeroBannerSection } from "@/types/sections";
import { ArtDirectedImage } from "@/components/ui/ArtDirectedImage";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const HEIGHTS = {
  sm: "min-h-[280px] md:min-h-[420px]",
  md: "min-h-[440px] md:min-h-[577px]",
  lg: "min-h-[520px] md:min-h-[720px]",
};

type HeroBannerProps = Omit<HeroBannerSection, "type">;

// Without minHeight the image keeps its natural ratio (for banners with text baked in)
export function HeroBanner({ id, image, mobileImage, title, titleAs: TitleTag = "h1", hideTitle, subtitle, buttons, minHeight, contentPosition = "bottom", overlay }: HeroBannerProps) {
  const showTitle = Boolean(title && !hideTitle);
  const hasContent = showTitle || Boolean(subtitle) || Boolean(buttons?.length);

  return (
    <section id={id} className={cn("relative isolate overflow-hidden bg-ink", minHeight && HEIGHTS[minHeight])}>
      {title && !showTitle && <TitleTag className="sr-only">{title}</TitleTag>}

      <ArtDirectedImage
        image={image}
        mobileImage={mobileImage}
        fill={Boolean(minHeight)}
        isPriority
        className={minHeight ? "-z-10 object-cover" : "block h-auto w-full"}
      />
      {overlay && <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35" />}

      {hasContent && (
        <div
          className={cn(
            "absolute inset-0 flex px-4",
            contentPosition === "bottom" ? "items-end pb-10 md:pb-14" : "items-center",
          )}
        >
          <div className="container-site flex flex-col items-center gap-4 text-center">
            {showTitle && <TitleTag className="text-[34px] leading-tight text-white md:text-[60px]">{title}</TitleTag>}
            {subtitle && <p className="max-w-2xl text-[16px] text-white md:text-[20px]">{subtitle}</p>}
            {buttons?.map((button, index) => (
              <Button
                key={button.label}
                href={button.href}
                variant={button.variant ?? (index === 0 ? "solid" : "outline-light")}
                size={button.size}
                className="min-w-[200px]"
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
