import type { ButtonGroupSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type ButtonGroupProps = Omit<ButtonGroupSection, "type">;

const ALIGN = {
  left: "flex flex-wrap justify-start gap-4",
  center: "flex flex-wrap justify-center gap-4",
  spread: "grid gap-4 sm:grid-cols-2 justify-items-center",
};

export function ButtonGroup({ id, background, spacing = "sm", buttons, align = "center", stack }: ButtonGroupProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      <div className={cn(ALIGN[align], stack && "flex-col items-center")}>
        {buttons.map((button) => (
          <Button
            key={button.label}
            href={button.href}
            variant={button.variant ?? "solid"}
            size={button.size}
            className={align === "spread" ? "w-full max-w-[300px]" : undefined}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </Section>
  );
}
