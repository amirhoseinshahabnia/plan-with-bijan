import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { headingVariantClass } from "@/lib/typography";
import { cn } from "@/lib/util";

export type ProcessCardItem = {
  step: string;
  title: string;
  description: string;
};

const DEFAULT_EYEBROW = "Estate Planning Done Right";
const DEFAULT_TITLE = "Three steps to peace of mind.";
const DEFAULT_SUBTITLE = "Simple, intentional, and built around you.";

const DEFAULT_CARDS: ProcessCardItem[] = [
  {
    step: "01",
    title: "Asset Alignment",
    description:
      "Even a perfectly drafted trust is meaningless if your assets aren't titled correctly. Asset alignment ensures everything you own is structured to flow through your plan the way it's intended.",
  },
  {
    step: "02",
    title: "Custom Legal Documents",
    description:
      "Every client is different. Your trust, will, powers of attorney, and healthcare directives should reflect your specific situation — not a template pulled from a drawer.",
  },
  {
    step: "03",
    title: "Family Education",
    description:
      "The best plan in the world can fail if the people responsible for carrying it out don't understand their role. We make sure your fiduciaries are informed.",
  },
];

type EstatePlanningDoneRightProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: readonly ProcessCardItem[];
  className?: string;
};

export function ProcessCard({ step, title, description }: ProcessCardItem) {
  return (
    <article className={cn("rounded-sm bg-navy-800 p-6")}>
      <Stack spacing={7}>
        <span
          className={cn(
            headingVariantClass("heading-lg"),
            "font-serif text-copper-400",
          )}
          aria-hidden="true"
        >
          {step}
        </span>
        <Stack spacing={4}>
          <Heading as="h3" variant="heading-sm" className="text-gray-50">
            {title}
          </Heading>
          <Text variant="body-sm" className="text-gray-300">
            {description}
          </Text>
        </Stack>
      </Stack>
    </article>
  );
}

export function EstatePlanningDoneRight({
  id = "estate-planning-done-right",
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  cards = DEFAULT_CARDS,
  className,
}: EstatePlanningDoneRightProps) {
  return (
    <Section
      id={id}
      as="section"
      padding="medium"
      className={cn("bg-navy-900", className)}
    >
      <Container>
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Text
              variant="caption"
              className="uppercase tracking-wider text-copper-500"
            >
              {eyebrow}
            </Text>
            <Heading
              as="h2"
              variant="heading-xl"
              className="text-gray-50 wide:text-ds-heading-2xl"
            >
              {title}
            </Heading>
            <Text variant="body-md" className="max-w-2xl text-gray-300">
              {subtitle}
            </Text>
          </Stack>

          <div className="grid grid-cols-1 gap-6 wide:grid-cols-3 wide:gap-8">
            {cards.map((card) => (
              <ProcessCard key={card.step} {...card} />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

EstatePlanningDoneRight.displayName = "EstatePlanningDoneRight";
