import { cn } from "@/lib/utils";

export type SpecBarColor = "accent" | "brand" | "olive";

const BAR_COLORS: Record<SpecBarColor, string> = { accent: "bg-accent", brand: "bg-brand", olive: "bg-olive" };

type SpecBarsProps = {
  items: { label: string; value: number }[];
  color?: SpecBarColor;
  /** Lighter track for dark bands */
  dark?: boolean;
  className?: string;
};

// Labelled percentage bars for product specs
export function SpecBars({ items, color = "accent", dark = false, className }: SpecBarsProps) {
  return (
    <dl className={cn("space-y-5", className)}>
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[1fr_auto] text-[13px] leading-5">
          <dt>{item.label}</dt>
          <dd>{item.value}%</dd>
          <dd aria-hidden="true" className={cn("col-span-2 mt-1 h-1 w-full", dark ? "bg-white/25" : "bg-[#e5e5e5]")}>
            <div className={cn("h-1", BAR_COLORS[color])} style={{ width: `${Math.min(100, Math.max(0, item.value))}%` }} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
