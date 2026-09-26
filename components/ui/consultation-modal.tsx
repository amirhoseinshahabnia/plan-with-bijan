"use client";

import { useEffect, useRef, useState } from "react";
import {
  submitConsultation,
  type ConsultationStatus,
  type SubmitConsultationField,
} from "@/app/actions/submit-consultation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { OptionGroup } from "@/components/ui/option-group";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import {
  CALIFORNIA_RESIDENT_OPTIONS,
  ESTATE_VALUE_OPTIONS,
  HAS_ESTATE_PLAN_OPTIONS,
  SITUATION_OPTIONS,
  type CaliforniaResidentValue,
  type EstateValueValue,
  type HasEstatePlanValue,
  type SituationValue,
} from "@/lib/consultation-options";
import { cn } from "@/lib/util";

const TOTAL_STEPS = 5;
const FALLBACK_ERROR = "Something went wrong. Please try again.";

type ConsultationModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  californiaResident: CaliforniaResidentValue | "";
  situations: SituationValue[];
  estateValue: EstateValueValue | "";
  hasEstatePlan: HasEstatePlanValue | "";
  prompt: string;
  newsletter: boolean;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  californiaResident: "",
  situations: [],
  estateValue: "",
  hasEstatePlan: "",
  prompt: "",
  newsletter: false,
};

function hasLoosePhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 7;
}

function ConsultationSuccess() {
  return (
    <Stack spacing={2}>
      <Text variant="body-sm" className="font-bold text-navy-900">
        Thank you.
      </Text>
      <Text variant="body-sm" className="text-balance text-gray-600">
        We are reviewing your request. If appropriate, a client coordinator from
        Kaiser Law Group will reach out to schedule your consultation with
        Bijan.
      </Text>
    </Stack>
  );
}

