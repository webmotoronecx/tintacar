import { getImageProps } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoSource = {
  src: string;
  width: number;
  height: number;
};

type LogoProps = {
  alt: string;
  desktop: LogoSource;
  mobile?: LogoSource;
  className?: string;
};

const DESKTOP_QUERY = "(min-width: 992px)";

// Single <picture> so only the logo for the current breakpoint is downloaded
export function Logo({ alt, desktop, mobile, className }: LogoProps) {
  const base = mobile ?? desktop;
  const { props } = getImageProps({ alt, src: base.src, width: base.width, height: base.height, loading: "eager" });
  const desktopSrcSet = mobile ? getImageProps({ alt, src: desktop.src, width: desktop.width, height: desktop.height }).props.srcSet : undefined;

  return (
    <Link href="/" aria-label="Home" className="inline-block shrink-0">
      <picture>
        {desktopSrcSet && <source media={DESKTOP_QUERY} srcSet={desktopSrcSet} width={desktop.width} height={desktop.height} />}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img {...props} className={cn("h-auto", className)} />
      </picture>
    </Link>
  );
}
