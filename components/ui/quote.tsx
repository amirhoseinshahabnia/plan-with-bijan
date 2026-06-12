import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";

type QuoteProps = {
  id?: string;
  quote: string;
  person: string;
  className?: string;
};

export function Quote({ id, quote, person, className }: QuoteProps) {
  return (
    <Section
      id={id}
      as="section"
      padding="medium"
      className={cn("bg-sand-100", borderClass("strong", "b"), className)}
    >
      <Container containerWidth="narrow">
        <Stack spacing={8} className="items-center text-center">
          <blockquote>
            <Heading
              as="h3"
              variant="heading-xl"
              className="italic font-normal text-navy-900"
            >
              {quote}
            </Heading>
          </blockquote>
          <Text
            as="p"
            variant="body-sm"
            className="uppercase tracking-wider text-copper-500"
          >
            {person}
          </Text>
        </Stack>
      </Container>
    </Section>
  );
}

Quote.displayName = "Quote";
