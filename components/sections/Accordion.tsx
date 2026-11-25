import { useId } from "react";
import { Minus, Plus } from "lucide-react";
import type { AccordionSection } from "@/types/sections";
import { Highlight } from "@/components/ui/Highlight";
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type AccordionProps = Omit<AccordionSection, "type">;

// Native <details> accordion; the shared name keeps one panel open at a time
export function Accordion({ id, background, spacing = "md", title, highlightColor = "accent-soft", items, defaultOpen = 0, align = "center" }: AccordionProps) {
  const groupName = useId();
  const isLeft = align === "left";

  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && (
        <h3 className={cn("mb-6 text-[22px] font-bold text-heading md:text-[24px]", isLeft ? "text-left" : "text-center")}>
          <Highlight text={title} color={highlightColor} />
        </h3>
      )}
      <div className="border border-line">
        {items.map((item, index) => (
          <details key={`${index}-${item.title}`} name={groupName} open={index === defaultOpen} className="group border-b border-line last:border-b-0">
            <summary
              className={cn(
                "relative flex cursor-pointer list-none items-center bg-panel px-12 py-3 text-[13px] font-bold text-[#666] transition-colors group-open:text-[#444] hover:text-[#444] [&::-webkit-details-marker]:hidden",
                isLeft ? "justify-start text-left" : "justify-center text-center",
              )}
            >
              <Plus aria-hidden="true" className="absolute left-4 h-3 w-3 group-open:hidden" />
              <Minus aria-hidden="true" className="absolute left-4 hidden h-3 w-3 group-open:block" />
              {item.title}
            </summary>
            <RichText html={item.html} className={cn("bg-white px-5 py-6 text-[13px] text-body md:px-10", isLeft ? "text-left" : "text-center")} />
          </details>
        ))}
      </div>
    </Section>
  );
}
