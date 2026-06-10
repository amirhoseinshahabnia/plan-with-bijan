import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { DS_TEXT_SIZES } from "@/lib/typography";

/**
 * Utility to conditionally combine and merge Tailwind class names.
 * Uses `clsx` for composition and `tailwind-merge` for conflict resolution.
 */

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [...DS_TEXT_SIZES],
    },
  },
});

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export { cn };
