import type { InfoCardsSection } from "@/types/sections";
import { isDarkBackground, Section } from "@/components/ui/Section";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

type InfoCardsProps = Omit<InfoCardsSection, "type">;

const TITLE_COLORS = { heading: "text-heading", brand: "text-brand", olive: "text-olive" };

// Text cards for related benefits ("also great for…"); tinted on light bands, plain on dark ones
export function InfoCards({ id, background, spacing = "md", title, titleColor, items }: InfoCardsProps) {
  const isDark = isDarkBackground(background);

  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && <h3 className="mb-8 text-center text-[22px] font-bold text-heading md:text-[24px]">{title}</h3>}
      <ul className={cn("grid md:grid-cols-3", isDark ? "gap-8 md:gap-[30px]" : "gap-1.5")}>
        {items.map((item) => (
          <li key={item.title} className={cn("leading-[1.8]", !isDark && "bg-sky px-8 py-10")}>
            <p className={cn("font-bold uppercase tracking-wide", TITLE_COLORS[titleColor ?? (isDark ? "brand" : "heading")])}>{item.title}</p>
            <p className="mt-4">{item.text}</p>
            {item.link && (
              <SmartLink href={item.link.href} className="mt-4 inline-block italic hover:text-brand">
                {item.link.label}
              </SmartLink>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
