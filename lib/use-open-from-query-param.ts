"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function isTruthyParam(value: string | null): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

/**
 * Calls `open` once on landing when `?{param}=1|true|yes` is present, then
 * strips the param from the URL so refresh/share doesn't reopen it.
 */
export function useOpenFromQueryParam(param: string, open: () => void) {
  const pathname = usePathname();
  const openedFromUrlRef = useRef(false);

  useEffect(() => {
    if (openedFromUrlRef.current) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (!isTruthyParam(params.get(param))) {
      return;
    }

    openedFromUrlRef.current = true;
    open();

    params.delete(param);
    const nextQuery = params.toString();
    const nextUrl = `${pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [param, open, pathname]);
}
