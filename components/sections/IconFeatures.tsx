import Image from "next/image";
import type { IconFeaturesSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type IconFeaturesProps = Omit<IconFeaturesSection, "type">;

const COLUMNS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" };

// Row of icon + label features; "divided" uses vertical rules, "circle" puts icons in rings
export function IconFeatures({
  id,
  background,
  spacing = "md",
  eyebrow,
  title,
  highlightColor,
  divider = false,
  dividerColor = "accent",
  variant = "divided",
  columns = 4,
  items,
  button,
}: IconFeaturesProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && (
        <SectionHeading
          title={title}
          eyebrow={eyebrow}
          size="md"
          align="center"
          divider={divider}
          dividerColor={dividerColor}
          highlightColor={highlightColor}
          className="mb-10"
        />
      )}

      {variant === "divided" ? (
        <ul className={cn("grid gap-y-8", COLUMNS[columns])}>
          {items.map((item) => (
            <li key={item.title} className="flex flex-col items-center px-4 text-center lg:border-r lg:border-line lg:last:border-r-0">
              <Image src={item.icon} alt="" width={40} height={40} className="h-9 w-auto" />
              <p className="mt-4 font-heading text-[14px] font-bold text-heading">{item.title}</p>
              {item.text && <p className="mt-1 text-[13px] leading-6">{item.text}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <ul className={cn("mx-auto grid max-w-[1000px] gap-8", COLUMNS[columns])}>
          {items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-brand">
                <Image src={item.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <div>
                <p className="font-heading text-[17px] font-semibold leading-snug text-heading">{item.title}</p>
                {item.text && <p className="mt-1 text-[13px] leading-6">{item.text}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}

      {button && (
        <div className="mt-12 text-center">
          <Button href={button.href} variant={button.variant ?? "outline"} size={button.size}>
            {button.label}
          </Button>
        </div>
      )}
    </Section>
  );
}
