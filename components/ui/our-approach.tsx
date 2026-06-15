"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { borderClass } from "@/lib/borders";
import { headingVariantClass } from "@/lib/typography";
import { cn } from "@/lib/util";

export type ApproachStepItem = {
  title: string;
  description: string;
};

const DEFAULT_TITLE = "How we work with you.";
const DEFAULT_SUBTITLE =
  "A clear, five-step process — from first conversation to ongoing stewardship.";

const TIMELINE_OFFSET = "1.25rem";
const SCROLL_TRIGGER_RATIO = 0.42;

const DEFAULT_STEPS: ApproachStepItem[] = [
  {
    title: "Discovery & Intake",
    description:
      "Your assets, obligations, family structure, and intentions are captured in full — so everything is in place before we meet.",
  },
  {
    title: "Strategy Session",
    description:
      "Your plan takes shape around revocable trusts, asset protection, charitable giving, and recommendations specific to your profile.",
  },
  {
    title: "Document Drafting",
    description:
      "Your trust documents, powers of attorney, healthcare directives, and ancillary instruments are drafted to reflect your exact wishes.",
  },
  {
    title: "Funding & Execution",
    description:
      "Your trust is only as strong as what's inside it. Every asset is properly funded and accounted for — the most overlooked step in estate planning.",
  },
  {
    title: "Ongoing Stewardship",
    description:
      "Your plan stays up to date as your life, your assets, and the laws change — through regular reviews and necessary updates.",
  },
];

type ApproachStepProps = ApproachStepItem & {
  stepNumber: string;
  isActive: boolean;
  isLast: boolean;
  onDotRef?: (element: HTMLSpanElement | null) => void;
};

export function ApproachStep({
  stepNumber,
  title,
  description,
  isActive,
  isLast,
  onDotRef,
}: ApproachStepProps) {
  return (
    <article
      className={cn(
        "relative flex items-start gap-6 py-10 wide:gap-10 wide:py-12",
        !isLast && borderClass("soft", "b"),
      )}
    >
      <div className="relative z-10 flex w-10 shrink-0 justify-center self-start pt-1.5">
        <span
          ref={onDotRef}
          className={cn(
            "size-2.5 rounded-full border-2 border-sand-100 transition-colors duration-500 motion-reduce:transition-none",
            isActive ? "bg-copper-500" : "bg-sand-300",
          )}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-3 wide:grid wide:grid-cols-[4rem_11rem_1fr] wide:items-start wide:gap-x-8 wide:gap-y-3">
          <div className="flex items-baseline gap-4 wide:contents">
            <span
              className={cn(
                headingVariantClass("heading-lg"),
                "shrink-0 font-serif leading-none transition-colors duration-500 motion-reduce:transition-none",
                isActive ? "text-copper-500" : "text-sand-500/45",
              )}
              aria-hidden="true"
            >
              {stepNumber}
            </span>

            <Heading
              as="h3"
              variant="heading-sm"
              className={cn(
                "min-w-0 transition-colors duration-500 motion-reduce:transition-none wide:col-start-2 wide:row-start-1",
                isActive ? "text-navy-900" : "text-navy-900/35",
              )}
            >
              {title}
            </Heading>
          </div>

          <Text
            variant="body-sm"
            className={cn(
              "transition-colors duration-500 motion-reduce:transition-none wide:col-span-1 wide:col-start-3 wide:row-start-1",
              isActive ? "text-gray-600" : "text-gray-600/30",
            )}
          >
            {description}
          </Text>
        </div>
      </div>
    </article>
  );
}

type OurApproachProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  steps?: readonly ApproachStepItem[];
  className?: string;
};

export function OurApproach({
  id = "our-approach",
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  steps = DEFAULT_STEPS,
  className,
}: OurApproachProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeThroughIndex, setActiveThroughIndex] = useState(-1);
  const [progressHeight, setProgressHeight] = useState(0);

  const updateScrollProgress = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const listRect = list.getBoundingClientRect();
    const listTop = listRect.top;
    const triggerY = window.innerHeight * SCROLL_TRIGGER_RATIO;
    const scrollY = triggerY - listTop;

    const dotCenters = dotRefs.current.map((dot) => {
      if (!dot) return null;
      const rect = dot.getBoundingClientRect();
      return rect.top + rect.height / 2 - listTop;
    });

    if (dotCenters.some((center) => center === null)) return;

    const centers = dotCenters as number[];
    const firstDot = centers[0];
    const lastDot = centers[centers.length - 1] ?? listRect.height;

    setProgressHeight(Math.min(lastDot, Math.max(firstDot, scrollY)));

    let passedIndex = -1;
    centers.forEach((center, index) => {
      if (scrollY >= center) passedIndex = index;
    });
    setActiveThroughIndex(passedIndex);
  }, []);

  useEffect(() => {
    let frame = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScrollProgress);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const list = listRef.current;
    if (!list) {
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
      };
    }

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(list);
    dotRefs.current.forEach((dot) => {
      if (dot) observer.observe(dot);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateScrollProgress, steps.length]);

  if (steps.length === 0) return null;

  return (
    <Section
      id={id}
      as="section"
      padding="medium"
      className={cn("bg-sand-100", className)}
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

          <div ref={listRef} className="relative">
            <div
              className="pointer-events-none absolute top-0 bottom-0 w-px -translate-x-1/2 bg-navy-900/10"
              style={{ left: TIMELINE_OFFSET }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-0 w-px -translate-x-1/2 bg-copper-500 motion-reduce:transition-none"
              style={{ left: TIMELINE_OFFSET, height: progressHeight }}
              aria-hidden="true"
            />

            {steps.map((step, index) => (
              <ApproachStep
                key={step.title}
                onDotRef={(element) => {
                  dotRefs.current[index] = element;
                }}
                stepNumber={String(index + 1).padStart(2, "0")}
                isActive={index <= Math.max(0, activeThroughIndex)}
                isLast={index === steps.length - 1}
                {...step}
              />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

OurApproach.displayName = "OurApproach";
