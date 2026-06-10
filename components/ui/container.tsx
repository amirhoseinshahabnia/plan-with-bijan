import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/util";

export const CONTAINER_WIDTH = {
  narrow: "max-w-[768px] lg:px-0",
  medium: "max-w-[1024px] xl:px-0",
  default: "max-w-[1200px]",
} as const;

export type ContainerWidth = keyof typeof CONTAINER_WIDTH;

export function containerWidthClass(width: ContainerWidth): string {
  return CONTAINER_WIDTH[width];
}

type ContainerProps = ComponentPropsWithRef<"div"> & {
  containerWidth?: ContainerWidth;
};

export function Container({
  containerWidth = "default",
  className,
  ref,
  ...props
}: ContainerProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-4 md:px-6",
        containerWidthClass(containerWidth),
        className,
      )}
      {...props}
    />
  );
}

Container.displayName = "Container";
