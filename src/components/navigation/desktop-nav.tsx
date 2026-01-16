"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { NavSection, TopNavItem } from "./data";

/* -------------------------------------------------------------------------- */
/*                               Desktop items                                */
/* -------------------------------------------------------------------------- */

export type DesktopSimpleLinkProps = {
  item: Extract<TopNavItem, { type?: "link" }>;
  isActive: boolean;
};

export function DesktopSimpleLink({ item, isActive }: DesktopSimpleLinkProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
    >
      {item.label}
    </Link>
  );
}

export type DesktopMegaTriggerProps = {
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
    <div
      className="relative flex h-full items-stretch"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          isOpen
            ? "bg-muted/60 text-foreground"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          isActive && "text-foreground"
        )}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
