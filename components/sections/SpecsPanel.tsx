import type { SpecsPanelSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { HIGHLIGHT_TEXT } from "@/components/ui/Highlight";
import { PaymentLogos } from "@/components/ui/PaymentLogos";
import { isDarkBackground, Section } from "@/components/ui/Section";
import { SpecBars } from "@/components/ui/SpecBars";
import { cn } from "@/lib/utils";

type SpecsPanelProps = Omit<SpecsPanelSection, "type">;

// Technical spec bars and call-outs beside a list of key features
export function SpecsPanel({ id, background, spacing = "md", accent = "brand", specs, lines, button, features, showPaymentLogos }: SpecsPanelProps) {
  const isLight = isDarkBackground(background);
  const accentText = HIGHLIGHT_TEXT[accent];
  const rule = isLight ? "border-white/80" : "border-line";

  return (
    <Section id={id} background={background} spacing={spacing}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-[70px] lg:px-10">
        <div>
          <h3 className={cn("text-[22px] font-bold md:text-[24px]", accentText)}>{specs.title}</h3>
          <SpecBars items={specs.items} color={accent} dark={isLight} className="mt-6" />
          {specs.note && <p className="mt-8 whitespace-pre-line italic leading-6">{specs.note}</p>}
          {lines?.map((line) => (
            <p key={line} className="mt-6 font-heading text-[18px] font-bold leading-snug">
              {line}
            </p>
          ))}
          {button && (
            <Button href={button.href} variant={button.variant ?? "white"} size={button.size ?? "sm"} className="mt-8">
              {button.label}
            </Button>
          )}
        </div>
        <ul className="space-y-8">
          {features.map((feature) => (
            <li key={feature.title} className="leading-[1.8]">
              <p className={cn("font-bold uppercase", accentText)}>{feature.title}</p>
              <p className="mt-3">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
      {showPaymentLogos && (
        <div className={cn("mt-12 border-y py-6", rule)}>
          <PaymentLogos light={isLight} />
        </div>
      )}
    </Section>
  );
}
