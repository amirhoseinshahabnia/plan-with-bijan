"use server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeNewsletter(
  email: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const trimmed = email.trim();

  if (!EMAIL_PATTERN.test(trimmed)) {
    return { ok: false, error: "Enter a valid email address." };
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
        email: trimmed,
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
