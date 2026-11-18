import { cn } from "@/lib/utils";

type RichTextProps = {
  html: string;
  className?: string;
  light?: boolean;
};

// Renders trusted, pre-sanitised HTML from the content files
export function RichText({ html, className, light }: RichTextProps) {
  return <div className={cn("rich-text", light && "rich-text-light", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
