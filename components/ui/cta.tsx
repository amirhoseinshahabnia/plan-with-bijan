import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";
import { type SectionPadding } from "@/lib/section-padding";

type CTAProps = {
  id?: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  className?: string;
  padding?: SectionPadding;
};

export function CTA({
  id = "book-strategy-session",
  title,
  subtitle,
  cta,
  link,
  className,
  padding = "medium",
}: CTAProps) {
  return (
    <Section
      id={id}
      as="section"
      padding={padding}
      className={cn("bg-navy-900", borderClass("strong", "t"), className)}
    >
      <Container>
        <Stack spacing={7} className="items-center text-center">
          <Stack spacing={5} className="items-center lg:max-w-xl">
            <Heading as="h2" variant="heading-xl" className="text-gray-50">
              {title}
            </Heading>
            <Text variant="body-md" className="max-w-xl text-gray-300">
              {subtitle}
            </Text>
          </Stack>
          <Button href={link} animation="moveUp">
            {cta}
          </Button>
        </Stack>
      </Container>
    </Section>
  );
}

CTA.displayName = "CTA";
