import Image from "next/image";
import type { FeatureSplitSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { PaymentLogos } from "@/components/ui/PaymentLogos";
import { cn } from "@/lib/utils";

type FeatureSplitProps = Omit<FeatureSplitSection, "type">;

function SpecBars({ specs }: { specs: NonNullable<FeatureSplitSection["specs"]> }) {
  return (
    <div className="mt-8 border-t border-line pt-8">
      <h3 className="text-[22px] font-semibold text-heading">{specs.title}</h3>
      <dl className="mt-4 space-y-5">
        {specs.items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-[13px] leading-5">
              <dt>{item.label}</dt>
              <dd>{item.value}%</dd>
            </div>
            <div className="mt-1 h-1 w-full bg-[#e5e5e5]" role="presentation">
              <div className="h-1 bg-accent" style={{ width: `${Math.min(100, Math.max(0, item.value))}%` }} />
            </div>
          </div>
        ))}
      </dl>
      {specs.note && <p className="mt-6 text-[12px] italic">{specs.note}</p>}
    </div>
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
}: FeatureSplitProps) {
  return (
    <section id={id} className="grid lg:grid-cols-2">
      <div className={cn("px-6 py-10 sm:px-10 lg:py-6 lg:pr-10 lg:pl-[max(30px,calc((100vw-1200px)/2+15px))]", imagePosition === "left" && "lg:order-2")}>
        <Tag className="border-b border-line pb-4 text-[28px] leading-[1.25] tracking-[0.02em] md:text-[32px]">
          <Highlight text={title} color={highlightColor} />
        </Tag>
        {features && (
          <ul className="mt-6 space-y-4">
            {features.map((feature) => (
              <li key={feature.title} className="text-[13px] leading-6">
                <p className="font-heading text-[14px] font-bold text-heading">{feature.title}</p>
                {feature.text && <p>{feature.text}</p>}
              </li>
            ))}
          </ul>
        )}
        {notes?.map((note) => (
          <p key={note} className="mt-4 text-[12px] italic">
            {note}
          </p>
        ))}
        {closing && <p className="mt-4 font-heading text-[14px] font-bold text-heading">{closing}</p>}
        {specs && <SpecBars specs={specs} />}
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
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
      </div>
    </section>
  );
}
