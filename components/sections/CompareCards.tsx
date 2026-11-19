import Image from "next/image";
import type { CompareCardsSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";

type CompareCardsProps = Omit<CompareCardsSection, "type">;

// Two or more comparison cards laid over a full-bleed background photo
export function CompareCards({ id, image, title, subtitle, cards }: CompareCardsProps) {
  const [headline, ...rest] = title.split("\n");

  return (
    <section id={id} className="relative isolate overflow-hidden bg-ink py-14 text-center text-white md:py-20">
      <Image src={image.src} alt="" fill sizes="(min-width: 1920px) 1920px, 100vw" className="-z-10 object-cover" />
      <div className="container-site">
        <h2 className="text-[30px] leading-[1.2] text-white md:text-[40px]">
          <strong>{headline}</strong>
          {rest.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        {subtitle && <h3 className="mx-auto mt-4 max-w-xl text-[18px] font-bold leading-snug text-white md:text-[22px]">{subtitle}</h3>}
        <div className="mx-auto mt-10 grid max-w-[600px] gap-px bg-black/50 sm:grid-cols-2">
          {cards.map((card) => (
            <div key={card.logo.src} className="flex flex-col items-start bg-black/45 p-6 text-left">
              <Image src={card.logo.src} alt={card.logo.alt} width={card.logo.width} height={card.logo.height} className="h-auto w-[150px]" />
              <ul className="mt-4 flex-1 space-y-4 text-[12px] font-bold">
                {card.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {card.button && (
                <Button href={card.button.href} variant={card.button.variant ?? "solid"} size={card.button.size ?? "sm"} className="mt-6">
                  {card.button.label}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
