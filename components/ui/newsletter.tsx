import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { LeadCaptureForm } from "@/components/ui/lead-capture-form";
import { OpenChecklistButton } from "@/components/ui/open-checklist-button";
import { OpenConsultationButton } from "@/components/ui/open-consultation-button";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";

const DEFAULT_TITLE = "Stay Informed. Stay Protected.";
const DEFAULT_SUBTITLE =
  "Get Bijan's estate planning insights delivered straight to your inbox to stay informed.";

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
        <OpenChecklistButton
          intent="tertiary"
          size="sm"
          className={INLINE_TEXT_BUTTON_CLASS}
        >
          get the complete estate planning checklist
        </OpenChecklistButton>
        , or{" "}
        <OpenConsultationButton
          intent="tertiary"
          size="sm"
          className={INLINE_TEXT_BUTTON_CLASS}
        >
          request a consultation
        </OpenConsultationButton>{" "}
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
            <Text
              variant="body-md"
              className="max-w-xl text-gray-600 text-balance"
            >
              {subtitle}
            </Text>
          </Stack>
          <LeadCaptureForm
            source="newsletter"
            idPrefix="newsletter"
            submitLabel="Subscribe"
            submittingLabel="Subscribing…"
            layout="inline"
            success={<NewsletterSuccess />}
          />
        </Stack>
      </Container>
    </Section>
  );
}

Newsletter.displayName = "Newsletter";
