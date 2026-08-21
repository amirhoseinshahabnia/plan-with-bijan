"use client";

import { cn } from "@/lib/util";

export type OptionItem = {
  value: string;
  label: string;
};

type OptionGroupProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly OptionItem[];
  columns?: 1 | 2;
  invalid?: boolean;
  className?: string;
};

export function OptionGroup({
  name,
  value,
  onChange,
  options,
  columns = 1,
  invalid = false,
  className,
}: OptionGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-invalid={invalid || undefined}
      className={cn(
        "grid gap-2",
        columns === 2 ? "grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            name={name}
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-full rounded border border-solid bg-white px-4 py-3 text-left font-sans text-ds-body-sm transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-500",
              selected
                ? "border-copper-500 text-copper-600"
                : "border-navy-900/10 text-navy-900 hover:border-navy-900/25",
              invalid && !selected && "border-copper-600",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

OptionGroup.displayName = "OptionGroup";
