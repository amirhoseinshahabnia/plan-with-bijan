"use client";

import { useEffect, useRef, useState } from "react";
import { LeadCaptureForm } from "@/components/ui/lead-capture-form";
import { Modal } from "@/components/ui/modal";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";

type ChecklistModalProps = {
  open: boolean;
  onClose: () => void;
};

function ChecklistSuccess() {
  return (
    <Stack spacing={2}>
      <Text variant="body-sm" className="font-bold text-navy-900">
        You&apos;re In.
      </Text>
      <Text variant="body-sm" className="text-gray-600">
        Thank you. The complete estate planning checklist is on its way to your
        inbox.
      </Text>
    </Stack>
  );
}

export function ChecklistModal({ open, onClose }: ChecklistModalProps) {
  const [formKey, setFormKey] = useState(0);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      setFormKey((current) => current + 1);
    }

    wasOpenRef.current = open;
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Get the complete estate planning checklist"
    >
      <Stack spacing={6}>
        <Text variant="body-md" className="text-gray-600">
          For families who want to protect what they&apos;ve built.
        </Text>
        <LeadCaptureForm
          key={formKey}
          source="checklist"
          idPrefix="checklist"
          submitLabel="Get the checklist"
          submittingLabel="Sending…"
          layout="stack"
          success={<ChecklistSuccess />}
        />
      </Stack>
    </Modal>
  );
}

ChecklistModal.displayName = "ChecklistModal";
