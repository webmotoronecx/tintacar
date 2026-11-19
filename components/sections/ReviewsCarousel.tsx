"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Review } from "@/types/sections";
import { cn } from "@/lib/utils";

type ReviewsCarouselProps = {
  reviews: Review[];
  label?: string;
};

const EXCERPT_LENGTH = 160;

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.text.length > EXCERPT_LENGTH;
  const text = isExpanded || !isLong ? review.text : `${review.text.slice(0, EXCERPT_LENGTH).trimEnd()}…`;

  return (
    <article className="flex h-full flex-col rounded-md bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <header className="flex items-center gap-3">
        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-heading text-[16px] font-bold text-white">
          {review.author.charAt(0)}
        </span>
        <div>
          <p className="text-[14px] font-bold leading-5 text-heading">{review.author}</p>
          {review.date && <p className="text-[12px] leading-4 text-muted">{review.date}</p>}
        </div>
      </header>
      <div className="mt-3 flex gap-0.5" aria-label={`${review.rating} out of 5 stars`} role="img">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} aria-hidden="true" className={cn("h-4 w-4", i < review.rating ? "fill-[#f6bb06] text-[#f6bb06]" : "text-line")} />
        ))}
      </div>
      <p className="mt-3 whitespace-pre-line text-[14px] leading-6">{text}</p>
      {isLong && (
        <button type="button" onClick={() => setIsExpanded((v) => !v)} className="mt-1 self-start py-1 text-[13px] text-muted underline hover:text-ink">
          {isExpanded ? "Hide" : "Read more"}
        </button>
      )}
    </article>
  );
}

// Scroll-snap slider: native swipe on touch, arrow buttons on desktop
export function ReviewsCarousel({ reviews, label = "Customer reviews" }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({ atStart: track.scrollLeft <= 4, atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4 });
  };

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative min-w-0" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={trackRef} onScroll={updateEdges} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.map((review) => (
          <div key={review.author + review.text.slice(0, 12)} className="w-full shrink-0 snap-start sm:w-[calc(50%-8px)] xl:w-[calc(33.333%-11px)]">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} disabled={edges.atStart} aria-label="Previous reviews" className="rounded-full border border-line bg-white p-2 hover:border-brand hover:text-brand disabled:opacity-40">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} disabled={edges.atEnd} aria-label="Next reviews" className="rounded-full border border-line bg-white p-2 hover:border-brand hover:text-brand disabled:opacity-40">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
