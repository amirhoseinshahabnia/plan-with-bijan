"use client";

import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
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

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
      // Keep focus on the dialog shell so the first field is not auto-focused.
      requestAnimationFrame(() => {
        dialog.focus();
      });
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedBackdrop) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : "Dialog"}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={cn(
        "z-60 m-auto w-[calc(100%-2rem)] max-h-[calc(100svh-2rem)] overflow-y-auto border-0 bg-transparent p-0",
        containerWidthClass("narrow"),
        "backdrop:bg-navy-950/85 md:backdrop:bg-navy-950/75 md:backdrop:backdrop-blur-sm",
        "focus:outline-none",
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
    </dialog>
  );
}

Modal.displayName = "Modal";
