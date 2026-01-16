"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { DURATIONS, EASING_CURVES, SPRING_CONFIGS } from "../animation-config";
import type { NavSection, TopNavItem } from "../data";
import { useReducedMotion } from "../use-reduced-motion";

/* -------------------------------------------------------------------------- */
/*                                Mobile Nav                                  */
/* -------------------------------------------------------------------------- */

type MobileNavProps = {
  items: TopNavItem[];
  isOpen: boolean;
  onClose: () => void;
  topOffset: number;
  pathname: string;
};

export function MobileNav({
  items,
  isOpen,
  onClose,
  topOffset,
  pathname,
}: MobileNavProps) {
  const prefersReducedMotion = useReducedMotion();
  const [openId, setOpenId] = React.useState<string | null>(null);

  // Reset open section on close or pathname change
  React.useEffect(() => {
    if (!isOpen) setOpenId(null);
  }, [isOpen]);

  React.useEffect(() => {
    setOpenId(null);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.95, y: -12 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            prefersReducedMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.98, y: -8 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.01 }
              : {
                  opacity: {
                    duration: DURATIONS.normal,
                    ease: EASING_CURVES.easeOut,
                  },
                  scale: SPRING_CONFIGS.gentle,
                  y: SPRING_CONFIGS.gentle,
                }
          }
          className="fixed inset-x-0 z-50 border-t border-nav-border bg-nav-bg/95 shadow-lg shadow-black/10 backdrop-blur-xl will-change-transform lg:hidden"
          style={{ top: topOffset, height: `calc(100vh - ${topOffset}px)` }}
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
            <div className="flex-1 overflow-y-auto px-4 pb-4 pt-3 sm:px-6">
              <div className="space-y-1">
                {items.map((item) =>
                  "sections" in item ? (
                    <MobileMegaItem
                      key={item.id}
                      item={item}
                      pathname={pathname}
                      openId={openId}
                      setOpenId={setOpenId}
                    />
                  ) : (
                    <MobileSimpleItem
                      key={item.id}
                      item={item}
                      pathname={pathname}
                      onClose={onClose}
                    />
                  )
                )}
              </div>
            </div>

            {/* Sticky footer actions */}
            <div className="shrink-0 border-t border-nav-border bg-nav-bg px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex-1 rounded-md border border-nav-border bg-nav-bg px-3 py-3 text-center text-sm font-medium text-nav-text shadow-sm shadow-black/5 transition-colors hover:bg-nav-hover-bg hover:text-nav-hover-text"
                >
                  Login
                </Link>
                <Link
                  href="/get-started"
                  onClick={onClose}
                  className="flex-1 rounded-md border border-primary bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/90"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Sub-components                                 */
/* -------------------------------------------------------------------------- */

type MobileSimpleItemProps = {
  item: Extract<TopNavItem, { type?: "link" }>;
  pathname: string;
  onClose: () => void;
};

function MobileSimpleItem({ item, pathname, onClose }: MobileSimpleItemProps) {
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "flex min-h-[44px] items-center justify-between rounded-xl px-3 py-3 text-sm font-medium",
        isActive
          ? "bg-nav-hover-bg text-nav-hover-text"
          : "text-muted-foreground hover:bg-nav-hover-bg/50 hover:text-nav-text"
      )}
    >
      <span>{item.label}</span>
    </Link>
  );
}

type MobileMegaItemProps = {
  item: Extract<TopNavItem, { sections: NavSection[] }>;
  pathname: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

function MobileMegaItem({
  item,
  pathname,
  openId,
  setOpenId,
}: MobileMegaItemProps) {
  const isSectionOpen = openId === item.id;
  const isActive = pathname === item.href;
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl border border-nav-border/50 bg-card/50">
      <button
        type="button"
        className={cn(
          "flex min-h-[44px] w-full items-center justify-between px-3 py-3 text-sm font-medium transition-colors",
          isActive
            ? "bg-nav-hover-bg text-nav-hover-text"
            : "text-muted-foreground hover:bg-nav-hover-bg/50 hover:text-nav-text"
        )}
        onClick={() => setOpenId(isSectionOpen ? null : item.id)}
        aria-expanded={isSectionOpen}
      >
        <span>{item.label}</span>
        <motion.div
          animate={{ rotate: isSectionOpen ? 180 : 0 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : SPRING_CONFIGS.responsive
          }
        >
          <ChevronDown className="size-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isSectionOpen && (
          <motion.div
            initial={
              prefersReducedMotion ? { height: 0 } : { height: 0, opacity: 0 }
            }
            animate={
              prefersReducedMotion
                ? { height: "auto" }
                : { height: "auto", opacity: 1 }
            }
            exit={
              prefersReducedMotion ? { height: 0 } : { height: 0, opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : {
                    height: { ...SPRING_CONFIGS.gentle, bounce: 0 },
                    opacity: {
                      duration: DURATIONS.fast,
                      ease: EASING_CURVES.easeOut,
                    },
                  }
            }
            className="overflow-hidden border-t border-nav-border/50 bg-muted/40 will-change-auto"
          >
            <div className="space-y-4 px-3 py-3">
              {item.sections.map((section, sectionIndex) => (
                <div key={section.title}>
                  <motion.p
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: DURATIONS.fast,
                            delay: sectionIndex * 0.03,
                            ease: EASING_CURVES.easeOut,
                          }
                    }
                    className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    {section.title}
                  </motion.p>
                  <ul className="mt-2 space-y-0.5">
                    {section.items.map((link, itemIndex) => {
                      const Icon = link.icon;
                      return (
                        <motion.li
                          key={link.href}
                          initial={
                            prefersReducedMotion ? {} : { opacity: 0, x: -8 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : {
                                  duration: DURATIONS.fast,
                                  delay: sectionIndex * 0.03 + itemIndex * 0.02,
                                  ease: EASING_CURVES.easeOut,
                                }
                          }
                        >
                          <Link
                            href={link.href}
                            className="flex min-h-[44px] items-center gap-3 rounded-lg px-2 py-2 text-sm text-nav-text transition-colors hover:bg-nav-bg"
                          >
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-nav-border/60 bg-card">
                              <Icon
                                className="size-4"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="font-medium">{link.label}</span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              {item.promo && (
                <motion.div
                  initial={
                    prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          opacity: {
                            duration: DURATIONS.normal,
                            ease: EASING_CURVES.easeOut,
                          },
                          scale: SPRING_CONFIGS.gentle,
                        }
                  }
                >
                  <Link
                    href={item.promo.href}
                    className="block rounded-xl border border-nav-border/60 bg-card/80 px-3 py-3 text-xs transition-colors hover:border-primary/60"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-500">
                      Featured
                    </p>
                    <p className="mt-1 text-sm font-semibold text-nav-text">
                      {item.promo.title}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {item.promo.description}
                    </p>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
