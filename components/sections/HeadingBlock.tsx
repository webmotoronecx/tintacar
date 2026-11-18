import type { HeadingSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { PaymentLogos } from "@/components/ui/PaymentLogos";
import { RichText } from "@/components/ui/RichText";
import { isDarkBackground, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type HeadingBlockProps = Omit<HeadingSection, "type">;

// Section title with optional intro copy and call-to-action buttons
export function HeadingBlock({
  id,
  background,
  spacing = "md",
  title,
  as,
  size,
  eyebrow,
  subtitle,
  html,
  align = "left",
  divider,
  dividerColor,
  highlightColor,
  bold,
  topRule,
  buttons,
  stackButtons = true,
  showPaymentLogos,
}: HeadingBlockProps) {
  const isLight = isDarkBackground(background);

  return (
    <Section id={id} background={background} spacing={spacing}>
      {topRule && <hr className="mb-8 border-line" />}
      <SectionHeading
        title={title}
        as={as}
        size={size}
        eyebrow={eyebrow}
        subtitle={subtitle}
        align={align}
        divider={divider}
        dividerColor={dividerColor}
        highlightColor={highlightColor}
        bold={bold}
        light={isLight}
      />
      {html && <RichText html={html} light={isLight} className={cn("mt-6", align === "center" && "mx-auto max-w-3xl text-center")} />}
      {showPaymentLogos && <PaymentLogos light={isLight} className={cn("mt-6", align === "center" && "justify-center")} />}
      {buttons && buttons.length > 0 && (
        <div
          className={cn(
            "mt-8 flex gap-4",
            stackButtons ? "flex-col" : "flex-wrap",
            align === "center" ? "items-center justify-center" : "items-start",
          )}
        >
          {buttons.map((button, index) => (
            <Button key={button.label} href={button.href} variant={button.variant ?? (index === 0 ? "solid" : "outline")} size={button.size}>
              {button.label}
            </Button>
          ))}
        </div>
      )}
    </Section>
  );
}
