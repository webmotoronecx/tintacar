import type { StoreReviews as StoreReviewsData } from "@/lib/store-reviews";
import { Button } from "@/components/ui/Button";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

type StoreReviewsProps = StoreReviewsData & {
  title?: string;
  className?: string;
};

// The live reviews widget trimmed reviews at 250 characters
const EXCERPT_LENGTH = 250;

// A store's Google reviews with links to read them all or leave a new one
export function StoreReviews({ reviews, url, writeReviewUrl, title = "How customers rated our service", className }: StoreReviewsProps) {
  return (
    <section aria-labelledby="store-reviews-title" className={cn("bg-mist px-4 py-8 md:px-8", className)}>
      <h2 id="store-reviews-title" className="text-[26px] leading-tight md:text-[36px]">
        {title}
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.author + review.date}>
            <ReviewCard review={review} excerptLength={EXCERPT_LENGTH} />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button href={writeReviewUrl} variant="outline">
          Write us a review
        </Button>
        <SmartLink href={url} className="text-[14px] font-bold underline hover:text-brand">
          See all reviews on Google
        </SmartLink>
      </div>
    </section>
  );
}
