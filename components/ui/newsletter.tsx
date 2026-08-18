"use client";

import { useState, type FormEvent } from "react";
import { subscribeNewsletter } from "@/app/actions/subscribe-newsletter";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";

const DEFAULT_TITLE = "Stay Informed. Stay Protected.";
const DEFAULT_SUBTITLE =
  "Most families find out what they did wrong when it's too late. Get Bijan's estate planning insights delivered straight to your inbox so yours never has to.";
const FALLBACK_ERROR = "Something went wrong. Please try again.";

const INLINE_TEXT_BUTTON_CLASS =
  "inline-flex min-h-0 align-baseline py-0 text-copper-600 hover:text-copper-500 after:bg-copper-500";

function NewsletterSuccess() {
  return (
    <Stack spacing={2} className="max-w-xl items-center">
      <Text variant="body-sm" className="font-bold text-navy-900">
        You&apos;re In.
      </Text>
      <Text variant="body-sm" className="text-gray-600">
        Thank you for subscribing. Bijan&apos;s insights on protecting what
        you&apos;ve built will be heading straight to your inbox.
      </Text>
      <Text variant="body-sm" className="text-gray-600">
        While you&apos;re here, take the first step and{" "}
        <Button
          type="button"
          intent="tertiary"
          size="sm"
          className={INLINE_TEXT_BUTTON_CLASS}
        >
          get the complete estate planning checklist
        </Button>
        , or{" "}
        <Button
          type="button"
          intent="tertiary"
          size="sm"
          className={INLINE_TEXT_BUTTON_CLASS}
        >
          request a consultation
        </Button>{" "}
        if you&apos;re ready to talk.
      </Text>
    </Stack>
  );
}

type NewsletterProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function Newsletter({
  id = "newsletter",
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  className,
}: NewsletterProps) {
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
      const result = await subscribeNewsletter({ firstName, email });

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

  return (
    <Section
      id={id}
      as="section"
      padding="small"
      className={cn("bg-gray-50", borderClass("soft", "y"), className)}
    >
      <Container containerWidth="narrow">
        <Stack spacing={7} className="items-center text-center">
          <Stack spacing={4} className="items-center">
            <Heading as="h2" variant="heading-xl" className="text-navy-900">
              {title}
            </Heading>
            <Text variant="body-md" className="max-w-xl text-gray-600">
              {subtitle}
            </Text>
          </Stack>

          {isSuccess ? (
            <NewsletterSuccess />
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <Stack spacing={3}>
                <Stack spacing={3} className="wide:flex-row wide:items-start">
                  <Field
                    id="newsletter-first-name"
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
                    />
                  </Field>
                  <Field
                    id="newsletter-email"
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
                    className="w-full shrink-0 wide:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing…" : "Subscribe"}
                  </Button>
                </Stack>
                {formError ? (
                  <Text variant="caption" className="text-left text-copper-600">
                    {formError}
                  </Text>
                ) : null}
              </Stack>
            </form>
          )}
        </Stack>
      </Container>
    </Section>
  );
}

Newsletter.displayName = "Newsletter";
