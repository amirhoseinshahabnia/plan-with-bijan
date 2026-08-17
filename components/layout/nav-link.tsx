"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { scrollToHash } from "@/lib/scroll";

type NavLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export function NavLink({
  href,
  className,
  children,
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const isHashLink = href.startsWith("#");

  const handleHashClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    scrollToHash(href);
    window.history.pushState(null, "", href);
  };

  if (isHashLink && pathname !== "/") {
    return (
      <Link href={`/${href}`} scroll={false} className={className} onClick={onNavigate}>
        {children}
      </Link>
    );
  }

  if (isHashLink) {
    return (
      <a href={href} className={className} onClick={handleHashClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

NavLink.displayName = "NavLink";
