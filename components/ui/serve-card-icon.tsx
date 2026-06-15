import { Briefcase, Stethoscope, TrendingUp, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/util";

export type ServeCardIconVariant = "tech" | "medical" | "founder";

const SERVE_CARD_ICONS = {
  tech: TrendingUp,
  medical: Stethoscope,
  founder: Briefcase,
} as const satisfies Record<ServeCardIconVariant, LucideIcon>;

type ServeCardIconProps = {
  variant: ServeCardIconVariant;
  className?: string;
};

export function ServeCardIcon({ variant, className }: ServeCardIconProps) {
  const Icon = SERVE_CARD_ICONS[variant];

  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-sand-100 text-copper-400",
        className,
      )}
    >
      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}
