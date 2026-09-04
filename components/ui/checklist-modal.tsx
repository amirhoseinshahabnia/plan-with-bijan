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
        <br />
        Check Your Inbox
      </Text>
      <Text variant="body-sm" className="text-balance text-gray-600">
        Your Complete Estate Planning Checklist is on its way to your email
        right now. Don&apos;t see it? Check your spam or promotions folder, and
        be sure to move it to your inbox (or mark it &quot;Not Spam&quot;) so
        future updates from us land in your inbox.
      </Text>
    </Stack>
  );
}

export function ChecklistModal({ open, onClose }: ChecklistModalProps) {
  const [formKey, setFormKey] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const wasOpenRef = useRef(false);

  // Reset the form when the modal closes so the next open starts fresh
  // (new form instance + success view cleared).
  useEffect(() => {
    if (wasOpenRef.current && !open) {
      setFormKey((current) => current + 1);
      setIsSuccess(false);
    }

    wasOpenRef.current = open;
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        isSuccess ? undefined : "Get The Complete Estate Planning Checklist"
      }
    >
      {isSuccess ? (
        <ChecklistSuccess />
      ) : (
        <Stack spacing={6}>
          <Text variant="body-md" className="text-balance text-gray-600">
            Everything you need to know to protect what you&apos;ve built, in
            one place. This checklist walks you through the essentials most
            families miss, from wills and trusts to asset alignment and
            beneficiary designations, so nothing is left to chance.
          </Text>
          <LeadCaptureForm
            key={formKey}
            source="checklist"
            idPrefix="checklist"
            submitLabel="Get the checklist"
            submittingLabel="Sending…"
            layout="stack"
            success={null}
            onSuccess={() => setIsSuccess(true)}
          />
        </Stack>
      )}
    </Modal>
  );
}

ChecklistModal.displayName = "ChecklistModal";
