export const BUSINESS = {
  name: "Plan with Bijan",
  phone: "TBD",
  email: "TBD",
  website: "TBD",
} as const;

export const LEGAL_EFFECTIVE_DATE = "January 1";

export function legalEffectiveDateLabel(): string {
  return `${LEGAL_EFFECTIVE_DATE}, ${new Date().getFullYear()}`;
}
