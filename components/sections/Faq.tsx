import type { FaqSection } from "@/types/sections";
import { HIGHLIGHT_TEXT } from "@/components/ui/Highlight";
import { RichText } from "@/components/ui/RichText";
import { isDarkBackground, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type FaqProps = Omit<FaqSection, "type">;

// Question and answer list, optionally flowing into two columns
export function Faq({ id, background, spacing = "md", title, highlightColor, items, columns = 1, questionColor }: FaqProps) {
  const isLight = isDarkBackground(background);

  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && <SectionHeading title={title} size="md" bold align="center" divider={false} highlightColor={highlightColor} light={isLight} className="mb-10" />}
      <div className={cn(columns === 2 && "md:columns-2 md:gap-x-[70px]")}>
        {items.map((item) => (
          <div key={item.question} className="mb-10 break-inside-avoid">
            <h3 className={cn("font-body text-[15px] font-bold leading-[1.8]", questionColor ? HIGHLIGHT_TEXT[questionColor] : isLight ? "text-white" : "text-heading")}>
              {item.question}
            </h3>
            <RichText html={item.answerHtml} light={isLight} className="mt-4" />
          </div>
        ))}
      </div>
    </Section>
  );
}
