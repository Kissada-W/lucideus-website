import { cn } from "@/lib/utils";
import * as React from "react";

type NavContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const NavContainer = React.forwardRef<HTMLDivElement, NavContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      />
    );
  }
);
NavContainer.displayName = "NavContainer";
