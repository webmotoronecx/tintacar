import type { InfoCardsSection } from "@/types/sections";
import { Section } from "@/components/ui/Section";
import { SmartLink } from "@/components/ui/SmartLink";

type InfoCardsProps = Omit<InfoCardsSection, "type">;

// Tinted text cards, used for related benefits ("also great for…")
export function InfoCards({ id, background, spacing = "md", title, items }: InfoCardsProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && <h3 className="mb-8 text-center text-[22px] font-bold text-heading md:text-[24px]">{title}</h3>}
      <ul className="grid gap-1.5 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="bg-sky px-8 py-10 text-[13px] leading-6">
            <p className="font-bold uppercase tracking-wide text-heading">{item.title}</p>
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
