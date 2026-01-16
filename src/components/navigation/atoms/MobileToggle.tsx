import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import * as React from "react";

export type MobileToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export function MobileToggle({
  isOpen,
  onToggle,
  className,
}: MobileToggleProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 transition-colors lg:hidden",
        "text-nav-text hover:bg-nav-hover-bg hover:text-nav-hover-text",
         // Add border if needed per design, existing had border. 
         // "border border-border/60" -> "border border-nav-border"
         "border border-nav-border",
        className
      )}
      onClick={onToggle}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
    >
      {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}
