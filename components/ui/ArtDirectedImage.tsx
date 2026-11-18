import { getImageProps } from "next/image";
import type { ImageAsset } from "@/types/content";

type ArtDirectedImageProps = {
  image: ImageAsset;
  mobileImage?: ImageAsset;
  sizes?: string;
  isPriority?: boolean;
  fill?: boolean;
  className?: string;
};

const MOBILE_QUERY = "(max-width: 767px)";

// <picture> that swaps to a portrait/mobile crop on small screens
export function ArtDirectedImage({ image, mobileImage, sizes = "100vw", isPriority, fill, className }: ArtDirectedImageProps) {
  const loading = isPriority ? ("eager" as const) : ("lazy" as const);
  const shared = { alt: image.alt, sizes, loading, ...(isPriority ? { fetchPriority: "high" as const } : {}) };
  const dims = (asset: ImageAsset) => (fill ? { fill: true } : { width: asset.width, height: asset.height });

  const { props: desktopProps } = getImageProps({ ...shared, src: image.src, ...dims(image) });
  const mobileSrcSet = mobileImage ? getImageProps({ ...shared, src: mobileImage.src, ...dims(mobileImage) }).props.srcSet : undefined;

  return (
    <picture>
      {mobileImage && mobileSrcSet && (
        <source
          media={MOBILE_QUERY}
          srcSet={mobileSrcSet}
          sizes={sizes}
          {...(fill ? {} : { width: mobileImage.width, height: mobileImage.height })}
        />
      )}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...desktopProps} className={className} />
    </picture>
  );
}
