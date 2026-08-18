import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/util";

type FieldControlProps = {
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  hideLabel?: boolean;
  children: ReactNode;
  className?: string;
};

export function Field({
  id,
  label,
  error,
  hint,
  hideLabel,
  children,
  className,
}: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  const control = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    return cloneElement(child as ReactElement<FieldControlProps>, {
      id,
      "aria-invalid": Boolean(error) || undefined,
      "aria-describedby": describedBy,
    });
  });

  return (
    <Stack spacing={2} className={className}>
      <Text
        as="label"
        htmlFor={id}
        variant="caption"
        className={cn("text-navy-900", hideLabel && "sr-only")}
      >
        {label}
      </Text>
      {control}
      {hint && !error ? (
        <Text id={hintId} variant="caption" className="text-gray-600">
          {hint}
        </Text>
      ) : null}
      {error ? (
        <Text id={errorId} variant="caption" className="text-copper-600">
          {error}
        </Text>
      ) : null}
    </Stack>
  );
}

Field.displayName = "Field";
