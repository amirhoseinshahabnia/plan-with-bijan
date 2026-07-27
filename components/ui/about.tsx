import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { EYEBROW_TEXT_CLASS } from "@/lib/typography";
import { cn } from "@/lib/util";

export type AboutTimelineItem = {
  role: string;
  detail: string;
  isCurrent?: boolean;
};

const DEFAULT_EYEBROW = "The Attorney";
const DEFAULT_HEADLINE = "Two careers. One throughline.";
const DEFAULT_LEDE =
  "Bijan Roboubi is a Partner at Kaiser Law Group in Long Beach, California. For over a decade, he managed nine-figure construction contracts at the Port of Los Angeles, experience that still shapes how he builds every estate plan: with precision, foresight, and no loose ends.";

const DEFAULT_TIMELINE: AboutTimelineItem[] = [
  {
    role: "Education",
    detail: "B.S. and M.S. in Civil Engineering — Cal Poly Pomona and USC",
  },
  {
    role: "10+ Years",
    detail: "Port of Los Angeles — managed 9-figure construction contracts",
  },
  {
    role: "While Working Full-Time",
    detail: "J.D., Loyola Law School Evening Program",
  },
  {
    role: "Today",
    detail:
      "Partner, Kaiser Law Group — 5 years serving estate planning families",
    isCurrent: true,
  },
];

const DEFAULT_CLOSING =
  "Off the clock, Bijan is a mindfulness practitioner who leads workshops helping fellow professionals find balance and presence. He and his wife, Bani, are active members of the Long Beach community.";

const PORTRAIT_NAME = "Bijan Roboubi";
const PORTRAIT_TITLE = "Partner, Kaiser Law Group";

type AboutTimelineProps = {
  items: readonly AboutTimelineItem[];
};

function AboutTimeline({ items }: AboutTimelineProps) {
  return (
    <div className="relative pl-8">
      <div
        className="absolute top-1.5 bottom-1.5 left-[5px] w-px bg-navy-900/10"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-0">
        {items.map((item) => (
          <div key={item.role} className="relative pb-8 last:pb-0">
            <span
              className={cn(
                "absolute top-1 -left-8 size-2.5 rounded-full border-2 border-copper-500",
                item.isCurrent ? "bg-copper-500" : "bg-white",
              )}
              aria-hidden="true"
            />
            <Stack spacing={1}>
              <Text
                as="p"
                variant="caption"
                className="uppercase tracking-wider text-sage-700"
              >
                {item.role}
              </Text>
              <Text as="p" variant="body-md" className="text-navy-900">
                {item.detail}
              </Text>
            </Stack>
          </div>
        ))}
      </div>
    </div>
  );
}

type AboutProps = {
  id?: string;
  eyebrow?: string;
  headline?: string;
  lede?: string;
  timeline?: readonly AboutTimelineItem[];
  closing?: string;
  portraitName?: string;
  portraitTitle?: string;
  className?: string;
};

export function About({
  id = "about",
  eyebrow = DEFAULT_EYEBROW,
  headline = DEFAULT_HEADLINE,
  lede = DEFAULT_LEDE,
  timeline = DEFAULT_TIMELINE,
  closing = DEFAULT_CLOSING,
  portraitName = PORTRAIT_NAME,
  portraitTitle = PORTRAIT_TITLE,
  className,
}: AboutProps) {
  return (
    <Section
      id={id}
      as="section"
      padding="medium"
      className={cn("bg-white", borderClass("soft", "y"), className)}
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 wide:grid-cols-[0.85fr_1.15fr] wide:gap-16">
          <div className="relative">
            <div
              className="absolute -top-4 -left-4 right-4 bottom-4 border border-copper-500"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/bijan-web.jpg"
                alt={`${portraitName}, ${portraitTitle}`}
                fill
                className="object-cover object-top contrast-[1.02] grayscale-[15%]"
                sizes="(min-width: 56.25rem) 40vw, 100vw"
              />
            </div>
            <div
              className={cn(
                "mt-5 flex flex-col gap-1 pt-3.5 sm:flex-row sm:justify-between sm:gap-4",
                borderClass("soft", "t"),
              )}
            >
              <Text
                as="p"
                variant="caption"
                className="uppercase tracking-wider text-gray-600"
              >
                {portraitName}
              </Text>
              <Text
                as="p"
                variant="caption"
                className="uppercase tracking-wider text-gray-600 sm:text-right"
              >
                {portraitTitle}
              </Text>
            </div>
          </div>

          <Stack spacing={8}>
            <Stack spacing={4}>
              <Text variant="caption" className={EYEBROW_TEXT_CLASS}>
                {eyebrow}
              </Text>
              <Heading
                as="h2"
                variant="heading-xl"
                className="max-w-[12ch] font-serif text-ds-heading-xl font-normal italic text-navy-900 wide:text-ds-heading-2xl"
              >
                {headline}
              </Heading>
              <Text variant="body-md" className="max-w-prose text-gray-600">
                {lede}
              </Text>
            </Stack>

            <AboutTimeline items={timeline} />

            <Text
              as="p"
              variant="body-md"
              className={cn(
                "max-w-prose font-serif italic text-sage-800",
                borderClass("soft", "t"),
                "pt-8",
              )}
            >
              &ldquo;{closing}&rdquo;
            </Text>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}

About.displayName = "About";
