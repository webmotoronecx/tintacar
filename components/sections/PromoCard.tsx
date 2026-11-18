import Image from "next/image";
import type { PromoCardSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

type PromoCardProps = Omit<PromoCardSection, "type">;

// Offer card with background artwork and centred light copy
export function PromoCard({ id, background, spacing = "sm", image, html, buttons }: PromoCardProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      <div className="relative isolate mx-auto max-w-[600px] overflow-hidden px-8 py-14 text-center text-white md:px-14">
        <Image src={image.src} alt="" fill sizes="600px" className="-z-10 object-cover" />
        <div
          className="space-y-3 [&_h2]:font-heading [&_h2]:text-[32px] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-white md:[&_h2]:text-[40px] [&_h3]:text-[20px] [&_h3]:font-normal [&_h3]:leading-snug [&_h3]:text-white md:[&_h3]:text-[22px] [&_p]:text-[13px] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {buttons && buttons.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {buttons.map((button) => (
              <Button key={button.label} href={button.href} variant={button.variant ?? "outline-light"} size={button.size ?? "sm"}>
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
