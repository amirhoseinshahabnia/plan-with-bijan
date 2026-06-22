import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { shadowClass } from "@/lib/shadows";
import { cn } from "@/lib/util";

export type RightFitColumn = {
  title: string;
  items: readonly string[];
};

const DEFAULT_TITLE = "Are We The Right Fit?";
const DEFAULT_SUBTITLE =
  "We work with a select group of clients. Because the families we serve have worked too hard to settle for anything less than a plan that is done right.";

const DEFAULT_FIT: RightFitColumn = {
  title: "We ARE a Fit If...",
  items: [
    "You are a resident of California",
    "You have significant assets, real estate or a business to protect",
    "You have a net worth of $500K or more",
    "You own multiple properties including out of state",
    "You have a blended family or complex family dynamics",
    "You are a business owner who wants your business to survive you",
    "You have an existing plan that needs to be reviewed and updated",
    "You are building generational wealth and want a legacy plan",
    "You are ready to take action",
  ],
};

const DEFAULT_NOT_FIT: RightFitColumn = {
  title: "We Are NOT a Fit If...",
  items: [
    "You are NOT a resident of California",
    "You are looking for the cheapest option",
    "You want free legal advice over the phone",
    "You are not ready to be transparent about your assets and wishes",
    "You want a quick generic document rather than a real plan",
    "You intend to plan without your spouse",
    "You believe this can wait",
  ],
};

type RightFitColumnCardProps = RightFitColumn & {
  variant: "fit" | "notFit";
};

export function RightFitColumnCard({
  title,
  items,
  variant,
}: RightFitColumnCardProps) {
  const isFit = variant === "fit";
  const Icon = isFit ? Check : Minus;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-sm bg-white p-10 wide:p-12",
        borderClass("soft", "all"),
        shadowClass("subtle"),
      )}
    >
      <Stack spacing={6} className="h-full">
        <Stack spacing={4}>
          <div
            className={cn(
              "h-0.5 w-10",
              isFit ? "bg-copper-500" : "bg-gray-500",
            )}
            aria-hidden="true"
          />
          <Heading
            as="h3"
            variant="heading-sm"
            className={cn(
              "text-navy-900",
              isFit ? "font-medium" : "font-normal",
            )}
          >
            {title}
          </Heading>
        </Stack>

        <ul className="flex flex-col gap-3.5">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <Icon
                size={16}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-navy-400"
                aria-hidden="true"
              />
              <Text as="span" variant="body-sm" className="text-gray-600">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </Stack>
    </article>
  );
}

type RightFitProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  fit?: RightFitColumn;
  notFit?: RightFitColumn;
  className?: string;
};

export function RightFit({
  id = "right-fit",
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  fit = DEFAULT_FIT,
  notFit = DEFAULT_NOT_FIT,
  className,
}: RightFitProps) {
  return (
    <Section
      id={id}
      as="section"
      padding="small"
      className={cn("bg-sand-100", className)}
    >
      <Container containerWidth="medium">
        <Stack spacing={10}>
          <Stack spacing={4} className="wide:items-center wide:text-center">
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

          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 wide:grid-cols-2 wide:gap-8">
            <RightFitColumnCard variant="fit" {...fit} />
            <RightFitColumnCard variant="notFit" {...notFit} />
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

RightFit.displayName = "RightFit";
