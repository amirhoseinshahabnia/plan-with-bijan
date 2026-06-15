import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { REVIEWS, type Review } from "@/lib/reviews";
import { shadowClass } from "@/lib/shadows";
import { cn } from "@/lib/util";

const DEFAULT_TITLE = "Trusted by professionals who plan ahead.";
const DEFAULT_SUBTITLE =
  "Real experiences from clients who chose clarity over complexity.";

export function TestimonialCard({ name, review, profession }: Review) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-sm bg-white p-6",
        borderClass("soft", "all"),
        borderClass("accent", "t"),
        shadowClass("subtle"),
      )}
    >
      <Stack spacing={6} className="h-full">
        <blockquote className="flex-1">
          <Heading
            as="h3"
            variant="heading-sm"
            className="font-normal text-navy-900"
          >
            &ldquo;{review}&rdquo;
          </Heading>
        </blockquote>
        <Stack spacing={1}>
          <Text as="p" variant="body-sm" className="font-medium text-navy-900">
            {name}
          </Text>
          <Text as="p" variant="caption" className="text-copper-500">
            {profession}
          </Text>
        </Stack>
      </Stack>
    </article>
  );
}

type TestimonialsProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  reviews?: readonly Review[];
  className?: string;
};

export function Testimonials({
  id = "testimonials",
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  reviews = REVIEWS,
  className,
}: TestimonialsProps) {
  if (reviews.length === 0) return null;

  return (
    <Section
      id={id}
      as="section"
      padding="medium"
      className={cn("bg-gray-50", borderClass("soft", "y"), className)}
    >
      <Container>
        <Stack spacing={10}>
          <Stack spacing={4} className="items-center text-center">
            <Heading
              as="h2"
              variant="heading-xl"
              className="text-navy-900 wide:text-ds-heading-2xl"
            >
              {title}
            </Heading>
            <Text variant="body-md" className="max-w-2xl text-gray-600">
              {subtitle}
            </Text>
          </Stack>

          <div className="grid grid-cols-1 gap-6 wide:grid-cols-3 wide:gap-8">
            {reviews.map((review) => (
              <TestimonialCard key={review.name} {...review} />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

Testimonials.displayName = "Testimonials";
