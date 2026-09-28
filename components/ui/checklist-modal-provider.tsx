"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ChecklistModal } from "@/components/ui/checklist-modal";
import { useOpenFromQueryParam } from "@/lib/use-open-from-query-param";

type ChecklistModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ChecklistModalContext = createContext<ChecklistModalContextValue | null>(
  null,
);

const CHECKLIST_PARAM = "checklist";

export function ChecklistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );

  useOpenFromQueryParam(CHECKLIST_PARAM, open);

  return (
    <ChecklistModalContext.Provider value={value}>
      {children}
      <ChecklistModal open={isOpen} onClose={close} />
    </ChecklistModalContext.Provider>
  );
}

export function useChecklistModal() {
  const context = useContext(ChecklistModalContext);

  if (!context) {
    throw new Error(
      "useChecklistModal must be used within ChecklistModalProvider",
    );
  }

  return context;
}

ChecklistModalProvider.displayName = "ChecklistModalProvider";
