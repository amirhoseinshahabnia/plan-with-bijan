import { createElement, type ComponentPropsWithoutRef } from "react";
import {
  headingVariantClass,
  type HeadingTag,
  type HeadingVariant,
} from "@/lib/typography";
import { cn } from "@/lib/util";

type HeadingProps<T extends HeadingTag = "h2"> = ComponentPropsWithoutRef<T> & {
  as?: T;
  variant?: HeadingVariant;
};

export function Heading<T extends HeadingTag = "h2">({
  as,
  variant = "heading-md",
  className,
  ...props
}: HeadingProps<T>) {
  return createElement(as ?? "h2", {
    className: cn(headingVariantClass(variant), "font-serif", className),
    ...props,
  });
}

Heading.displayName = "Heading";
