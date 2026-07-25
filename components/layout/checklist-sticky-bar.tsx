"use client";

import { useEffect, useRef, useState, type TransitionEvent } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import {
  CHECKLIST_STICKY_HREF,
  CHECKLIST_STICKY_LABEL,
  CHECKLIST_STICKY_SCROLL_OFFSET,
  CHECKLIST_STICKY_TITLE,
} from "@/lib/header-config";
import { sectionPaddingClasses } from "@/lib/section-padding";
import { cn } from "@/lib/util";

export function ChecklistStickyBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const shouldShowRef = useRef(false);
  const [isPresent, setIsPresent] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const [barHeight, setBarHeight] = useState(0);

  const showBar = () => {
    setIsPresent(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shouldShowRef.current = true;
        setShouldShow(true);
      });
    });
  };

  const hideBar = () => {
    shouldShowRef.current = false;
    barRef.current?.getBoundingClientRect();
    setShouldShow(false);
  };

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const measure = () => setBarHeight(bar.offsetHeight);
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(bar);

    return () => resizeObserver.disconnect();
  }, [isPresent]);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const scrollPastOffset = scrollY >= CHECKLIST_STICKY_SCROLL_OFFSET;

      if (scrollPastOffset) {
        if (!shouldShowRef.current) {
          showBar();
        }
      } else if (shouldShowRef.current) {
        hideBar();
      }

      const wrapper = wrapperRef.current;
      if (!wrapper || barHeight === 0) {
        return;
      }

      const scrollBottom = scrollY + window.innerHeight;
      const wrapperTop = wrapper.offsetTop;
      setIsFixed(scrollBottom < wrapperTop + barHeight);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [barHeight]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform" || shouldShowRef.current) return;

    setIsPresent(false);
  };

  const isAnimatingOut = isPresent && !shouldShow;
  const useFixedPosition = isFixed || isAnimatingOut;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ minHeight: isPresent ? barHeight : 0 }}
    >
      {isPresent ? (
        <div
          aria-hidden={!shouldShow}
          className={cn(
            "inset-x-0 z-50 overflow-hidden",
            useFixedPosition ? "fixed bottom-0" : "absolute bottom-0",
            !shouldShow && "pointer-events-none",
          )}
          style={barHeight > 0 ? { height: barHeight } : undefined}
        >
          <div
            ref={barRef}
            onTransitionEnd={handleTransitionEnd}
            className={cn(
              "bg-navy-900/90 backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none",
              shouldShow ? "translate-y-0" : "translate-y-full",
            )}
          >
            <Container>
              <div
                className={cn(
                  sectionPaddingClasses({ padding: "minimal" }),
                  "flex min-w-0 items-center justify-between gap-4",
                )}
              >
                <Text
                  as="p"
                  variant="body-sm"
                  className="hidden min-w-0 truncate text-gray-100 wide:block"
                >
                  {CHECKLIST_STICKY_TITLE}
                </Text>
                <Button
                  href={CHECKLIST_STICKY_HREF}
                  size="sm"
                  className="hidden shrink-0 wide:inline-flex"
                >
                  {CHECKLIST_STICKY_LABEL}
                </Button>
                <Button
                  href={CHECKLIST_STICKY_HREF}
                  size="xs"
                  aria-label={CHECKLIST_STICKY_LABEL}
                  className="w-full min-w-0 shrink wide:hidden"
                >
                  {CHECKLIST_STICKY_LABEL}
                </Button>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </div>
  );
}

ChecklistStickyBar.displayName = "ChecklistStickyBar";
