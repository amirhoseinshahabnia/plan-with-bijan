export const HEADING_VARIANTS = {
  "display-lg": "text-ds-display-lg",
  "display-md": "text-ds-display-md",
  "heading-2xl": "text-ds-heading-2xl",
  "heading-xl": "text-ds-heading-xl",
  "heading-lg": "text-ds-heading-lg",
  "heading-md": "text-ds-heading-md",
  "heading-sm": "text-ds-heading-sm",
} as const;

export const TEXT_VARIANTS = {
  "body-lg": "text-ds-body-lg",
  "body-md": "text-ds-body-md",
  "body-sm": "text-ds-body-sm",
  caption: "text-ds-caption",
} as const;

export type HeadingVariant = keyof typeof HEADING_VARIANTS;
export type TextVariant = keyof typeof TEXT_VARIANTS;

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5";
export type TextTag = "p" | "span" | "label" | "li";

export const DS_TEXT_SIZES = [
  ...Object.keys(HEADING_VARIANTS).map((key) => `ds-${key}`),
  ...Object.keys(TEXT_VARIANTS).map((key) => `ds-${key}`),
] as const;

export function headingVariantClass(variant: HeadingVariant): string {
  return HEADING_VARIANTS[variant];
}

export function textVariantClass(variant: TextVariant): string {
  return TEXT_VARIANTS[variant];
}
