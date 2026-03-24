import Image from "next/image";
import BriefImagePlaceholder from "@/components/briefs/BriefImagePlaceholder";
import { hasValidBriefImage } from "@/lib/briefs";
import type { Brief } from "@/types/brief";

export default function BriefMedia({
  brief,
  sizes,
  priority = false,
  className,
}: {
  brief: Brief;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (hasValidBriefImage(brief) && brief.image_url) {
    return (
      <>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(244,185,66,0.14), transparent 34%), linear-gradient(145deg, rgba(241,235,226,0.86), rgba(255,255,255,0.92) 58%, rgba(228,221,211,0.84))",
          }}
        />
        <Image
          src={brief.image_url}
          alt={brief.title}
          fill
          priority={priority}
          sizes={sizes}
          className={className}
        />
      </>
    );
  }

  return <BriefImagePlaceholder brief={brief} />;
}
