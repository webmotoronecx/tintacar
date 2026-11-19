import type { CtaStripSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SmartLink } from "@/components/ui/SmartLink";

type CtaStripProps = Omit<CtaStripSection, "type">;

// Small centred prompt, e.g. "Ready to get a quote?" + button
export function CtaStrip({ id, background, spacing = "md", text, buttons, link }: CtaStripProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      <div className="flex flex-col items-center gap-3 text-center">
        {text && <p className="text-[13px] leading-5">{text}</p>}
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((button) => (
            <Button key={button.label} href={button.href} variant={button.variant ?? "outline"} size={button.size ?? "sm"}>
              {button.label}
            </Button>
          ))}
        </div>
        {link && (
          <SmartLink href={link.href} className="inline-block py-1 text-[13px] font-bold uppercase text-accent hover:underline">
            {link.label}
          </SmartLink>
        )}
      </div>
    </Section>
  );
}
