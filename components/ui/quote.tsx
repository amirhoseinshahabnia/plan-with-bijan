import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";

export type QuoteItem = {
  quote: string;
  person: string;
};

type QuoteProps = {
  id?: string;
  quote: QuoteItem;
  className?: string;
};

export function Quote({ id, quote: { quote, person }, className }: QuoteProps) {
  return (
    <Section
      id={id}
      as="section"
      padding="medium"
      className={cn("bg-sand-100", borderClass("strong", "b"), className)}
    >
      <Container containerWidth="narrow">
        <Stack spacing={10} className="items-start md:items-center md:text-center">
          <blockquote className="w-full">
            <Heading
              as="h3"
              variant="heading-lg"
              className="font-normal italic text-navy-900 max-md:text-ds-heading-md"
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
