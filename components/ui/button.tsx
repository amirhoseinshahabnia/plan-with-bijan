import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/util";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-sans font-medium rounded-none cursor-pointer",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-linen-500",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      intent: {
        primary: "bg-linen-500 text-slate-900 hover:bg-linen-400",
        secondary:
          "border border-linen-500 text-linen-500 bg-transparent hover:bg-linen-500/10",
      },
      size: {
        xs: "h-7 px-3 text-ds-caption",
        sm: "h-9 px-4 text-ds-body-sm",
        md: "h-11 px-5 text-ds-body-md",
        lg: "h-13 px-6 text-ds-body-lg",
      },
      animation: {
        none: "transition-colors",
        moveUp:
          "transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
      animation: "none",
    },
  },
);

type LinkKind = "external" | "hash" | "internal";

function getLinkKind(href: string): LinkKind {
  if (/^https?:\/\//.test(href)) {
    return "external";
  }

  if (href.startsWith("#")) {
    return "hash";
  }

  return "internal";
}

type ButtonVisualProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonVisualProps & {
  href?: never;
  openInNewTab?: never;
} & ComponentPropsWithoutRef<"button">;

type ButtonAsLink = ButtonVisualProps & {
  href: string;
  openInNewTab?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "target" | "rel">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function Button({
  intent,
  size,
  animation,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ intent, size, animation }), className);

  if ("href" in props && props.href !== undefined) {
    const { href, openInNewTab, ...anchorProps } = props;
    const linkKind = getLinkKind(href);

    if (linkKind === "internal") {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        target={linkKind === "external" && openInNewTab ? "_blank" : undefined}
        rel={
          linkKind === "external" && openInNewTab
            ? "noopener noreferrer"
            : undefined
        }
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
