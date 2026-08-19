"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useChecklistModal } from "@/components/ui/checklist-modal-provider";

type OpenChecklistButtonProps = Omit<
  Extract<ButtonProps, { href?: never }>,
  "href" | "onClick" | "type"
>;

export function OpenChecklistButton(props: OpenChecklistButtonProps) {
  const { open } = useChecklistModal();

  return <Button type="button" {...props} onClick={open} />;
}

OpenChecklistButton.displayName = "OpenChecklistButton";
