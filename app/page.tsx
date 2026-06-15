import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { EstatePlanningDoneRight } from "@/components/ui/estate-planning-done-right";
import { Features } from "@/components/ui/features";
import { WhoWeServe } from "@/components/ui/who-we-serve";
import { Quote } from "@/components/ui/quote";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { Stack } from "@/components/ui/stack";

export default function Home() {
  return (
    <main className="w-full">
      <Container>
        <Section as="div" padding="medium">
          <Stack spacing={7}>
            <Stack spacing={5}>
              <Heading as="h1" variant="heading-2xl" className="text-gray-50">
                Your family.
                <br />
                <span className="italic text-copper-500">Protected</span>
                <br />
                Your legacy, in order.
              </Heading>
              <Text variant="body-md" className="text-sand-500 max-w-lg">
                Because the people you love deserve a plan — not a pile of
                paperwork left behind.
              </Text>
            </Stack>
            <div className="flex flex-wrap gap-3">
              <Button>Primary action</Button>
              <Button intent="secondary">Secondary</Button>
            </div>
          </Stack>
        </Section>
      </Container>
      <Features />
      <WhoWeServe />
      <EstatePlanningDoneRight />
      <Quote
        quotes={[
          {
            person: "BIJAN - KAISER LAW GROUP",
            quote:
              '"The most sophisticated professionals in the world spend decades building wealth — and often hours planning how to protect it. We believe that imbalance is one of the most consequential oversights of our time."',
          },
        ]}
      />

      <CTA
        title="Ready to protect what matters?"
        subtitle="Book a complimentary strategy session and let's build a plan that works — for you and for those who come after you."
        cta="Book Your Strategy Session"
        link="#book-strategy-session"
      />
    </main>
  );
}
