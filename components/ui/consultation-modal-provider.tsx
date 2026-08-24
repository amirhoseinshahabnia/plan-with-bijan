"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { ConsultationModal } from "@/components/ui/consultation-modal";

type ConsultationModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ConsultationModalContext =
  createContext<ConsultationModalContextValue | null>(null);

const CONSULT_PARAM = "consult";

function shouldOpenFromParam(value: string | null): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

export function ConsultationModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const openedFromUrlRef = useRef(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );

  useEffect(() => {
    if (openedFromUrlRef.current) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (!shouldOpenFromParam(params.get(CONSULT_PARAM))) {
      return;
    }

    openedFromUrlRef.current = true;
    open();

    params.delete(CONSULT_PARAM);
    const nextQuery = params.toString();
    const nextUrl = `${pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [open, pathname]);

  return (
    <ConsultationModalContext.Provider value={value}>
      {children}
      <ConsultationModal open={isOpen} onClose={close} />
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const context = useContext(ConsultationModalContext);

  if (!context) {
    throw new Error(
      "useConsultationModal must be used within ConsultationModalProvider",
    );
  }

  return context;
}

ConsultationModalProvider.displayName = "ConsultationModalProvider";
