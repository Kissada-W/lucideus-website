"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { DURATIONS, EASING_CURVES, SPRING_CONFIGS } from "./animation-config"
import type { NavSection, TopNavItem } from "./data"
import { useReducedMotion } from "./use-reduced-motion"

/* -------------------------------------------------------------------------- */
/*                               Mobile items                                 */
/* -------------------------------------------------------------------------- */

export type MobileSimpleItemProps = {
  item: Extract<TopNavItem, { type?: "link" }>
  pathname: string
}

export function MobileSimpleItem({ item, pathname }: MobileSimpleItemProps) {
  const isActive = pathname === item.href
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
        isActive
          ? "bg-accent/50 text-foreground"
          : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
      )}
    >
      <span>{item.label}</span>
    </Link>
  )
}

export type MobileMegaItemProps = {
  item: Extract<TopNavItem, { sections: NavSection[] }>
  pathname: string
  openId: string | null
  setOpenId: (id: string | null) => void
}

export function MobileMegaItem({
  item,
  pathname,
  openId,
  setOpenId,
}: MobileMegaItemProps) {
  const isSectionOpen = openId === item.id
  const isActive = pathname === item.href
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/80">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-accent/70 text-foreground"
            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
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
          <ChevronDown className="h-4 w-4" />
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
            className="overflow-hidden border-t border-border/50 bg-muted/40 will-change-auto"
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
                      const Icon = link.icon
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
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-background"
                          >
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background/80">
                              <Icon
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="font-medium">{link.label}</span>
                          </Link>
                        </motion.li>
                      )
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
                    className="block rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-xs transition-colors hover:border-primary/60"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-500">
                      Featured
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
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
  )
}
