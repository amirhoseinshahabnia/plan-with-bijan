"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { cn } from "@/lib/util";

const LOGO_WIDTH = 201;
const LOGO_HEIGHT = 95;

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <Link
      href="/"
      aria-label="Plan with Bijan home"
      onClick={handleClick}
      className={cn(
        "block h-8 w-auto max-w-full shrink-0 transition-opacity duration-200 hover:opacity-80 wide:h-10",
        className,
      )}
    >
      <Image
        src="/logo-light.png"
        alt=""
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        className="h-full w-auto max-w-full object-contain"
      />
    </Link>
  );
}

BrandLogo.displayName = "BrandLogo";
