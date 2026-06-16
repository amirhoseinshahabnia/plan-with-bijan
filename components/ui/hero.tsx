import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";

export function Hero() {
  return (
    <Container>
      <Section as="div" padding="small">
        <div className="grid grid-cols-1 items-center gap-10 wide:grid-cols-2 wide:gap-12">
          <Stack spacing={7}>
            <Stack spacing={5}>
              <Heading as="h1" variant="heading-2xl" className="text-gray-50">
                Your family.
                <br />
                <span className="italic text-copper-500">Protected</span>
                <br />
                Your legacy, in order.
              </Heading>
              <Text variant="body-md" className="max-w-lg text-sand-500">
                Because the people you love deserve a plan — not a pile of
                paperwork left behind.
              </Text>
            </Stack>
            <div className="flex flex-wrap gap-3">
              <Button>Primary action</Button>
              <Button intent="secondary">Secondary</Button>
            </div>
          </Stack>

          <div className="relative aspect-[1] w-full overflow-hidden rounded-sm [mask-image:radial-gradient(ellipse_84%_78%_at_50%_48%,#000_52%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_84%_78%_at_50%_48%,#000_52%,transparent_100%)]">
            <Image
              src="/bijan-web.jpg"
              alt="Bijan Kaiser, estate planning attorney"
              fill
              priority
              className="object-cover object-top"
              sizes="(min-width: 56.25rem) 50vw, 100vw"
            />
          </div>
        </div>
      </Section>
    </Container>
  );
}

Hero.displayName = "Hero";
