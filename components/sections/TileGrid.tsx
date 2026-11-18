import Image from "next/image";
import type { TileGridSection, TileItem } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

type TileGridProps = Omit<TileGridSection, "type">;

const COLUMNS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };
const GAPS = { none: "gap-0", sm: "gap-1", md: "gap-[30px]" };

function TileImage({ item, sizes }: { item: TileItem; sizes: string }) {
  const img = (
    <Image
      src={item.image.src}
      alt={item.image.alt || item.title || ""}
      width={item.image.width}
      height={item.image.height}
      sizes={sizes}
      className="h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
    />
  );
  return item.href ? (
    <SmartLink href={item.href} className="group block" aria-label={item.title}>
      {img}
    </SmartLink>
  ) : (
    img
  );
}

function CardCaption({ item }: { item: TileItem }) {
  return (
    <div className="flex flex-1 flex-col items-center px-4 pt-3 pb-2 text-center">
      {item.title && <h3 className="text-[20px] leading-snug text-heading">{item.title}</h3>}
      {item.text && <p className="mt-1 text-[13px] leading-6">{item.text}</p>}
      {item.link && (
        <SmartLink href={item.link.href} className="mt-1 text-[13px] font-bold underline hover:text-brand">
          {item.link.label}
        </SmartLink>
      )}
      {item.button && (
        <Button href={item.button.href} variant={item.button.variant ?? "outline"} size={item.button.size ?? "sm"} className="mt-6">
          {item.button.label}
        </Button>
      )}
    </div>
  );
}

function StoryCaption({ item }: { item: TileItem }) {
  return (
    <div className="flex items-start justify-between gap-4 pt-3 pb-6">
      <div className="text-[13px] leading-6">
        {item.title && <p className="font-bold text-heading">{item.title}</p>}
        {item.text && <p>{item.text}</p>}
      </div>
      {item.button && (
        <Button href={item.button.href} variant={item.button.variant ?? "outline"} size="sm" className="shrink-0 px-8">
          {item.button.label}
        </Button>
      )}
    </div>
  );
}

// Image tiles: plain links, centred product cards or "story" cards
export function TileGrid({ id, background, spacing = "sm", columns = 3, gap = "md", variant = "plain", items }: TileGridProps) {
  const sizes = columns === 2 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

  return (
    <Section id={id} background={background} spacing={spacing}>
      <div className={cn("grid grid-cols-1", COLUMNS[columns], GAPS[gap])}>
        {items.map((item) => (
          <div key={item.image.src + (item.title ?? "")} className="flex flex-col">
            <TileImage item={item} sizes={sizes} />
            {variant === "card" && <CardCaption item={item} />}
            {variant === "story" && <StoryCaption item={item} />}
          </div>
        ))}
      </div>
    </Section>
  );
}
