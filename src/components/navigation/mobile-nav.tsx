"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { DURATIONS, EASING_CURVES, SPRING_CONFIGS } from "./animation-config";
import type { NavSection, TopNavItem } from "./data";

/* -------------------------------------------------------------------------- */
/*                           Mobile Nav Components                            */
/* -------------------------------------------------------------------------- */

type MobileMegaItemProps = {
  item: Extract<TopNavItem, { sections: NavSection[] }>;
  pathname: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

export function MobileMegaItem({
  item,
  pathname,
  openId,
  setOpenId,
}: MobileMegaItemProps) {
  const isOpen = openId === item.id;
  const isActive =
    pathname === item.href || pathname?.startsWith(item.href + "/");

  return (
    <div className="border-b border-border/40">
      <button
        type="button"
        onClick={() => setOpenId(isOpen ? null : item.id)}
        className={cn(
          "flex w-full items-center justify-between py-3 text-left text-sm font-medium text-foreground transition",
          "hover:text-foreground/80",
          isActive && "text-primary"
        )}
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: SPRING_CONFIGS.responsive,
              opacity: {
                duration: DURATIONS.fast,
                ease: EASING_CURVES.easeOut,
              },
            }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pb-4">
              {item.sections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </p>
                  <ul className="space-y-1">
                    {section.items.map((link) => {
                      const Icon = link.icon;
                      const linkActive = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition",
                              "hover:bg-accent/40",
                              linkActive && "bg-accent/60 text-foreground"
                            )}
                          >
                            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/80 text-foreground">
                              <Icon className="h-3.5 w-3.5" aria-hidden />
                            </span>
                            <span className="flex min-w-0 flex-col">
                              <span className="font-medium">{link.label}</span>
                              <span className="line-clamp-1 text-xs text-muted-foreground">
                                {link.description}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type MobileSimpleItemProps = {
  item: Extract<TopNavItem, { type?: "link" }>;
  pathname: string;
};

export function MobileSimpleItem({ item, pathname }: MobileSimpleItemProps) {
  const isActive = pathname === item.href;

  return (
    <div className="border-b border-border/40">
      <Link
        href={item.href}
        className={cn(
          "flex w-full items-center py-3 text-sm font-medium text-foreground transition",
          "hover:text-foreground/80",
          isActive && "text-primary"
        )}
      >
        {item.label}
      </Link>
    </div>
  );
}

type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background/80 p-2 text-foreground shadow-sm shadow-black/10 transition hover:bg-accent/40 lg:hidden"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}
