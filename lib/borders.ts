export type BorderVariant = "subtle" | "accent";
export type BorderSide = "t" | "b" | "l" | "r" | "x" | "y" | "all";

/** Full class strings so Tailwind can detect them at build time. */
const BORDER_CLASSES = {
  all: {
    subtle: "border border-solid border-slate-600/60",
    accent: "border border-solid border-linen-500/40",
  },
  t: {
    subtle: "border-t border-solid border-slate-600/60",
    accent: "border-t border-solid border-linen-500/40",
  },
  b: {
    subtle: "border-b border-solid border-slate-600/60",
    accent: "border-b border-solid border-linen-500/40",
  },
  l: {
    subtle: "border-l border-solid border-slate-600/60",
    accent: "border-l border-solid border-linen-500/40",
  },
  r: {
    subtle: "border-r border-solid border-slate-600/60",
    accent: "border-r border-solid border-linen-500/40",
  },
  x: {
    subtle: "border-x border-solid border-slate-600/60",
    accent: "border-x border-solid border-linen-500/40",
  },
  y: {
    subtle: "border-y border-solid border-slate-600/60",
    accent: "border-y border-solid border-linen-500/40",
  },
} as const satisfies Record<BorderSide, Record<BorderVariant, string>>;

export function borderClass(
  variant: BorderVariant,
  side: BorderSide = "all",
): string {
  return BORDER_CLASSES[side][variant];
}
