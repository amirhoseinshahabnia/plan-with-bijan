export type ShadowVariant = "subtle";

/** Full class strings so Tailwind can detect them at build time. */
const SHADOW_CLASSES = {
  subtle: "shadow-subtle",
} as const satisfies Record<ShadowVariant, string>;

export function shadowClass(variant: ShadowVariant): string {
  return SHADOW_CLASSES[variant];
}
