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
  eyebrowColor,
  subtitle,
  tagline,
  taglineColor,
  html,
  align = "left",
  divider,
  dividerColor,
  highlightColor,
  bold,
  layout = "stacked",
  topRule,
  bottomRule,
  buttons,
  stackButtons = true,
  showPaymentLogos,
  visuallyHidden,
}: HeadingBlockProps) {
  if (visuallyHidden) {
    const Tag = as ?? "h2";
    return <Tag className="sr-only">{title}</Tag>;
  }

  const isLight = isDarkBackground(background);
  const isInline = layout === "inline";

  const copy = (
    <>
      <SectionHeading
        title={title}
        as={as}
        size={size}
        eyebrow={eyebrow}
        eyebrowColor={eyebrowColor}
        subtitle={subtitle}
        tagline={tagline}
        taglineColor={taglineColor}
        align={align}
        divider={divider}
        dividerColor={dividerColor}
        highlightColor={highlightColor}
        bold={bold}
        light={isLight}
      />
      {html && <RichText html={html} light={isLight} className={cn(isInline ? "mt-3" : "mt-6", align === "center" && "mx-auto max-w-3xl text-center")} />}
      {showPaymentLogos && <PaymentLogos light={isLight} className={cn("mt-6", align === "center" && "justify-center")} />}
    </>
  );

  const actions = buttons && buttons.length > 0 && (
    <div
      className={cn(
        "flex gap-4",
        isInline ? "shrink-0 flex-wrap" : cn("mt-8", stackButtons ? "flex-col" : "flex-wrap", align === "center" ? "items-center justify-center" : "items-start"),
      )}
    >
      {buttons.map((button, index) => (
        <Button key={button.label} href={button.href} variant={button.variant ?? (index === 0 ? "solid" : "outline")} size={button.size}>
          {button.label}
        </Button>
      ))}
    </div>
  );

  return (
    <Section id={id} background={background} spacing={spacing}>
      {topRule && <hr className="mb-8 border-line" />}
      {isInline ? (
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="min-w-0">{copy}</div>
          {actions}
        </div>
      ) : (
        <>
          {copy}
          {actions}
        </>
      )}
      {bottomRule && <hr className="mt-8 border-line" />}
    </Section>
  );
}
