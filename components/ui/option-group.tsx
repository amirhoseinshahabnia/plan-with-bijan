"use client";

import { cn } from "@/lib/util";

export type OptionItem = {
  value: string;
  label: string;
};

type OptionGroupBaseProps = {
  name: string;
  options: readonly OptionItem[];
  columns?: 1 | 2;
  invalid?: boolean;
  className?: string;
};

type OptionGroupSingleProps = OptionGroupBaseProps & {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type OptionGroupMultipleProps = OptionGroupBaseProps & {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

export type OptionGroupProps = OptionGroupSingleProps | OptionGroupMultipleProps;

export function OptionGroup(props: OptionGroupProps) {
  const { name, options, columns = 1, invalid = false, className } = props;

  const isSelected = (optionValue: string) =>
    props.multiple
      ? props.value.includes(optionValue)
      : props.value === optionValue;

  const handleSelect = (optionValue: string) => {
    if (props.multiple) {
      const current = props.value;
      const next = current.includes(optionValue)
        ? current.filter((value) => value !== optionValue)
        : [...current, optionValue];
      props.onChange(next);
      return;
    }

    props.onChange(optionValue);
  };

  return (
    <div
      role={props.multiple ? "group" : "radiogroup"}
      aria-invalid={invalid || undefined}
      className={cn(
        "grid gap-2",
        columns === 2 ? "grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      {options.map((option) => {
        const selected = isSelected(option.value);

        return (
          <button
            key={option.value}
            type="button"
            role={props.multiple ? "checkbox" : "radio"}
            name={name}
            aria-checked={selected}
            onClick={() => handleSelect(option.value)}
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
