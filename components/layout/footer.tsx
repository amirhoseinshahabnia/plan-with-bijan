import Link from "next/link";
import { cn } from "@/lib/util";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

const footerLinkClass =
  "text-ds-body-sm text-gray-500 transition-colors hover:text-sand-400";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#privacy-policy" },
  { label: "Disclaimer", href: "#disclaimer" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Section as="footer" padding="tight" className={cn("bg-navy-950")}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[auto_1fr_auto] md:gap-8">
          <Link
            href="/"
            aria-label="Plan with Bijan home"
            className="shrink-0 justify-self-center font-serif text-ds-body-md font-medium text-gray-600 transition-colors hover:text-gray-400 md:justify-self-start"
          >
            Plan <span className="italic text-copper-500">with</span> Bijan
          </Link>

          <Text
            variant="body-sm"
            className="text-center text-gray-600 md:justify-self-center md:whitespace-nowrap md:px-4"
          >
            © {year} Plan with Bijan · Estate Planning Attorney · California
          </Text>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-1 md:justify-self-end">
            {LEGAL_LINKS.map(({ label, href }, index) => (
              <span key={href} className="inline-flex items-center">
                {index > 0 && (
                  <span className="mx-1.5 text-gray-500" aria-hidden="true">
                    ·
                  </span>
                )}
                <a href={href} className={footerLinkClass}>
                  {label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

Footer.displayName = "Footer";
