"use server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeNewsletterInput = {
  firstName: string;
  email: string;
};

export type SubscribeNewsletterResult =
  | { ok: true }
  | { ok: false; error: string; field?: "firstName" | "email" };

export async function subscribeNewsletter({
  firstName,
  email,
}: SubscribeNewsletterInput): Promise<SubscribeNewsletterResult> {
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

  const webhookUrl = process.env.GHL_NEWSLETTER_URL;

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
        source: "newsletter",
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
