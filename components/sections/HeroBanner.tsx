import type { HeroBannerSection } from "@/types/sections";
import { ArtDirectedImage } from "@/components/ui/ArtDirectedImage";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const HEIGHTS = {
  xs: "min-h-[240px] md:min-h-[430px]",
  sm: "min-h-[280px] md:min-h-[420px]",
  md: "min-h-[440px] md:min-h-[577px]",
  lg: "min-h-[520px] md:min-h-[720px]",
};

// Artwork is capped at the wide container so it isn't stretched on very large screens
const SIZES = "(min-width: 1920px) 1920px, 100vw";

type HeroBannerProps = Omit<HeroBannerSection, "type">;

// Without minHeight the image keeps its natural ratio (for banners with text baked in)
export function HeroBanner({ id, image, mobileImage, title, titleAs: TitleTag = "h1", hideTitle, hideOnMobile, subtitle, buttons, minHeight, contentPosition = "bottom", overlay }: HeroBannerProps) {
  const showTitle = Boolean(title && !hideTitle);
  const hasContent = showTitle || Boolean(subtitle) || Boolean(buttons?.length);

  const srTitle = title && !showTitle ? <TitleTag className="sr-only">{title}</TitleTag> : null;

  return (
    <>
      {/* Kept outside the banner so the heading stays available when the banner is hidden on phones */}
      {srTitle}
      <section id={id} className={cn("relative isolate overflow-hidden bg-ink", hideOnMobile && "hidden md:block")}>
        {/* Blurred copy fills the side gutters beyond the wide container */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden min-[1921px]:block">
          <ArtDirectedImage image={image} fill sizes={SIZES} className="scale-110 object-cover opacity-60 blur-2xl" />
        </div>

        <div className={cn("relative mx-auto max-w-wide", minHeight && HEIGHTS[minHeight])}>

          <ArtDirectedImage
            image={image}
            mobileImage={mobileImage}
            fill={Boolean(minHeight)}
            sizes={SIZES}
            isPriority
            className={minHeight ? "object-cover" : "block h-auto w-full"}
          />
          {overlay && <div aria-hidden="true" className="absolute inset-0 bg-black/35" />}

          {hasContent && (
            <div
              className={cn(
                "absolute inset-0 flex px-4",
                contentPosition === "bottom" ? "items-end pb-10 md:pb-14" : "items-center",
              )}
            >
              <div className="container-site flex flex-col items-center gap-4 text-center">
                {showTitle && <TitleTag className={cn("leading-tight text-white", TitleTag === "h1" ? "text-[34px] md:text-[60px]" : "text-[28px] md:text-[36px]")}>{title}</TitleTag>}
                {subtitle && <p className={cn("max-w-2xl text-white", TitleTag === "h1" ? "text-[16px] md:text-[20px]" : "text-[15px]")}>{subtitle}</p>}
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
        </div>
      </section>
    </>
  );
}
