import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/util";

type ContainerProps = ComponentPropsWithRef<"div">;

export function Container({ className, ref, ...props }: ContainerProps) {
  return (
    <div
      ref={ref}
      className={cn("max-w-[1200px] w-full mx-auto px-6", className)}
      {...props}
    />
  );
}

Container.displayName = "Container";
