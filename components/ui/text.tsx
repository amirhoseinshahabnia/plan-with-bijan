import { createElement, type ComponentPropsWithoutRef } from "react";
import {
  textVariantClass,
  type TextTag,
  type TextVariant,
} from "@/lib/typography";
import { cn } from "@/lib/util";

type TextProps<T extends TextTag = "p"> = ComponentPropsWithoutRef<T> & {
  as?: T;
  variant?: TextVariant;
};

export function Text<T extends TextTag = "p">({
  as,
  variant = "body-md",
  className,
  ...props
}: TextProps<T>) {
  return createElement(as ?? "p", {
    className: cn(textVariantClass(variant), "font-sans", className),
    ...props,
  });
}

Text.displayName = "Text";
