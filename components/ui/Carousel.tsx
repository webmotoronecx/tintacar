"use client";

import { Children, useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  children: ReactNode;
  /** Milliseconds each slide stays before the next one slides in */
  interval?: number;
  className?: string;
};

type PlayState = "auto" | "playing" | "paused";

const SWIPE_PX = 40;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// One-up slider that loops forward; pauses on hover, focus and hidden tabs, and waits for a click when motion is reduced
export function Carousel({ children, interval = 5000, className }: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  // Position `count` is a copy of the first slide, so the loop always moves forward
  const [position, setPosition] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const [playState, setPlayState] = useState<PlayState>("auto");
  const [isHeld, setIsHeld] = useState(false);
  const swipe = useRef<{ x: number; moved: boolean } | null>(null);
  const isReducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
  const isPlaying = playState === "playing" || (playState === "auto" && !isReducedMotion);
  const active = position % count;

  const next = useCallback(() => {
    setIsAnimated(true);
    setPosition((current) => Math.min(current + 1, count));
  }, [count]);

  const previous = useCallback(() => {
    if (position > 0) {
      setIsAnimated(true);
      setPosition(position - 1);
      return;
    }
    // Jump to the copy without animating, then slide back one
    setIsAnimated(false);
    setPosition(count);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setIsAnimated(true);
        setPosition(count - 1);
      }),
    );
  }, [count, position]);

  useEffect(() => {
    if (count < 2 || !isPlaying || isHeld) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) next();
    }, interval);
    return () => window.clearInterval(timer);
  }, [count, interval, isHeld, isPlaying, next]);

  const handleTransitionEnd = () => {
    if (position !== count) return;
    setIsAnimated(false);
    setPosition(0);
  };

  const handlePointerDown = (event: PointerEvent) => {
    swipe.current = { x: event.clientX, moved: false };
  };

  const handlePointerUp = (event: PointerEvent) => {
    const start = swipe.current;
    if (!start) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) < SWIPE_PX) return;
    start.moved = true;
    if (distance < 0) next();
    else previous();
  };

  // A swipe ends with a click on the slide link; swallow it so swiping never navigates
  const handleClickCapture = (event: MouseEvent) => {
    if (!swipe.current?.moved) return;
    event.preventDefault();
    event.stopPropagation();
    swipe.current = null;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") previous();
  };

  if (count < 2) return <div className={className}>{slides}</div>;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHeld(true)}
      onMouseLeave={() => setIsHeld(false)}
      onFocus={() => setIsHeld(true)}
      onBlur={() => setIsHeld(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        aria-live={isPlaying ? "off" : "polite"}
        className={cn(
          "flex touch-pan-y select-none gap-[var(--gap)] [--gap:0px] min-[481px]:[--gap:30px] [&_img]:pointer-events-none",
          isAnimated && "transition-transform duration-[250ms] ease-out motion-reduce:transition-none",
        )}
        style={{ transform: `translateX(calc(${-position} * (100% + var(--gap))))` }}
        onTransitionEnd={handleTransitionEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onClickCapture={handleClickCapture}
        // Stops the browser dragging the slide link, so a mouse drag swipes like a finger
        onDragStart={(event) => event.preventDefault()}
      >
        {[...slides, slides[0]].map((slide, index) => {
          const isCopy = index === count;
          const isHidden = isCopy || index !== active || position === count;
          return (
            <div
              key={isCopy ? "copy" : index}
              role={isCopy ? undefined : "group"}
              aria-roledescription={isCopy ? undefined : "slide"}
              aria-label={isCopy ? undefined : `${index + 1} of ${count}`}
              aria-hidden={isHidden}
              inert={isHidden}
              className="w-full shrink-0"
            >
              {slide}
            </div>
          );
        })}
      </div>
      {/* Shown on keyboard focus only, so the artwork matches the live slider */}
      <button
        type="button"
        onClick={() => setPlayState(isPlaying ? "paused" : "playing")}
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:right-3 focus-visible:bottom-3 focus-visible:flex focus-visible:h-9 focus-visible:w-9 focus-visible:items-center focus-visible:justify-center focus-visible:rounded-full focus-visible:bg-white focus-visible:text-ink"
        aria-label={isPlaying ? "Pause slides" : "Play slides"}
      >
        {isPlaying ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
      </button>
    </div>
  );
}
