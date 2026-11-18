import Image from "next/image";
import type { ProductShowcaseSection } from "@/types/sections";
import { Section } from "@/components/ui/Section";
import { YouTubePlayer } from "./YouTubePlayer";

type ProductShowcaseProps = Omit<ProductShowcaseSection, "type">;

// Product block: logo + intro, optional video and banner, then captioned image tiles
export function ProductShowcase({
  id,
  background,
  spacing = "md",
  logo,
  title,
  text,
  youtubeId,
  videoTitle,
  banner,
  tiles,
}: ProductShowcaseProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      <div className="text-center">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="mx-auto h-auto w-[300px] max-w-full"
        />
        <h3 className="mt-4 text-[20px] font-bold text-heading md:text-[24px]">
          {title}
        </h3>
        {text && (
          <p className="mx-auto mt-2 max-w-3xl font-heading text-[22px] leading-snug text-heading md:text-[26px]">
            {text}
          </p>
        )}
      </div>
      {youtubeId && (
        <div className="mx-auto mt-8 max-w-[1130px]">
          <YouTubePlayer youtubeId={youtubeId} title={videoTitle ?? title} />
        </div>
      )}
      {banner && (
        <Image
          src={banner.src}
          alt={banner.alt}
          width={banner.width}
          height={banner.height}
          sizes="(min-width: 1200px) 1170px, 100vw"
          className="mx-auto mt-8 h-auto w-full"
        />
      )}
      {tiles && tiles.length > 0 && (
        <div className="mt-8 grid gap-[30px] sm:grid-cols-2">
          {tiles.map((tile) => (
            <div key={tile.title}>
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                width={tile.image.width}
                height={tile.image.height}
                sizes="(min-width: 640px) 570px, 100vw"
                className="h-auto w-full"
              />
              <h2 className="mt-3 text-[26px] leading-tight text-heading md:text-[32px]">
                {tile.title}
              </h2>
              {tile.subtitle && (
                <h3 className="mt-1 text-[18px] font-bold text-heading md:text-[20px]">
                  {tile.subtitle}
                </h3>
              )}
              {tile.text && (
                <p className="mt-3 text-[13px] leading-6">{tile.text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
