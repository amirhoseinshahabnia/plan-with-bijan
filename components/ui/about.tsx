import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { shadowClass } from "@/lib/shadows";
import { EYEBROW_TEXT_CLASS } from "@/lib/typography";
import { cn } from "@/lib/util";

export type AboutTimelineItem = {
  role: string;
  detail: string;
  isCurrent?: boolean;
};

const DEFAULT_EYEBROW = "About The Attorney";
const DEFAULT_HEADLINE = "Two careers. One throughline.";
const DEFAULT_LEDE =
  "Bijan Roboubi is a Partner at Kaiser Law Group (KLG), a highly reputable estate planning law firm based in Long Beach, California, where they have helped protect over $1B worth of assets in over 2 decades. Prior to the practice of law, Bijan managed 9-figure construction contracts as a Civil Engineer at the Port of Los Angeles. When not practicing law, Bijan can be found practicing mindfulness, playing soccer, or enjoying an active lifestyle with his wife, Bani, hiking, sailing, or walking by the beach.";

const DEFAULT_TIMELINE: AboutTimelineItem[] = [
  {
    role: "Education",
    detail:
      "B.S. and M.S. in Civil Engineering — Cal Poly Pomona and USC<br/>JD – Loyola Law School",
  },
  // {
  //   role: "10+ Years",
  //   detail: "Port of Los Angeles — managed 9-figure construction contracts",
  // },
  // {
  //   role: "While Working Full-Time",
  //   detail: "J.D., Loyola Law School Evening Program",
  // },
  // {
  //   role: "Today",
  //   detail:
  //     "Partner, Kaiser Law Group — 5 years serving estate planning families",
  //   isCurrent: true,
  // },
];

const DEFAULT_CLOSING =
  "Off the clock, Bijan is a mindfulness practitioner who leads workshops helping fellow professionals find balance and presence. He and his wife, Bani, are active members of the Long Beach community.";

const PORTRAIT_NAME = "Bijan Roboubi";
const PORTRAIT_TITLE = "Partner, Kaiser Law Group";

type AboutPortraitProps = {
  name: string;
  title: string;
};

function AboutPortrait({ name, title }: AboutPortraitProps) {
  return (
    <Stack spacing={4}>
      <div className="relative w-full">
        <div
          className="absolute bottom-full left-0 mb-4 h-0.5 w-10 bg-copper-500"
          aria-hidden="true"
        />
        <div
          className={cn(
            "relative aspect-4/5 w-full overflow-hidden rounded-sm",
            borderClass("soft", "all"),
            shadowClass("subtle"),
          )}
        >
          <Image
            src="/bijan-web.jpg"
            alt={`${name}, ${title}`}
            fill
            className="object-cover object-top"
            sizes="(min-width: 56.25rem) 40vw, 100vw"
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4",
          borderClass("soft", "t"),
          "pt-4",
        )}
      >
        <Text
          as="p"
          variant="caption"
          className="font-medium uppercase tracking-wider text-navy-900"
        >
          {name}
        </Text>
        <Text
          as="p"
          variant="caption"
          className="uppercase tracking-wider text-gray-600 sm:text-right"
        >
          {title}
        </Text>
      </div>
    </Stack>
  );
}

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
              <Text
                as="p"
                variant="body-md"
                className="text-navy-900"
                dangerouslySetInnerHTML={{ __html: item.detail }}
              />
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
      className={cn("bg-white", borderClass("soft", "t"), className)}
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 wide:grid-cols-[0.85fr_1.15fr] wide:gap-16">
          <AboutPortrait name={portraitName} title={portraitTitle} />

          <Stack spacing={8}>
            <Stack spacing={4}>
              <Text variant="caption" className={EYEBROW_TEXT_CLASS}>
                {eyebrow}
              </Text>
              {/* <Heading
                as="h2"
                variant="heading-xl"
                className="max-w-[12ch] font-serif text-ds-heading-xl font-normal italic text-navy-900 wide:text-ds-heading-2xl"
              >
                {headline}
              </Heading> */}
              <Text variant="body-md" className="max-w-prose text-gray-600">
                {lede}
              </Text>
            </Stack>

            <AboutTimeline items={timeline} />

            {/* <Text
              as="p"
              variant="body-md"
              className={cn(
                "max-w-prose font-serif italic text-sage-800",
                borderClass("soft", "t"),
                "pt-8",
              )}
            >
              &ldquo;{closing}&rdquo;
            </Text> */}
          </Stack>
        </div>
      </Container>
    </Section>
  );
}

About.displayName = "About";
