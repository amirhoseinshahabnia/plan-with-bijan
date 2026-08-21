"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useConsultationModal } from "@/components/ui/consultation-modal-provider";

type OpenConsultationButtonProps = Omit<
  Extract<ButtonProps, { href?: never }>,
  "href" | "onClick" | "type"
>;

export function OpenConsultationButton(props: OpenConsultationButtonProps) {
  const { open } = useConsultationModal();

  return <Button type="button" {...props} onClick={open} />;
}

OpenConsultationButton.displayName = "OpenConsultationButton";
