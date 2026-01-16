"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { DURATIONS, EASING_CURVES, SPRING_CONFIGS } from "./animation-config";
import type { NavLink, NavSection, TopNavItem } from "./data";

/* -------------------------------------------------------------------------- */
/*                          Desktop Mega/Rich Panels                          */
/* -------------------------------------------------------------------------- */

export type MegaPanelProps = {
  item: Extract<TopNavItem, { sections: NavSection[] }>;
  prefersReducedMotion: boolean;
};

/**
 * Desktop panel:
 * - layout === "product"  → mega-menu with promo card
 * - layout === "solutions" → rich-menu with balanced columns
 */
export function MegaPanel({ item, prefersReducedMotion }: MegaPanelProps) {
  const layout = item.layout ?? (item.promo ? "product" : "solutions");

  if (layout === "solutions") {
    return (
      <SolutionsMegaPanel
        item={item}
        prefersReducedMotion={prefersReducedMotion}
      />
    );
  }

  return (
    <ProductMegaPanel item={item} prefersReducedMotion={prefersReducedMotion} />
  );
}

/* ------------------------- Product mega panel ------------------------- */

function ProductMegaPanel({ item, prefersReducedMotion }: MegaPanelProps) {
  const hasPromo = Boolean(item.promo);
  const base =
    "rounded-3xl border border-border/70 bg-gradient-to-br from-background/98 via-background/98 to-background/92 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl";

  const [firstSection, ...restSections] = item.sections;

  return (
    <div className={cn(base)}>
      <div
        className={cn(
          "grid gap-6",
          hasPromo
            ? "md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]"
            : "md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        )}
      >
        {/* Left column: First section */}
        {firstSection && (
          <div className="space-y-3 border-r border-border/40 pr-6">
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: DURATIONS.fast, ease: EASING_CURVES.easeOut }
              }
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
            >
              {firstSection.title}
            </motion.p>
            <ul className="space-y-1">
              {firstSection.items.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: DURATIONS.fast,
                          delay: index * 0.03,
                          ease: EASING_CURVES.easeOut,
                        }
                  }
                >
                  <MegaLink link={link} />
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Middle column: More Features */}
        {restSections.length > 0 && (
          <div className="space-y-3 border-r border-border/40 pr-6">
            {restSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <motion.p
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: DURATIONS.fast,
                          delay: sectionIndex * 0.05,
                          ease: EASING_CURVES.easeOut,
                        }
                  }
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
                >
                  {section.title}
                </motion.p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {section.items.map((link, itemIndex) => (
                    <motion.li
                      key={link.href}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              duration: DURATIONS.fast,
                              delay: sectionIndex * 0.05 + itemIndex * 0.02,
                              ease: EASING_CURVES.easeOut,
                            }
                      }
                    >
                      <MegaLink link={link} />
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Right column: promo card */}
        {hasPromo && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
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
            <MegaPromoCard
              title={item.promo!.title}
              description={item.promo!.description}
              href={item.promo!.href}
              cta={item.promo!.cta}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ------------------------- Solutions rich menu ------------------------ */

function SolutionsMegaPanel({ item, prefersReducedMotion }: MegaPanelProps) {
  const base =
    "rounded-3xl border border-border/70 bg-gradient-to-br from-background/98 via-background/98 to-background/92 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl";

  const useCasesSection = item.sections.find((s) =>
    s.title.toLowerCase().includes("use cases")
  );
  const appsSection = item.sections.find((s) =>
    s.title.toLowerCase().includes("apps")
  );
  const contentSection = item.sections.find((s) =>
    s.title.toLowerCase().includes("content")
  );

  return (
    <div className={cn(base)}>
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* Left: Use Cases */}
        {useCasesSection && (
          <div className="space-y-3 border-r border-border/40 pr-6">
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: DURATIONS.fast, ease: EASING_CURVES.easeOut }
              }
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
            >
              {useCasesSection.title}
            </motion.p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {useCasesSection.items.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: DURATIONS.fast,
                          delay: index * 0.03,
                          ease: EASING_CURVES.easeOut,
                        }
                  }
                >
                  <RichLink link={link} />
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Middle: Apps */}
        {appsSection && (
          <div className="space-y-3 border-r border-border/40 pr-6">
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: DURATIONS.fast,
                      delay: 0.05,
                      ease: EASING_CURVES.easeOut,
                    }
              }
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
            >
              {appsSection.title}
            </motion.p>
            <ul className="space-y-1">
              {appsSection.items.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: DURATIONS.fast,
                          delay: 0.05 + index * 0.03,
                          ease: EASING_CURVES.easeOut,
                        }
                  }
                >
                  <RichLink link={link} />
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Right: Content */}
        {contentSection && (
          <div className="space-y-3">
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: DURATIONS.fast,
                      delay: 0.1,
                      ease: EASING_CURVES.easeOut,
                    }
              }
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
            >
              {contentSection.title}
            </motion.p>
            <ul className="space-y-1">
              {contentSection.items.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={
                    prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          opacity: {
                            duration: DURATIONS.fast,
                            delay: 0.1 + index * 0.04,
                            ease: EASING_CURVES.easeOut,
                          },
                          scale: {
                            ...SPRING_CONFIGS.snappy,
                            delay: 0.1 + index * 0.04,
                          },
                        }
                  }
                >
                  <SimpleLink link={link} />
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------- Link Components -------------------------- */

export function RichLink({ link }: { link: NavLink }) {
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      className="group flex items-start gap-3 rounded-xl px-2 py-2 text-sm transition hover:bg-accent/40"
    >
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm shadow-black/5">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-medium text-foreground">
          {link.label}
        </span>
        {link.description && (
          <span className="line-clamp-2 text-xs text-muted-foreground">
            {link.description}
          </span>
        )}
      </span>
    </Link>
  );
}

export function SimpleLink({ link }: { link: NavLink }) {
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-accent/40"
    >
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background/80 text-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="font-medium text-foreground">{link.label}</span>
    </Link>
  );
}

export function MegaLink({ link }: { link: NavLink }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      className="group flex gap-3 rounded-2xl border border-transparent px-2 py-2.5 transition hover:border-border/70 hover:bg-accent/40"
    >
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/60 text-foreground shadow-sm shadow-black/10 transition group-hover:bg-accent/80">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold text-foreground">
          {link.label}
        </span>
        <span className="line-clamp-2 text-xs text-muted-foreground">
          {link.description}
        </span>
      </span>
    </Link>
  );
}

type MegaPromoCardProps = {
  title: string;
  description: string;
  href: string;
  cta?: string;
};

export function MegaPromoCard({
  title,
  description,
  href,
  cta = "SING UP",
}: MegaPromoCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.08),transparent_55%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.08),transparent_55%)] px-4 py-4 text-left shadow-sm shadow-black/10 transition hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-md"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
          Featured
        </p>
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 inline-flex items-center text-xs font-medium text-primary group-hover:underline">
        {cta}
        <span aria-hidden className="ml-1">
          →
        </span>
      </div>
    </Link>
  );
}
