import { type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";

const inputVariants = cva(
  [
    "w-full bg-white font-sans text-navy-900 placeholder:text-gray-500 rounded",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-500",
    "focus-visible:border-copper-500",
    "disabled:pointer-events-none disabled:opacity-50",
    "transition-colors",
    borderClass("soft", "all"),
  ],
  {
    variants: {
      size: {
        sm: "h-9 px-4 text-ds-body-sm",
        md: "h-11 px-4 text-ds-body-md",
        lg: "h-13 px-4 text-ds-body-lg",
      },
      invalid: {
        true: "border-copper-600",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      invalid: false,
    },
  },
);

export type InputProps = ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof inputVariants>;

export function Input({ className, size, invalid, ...props }: InputProps) {
  return (
    <input
      className={cn(inputVariants({ size, invalid }), className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

Input.displayName = "Input";

export { inputVariants };
