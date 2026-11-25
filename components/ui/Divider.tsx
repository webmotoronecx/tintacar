import { cn } from "@/lib/utils";

type DividerProps = {
  color?: "brand" | "accent" | "llumar";
  align?: "left" | "center";
  className?: string;
};

// Short underline bar used below section headings
export function Divider({ color = "brand", align = "left", className }: DividerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-[3px] w-[70px]",
        { brand: "bg-brand", accent: "bg-accent", llumar: "bg-llumar" }[color],
        align === "center" && "mx-auto",
        className,
      )}
    />
  );
}
