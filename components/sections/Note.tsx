import type { NoteSection } from "@/types/sections";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type NoteProps = Omit<NoteSection, "type">;

// Fine-print disclaimer line
export function Note({ id, background, spacing = "sm", text, align = "center" }: NoteProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      <p className={cn("italic leading-6", align === "center" && "text-center")}>{text}</p>
    </Section>
  );
}
