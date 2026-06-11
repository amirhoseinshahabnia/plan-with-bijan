import Image from "next/image";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";

const footerLinkClass =
  "text-ds-body-sm text-slate-300 transition-colors hover:text-linen-400";

const footerTitleClass =
  "font-semibold uppercase tracking-wider text-linen-500";

const logoLinkClass =
  "inline-block transition duration-200 hover:brightness-110 motion-reduce:transition-none";

const NAV_LINKS = [
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "Estate Planning Done Right", href: "#estate-planning-done-right" },
  { label: "Our Approach", href: "#our-approach" },
] as const;

export function Footer() {
  return (
    <Section
      as="footer"
      padding="medium"
      className={cn("bg-slate-800", borderClass("subtle", "t"))}
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <Stack spacing={10}>
            <a href="/" aria-label="Bijan home" className={logoLinkClass}>
              <Image
                src="/logo.png"
                alt="Plan with Bijan"
                width={500}
                height={234}
                className="h-24 w-auto"
              />
            </a>
            <Stack spacing={4}>
              <Text variant="body-sm" className="text-slate-300">
                Estate planning for exceptional people.
              </Text>
              <a href="mailto:hello@bijan.law" className={footerLinkClass}>
                hello@bijan.law
              </a>
            </Stack>
          </Stack>

          <Stack spacing={5}>
            <Text variant="body-sm" className={footerTitleClass}>
              Navigation
            </Text>
            <Stack spacing={2}>
              {NAV_LINKS.map(({ label, href }) => (
                <a key={href} href={href} className={footerLinkClass}>
                  {label}
                </a>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={5}>
            <Text variant="body-sm" className={footerTitleClass}>
              Kaiser Law Group
            </Text>
            <Stack spacing={2}>
              <Text variant="body-sm" className="text-slate-300">
                Attorney advertising.
              </Text>
              <Text variant="body-sm" className="text-slate-300">
                Prior results do not guarantee similar outcomes.
              </Text>
            </Stack>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}

Footer.displayName = "Footer";
