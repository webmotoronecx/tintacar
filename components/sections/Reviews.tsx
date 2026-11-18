import type { ReviewsSection } from "@/types/sections";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewsCarousel } from "./ReviewsCarousel";

type ReviewsProps = Omit<ReviewsSection, "type">;

// Heading on the left, sliding review cards on the right
export function Reviews({ id, background = "white", spacing = "md", title, reviews }: ReviewsProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      <div className="grid items-center gap-8 bg-[#f5f5f5] px-6 py-10 md:px-[45px] lg:grid-cols-[3fr_9fr]">
        <SectionHeading title={title} size="lg" />
        <ReviewsCarousel reviews={reviews} label={title} />
      </div>
    </Section>
  );
}