function ConsultationWizard({
  onSuccess,
}: {
  onSuccess: (status: ConsultationStatus) => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<SubmitConsultationField, string>>
  >({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!(key in current)) {
        return current;
      }

      const next = { ...current };
      delete next[key as SubmitConsultationField];
      return next;
    });
    setFormError("");
  };

  const validateStep = (currentStep: number): boolean => {
    const errors: Partial<Record<SubmitConsultationField, string>> = {};

    if (currentStep === 1) {
      if (!form.fullName.trim()) {
        errors.fullName = "Enter your full name.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = "Enter a valid email address.";
      }
      if (!hasLoosePhone(form.phone)) {
        errors.phone = "Enter a valid phone number.";
      }
      if (!form.californiaResident) {
        errors.californiaResident =
          "Select whether you are a California resident.";
      }
    }

    if (currentStep === 2 && form.situations.length === 0) {
      errors.situation =
        "Select at least one option that describes your situation.";
    }

    if (currentStep === 3 && !form.estateValue) {
      errors.estateValue = "Select the approximate value of your estate.";
    }

    if (currentStep === 4 && !form.hasEstatePlan) {
      errors.hasEstatePlan =
        "Select whether you currently have an estate plan.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (!validateStep(step)) {
      return;
    }

    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setFieldErrors({});
    setFormError("");
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5) || isSubmitting) {
      return;
    }

    if (
      !form.californiaResident ||
      form.situations.length === 0 ||
      !form.estateValue ||
      !form.hasEstatePlan
    ) {
      setFormError(FALLBACK_ERROR);
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await submitConsultation({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        californiaResident: form.californiaResident,
        situations: form.situations,
        estateValue: form.estateValue,
        hasEstatePlan: form.hasEstatePlan,
        prompt: form.prompt,
        newsletter: form.newsletter,
      });

      if (result.ok) {
        onSuccess(result.status);
        return;
      }

      if (result.field) {
        setFieldErrors({ [result.field]: result.error });
        if (
          result.field === "fullName" ||
          result.field === "email" ||
          result.field === "phone" ||
          result.field === "californiaResident"
        ) {
          setStep(1);
        } else if (result.field === "situation") {
          setStep(2);
        } else if (result.field === "estateValue") {
          setStep(3);
        } else if (result.field === "hasEstatePlan") {
          setStep(4);
        }
        return;
      }

      setFormError(result.error);
    } catch {
      setFormError(FALLBACK_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack spacing={6}>
      <Text variant="body-md" className="text-balance text-gray-600">
        Please answer a few quick questions to help us understand your
        situation. We personally review every request, and if we believe we can
        help, we&apos;ll be in touch.
      </Text>

      <Stack spacing={2} aria-label={`Step ${step} of ${TOTAL_STEPS}`}>
        <div className="flex items-center justify-between gap-3">
          <Text variant="body-sm" className="font-medium text-navy-900">
            Step {step} of {TOTAL_STEPS}
          </Text>
          <Text variant="caption" className="text-copper-600">
            {Math.round((step / TOTAL_STEPS) * 100)}% complete
          </Text>
        </div>
        <div className="grid grid-cols-5 gap-1.5" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => {
            const stepNumber = index + 1;
            const isComplete = stepNumber < step;
            const isCurrent = stepNumber === step;

            return (
              <div
                key={stepNumber}
                className={cn(
                  "h-1.5 rounded-full transition-colors",
                  isComplete || isCurrent ? "bg-copper-500" : "bg-navy-900/10",
                )}
              />
            );
          })}
        </div>
      </Stack>

      <div className="flex min-h-[min(26rem,calc(100dvh-18rem))] flex-col md:min-h-112">
        <div className="flex-1">
          {step === 1 ? (
            <Stack spacing={3}>
              <Field
                id="consultation-full-name"
                label="Full name"
                error={fieldErrors.fullName}
              >
                <Input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  invalid={Boolean(fieldErrors.fullName)}
                  disabled={isSubmitting}
                  required
                />
              </Field>
              <Field
                id="consultation-email"
                label="Email"
                error={fieldErrors.email}
              >
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  invalid={Boolean(fieldErrors.email)}
                  disabled={isSubmitting}
                  required
                />
              </Field>
              <Field
                id="consultation-phone"
                label="Phone number"
                error={fieldErrors.phone}
              >
                <Input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  invalid={Boolean(fieldErrors.phone)}
                  disabled={isSubmitting}
                  required
                />
              </Field>
              <Stack spacing={2}>
                <Text as="label" variant="caption" className="text-navy-900">
                  Are you a California resident?
                </Text>
                <OptionGroup
                  name="californiaResident"
                  value={form.californiaResident}
                  onChange={(value) =>
                    updateField(
                      "californiaResident",
                      value as CaliforniaResidentValue,
                    )
                  }
                  options={CALIFORNIA_RESIDENT_OPTIONS}
                  columns={2}
                  invalid={Boolean(fieldErrors.californiaResident)}
                />
                {fieldErrors.californiaResident ? (
                  <Text variant="caption" className="text-copper-600">
                    {fieldErrors.californiaResident}
                  </Text>
                ) : null}
              </Stack>
            </Stack>
          ) : null}

          {step === 2 ? (
            <Stack spacing={3}>
              <Text variant="body-sm" className="font-medium text-navy-900">
                Which best describes your situation?{" "}
                <span className="font-normal text-gray-500">
                  (Select all that apply)
                </span>
              </Text>
              <OptionGroup
                multiple
                name="situation"
                value={form.situations}
                onChange={(value) =>
                  updateField("situations", value as SituationValue[])
                }
                options={SITUATION_OPTIONS}
                invalid={Boolean(fieldErrors.situation)}
              />
              {fieldErrors.situation ? (
                <Text variant="caption" className="text-copper-600">
                  {fieldErrors.situation}
                </Text>
              ) : null}
            </Stack>
          ) : null}

          {step === 3 ? (
            <Stack spacing={3}>
              <Text variant="body-sm" className="font-medium text-navy-900">
                What is the approximate value of your estate?
              </Text>
              <OptionGroup
                name="estateValue"
                value={form.estateValue}
                onChange={(value) =>
                  updateField("estateValue", value as EstateValueValue)
                }
                options={ESTATE_VALUE_OPTIONS}
                invalid={Boolean(fieldErrors.estateValue)}
              />
              {fieldErrors.estateValue ? (
                <Text variant="caption" className="text-copper-600">
                  {fieldErrors.estateValue}
                </Text>
              ) : null}
            </Stack>
          ) : null}

          {step === 4 ? (
            <Stack spacing={3}>
              <Text variant="body-sm" className="font-medium text-navy-900">
                Do you currently have an estate plan?
              </Text>
              <OptionGroup
                name="hasEstatePlan"
                value={form.hasEstatePlan}
                onChange={(value) =>
                  updateField("hasEstatePlan", value as HasEstatePlanValue)
                }
                options={HAS_ESTATE_PLAN_OPTIONS}
                invalid={Boolean(fieldErrors.hasEstatePlan)}
              />
              {fieldErrors.hasEstatePlan ? (
                <Text variant="caption" className="text-copper-600">
                  {fieldErrors.hasEstatePlan}
                </Text>
              ) : null}
            </Stack>
          ) : null}

          {step === 5 ? (
            <Stack spacing={3}>
              <Field
                id="consultation-prompt"
                label="What's prompting you to look into this now? (optional)"
              >
                <Input
                  type="text"
                  name="prompt"
                  placeholder="Optional"
                  value={form.prompt}
                  onChange={(event) =>
                    updateField("prompt", event.target.value)
                  }
                  disabled={isSubmitting}
                />
              </Field>
              <Checkbox
                id="consultation-newsletter"
                name="newsletter"
                checked={form.newsletter}
                onChange={(event) =>
                  updateField("newsletter", event.target.checked)
                }
                disabled={isSubmitting}
                label="Also send me Bijan's weekly newsletter with estate planning tips."
              />
            </Stack>
          ) : null}

          {formError ? (
            <Text variant="caption" className="mt-3 text-copper-600">
              {formError}
            </Text>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {step > 1 ? (
            <Button
              type="button"
              intent="secondary"
              onClick={handleBack}
              disabled={isSubmitting}
              className="border-navy-900/20 text-navy-900 hover:bg-navy-900/5"
            >
              Back
            </Button>
          ) : null}
          {step < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={handleContinue}
              disabled={isSubmitting}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Submit"}
            </Button>
          )}
        </div>
      </div>
    </Stack>
  );
}

export function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const [formKey, setFormKey] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      setFormKey((current) => current + 1);
      setIsSuccess(false);
    }

    wasOpenRef.current = open;
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isSuccess ? undefined : "Request a Consultation"}
    >
      {isSuccess ? (
        <ConsultationSuccess />
      ) : (
        <ConsultationWizard
          key={formKey}
          onSuccess={() => setIsSuccess(true)}
        />
      )}
    </Modal>
  );
}

ConsultationModal.displayName = "ConsultationModal";
