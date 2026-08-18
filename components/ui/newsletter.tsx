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

const DEFAULT_TITLE = "Stay a step ahead.";
const DEFAULT_SUBTITLE =
  "Occasional notes on estate planning, family protection, and building a plan that lasts, written for families who have already built something worth protecting.";
const SUCCESS_MESSAGE =
  "You're on the list. We'll be in touch when it matters.";
const FALLBACK_ERROR = "Something went wrong. Please try again.";

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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await subscribeNewsletter(email);

      if (result.ok) {
        setIsSuccess(true);
        setEmail("");
        return;
      }

      setError(result.error);
    } catch {
      setError(FALLBACK_ERROR);
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
            <Text variant="body-md" className="text-navy-900">
              {SUCCESS_MESSAGE}
            </Text>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <Stack spacing={3} className="wide:flex-row wide:items-start">
                <Field
                  id="newsletter-email"
                  label="Email"
                  error={error}
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
                    invalid={Boolean(error)}
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
            </form>
          )}
        </Stack>
      </Container>
    </Section>
  );
}

Newsletter.displayName = "Newsletter";
