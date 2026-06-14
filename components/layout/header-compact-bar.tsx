"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  CTA_HREF,
  CTA_LABEL,
  HEADER_COMPACT_SCROLL_OFFSET,
  MOBILE_CTA_LABEL,
} from "@/lib/header-config";
import { sectionPaddingClasses } from "@/lib/section-padding";
import { cn } from "@/lib/util";

export function HeaderCompactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setVisible(window.scrollY >= HEADER_COMPACT_SCROLL_OFFSET);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 top-0 z-50 overflow-hidden",
        !visible && "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "px-0 pt-0 md:px-4 md:pt-4 transition-transform duration-300 ease-out wide:px-6",
          visible ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <Container className="md:rounded bg-navy-900/90 backdrop-blur-sm">
          <div
            className={cn(
              sectionPaddingClasses({ padding: "minimal" }),
              "flex min-w-0 items-center justify-between gap-2 wide:gap-4",
            )}
          >
            <BrandLogo className="shrink-0 text-ds-body-lg text-gray-100 hover:text-gray-200" />

            <Button
              href={CTA_HREF}
              size="sm"
              className="hidden wide:inline-flex"
            >
              {CTA_LABEL}
            </Button>
            <Button
              href={CTA_HREF}
              size="xs"
              aria-label={CTA_LABEL}
              className="min-w-0 shrink px-2.5 wide:hidden"
            >
              {MOBILE_CTA_LABEL}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

HeaderCompactBar.displayName = "HeaderCompactBar";
