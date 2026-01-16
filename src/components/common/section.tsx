import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "angled-bottom" | "angled-top" | "angled-both";
  spacing?: "none" | "sm" | "default" | "lg";
  container?: boolean;
}

export function Section({
  children,
  className,
  variant = "default",
  spacing = "default",
  container = true,
  ...props
}: SectionProps) {
  const spacingStyles = {
    none: "",
    sm: "py-[var(--spacing-section-sm)]",
    default: "py-[var(--spacing-section-sm)] lg:py-[var(--spacing-section-lg)]",
    lg: "py-24 lg:py-40",
  };

  const isAngledTop = variant === "angled-top" || variant === "angled-both";
  const isAngledBottom =
    variant === "angled-bottom" || variant === "angled-both";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        spacingStyles[spacing],
        // Add extra padding to account for skews so content doesn't get cut
        isAngledTop &&
          "pt-[calc(var(--spacing-section-sm)*1.5)] lg:pt-[calc(var(--spacing-section-lg)*1.5)]",
        isAngledBottom &&
          "pb-[calc(var(--spacing-section-sm)*1.5)] lg:pb-[calc(var(--spacing-section-lg)*1.5)]",
        className
      )}
      {...props}
    >
      {/* Background/Skew Layer */}
      {(isAngledTop || isAngledBottom) && (
        <div
          className={cn(
            "absolute inset-0 z-0 bg-inherit",
            isAngledTop && "origin-top-left -skew-y-[3deg]", // Hardcoded 3deg matches --angle-skew, but we use tailwind arbitrary value for precision or could use style
            isAngledBottom && "origin-bottom-right skew-y-[3deg]"
          )}
          style={{
            transform: isAngledTop
              ? "skewY(var(--angle-skew))"
              : isAngledBottom
              ? "skewY(var(--angle-skew))"
              : undefined,
          }}
        />
      )}

      {/* Content Layer */}
      <div
        className={cn(
          "relative z-10 mx-auto",
          container && "container px-4 md:px-6"
        )}
      >
        {children}
      </div>
    </section>
  );
}
