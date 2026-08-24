"use server";

import {
  CALIFORNIA_RESIDENT_OPTIONS,
  ESTATE_VALUE_OPTIONS,
  HAS_ESTATE_PLAN_OPTIONS,
  SITUATION_OPTIONS,
  isConsultationQualified,
  labelForOption,
  type CaliforniaResidentValue,
  type EstateValueValue,
  type HasEstatePlanValue,
  type SituationValue,
} from "@/lib/consultation-options";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK_ERROR = "Something went wrong. Please try again.";

export type ConsultationStatus = "qualified" | "unqualified";

export type SubmitConsultationInput = {
  fullName: string;
  email: string;
  phone: string;
  californiaResident: CaliforniaResidentValue;
  situation: SituationValue;
  estateValue: EstateValueValue;
  hasEstatePlan: HasEstatePlanValue;
  prompt: string;
  newsletter: boolean;
};

export type SubmitConsultationField =
  | "fullName"
  | "email"
  | "phone"
  | "californiaResident"
  | "situation"
  | "estateValue"
  | "hasEstatePlan";

export type SubmitConsultationResult =
  | { ok: true; status: ConsultationStatus }
  | { ok: false; error: string; field?: SubmitConsultationField };

function hasValidOption<T extends string>(
  value: string,
  options: readonly { value: T }[],
): value is T {
  return options.some((option) => option.value === value);
}

function hasLoosePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7;
}

export async function submitConsultation(
  input: SubmitConsultationInput,
): Promise<SubmitConsultationResult> {
  const fullName = input.fullName.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const prompt = input.prompt.trim();

  if (!fullName) {
    return { ok: false, field: "fullName", error: "Enter your full name." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      field: "email",
      error: "Enter a valid email address.",
    };
  }

  if (!hasLoosePhone(phone)) {
    return {
      ok: false,
      field: "phone",
      error: "Enter a valid phone number.",
    };
  }

  if (!hasValidOption(input.californiaResident, CALIFORNIA_RESIDENT_OPTIONS)) {
    return {
      ok: false,
      field: "californiaResident",
      error: "Select whether you are a California resident.",
    };
  }

  if (!hasValidOption(input.situation, SITUATION_OPTIONS)) {
    return {
      ok: false,
      field: "situation",
      error: "Select the option that best describes your situation.",
    };
  }

  if (!hasValidOption(input.estateValue, ESTATE_VALUE_OPTIONS)) {
    return {
      ok: false,
      field: "estateValue",
      error: "Select the approximate value of your estate.",
    };
  }

  if (!hasValidOption(input.hasEstatePlan, HAS_ESTATE_PLAN_OPTIONS)) {
    return {
      ok: false,
      field: "hasEstatePlan",
      error: "Select whether you currently have an estate plan.",
    };
  }

  const status: ConsultationStatus = isConsultationQualified({
    californiaResident: input.californiaResident,
    situation: input.situation,
    estateValue: input.estateValue,
  })
    ? "qualified"
    : "unqualified";

  const webhookUrl = process.env.GHL_CONSULTATION_URL;

  if (!webhookUrl) {
    return { ok: false, error: FALLBACK_ERROR };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "consultation",
        status,
        fullName,
        email,
        phone,
        californiaResident: labelForOption(
          CALIFORNIA_RESIDENT_OPTIONS,
          input.californiaResident,
        ),
        situation: labelForOption(SITUATION_OPTIONS, input.situation),
        estateValue: labelForOption(ESTATE_VALUE_OPTIONS, input.estateValue),
        hasEstatePlan: labelForOption(
          HAS_ESTATE_PLAN_OPTIONS,
          input.hasEstatePlan,
        ),
        prompt,
        newsletter: Boolean(input.newsletter),
      }),
    });

    if (!response.ok) {
      return { ok: false, error: FALLBACK_ERROR };
    }

    return { ok: true, status };
  } catch {
    return { ok: false, error: FALLBACK_ERROR };
  }
}
