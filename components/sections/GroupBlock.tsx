import Image from "next/image";
import type { ReactNode } from "react";
import type { GroupSection } from "@/types/sections";
import { sectionBackgroundClass } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type GroupBlockProps = Omit<GroupSection, "type" | "sections"> & { children: ReactNode };

// Shares one background (colour and optional photo) across several stacked sections
export function GroupBlock({ id, background = "black", backgroundImage, imagePosition = "center", children }: GroupBlockProps) {
  return (
    <div id={id} className={cn("relative isolate overflow-hidden", sectionBackgroundClass(background))}>
      {backgroundImage && (
        <Image
          src={backgroundImage.src}
          alt=""
          fill
          sizes="100vw"
          className={cn("-z-10 object-cover", imagePosition === "top" ? "object-top" : "object-center")}
        />
      )}
      {children}
    </div>
  );
}
