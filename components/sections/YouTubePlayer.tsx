"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/types/content";

type YouTubePlayerProps = {
  youtubeId: string;
  title: string;
  poster?: ImageAsset;
};

// Lightweight facade: loads the YouTube iframe only after the visitor presses play
export function YouTubePlayer({ youtubeId, title, poster }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const posterSrc = poster?.src ?? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full bg-black">
        <iframe
          ref={(frame) => frame?.focus()}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-black"
    >
      <Image src={posterSrc} alt="" fill sizes="(min-width: 1200px) 1130px, 100vw" className="object-cover" />
      <span className="absolute top-1/2 left-1/2 flex h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-black/70 transition-colors group-hover:bg-[#ff0000]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-6 w-6 fill-white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
