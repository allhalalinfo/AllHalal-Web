import type { BriefCategory } from "@/types/brief";
import { briefCategoryTheme } from "@/lib/briefs";

export default function CategoryBadge({
  category,
  size = "md",
}: {
  category: BriefCategory;
  size?: "sm" | "md";
}) {
  const theme = briefCategoryTheme[category];
  const sizeClassName =
    size === "sm"
      ? "px-2.5 py-1 text-[0.62rem] tracking-[0.18em]"
      : "px-3 py-1.5 text-[0.68rem] tracking-[0.2em]";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-bold uppercase ${sizeClassName} ${theme.badgeClassName}`}
    >
      {category}
    </span>
  );
}
