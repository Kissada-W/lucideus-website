"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { NavSection, TopNavItem } from "./data";

/* -------------------------------------------------------------------------- */
/*                           Desktop Nav Components                           */
/* -------------------------------------------------------------------------- */

type DesktopMegaTriggerProps = {
  item: Extract<TopNavItem, { sections: NavSection[] }>;
  isActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function DesktopMegaTrigger({
  item,
  isActive,
  isOpen,
  onOpen,
  onClose,
}: DesktopMegaTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "group inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors",
        "hover:bg-accent/50 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isActive && "text-foreground",
        isOpen && "bg-accent/60 text-foreground"
      )}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onClick={() => (isOpen ? onClose() : onOpen())}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {item.label}
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

type DesktopSimpleLinkProps = {
  item: Extract<TopNavItem, { type?: "link" }>;
  isActive: boolean;
};

export function DesktopSimpleLink({ item, isActive }: DesktopSimpleLinkProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors",
        "hover:bg-accent/50 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isActive && "bg-accent/40 text-foreground"
      )}
    >
      {item.label}
    </Link>
  );
}
