import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type NavLinkProps = {
  href: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
  isActive?: boolean;
  className?: string;
};

export function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  className,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        "text-nav-text hover:bg-nav-hover-bg hover:text-nav-hover-text",
        isActive && "bg-nav-hover-bg text-nav-hover-text", // Active state mimics hover state or define distinct active token? 
        // Spec says "Replace hardcoded utility classes... with consistent set of semantic tokens".
        // I'll stick to hover tokens for active state for now unless distinct ones are needed.
        className
      )}
    >
      {Icon && <Icon className="size-4" />}
      {label}
    </Link>
  );
}
