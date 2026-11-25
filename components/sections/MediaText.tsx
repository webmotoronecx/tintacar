import Image from "next/image";
import type { MediaTextSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { PaymentLogos } from "@/components/ui/PaymentLogos";
import { RichText } from "@/components/ui/RichText";
import { isDarkBackground, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

type MediaTextProps = Omit<MediaTextSection, "type">;

// Image beside copy; optional decorative circle behind the text column
export function MediaText({
  id,
  background,
  spacing = "md",
  image,
  imageHref,
  imagePosition = "left",
  eyebrow,
  eyebrowColor,
  title,
  as = "h2",
  size = "md",
  html,
  buttons,
  showPaymentLogos,
  decoration,
  highlightColor,
  divider = false,
  dividerColor,
}: MediaTextProps) {
  const isLight = isDarkBackground(background);
  const picture = (
    <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1024px) 570px, 100vw" className="h-auto w-full" />
  );

  return (
    <Section id={id} background={background} spacing={spacing} className={cn(decoration && "relative overflow-hidden")}>
      {decoration === "circle" && (
        <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-[45%] hidden aspect-square w-[max(1100px,62vw)] -translate-y-1/2 rounded-full bg-sky/80 lg:block" />
      )}
      <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-[30px]">
        <div className={cn(imagePosition === "right" && "lg:order-2")}>
          {imageHref ? (
            <SmartLink href={imageHref} className="block hover:opacity-90">
              {picture}
            </SmartLink>
          ) : (
            picture
          )}
        </div>
        <div className="lg:px-4">
          {title && (
            <SectionHeading
              title={title}
              as={as}
              size={size}
              eyebrow={eyebrow}
              eyebrowColor={eyebrowColor}
              divider={divider}
              dividerColor={dividerColor}
              highlightColor={highlightColor}
              light={isLight}
              className="mb-5"
            />
          )}
          {html && <RichText html={html} light={isLight} />}
          {buttons && buttons.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {buttons.map((button) => (
                <Button key={button.label} href={button.href} variant={button.variant ?? "outline"} size={button.size ?? "sm"}>
                  {button.label}
                </Button>
              ))}
            </div>
          )}
          {showPaymentLogos && <PaymentLogos light={isLight} className="mt-6" />}
        </div>
      </div>
    </Section>
  );
}
