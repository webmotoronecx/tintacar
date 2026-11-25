import type { TextLink } from "@/types/sections";
import { cn } from "@/lib/utils";
import { Divider } from "./Divider";
import { Highlight, HIGHLIGHT_TEXT, type HighlightColor } from "./Highlight";
import { SmartLink } from "./SmartLink";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";
export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl";

type SectionHeadingProps = {
  title: string;
  as?: HeadingLevel;
  size?: HeadingSize;
  eyebrow?: string;
  eyebrowColor?: HighlightColor;
  subtitle?: string;
  /** Short bold line under the title, e.g. "EXPERIENCE EXTRAORDINARY" */
  tagline?: string;
  taglineColor?: HighlightColor;
  align?: "left" | "center";
  divider?: boolean;
  dividerColor?: "brand" | "accent" | "llumar";
  highlightColor?: HighlightColor;
  light?: boolean;
  bold?: boolean;
  /** Turns the matching words of the title into a link */
  link?: TextLink;
  className?: string;
};

const SIZES: Record<HeadingSize, string> = {
  xs: "font-body text-[15px] font-normal leading-snug",
  sm: "text-[20px] md:text-[24px] leading-snug",
  md: "text-[26px] md:text-[36px] leading-tight",
  lg: "text-[30px] md:text-[40px] leading-[1.2]",
  xl: "text-[36px] md:text-[60px] leading-[1.2]",
};

// Heading with optional eyebrow, italic subtitle and accent divider
export function SectionHeading({
  title,
  as: Tag = "h2",
  size = "lg",
  eyebrow,
  eyebrowColor,
  subtitle,
  tagline,
  taglineColor,
  align = "left",
  divider = true,
  dividerColor = "brand",
  highlightColor = "accent",
  light = false,
  bold,
  link,
  className,
}: SectionHeadingProps) {
  const linkAt = link ? title.indexOf(link.label) : -1;

  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className={cn("mb-2 font-body text-[13px] font-bold uppercase tracking-wide", eyebrowColor ? HIGHLIGHT_TEXT[eyebrowColor] : light ? "text-white" : "text-ink")}>
          {eyebrow}
        </p>
      )}
      <Tag className={cn(SIZES[size], "tracking-[0.01em]", (bold ?? size === "sm") && "font-bold", light ? "text-white" : "text-heading")}>
        {link && linkAt >= 0 ? (
          <>
            <Highlight text={title.slice(0, linkAt)} color={highlightColor} />
            <SmartLink href={link.href} className="transition-colors hover:text-brand">
              {link.label}
            </SmartLink>
            <Highlight text={title.slice(linkAt + link.label.length)} color={highlightColor} />
          </>
        ) : (
          <Highlight text={title} color={highlightColor} />
        )}
      </Tag>
      {tagline && (
        <p className={cn("mt-4 font-heading text-[18px] font-bold uppercase", taglineColor ? HIGHLIGHT_TEXT[taglineColor] : light ? "text-white" : "text-heading")}>{tagline}</p>
      )}
      {subtitle && (
        <p className={cn("mt-3 font-body text-[15px] italic tracking-wide", light ? "text-white/80" : "text-muted")}>{subtitle}</p>
      )}
      {divider && <Divider color={dividerColor} align={align} className="mt-6" />}
    </div>
  );
}
