import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
  ServeCardIcon,
  type ServeCardIconVariant,
} from "@/components/ui/serve-card-icon";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { EYEBROW_TEXT_CLASS } from "@/lib/typography";
import { borderClass } from "@/lib/borders";
import { shadowClass } from "@/lib/shadows";
import { cn } from "@/lib/util";

export type ServeCardItem = {
  title: string;
  description: string;
  icon: ServeCardIconVariant;
};

const DEFAULT_EYEBROW = "Who We Serve";
const DEFAULT_TITLE =
  "Most attorneys hand you documents and call it done. We don't.";
const DEFAULT_SUBTITLE =
  "We work with individuals and families who have built something significant and need a plan that reflects that.";

const DEFAULT_CARDS: ServeCardItem[] = [
  {
    icon: "tech",
    title: "Tech Founders & Executives",
    description:
      "Equity, options, and company stakes demand planning that's ready for what's coming, an IPO, an acquisition, or simply the wealth you're building toward.",
  },
  {
    icon: "medical",
    title: "Physicians & Dentists",
    description:
      "The structure of a physician's or dentist's estate requires provisions that go beyond the standard, licensing, practice interests, and professional considerations that most estate plans miss entirely.",
  },
  {
    icon: "founder",
    title: "Entrepreneurs",
    description:
      "Business ownership, partnership agreements, and personal liability exposure create layers of complexity that demand an estate plan with specific considerations for the business, not just the person behind it.",
  },
];

type WhoWeServeProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: readonly ServeCardItem[];
  className?: string;
};

function ServeCard({ title, description, icon }: ServeCardItem) {
  return (
    <article
      className={cn(
        "rounded-sm bg-white p-6",
        borderClass("soft", "all"),
        shadowClass("subtle"),
      )}
    >
      <Stack spacing={8}>
        <ServeCardIcon variant={icon} />
        <Stack spacing={4}>
          <Heading as="h3" variant="heading-sm" className="text-navy-900">
            {title}
          </Heading>
          <Text variant="body-sm" className="text-gray-600">
            {description}
          </Text>
        </Stack>
      </Stack>
    </article>
  );
}

export function WhoWeServe({
  id = "who-we-serve",
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  cards = DEFAULT_CARDS,
  className,
}: WhoWeServeProps) {
  return (
    <Section
      id={id}
      as="section"
      padding="medium"
      className={cn("bg-gray-50", borderClass("soft", "y"), className)}
    >
      <Container>
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Text variant="caption" className={EYEBROW_TEXT_CLASS}>
              {eyebrow}
            </Text>
            <Heading
              as="h2"
              variant="heading-xl"
              className="text-navy-900 wide:text-ds-heading-2xl"
            >
              {title}
            </Heading>
            <Text variant="body-md" className="text-gray-600">
              {subtitle}
            </Text>
          </Stack>

          <div className="grid grid-cols-1 gap-6 wide:grid-cols-3 wide:gap-8">
            {cards.map((card) => (
              <ServeCard key={card.title} {...card} />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

WhoWeServe.displayName = "WhoWeServe";
