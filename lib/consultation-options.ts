export const CALIFORNIA_RESIDENT_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const SITUATION_OPTIONS = [
  {
    value: "home_family",
    label: "I own a home and have a family to protect",
  },
  {
    value: "multiple_properties",
    label: "I own multiple properties or investment real estate",
  },
  {
    value: "own_business",
    label: "I own a business",
  },
  {
    value: "significant_assets",
    label:
      "I have significant assets across real estate, investments, and/or business interests",
  },
  {
    value: "just_exploring",
    label: "I'm just starting to explore estate planning",
  },
] as const;

export const ESTATE_VALUE_OPTIONS = [
  { value: "under_5m", label: "under $5MM" },
  { value: "5m_15m", label: "$5MM - $15MM" },
  { value: "15m_30m", label: "$15MM to $30MM" },
  { value: "30m_plus", label: "$30MM+" },
  {
    value: "prefer_privately",
    label: "I'd prefer to discuss privately",
  },
] as const;

export const HAS_ESTATE_PLAN_OPTIONS = [
  {
    value: "yes_outdated",
    label: "Yes, but it hasn't been reviewed in years",
  },
  {
    value: "yes_recent",
    label: "Yes, and it was recently updated",
  },
  {
    value: "no_first",
    label: "No, this would be my first plan",
  },
  {
    value: "not_sure",
    label: "I'm not sure what I have",
  },
] as const;

export type CaliforniaResidentValue =
  (typeof CALIFORNIA_RESIDENT_OPTIONS)[number]["value"];
export type SituationValue = (typeof SITUATION_OPTIONS)[number]["value"];
export type EstateValueValue = (typeof ESTATE_VALUE_OPTIONS)[number]["value"];
export type HasEstatePlanValue =
  (typeof HAS_ESTATE_PLAN_OPTIONS)[number]["value"];

const QUALIFYING_ESTATE_VALUES = new Set<EstateValueValue>([
  "5m_15m",
  "15m_30m",
  "30m_plus",
]);

const QUALIFYING_SITUATIONS_FOR_PRIVATE = new Set<SituationValue>([
  "home_family",
  "multiple_properties",
  "own_business",
  "significant_assets",
]);

export function labelForOption<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function labelsForOptions<T extends { value: string; label: string }>(
  options: readonly T[],
  values: readonly string[],
): string[] {
  return values.map((value) => labelForOption(options, value));
}

export function isConsultationQualified({
  californiaResident,
  situations,
  estateValue,
}: {
  californiaResident: CaliforniaResidentValue;
  situations: readonly SituationValue[];
  estateValue: EstateValueValue;
}): boolean {
  if (californiaResident !== "yes") {
    return false;
  }

  if (QUALIFYING_ESTATE_VALUES.has(estateValue)) {
    return true;
  }

  return (
    estateValue === "prefer_privately" &&
    situations.some((situation) =>
      QUALIFYING_SITUATIONS_FOR_PRIVATE.has(situation),
    )
  );
}
