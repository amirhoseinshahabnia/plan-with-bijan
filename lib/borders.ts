export type BorderVariant = "subtle" | "accent" | "strong" | "soft";
export type BorderSide = "t" | "b" | "l" | "r" | "x" | "y" | "all";

/** Full class strings so Tailwind can detect them at build time. */
const BORDER_CLASSES = {
  all: {
    subtle: "border border-solid border-navy-600/60",
    accent: "border border-solid border-sand-500/40",
    strong: "border-2 border-solid border-copper-500",
    soft: "border border-solid border-navy-900/10",
  },
  t: {
    subtle: "border-t border-solid border-navy-600/60",
    accent: "border-t border-solid border-sand-500/40",
    strong: "border-t-2 border-solid border-copper-500",
    soft: "border-t border-solid border-navy-900/10",
  },
  b: {
    subtle: "border-b border-solid border-navy-600/60",
    accent: "border-b border-solid border-sand-500/40",
    strong: "border-b-2 border-solid border-copper-500",
    soft: "border-b border-solid border-navy-900/10",
  },
  l: {
    subtle: "border-l border-solid border-navy-600/60",
    accent: "border-l border-solid border-sand-500/40",
    strong: "border-l-2 border-solid border-copper-500",
    soft: "border-l border-solid border-navy-900/10",
  },
  r: {
    subtle: "border-r border-solid border-navy-600/60",
    accent: "border-r border-solid border-sand-500/40",
    strong: "border-r-2 border-solid border-copper-500",
    soft: "border-r border-solid border-navy-900/10",
  },
  x: {
    subtle: "border-x border-solid border-navy-600/60",
    accent: "border-x border-solid border-sand-500/40",
    strong: "border-x-2 border-solid border-copper-500",
    soft: "border-x border-solid border-navy-900/10",
  },
  y: {
    subtle: "border-y border-solid border-navy-600/60",
    accent: "border-y border-solid border-sand-500/40",
    strong: "border-y-2 border-solid border-copper-500",
    soft: "border-y border-solid border-navy-900/10",
  },
} as const satisfies Record<BorderSide, Record<BorderVariant, string>>;

export function borderClass(
  variant: BorderVariant,
  side: BorderSide = "all",
): string {
  return BORDER_CLASSES[side][variant];
}
