"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/types/sections";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  review: Review;
  /** Characters shown before "Read more" */
  excerptLength?: number;
};

// Reviewer initial, stars and text, with long reviews folded behind "Read more"
export function ReviewCard({ review, excerptLength = 160 }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.text.length > excerptLength;
  const text = isExpanded || !isLong ? review.text : `${review.text.slice(0, excerptLength).trimEnd()}…`;

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
