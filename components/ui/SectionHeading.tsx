import { cn } from "@/lib/utils";
import { Divider } from "./Divider";
import { Highlight, type HighlightColor } from "./Highlight";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";
export type HeadingSize = "sm" | "md" | "lg" | "xl";

type SectionHeadingProps = {
  title: string;
  as?: HeadingLevel;
  size?: HeadingSize;
  eyebrow?: string;
  subtitle?: string;
  align?: "left" | "center";
  divider?: boolean;
  dividerColor?: "brand" | "accent";
  highlightColor?: HighlightColor;
  light?: boolean;
  bold?: boolean;
  className?: string;
};

const SIZES: Record<HeadingSize, string> = {
  sm: "text-[20px] md:text-[24px] leading-snug",
  md: "text-[26px] md:text-[32px] leading-tight",
  lg: "text-[30px] md:text-[40px] leading-[1.2]",
  xl: "text-[36px] md:text-[60px] leading-[1.2]",
};

// Heading with optional eyebrow, italic subtitle and accent divider
export function SectionHeading({
  title,
  as: Tag = "h2",
  size = "lg",
  eyebrow,
  subtitle,
  align = "left",
  divider = true,
  dividerColor = "brand",
  highlightColor = "accent",
  light = false,
  bold = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className={cn("mb-2 font-body text-[13px] font-bold uppercase tracking-wide", light ? "text-white" : "text-ink")}>
          {eyebrow}
        </p>
      )}
      <Tag className={cn(SIZES[size], "tracking-[0.01em]", bold && "font-bold", light ? "text-white" : "text-heading")}>
        <Highlight text={title} color={highlightColor} />
      </Tag>
      {subtitle && (
        <p className={cn("mt-3 font-body text-[15px] italic tracking-wide", light ? "text-white/80" : "text-muted")}>{subtitle}</p>
      )}
      {divider && <Divider color={dividerColor} align={align} className="mt-6" />}
    </div>
  );
}
