import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to conditionally combine and merge Tailwind class names.
 * Uses `clsx` for composition and `tailwind-merge` for conflict resolution.
 */

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export { cn };
