"use server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadSource = "newsletter" | "checklist";

export type SubmitLeadInput = {
  firstName: string;
  email: string;
  source: LeadSource;
  newsletter?: boolean;
};

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: string; field?: "firstName" | "email" };

const WEBHOOK_ENV: Record<LeadSource, string> = {
  newsletter: "GHL_NEWSLETTER_URL",
  checklist: "GHL_CHECKLIST_URL",
};

export async function submitLead({
  firstName,
  email,
  source,
  newsletter,
}: SubmitLeadInput): Promise<SubmitLeadResult> {
  const trimmedName = firstName.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) {
    return {
      ok: false,
      field: "firstName",
      error: "Enter your first name.",
    };
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return {
      ok: false,
      field: "email",
      error: "Enter a valid email address.",
    };
  }

  const webhookUrl = process.env[WEBHOOK_ENV[source]];

  if (!webhookUrl) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: trimmedName,
        email: trimmedEmail,
        source,
        ...(newsletter === undefined
          ? {}
          : { newsletter: Boolean(newsletter) }),
      }),
    });

    if (!response.ok) {
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
