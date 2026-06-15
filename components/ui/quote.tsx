"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  quotes: QuoteItem[];
  autoPlayInterval?: number;
  className?: string;
};

const DEFAULT_AUTO_PLAY_INTERVAL = 6000;

const arrowButtonClass =
  "inline-flex h-9 w-9 items-center justify-center text-navy-900/70 transition-colors hover:text-copper-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-500";

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function Quote({
  id,
  quotes,
  autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL,
  className,
}: QuoteProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const count = quotes.length;
  const hasMultiple = count > 1;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (count === 0) return;
      setIndex((nextIndex + count) % count);
    },
    [count],
  );

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateSlideWidth = () => {
      setSlideWidth(viewport.getBoundingClientRect().width);
    };

    updateSlideWidth();

    const observer = new ResizeObserver(updateSlideWidth);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasMultiple) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [autoPlayInterval, count, hasMultiple]);

  if (count === 0) return null;

  return (
    <Section
      id={id}
      as="section"
      padding="medium"
      className={cn("bg-sand-100", borderClass("strong", "b"), className)}
    >
      <Container containerWidth="narrow">
        <div
          className={cn("relative", hasMultiple && "wide:px-10")}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous quote"
                className={cn(
                  arrowButtonClass,
                  "absolute top-1/2 -left-6 z-10 hidden -translate-y-1/2 wide:inline-flex",
                )}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next quote"
                className={cn(
                  arrowButtonClass,
                  "absolute top-1/2 -right-6 z-10 hidden -translate-y-1/2 wide:inline-flex",
                )}
              >
                <ChevronRightIcon />
              </button>
            </>
          )}

          <div ref={viewportRef} className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{
                transform:
                  slideWidth > 0
                    ? `translate3d(-${index * slideWidth}px, 0, 0)`
                    : undefined,
              }}
            >
              {quotes.map(({ quote, person }, slideIndex) => (
                <div
                  key={`${person}-${slideIndex}`}
                  className="shrink-0 overflow-hidden"
                  style={{ width: slideWidth > 0 ? slideWidth : "100%" }}
                  aria-hidden={slideIndex !== index}
                >
                  <Stack
                    spacing={10}
                    className="items-start md:items-center md:text-center"
                  >
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
                </div>
              ))}
            </div>
          </div>

          {hasMultiple && (
            <div className="mt-12 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous quote"
                className={cn(arrowButtonClass, "wide:hidden")}
              >
                <ChevronLeftIcon />
              </button>
              <div
                className="flex items-center justify-center gap-2"
                role="tablist"
                aria-label="Quote slides"
              >
                {quotes.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    type="button"
                    role="tab"
                    aria-label={`Go to quote ${dotIndex + 1}`}
                    aria-selected={dotIndex === index}
                    onClick={() => goTo(dotIndex)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-500",
                      dotIndex === index ? "bg-copper-500" : "bg-sand-500",
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next quote"
                className={cn(arrowButtonClass, "wide:hidden")}
              >
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

Quote.displayName = "Quote";
