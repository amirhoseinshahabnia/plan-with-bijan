"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToHash } from "@/lib/scroll";

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) {
      return;
    }

    requestAnimationFrame(() => {
      scrollToHash(window.location.hash);
    });
  }, [pathname]);

  return null;
}

HashScrollHandler.displayName = "HashScrollHandler";
