import { BrandLogo } from "@/components/layout/brand-logo";
import { HeaderMobileMenu } from "@/components/layout/header-mobile-menu";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/util";

const NAV_LINKS = [
  { label: "Who We Serve", href: "#" },
  { label: "Estate Planning Done Right", href: "#" },
  { label: "Our Approach", href: "#" },
] as const;

const CTA_LABEL = "Request a Strategy Session";
const MOBILE_CTA_LABEL = "Request Session";
const CTA_HREF = "#";

const navLinkClass =
  "text-ds-body-sm text-gray-100 transition-colors hover:text-sand-400";

export function Header() {
  return (
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
  );
}

Header.displayName = "Header";
