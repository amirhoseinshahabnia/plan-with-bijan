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
  { value: "under_1m", label: "Under $1M" },
  { value: "1m_5m", label: "$1M – $5M" },
  { value: "5m_10m", label: "$5M – $10M" },
  { value: "10m_25m", label: "$10M – $25M" },
  { value: "25m_plus", label: "$25M+" },
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
  "1m_5m",
  "5m_10m",
  "10m_25m",
  "25m_plus",
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

export function isConsultationQualified({
  californiaResident,
  situation,
  estateValue,
}: {
  californiaResident: CaliforniaResidentValue;
  situation: SituationValue;
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
    QUALIFYING_SITUATIONS_FOR_PRIVATE.has(situation)
  );
}
