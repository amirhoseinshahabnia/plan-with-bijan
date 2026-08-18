export const BUSINESS = {
  name: "Bijan Roboubi, Esq., DBA Plan With Bijan",
  email: "hello@planwithbijan.com",
  website: "planwithbijan.com",
} as const;

export const LEGAL_EFFECTIVE_DATE = "January 1";

export function legalEffectiveDateLabel(): string {
  return `${LEGAL_EFFECTIVE_DATE}, ${new Date().getFullYear()}`;
}
