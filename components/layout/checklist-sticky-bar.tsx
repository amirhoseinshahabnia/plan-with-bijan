"use client";

import { useEffect, useRef, useState, type TransitionEvent } from "react";
import { Container } from "@/components/ui/container";
import { OpenChecklistButton } from "@/components/ui/open-checklist-button";
import { Text } from "@/components/ui/text";
import {
  CHECKLIST_STICKY_LABEL,
  CHECKLIST_STICKY_SCROLL_OFFSET,
  CHECKLIST_STICKY_TITLE,
} from "@/lib/header-config";
import { sectionPaddingClasses } from "@/lib/section-padding";
import { cn } from "@/lib/util";

export function ChecklistStickyBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  // Invisible element whose height equals the iPhone's bottom safe area
  // (home-bar zone). It is 0 when the browser toolbar covers the bottom.
  const insetProbeRef = useRef<HTMLDivElement>(null);
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

    // barRef wraps only the bar's content, so barHeight never includes
    // the safe-area space. The page slot (wrapper min-height) stays the same.
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

      // Include the safe area so the fixed bar (content + safe area) hands
      // over to its in-page slot at the exact same spot, with no jump.
      const safeAreaBottom = insetProbeRef.current?.offsetHeight ?? 0;
      const scrollBottom = scrollY + window.innerHeight;
      const wrapperTop = wrapper.offsetTop;
      setIsFixed(scrollBottom < wrapperTop + barHeight + safeAreaBottom);
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

  // While fixed to the screen, the bar grows by the safe area so the navy
  // runs to the bottom edge and the button clears the iPhone home bar.
  // Once docked in the page, it is just the bar's own height.
  const outerHeight =
    barHeight > 0
      ? useFixedPosition
        ? `calc(${barHeight}px + env(safe-area-inset-bottom))`
        : barHeight
      : undefined;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ minHeight: isPresent ? barHeight : 0 }}
    >
      <div
        ref={insetProbeRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed bottom-0 left-0 h-[env(safe-area-inset-bottom)] w-0"
      />
      {isPresent ? (
        <div
          aria-hidden={!shouldShow}
          className={cn(
            "inset-x-0 z-50 overflow-hidden",
            useFixedPosition ? "fixed bottom-0" : "absolute bottom-0",
            !shouldShow && "pointer-events-none",
          )}
          style={
            outerHeight !== undefined ? { height: outerHeight } : undefined
          }
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className={cn(
              "bg-navy-900 transition-transform duration-300 ease-out motion-reduce:transition-none",
              shouldShow ? "translate-y-0" : "translate-y-full",
            )}
          >
            <div ref={barRef}>
              <Container>
                <div
                  className={cn(
                    sectionPaddingClasses({ padding: "minimal" }),
                    "flex min-w-0 items-center justify-center gap-4",
                  )}
                >
                  <OpenChecklistButton
                    size="sm"
                    className="hidden shrink-0 wide:inline-flex"
                  >
                    {CHECKLIST_STICKY_LABEL}
                  </OpenChecklistButton>
                  <OpenChecklistButton
                    size="xs"
                    aria-label={CHECKLIST_STICKY_LABEL}
                    className="w-full min-w-0 shrink wide:hidden"
                  >
                    {CHECKLIST_STICKY_LABEL}
                  </OpenChecklistButton>
                </div>
              </Container>
            </div>
            {useFixedPosition ? (
              <div
                aria-hidden="true"
                className="h-[env(safe-area-inset-bottom)]"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

ChecklistStickyBar.displayName = "ChecklistStickyBar";
