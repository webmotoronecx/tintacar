import type { RichTextSection } from "@/types/sections";
import { RichText } from "@/components/ui/RichText";
import { isDarkBackground, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type RichTextBlockProps = Omit<RichTextSection, "type">;

// Free-form copy (policies, lists, long descriptions)
export function RichTextBlock({ id, background, spacing = "md", title, as = "h2", size = "lg", html, align = "left", width = "container" }: RichTextBlockProps) {
  const isLight = isDarkBackground(background);

  return (
    <Section id={id} background={background} spacing={spacing} width={width}>
      {title && <SectionHeading title={title} as={as} size={size} align={align} divider={false} light={isLight} className="mb-6" />}
      <RichText html={html} light={isLight} className={cn(align === "center" && "text-center")} />
    </Section>
  );
}
