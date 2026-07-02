import { Check, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { shadowClass } from "@/lib/shadows";
import { cn } from "@/lib/util";

function FitCheckBullet() {
  return (
    <span
      className="flex size-5 items-center justify-center rounded-full bg-sage-100"
      aria-hidden="true"
    >
      <Check
        size={11}
        strokeWidth={2.25}
        className="text-sage-800"
        aria-hidden="true"
      />
    </span>
  );
}

function NotFitDashBullet() {
  return (
    <span
      className="flex size-5 items-center justify-center rounded-full bg-copper-200"
      aria-hidden="true"
    >
      <Minus
        size={11}
        strokeWidth={3.25}
        className="text-copper-600"
        aria-hidden="true"
      />
    </span>
  );
}

function DoubleRule({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex w-full flex-col gap-0.25", className)}
      aria-hidden="true"
    >
      <div className="h-px w-full bg-navy-100" />
      <div className="h-px w-full bg-navy-100" />
    </div>
  );
}

function AndAtLeastOneDivider() {
  return (
    <div className="flex items-center gap-3">
      <DoubleRule className="min-w-0 flex-1" />
      <Text
        as="span"
        variant="caption"
        className="shrink-0 uppercase tracking-wider text-copper-500"
      >
        And at least one:
      </Text>
      <DoubleRule className="min-w-0 flex-1" />
    </div>
  );
}

function RightFitListItem({
  item,
  Bullet,
}: {
  item: string;
  Bullet: typeof FitCheckBullet;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-5 shrink-0 items-center">
        <Bullet />
      </span>
      <Text as="span" variant="body-sm" className="text-navy-800">
        {item}
      </Text>
    </li>
  );
}

export type RightFitColumn = {
  title: ReactNode;
  items: readonly string[];
  atLeastOneItems?: readonly string[];
};

const DEFAULT_TITLE = "Are We The Right Fit?";
const DEFAULT_SUBTITLE =
  "We work with a select group of clients. Because the families we serve have worked too hard to settle for anything less than a plan that is done right.";

const DEFAULT_FIT: RightFitColumn = {
  title: (
    <>
      We <span className="italic">are</span> a fit if you...
    </>
  ),
  items: ["Live in California", "Have a net worth of $1MM or more"],
  atLeastOneItems: [
    "Have minor children",
    "Own investment or out-of-state properties",
    "Have a blended or complex family dynamics",
    "Own a business and want it to survive you",
    "Are building generational wealth and a legacy",
  ],
};

const DEFAULT_NOT_FIT: RightFitColumn = {
  title: (
    <>
      We Are <span className="italic">not</span> a fit if you...
    </>
  ),
  items: [
    "Live outside of California",
    "Are looking for the lowest price",
    "Expect legal advice before booking",
    "Are not open to sharing details about your assets and wishes",
    "Want a generic, one-size-fits-all document",
    "Are not ready to plan alongside your spouse",
    "Are not ready to take action today",
  ],
};

type RightFitColumnCardProps = RightFitColumn & {
  variant: "fit" | "notFit";
};

export function RightFitColumnCard({
  title,
  items,
  atLeastOneItems,
  variant,
}: RightFitColumnCardProps) {
  const isFit = variant === "fit";
  const Bullet = isFit ? FitCheckBullet : NotFitDashBullet;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-sm bg-white p-10 wide:p-12",
        borderClass("soft", "all"),
        shadowClass("subtle"),
      )}
    >
      <Stack spacing={8} className="h-full">
        <Stack spacing={4}>
          <div
            className={cn(
              "h-0.5 w-10",
              isFit ? "bg-copper-500" : "bg-navy-300",
            )}
            aria-hidden="true"
          />
          <Heading
            as="h3"
            variant="heading-lg"
            className={cn("text-navy-900 font-normal")}
          >
            {title}
          </Heading>
          <DoubleRule />
        </Stack>

        <Stack spacing={5}>
          <ul className="flex flex-col gap-5">
            {items.map((item) => (
              <RightFitListItem key={item} item={item} Bullet={Bullet} />
            ))}
          </ul>

          {atLeastOneItems && atLeastOneItems.length > 0 ? (
            <>
              <AndAtLeastOneDivider />
              <ul className="flex flex-col gap-5">
                {atLeastOneItems.map((item) => (
                  <RightFitListItem key={item} item={item} Bullet={Bullet} />
                ))}
              </ul>
            </>
          ) : null}
        </Stack>

        <DoubleRule className="mt-auto" />
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
