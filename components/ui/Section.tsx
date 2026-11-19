import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionBackground = "white" | "mist" | "panel" | "sky" | "navy" | "ink" | "black";
export type SectionSpacing = "none" | "sm" | "md" | "lg";
export type SectionWidth = "container" | "narrow" | "full";

const BACKGROUNDS: Record<SectionBackground, string> = {
  white: "bg-white",
  mist: "bg-mist",
  panel: "bg-[#efefef]",
  sky: "bg-sky",
  navy: "bg-navy text-white",
  ink: "bg-ink text-white",
  black: "bg-black text-white",
};

const DARK_BACKGROUNDS: SectionBackground[] = ["navy", "ink", "black"];

/** True when text on this background should switch to light colours */
export function isDarkBackground(background?: SectionBackground): boolean {
  return background !== undefined && DARK_BACKGROUNDS.includes(background);
}

const SPACING: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-6 md:py-8",
  md: "py-10 md:py-14",
  lg: "py-14 md:py-20",
};

const WIDTHS: Record<SectionWidth, string> = {
  container: "container-site",
  narrow: "container-site max-w-[900px]",
  full: "mx-auto w-full max-w-wide",
};

type SectionProps = {
  children: ReactNode;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  width?: SectionWidth;
  id?: string;
  className?: string;
  innerClassName?: string;
};

// Vertical rhythm + background + width wrapper shared by every page section
export function Section({
  children,
  background = "white",
  spacing = "md",
  width = "container",
  id,
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn(BACKGROUNDS[background], SPACING[spacing], className)}>
      <div className={cn(WIDTHS[width], innerClassName)}>{children}</div>
    </section>
  );
}
