import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

export default function Home() {
  return (
    <main className="min-h-dvh w-full">
      <Container>
        <Section as="div" padding="medium">
          <Heading as="h1" variant="heading-2xl" className="text-linen-500">
            Plan
            <br />
            <span className="font-normal italic">with</span> Bijan
          </Heading>
          <Text variant="body-lg" className="text-gray-300 mt-4 max-w-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur aperiam aliquid adipisci quia culpa laudantium,
            assumenda dignissimos laborum nostrum, deleniti similique itaque
            obcaecati commodi asperiores et delectus quis at voluptatem!
            Corporis quisquam illo cupiditate praesentium inventore fugit dicta
            eveniet quae dolor nihil quo nisi, facilis doloremque ipsam placeat.
            Aperiam illum molestias placeat officia quod reiciendis debitis,
            quaerat at provident obcaecati.
          </Text>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Primary action</Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="tertiary">Tertiary</Button>
            <Button href="https://example.com" openInNewTab>
              External
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Section>
      </Container>
    </main>
  );
}
