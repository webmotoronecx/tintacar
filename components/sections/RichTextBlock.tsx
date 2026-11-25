import type { RichTextSection } from "@/types/sections";
import type { HighlightColor } from "@/components/ui/Highlight";
import { RichText } from "@/components/ui/RichText";
import { isDarkBackground, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type RichTextBlockProps = Omit<RichTextSection, "type">;

const H3_COLORS: Record<HighlightColor, string> = {
  accent: "[&_h3]:text-accent",
  "accent-soft": "[&_h3]:text-accent-soft",
  brand: "[&_h3]:text-brand",
  olive: "[&_h3]:text-olive",
  llumar: "[&_h3]:text-llumar",
};

// Free-form copy (policies, lists, long descriptions), optionally in columns
export function RichTextBlock({ id, background, spacing = "md", title, as = "h2", size = "lg", highlightColor, bold, html, htmlColumns, columnStyle = "plain", headingColor, align = "left", width = "container" }: RichTextBlockProps) {
  const isLight = isDarkBackground(background);
  const blocks = [html, ...(htmlColumns ?? [])];
  const textClass = cn(align === "center" && "text-center", headingColor && H3_COLORS[headingColor]);

  return (
    <Section id={id} background={background} spacing={spacing} width={width}>
      {title && <SectionHeading title={title} as={as} size={size} align={align} divider={false} highlightColor={highlightColor} bold={bold} light={isLight} className="mb-6" />}
      {blocks.length > 1 ? (
        <div
          className={cn(
            "grid",
            blocks.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
            columnStyle === "card" ? "mx-auto max-w-[580px] gap-3" : "gap-8 md:gap-[30px]",
          )}
        >
          {blocks.map((block, index) => (
            <RichText key={index} html={block} light={isLight} className={cn(textClass, columnStyle === "card" && "bg-white px-4 py-6")} />
          ))}
        </div>
      ) : (
        <RichText html={html} light={isLight} className={textClass} />
      )}
    </Section>
  );
}
