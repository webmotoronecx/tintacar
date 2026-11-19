import { getImageProps } from "next/image";

const RASTER = /\.(png|jpe?g|webp|avif)$/i;

function attr(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1];
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

// Routes local images in content HTML through the Next.js optimizer (responsive WebP/AVIF, lazy after the first)
export function optimizeHtmlImages(html: string, maxWidth = 1200): string {
  let count = 0;
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = attr(tag, "src");
    const width = Number(attr(tag, "width"));
    const height = Number(attr(tag, "height"));
    if (!src || !src.startsWith("/") || src.startsWith("//") || !RASTER.test(src) || !width || !height || /\ssrcset=/i.test(tag)) return tag;

    const loading = count++ === 0 ? "eager" : "lazy";
    // Narrower than the column: fixed size with 1x/2x candidates; wider: fills the column
    const sizes = width > maxWidth ? `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw` : undefined;
    const { props } = getImageProps({ src, width, height, alt: "", sizes });
    const rest = tag.replace(/^<img/i, "").replace(/\s*\/?>$/, "").replace(/\s(src|srcset|sizes|loading|decoding)="[^"]*"/gi, "");
    const sizesAttr = props.sizes ? ` sizes="${escapeAttr(props.sizes)}"` : "";
    return `<img src="${escapeAttr(props.src)}" srcset="${escapeAttr(props.srcSet ?? "")}"${sizesAttr} loading="${loading}" decoding="async"${rest}>`;
  });
}
