import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type HighlightColor = "accent" | "accent-soft" | "brand";

const COLORS: Record<HighlightColor, string> = {
  accent: "text-accent",
  "accent-soft": "text-accent-soft",
  brand: "text-brand",
};

type HighlightProps = {
  text: string;
  color?: HighlightColor;
};

// Renders ==marked== words in the accent colour and \n as line breaks
export function Highlight({ text, color = "accent" }: HighlightProps) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}
          {line.split(/(==[^=]+==)/g).map((part, i) =>
            part.startsWith("==") && part.endsWith("==") ? (
              <span key={i} className={cn(COLORS[color])}>
                {part.slice(2, -2)}
              </span>
            ) : (
              <Fragment key={i}>{part}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}
