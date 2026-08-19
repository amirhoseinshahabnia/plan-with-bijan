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
        You&apos;re In. Check Your Inbox
      </Text>
      <Text variant="body-sm" className="text-gray-600 text-balance">
        Your Complete Estate Planning Checklist is on its way to your email
        right now. Don't see it? Check your spam or promotions folder, and be
        sure to move it to your inbox (or mark it "Not Spam") so future updates
        from us land in your inbox.
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
      title="Get The Complete Estate Planning Checklist"
    >
      <Stack spacing={6}>
        <Text variant="body-md" className="text-gray-600 text-balance">
          Everything you need to know to protect what you've built, in one
          place. This checklist walks you through the essentials most families
          miss, from wills and trusts to asset alignment and beneficiary
          designations, so nothing is left to chance.
        </Text>
        <LeadCaptureForm
          key={formKey}
          source="checklist"
          idPrefix="checklist"
          submitLabel="Get the checklist"
          submittingLabel="Sending…"
          layout="stack"
          autoFocus
          success={<ChecklistSuccess />}
        />
      </Stack>
    </Modal>
  );
}

ChecklistModal.displayName = "ChecklistModal";
