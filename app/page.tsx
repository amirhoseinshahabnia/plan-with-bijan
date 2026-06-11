import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { Stack } from "@/components/ui/stack";

export default function Home() {
  return (
    <main className="min-h-dvh w-full">
      <Container>
        <Section as="div" padding="medium">
          <Stack spacing={7}>
            <Stack spacing={5}>
              <Heading as="h1" variant="heading-2xl" className="text-gray-100">
                Your family.
                <br />
                <span className="italic text-copper-500">Protected</span>
                <br />
                Your legacy, in order.
              </Heading>
              <Text variant="body-md" className="text-linen-500 max-w-lg">
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
    </main>
  );
}
