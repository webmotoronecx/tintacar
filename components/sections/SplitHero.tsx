import Image from "next/image";
import type { SplitHeroSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";

type SplitHeroProps = Omit<SplitHeroSection, "type">;

// Coloured story panel beside a full-height photo
export function SplitHero({ id, title, eyebrow, quote, buttons, image }: SplitHeroProps) {
  return (
    <section id={id} className="grid bg-navy text-white lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:py-16 lg:pr-12 lg:pl-[max(30px,calc((100vw-1200px)/2))]">
        <h1 className="text-[30px] leading-[1.25] tracking-[0.02em] text-white md:text-[36px]">
          <Highlight text={title} color="brand" />
        </h1>
        {eyebrow && <p className="mt-6 text-[13px] font-bold uppercase tracking-wide text-[#e3ab43]">{eyebrow}</p>}
        {quote && <p className="mt-3 max-w-[520px] font-heading text-[18px] font-bold leading-snug text-white">{quote}</p>}
        {buttons && buttons.length > 0 && (
          <div className="mt-8 flex flex-col items-start gap-4">
            {buttons.map((button, index) => (
              <Button key={button.label} href={button.href} variant={button.variant ?? (index === 0 ? "outline-light" : "solid")} size={button.size}>
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="relative min-h-[300px] md:min-h-[461px]">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" loading="eager" />
      </div>
    </section>
  );
}
