import { type ComponentPropsWithoutRef } from "react";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "size"
> & {
  label: string;
};

export function Checkbox({
  id,
  label,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-start gap-3",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        className={cn(
          "mt-0.5 size-4 shrink-0 rounded-sm bg-white accent-copper-500",
          borderClass("soft"),
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-500",
          "disabled:pointer-events-none",
        )}
        {...props}
      />
      <span className="font-sans text-ds-body-sm text-navy-900">{label}</span>
    </label>
  );
}

Checkbox.displayName = "Checkbox";
