"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { useOpenFromQueryParam } from "@/lib/use-open-from-query-param";

type ConsultationModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ConsultationModalContext =
  createContext<ConsultationModalContextValue | null>(null);

const CONSULT_PARAM = "consult";

export function ConsultationModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );

  useOpenFromQueryParam(CONSULT_PARAM, open);

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
