import type { ComponentPropsWithoutRef, ElementType } from "react";
import {
  sectionPaddingClasses,
  type SectionPadding,
} from "@/lib/section-padding";
import { cn } from "@/lib/util";

type SectionProps<T extends ElementType = "section"> =
  ComponentPropsWithoutRef<T> & {
    as?: T;
    padding?: SectionPadding;
    paddingTop?: SectionPadding;
    paddingBottom?: SectionPadding;
  };

export function Section<T extends ElementType = "section">({
  as,
  padding = "none",
  paddingTop,
  paddingBottom,
  className,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        sectionPaddingClasses({ padding, paddingTop, paddingBottom }),
        className,
      )}
      {...props}
    />
  );
}

Section.displayName = "Section";
