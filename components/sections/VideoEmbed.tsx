import type { VideoSection } from "@/types/sections";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { YouTubePlayer } from "./YouTubePlayer";

type VideoEmbedProps = Omit<VideoSection, "type">;

export function VideoEmbed({ id, background, spacing = "md", youtubeId, title, poster, width = "narrow" }: VideoEmbedProps) {
  return (
    <Section id={id} background={background} spacing={spacing}>
      <div className={cn("mx-auto", width === "narrow" ? "max-w-[1130px]" : "w-full")}>
        <YouTubePlayer youtubeId={youtubeId} title={title} poster={poster} />
      </div>
    </Section>
  );
}
