import { useId } from "react";
import { Minus, Plus } from "lucide-react";
import type { AccordionSection } from "@/types/sections";
import { Highlight } from "@/components/ui/Highlight";
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";

type AccordionProps = Omit<AccordionSection, "type">;

// Native <details> accordion; the shared name keeps one panel open at a time
export function Accordion({ id, background, spacing = "md", title, highlightColor = "accent-soft", items, defaultOpen = 0 }: AccordionProps) {
  const groupName = useId();

  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && (
        <h3 className="mb-6 text-center text-[22px] font-bold text-heading md:text-[24px]">
          <Highlight text={title} color={highlightColor} />
        </h3>
      )}
      <div className="border border-line">
        {items.map((item, index) => (
          <details key={`${index}-${item.title}`} name={groupName} open={index === defaultOpen} className="group border-b border-line last:border-b-0">
            <summary className="relative flex cursor-pointer list-none items-center justify-center bg-panel px-12 py-3 text-center text-[13px] font-bold text-[#9a9a9a] transition-colors group-open:text-[#444] hover:text-[#444] [&::-webkit-details-marker]:hidden">
              <Plus aria-hidden="true" className="absolute left-4 h-3 w-3 group-open:hidden" />
              <Minus aria-hidden="true" className="absolute left-4 hidden h-3 w-3 group-open:block" />
              {item.title}
            </summary>
            <RichText html={item.html} className="bg-white px-5 py-6 text-center text-[13px] text-body md:px-10" />
          </details>
        ))}
      </div>
    </Section>
  );
}
