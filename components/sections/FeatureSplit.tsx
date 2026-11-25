import Image from "next/image";
import { Gem } from "lucide-react";
import type { FeatureSplitSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { PaymentLogos } from "@/components/ui/PaymentLogos";
import { Section } from "@/components/ui/Section";
import { SpecBars } from "@/components/ui/SpecBars";
import { cn } from "@/lib/utils";

type FeatureSplitProps = Omit<FeatureSplitSection, "type">;

function SpecsBlock({ specs, headingAs: Heading }: { specs: NonNullable<FeatureSplitSection["specs"]>; headingAs: "h2" | "h3" }) {
  return (
    <div className="mt-8 border-t border-line pt-8">
      <Heading className="text-[24px] font-bold text-heading">{specs.title}</Heading>
      <SpecBars items={specs.items} className="mt-4" />
      {specs.note && <p className="mt-6 italic">{specs.note}</p>}
    </div>
  );
}

type Feature = NonNullable<FeatureSplitSection["features"]>[number];

function FeatureList({ features, timeline }: { features: Feature[]; timeline: boolean }) {
  if (!timeline) {
    return (
      <ul className="mt-6 space-y-4">
        {features.map((feature) => (
          <li key={feature.title} className="leading-6">
            <p className="font-heading text-[15px] font-bold text-heading">{feature.title}</p>
            {feature.text && <p>{feature.text}</p>}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol className="mt-6">
      {features.map((feature, index) => (
        <li key={feature.title} className="grid grid-cols-[48px_1fr] gap-x-2">
          <span aria-hidden="true" className="flex flex-col items-center pt-1">
            <Gem className="h-4 w-4 text-heading" strokeWidth={1.5} />
            {index < features.length - 1 && <span className="my-2 w-px flex-1 bg-heading" />}
          </span>
          <div className="pb-6">
            <h3 className="font-heading text-[16px] font-bold uppercase leading-snug text-heading">{feature.title}</h3>
            {feature.text && <p className="mt-1 text-[13px] leading-[1.6]">{feature.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

// Product detail: key features, technical spec bars and CTA next to a tall image
export function FeatureSplit({
  id,
  title,
  as: Tag = "h2",
  highlightColor = "brand",
  features,
  notes,
  closing,
  specs,
  button,
  paymentText,
  image,
  imagePosition = "right",
  layout = "bleed",
  featureStyle = "plain",
}: FeatureSplitProps) {
  if (layout === "contained") {
    return (
      <Section id={id} spacing="md">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[30px]">
          <div className={cn(imagePosition === "left" && "lg:order-2")}>
            <Tag className="text-[25px] leading-[1.25] text-black">
              <Highlight text={title} color={highlightColor} />
            </Tag>
            {features && <FeatureList features={features} timeline={featureStyle === "timeline"} />}
            {button && (
              <div className="mt-6 text-center">
                <Button href={button.href} variant={button.variant ?? "solid"} size={button.size ?? "sm"}>
                  {button.label}
                </Button>
              </div>
            )}
          </div>
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1200px) 570px, (min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
        </div>
      </Section>
    );
  }

  return (
    <section id={id}>
      <div className="mx-auto grid max-w-wide lg:grid-cols-2">
        <div className={cn("px-6 py-10 sm:px-10 lg:py-6 lg:pr-10 lg:pl-[max(30px,calc((min(100vw,1920px)-1200px)/2+15px))]", imagePosition === "left" && "lg:order-2")}>
          <Tag className="border-b border-line pb-4 text-[28px] leading-[1.25] tracking-[0.02em] md:text-[40px]">
            <Highlight text={title} color={highlightColor} />
          </Tag>
          {features && <FeatureList features={features} timeline={featureStyle === "timeline"} />}
          {notes?.map((note) => (
            <p key={note} className="mt-4 italic">
              {note}
            </p>
          ))}
          {closing && <p className="mt-4 font-heading text-[15px] font-bold text-heading">{closing}</p>}
          {specs && <SpecsBlock specs={specs} headingAs={Tag === "h1" ? "h2" : "h3"} />}
          {button && (
            <div className="mt-8 border-t border-line pt-8">
              <Button href={button.href} variant={button.variant ?? "solid"} size={button.size}>
                {button.label}
              </Button>
            </div>
          )}
          {paymentText && (
            <div className="mt-8">
              <p className="font-heading text-[16px] font-bold leading-snug text-heading">{paymentText}</p>
              <PaymentLogos className="mt-4" />
            </div>
          )}
        </div>
        <div className="relative min-h-[420px] lg:min-h-full">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1920px) 960px, (min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
        </div>
      </div>
    </section>
  );
}
