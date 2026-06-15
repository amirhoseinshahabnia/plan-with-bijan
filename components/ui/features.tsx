import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/util";

export type FeatureItem = {
  label: string;
  marquee?: string;
};

const DEFAULT_FEATURES: FeatureItem[] = [
  { label: "Licensed in California" },
  { label: "10+ Years of Experience", marquee: "10+ Years Experience" },
  {
    label: "Legacy Program — Plans That Stay Current",
    marquee: "Legacy Program",
  },
  { label: "Trusted by Business Owners & Executives" },
];

type FeaturesProps = {
  items?: readonly FeatureItem[];
  className?: string;
};

function FeaturesMarquee({ items }: { items: readonly FeatureItem[] }) {
  const loopItems = [...items, ...items];

  return (
    <div className="relative wide:hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-gray-100 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-gray-100 to-transparent"
        aria-hidden="true"
      />
      <div className="overflow-hidden py-1">
        <div className="trust-marquee-track flex items-center gap-8 pl-4 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-6 motion-reduce:gap-y-2 motion-reduce:px-4">
          {loopItems.map((item, index) => (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && (
                <span
                  className="shrink-0 text-sand-600"
                  aria-hidden="true"
                >
                  •
                </span>
              )}
              <Text
                as="span"
                variant="caption"
                className="shrink-0 whitespace-nowrap text-navy-900"
                aria-hidden={index >= items.length || undefined}
              >
                {item.marquee ?? item.label}
              </Text>
            </Fragment>
          ))}
        </div>
      </div>
      <p className="sr-only">{items.map((item) => item.label).join(". ")}</p>
    </div>
  );
}

function FeaturesDesktop({ items }: { items: readonly FeatureItem[] }) {
  return (
    <Container className="hidden wide:block">
      <ul className="flex justify-between gap-6">
        {items.map((item) => (
          <li key={item.label} className="text-center">
            <Text as="span" variant="caption" className="text-navy-900">
              {item.label}
            </Text>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export function Features({
  items = DEFAULT_FEATURES,
  className,
}: FeaturesProps) {
  return (
    <Section
      as="section"
      padding="minimal"
      className={cn("bg-gray-100", className)}
      aria-label="Credentials and highlights"
    >
      <FeaturesMarquee items={items} />
      <FeaturesDesktop items={items} />
    </Section>
  );
}

Features.displayName = "Features";
