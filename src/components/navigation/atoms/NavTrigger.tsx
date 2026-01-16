import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export type NavTriggerProps = {
  label: string;
  isOpen: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
};

export function NavTrigger({
  label,
  isOpen,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}: NavTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        "text-nav-text hover:bg-nav-hover-bg hover:text-nav-hover-text",
        isOpen && "bg-nav-hover-bg text-nav-hover-text",
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      <span>{label}</span>
      <ChevronDown
        className={cn(
          "size-3.5 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
