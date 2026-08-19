"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { submitLead, type LeadSource } from "@/app/actions/submit-lead";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/util";

const FALLBACK_ERROR = "Something went wrong. Please try again.";

type LeadCaptureFormProps = {
  source: LeadSource;
  idPrefix: string;
  submitLabel: string;
  submittingLabel: string;
  success: ReactNode;
  layout?: "inline" | "stack";
  className?: string;
  autoFocus?: boolean;
};

export function LeadCaptureForm({
  source,
  idPrefix,
  submitLabel,
  submittingLabel,
  success,
  layout = "inline",
  className,
  autoFocus = false,
}: LeadCaptureFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    email?: string;
  }>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setFormError("");
    setIsSubmitting(true);

    try {
      const result = await submitLead({ firstName, email, source });

      if (result.ok) {
        setIsSuccess(true);
        setFirstName("");
        setEmail("");
        return;
      }

      if (result.field) {
        setFieldErrors({ [result.field]: result.error });
        return;
      }

      setFormError(result.error);
    } catch {
      setFormError(FALLBACK_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return success;
  }

  const isStacked = layout === "stack";

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <Stack spacing={3}>
        <Stack
          spacing={3}
          className={cn(!isStacked && "wide:flex-row wide:items-start")}
        >
          <Field
            id={`${idPrefix}-first-name`}
            label="First name"
            error={fieldErrors.firstName}
            hideLabel
            className="min-w-0 flex-1"
          >
            <Input
              type="text"
              name="firstName"
              autoComplete="given-name"
              placeholder="First name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              invalid={Boolean(fieldErrors.firstName)}
              disabled={isSubmitting}
              required
              autoFocus={autoFocus}
            />
          </Field>
          <Field
            id={`${idPrefix}-email`}
            label="Email"
            error={fieldErrors.email}
            hideLabel
            className="min-w-0 flex-1"
          >
            <Input
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              invalid={Boolean(fieldErrors.email)}
              disabled={isSubmitting}
              required
            />
          </Field>
          <Button
            type="submit"
            size="md"
            className={cn("w-full shrink-0", !isStacked && "wide:w-auto")}
            disabled={isSubmitting}
          >
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
        </Stack>
        {formError ? (
          <Text variant="caption" className="text-left text-copper-600">
            {formError}
          </Text>
        ) : null}
      </Stack>
    </form>
  );
}

LeadCaptureForm.displayName = "LeadCaptureForm";
