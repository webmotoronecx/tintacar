import { optimizeHtmlImages } from "@/lib/rich-text";
import { cn } from "@/lib/utils";

type RichTextProps = {
  html: string;
  className?: string;
  light?: boolean;
  /** Widest the column can render an image, used to pick responsive image sizes */
  imageMaxWidth?: number;
};

// Renders trusted, pre-sanitised HTML from the content files
export function RichText({ html, className, light, imageMaxWidth }: RichTextProps) {
  return (
    <div
      className={cn("rich-text", light && "rich-text-light", className)}
      dangerouslySetInnerHTML={{ __html: optimizeHtmlImages(html, imageMaxWidth) }}
    />
  );
}
