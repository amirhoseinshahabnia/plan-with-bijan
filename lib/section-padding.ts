export const SECTION_PADDING = {
  none: { y: "py-0", t: "pt-0", b: "pb-0" },
  minimal: { y: "py-3", t: "pt-3", b: "pb-3" },
  tight: { y: "py-4 md:py-6", t: "pt-4 md:pt-6", b: "pb-4 md:pb-6" },
  compact: { y: "py-8 md:py-12", t: "pt-8 md:pt-12", b: "pb-8 md:pb-12" },
  small: { y: "py-10 md:py-16", t: "pt-10 md:pt-16", b: "pb-10 md:pb-16" },
  medium: { y: "py-14 md:py-24", t: "pt-14 md:pt-24", b: "pb-14 md:pb-24" },
  large: { y: "py-20 md:py-32", t: "pt-20 md:pt-32", b: "pb-20 md:pb-32" },
} as const;

export type SectionPadding = keyof typeof SECTION_PADDING;

type SectionPaddingOptions = {
  padding?: SectionPadding;
  paddingTop?: SectionPadding;
  paddingBottom?: SectionPadding;
};

export function sectionPaddingClasses({
  padding,
  paddingTop,
  paddingBottom,
}: SectionPaddingOptions): string {
  const classes: string[] = [];

  if (padding) classes.push(SECTION_PADDING[padding].y);
  if (paddingTop) classes.push(SECTION_PADDING[paddingTop].t);
  if (paddingBottom) classes.push(SECTION_PADDING[paddingBottom].b);

  return classes.join(" ");
}
