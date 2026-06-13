"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/util";

type NavLink = {
  label: string;
  href: string;
};

type HeaderMobileMenuProps = {
  links: readonly NavLink[];
  ctaLabel: string;
  mobileCtaLabel?: string;
  ctaHref: string;
};

const mobileNavLinkClass =
  "text-ds-body-md text-gray-100 transition-colors hover:text-sand-400";

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function HeaderMobileMenu({
  links,
  ctaLabel,
  mobileCtaLabel,
  ctaHref,
}: HeaderMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <div className="flex min-w-0 shrink items-center gap-2 wide:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-gray-100 transition-colors hover:text-sand-400"
        >
          <HamburgerIcon />
        </button>
        <Button
          href={ctaHref}
          size="xs"
          aria-label={ctaLabel}
          className="min-w-0 shrink px-2.5"
        >
          {mobileCtaLabel ?? ctaLabel}
        </Button>
      </div>

      {mounted &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 z-50 wide:hidden",
              !open && "pointer-events-none",
            )}
          >
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
              onClick={close}
              className={cn(
                "absolute inset-0 bg-navy-950/50 transition-opacity duration-300",
                open ? "opacity-100" : "opacity-0",
              )}
            />
            <nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              aria-hidden={!open}
              className={cn(
                "absolute right-0 top-0 flex h-dvh w-[90dvw] flex-col bg-navy-900 p-6 shadow-xl transition-transform duration-300 ease-out",
                open ? "translate-x-0" : "translate-x-full",
              )}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center text-gray-100 transition-colors hover:text-sand-400"
                >
                  <CloseIcon />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-6">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className={mobileNavLinkClass}
                      onClick={close}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}

HeaderMobileMenu.displayName = "HeaderMobileMenu";
