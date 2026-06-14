import { HeaderCompactBar } from "@/components/layout/header-compact-bar";
import { HeaderMobileMenu } from "@/components/layout/header-mobile-menu";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  CTA_HREF,
  CTA_LABEL,
  MOBILE_CTA_LABEL,
  NAV_LINKS,
  navLinkClass,
} from "@/lib/header-config";
import { cn } from "@/lib/util";

export function Header() {
  return (
    <>
      <Section as="header" padding="tight" className={cn("bg-navy-900")}>
        <Container>
          <div className="flex min-w-0 items-center justify-between gap-2 wide:gap-4">
            <BrandLogo className="shrink-0 text-ds-body-lg text-gray-100 hover:text-gray-200" />

            <nav
              className="hidden items-center gap-5 wide:flex"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className={navLinkClass}>
                  {label}
                </a>
              ))}
              <Button href={CTA_HREF} size="sm">
                {CTA_LABEL}
              </Button>
            </nav>

            <HeaderMobileMenu
              links={NAV_LINKS}
              ctaLabel={CTA_LABEL}
              mobileCtaLabel={MOBILE_CTA_LABEL}
              ctaHref={CTA_HREF}
            />
          </div>
        </Container>
      </Section>

      <HeaderCompactBar />
    </>
  );
}

Header.displayName = "Header";
