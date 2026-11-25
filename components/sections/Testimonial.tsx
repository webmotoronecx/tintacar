import type { TestimonialSection } from "@/types/sections";
import { Section } from "@/components/ui/Section";

type TestimonialProps = Omit<TestimonialSection, "type">;

// Single customer quote on a dark band
export function Testimonial({ id, background = "ink", spacing = "lg", quote, author }: TestimonialProps) {
  return (
    <Section id={id} background={background} spacing={spacing} width="narrow">
      <figure className="text-center">
        <blockquote className="text-[17px] italic leading-[1.75] text-white md:text-[20px]">&quot;{quote}&quot;</blockquote>
        <figcaption className="mt-6 font-bold text-brand">{author}</figcaption>
      </figure>
    </Section>
  );
}
