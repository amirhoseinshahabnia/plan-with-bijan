import Link from "next/link";
import { cn } from "@/lib/util";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Plan with Bijan home"
      className={cn(
        "shrink-0 font-serif text-ds-body-sm nav:text-ds-body-lg font-medium transition-colors wide:text-ds-heading-sm",
        className,
      )}
    >
      Plan <span className="italic text-copper-500">with</span> Bijan
    </Link>
  );
}

BrandLogo.displayName = "BrandLogo";
