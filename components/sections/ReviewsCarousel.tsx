"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Review } from "@/types/sections";
import { ReviewCard } from "@/components/ui/ReviewCard";

type ReviewsCarouselProps = {
  reviews: Review[];
  label?: string;
};

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
