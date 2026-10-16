"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { containerWidthClass } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Stack } from "@/components/ui/stack";
import { borderClass } from "@/lib/borders";
import { shadowClass } from "@/lib/shadows";
import { cn } from "@/lib/util";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Div-based modal (no native <dialog>).
 * Native <dialog>/::backdrop has rendering bugs on iOS 26 in Chrome, where the
 * dialog is only partly drawn until the browser toolbar changes size.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pointerDownOnBackdrop = useRef(false);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  // Keep the latest onClose without re-running the open/close effect.
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Portals need document.body, which only exists on the client.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;

    // Stop the page behind from scrolling.
    html.style.overflow = "hidden";

    // Focus the panel shell so the first field is not auto-focused
    // (avoids the keyboard popping up on phones).
    const frame = requestAnimationFrame(() => {
      panelRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      // Keep Tab focus inside the modal.
      const panel = panelRef.current;
      if (event.key !== "Tab" || !panel) {
        return;
      }
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  // Close only when the tap both starts and ends on the backdrop,
  // so dragging from inside the panel to outside doesn't close it.
  const handleBackdropPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerDownOnBackdrop.current = event.target === event.currentTarget;
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (pointerDownOnBackdrop.current && event.target === event.currentTarget) {
      onClose();
    }
    pointerDownOnBackdrop.current = false;
  };

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      onPointerDown={handleBackdropPointerDown}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-60 flex items-center justify-center bg-navy-950/85 p-4 md:bg-navy-950/75 md:backdrop-blur-sm"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Dialog"}
        tabIndex={-1}
        className={cn(
          "w-full max-h-[calc(100svh-2rem)] overflow-y-auto focus:outline-none",
          containerWidthClass("narrow"),
        )}
      >
        <div
          className={cn(
            "relative rounded bg-gray-50 p-6 md:p-8",
            borderClass("soft"),
            shadowClass("subtle"),
            className,
          )}
        >
          <Stack spacing={6}>
            {title ? (
              <Heading
                id={titleId}
                as="h2"
                variant="heading-lg"
                className="pr-10 text-navy-900"
              >
                {title}
              </Heading>
            ) : null}
            {children}
          </Stack>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center text-navy-900 transition-colors hover:text-copper-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-500"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.displayName = "Modal";
