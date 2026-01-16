"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
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
 * - layout === "product"   → mega-menu with promo card (like Product)
 * - layout === "solutions" → rich-menu with 3 balanced columns (like Solutions)
 * If layout is not set in data, we infer it from the presence of `promo`.
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

  // Default to product-style mega panel
  return (
    <ProductMegaPanel item={item} prefersReducedMotion={prefersReducedMotion} />
  );
}

/* -------------------------------------------------------------------------- */
/*                          Feature Link Component                            */
/* -------------------------------------------------------------------------- */

type FeatureLinkProps = {
  link: NavLink;
  index: number;
  sectionDelay?: number;
  prefersReducedMotion: boolean;
};

/**
 * FeatureLink - Grid-based layout with styled icon container
 * Inspired by the Tailark design pattern
 */
function FeatureLink({
  link,
  index,
  sectionDelay = 0,
  prefersReducedMotion,
}: FeatureLinkProps) {
  const Icon = link.icon;

  // Icon color variants for visual interest - Tailark-inspired palette
  const iconColors = [
    "fill-emerald-500/25 stroke-foreground",
    "fill-blue-500/15 stroke-foreground",
    "fill-pink-500/15 stroke-foreground",
    "fill-zinc-500/15 stroke-foreground",
    "fill-green-500/15 stroke-foreground",
    "fill-indigo-500/15 stroke-foreground",
    "fill-purple-500/15 stroke-foreground",
    "fill-red-500/15 stroke-foreground",
  ];
  const iconColor = iconColors[index % iconColors.length];

  return (
    <motion.li
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: DURATIONS.fast,
              delay: sectionDelay + index * 0.03,
              ease: EASING_CURVES.easeOut,
            }
      }
    >
      <Link
        href={link.href}
        className="group grid grid-cols-[auto_1fr] gap-3.5 rounded-lg p-2 text-sm outline-none transition-all hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:bg-muted/50 data-[active=true]:text-foreground data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted"
      >
        <div className="relative flex size-10 items-center justify-center rounded border border-transparent bg-card shadow ring-1 ring-foreground/10">
          <Icon
            className={cn(iconColor)}
            size={20}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <div className="space-y-0.5">
          <div className="text-sm font-medium text-foreground">
            {link.label}
          </div>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {link.description}
          </p>
        </div>
      </Link>
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Promo Card Component                            */
/* -------------------------------------------------------------------------- */

type PromoCardProps = {
  title: string;
  description: string;
  href: string;
  cta?: string;
  prefersReducedMotion: boolean;
};

/**
 * PromoCard - Visual gradient card with decorative layered elements
 */
function PromoCard({
  title,
  description,
  href,
  cta = "Learn More",
  prefersReducedMotion,
}: PromoCardProps) {
  return (
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
      className="row-span-2 grid grid-rows-subgrid"
    >
      <Link
        href={href}
        className="group relative row-span-2 grid overflow-hidden rounded-xl bg-linear-to-b from-white via-white/50 to-sky-100 p-1 ring-1 ring-inset ring-foreground/10 transition-all duration-200 hover:ring-foreground/15 dark:from-background dark:via-background/50 dark:to-sky-900/30"
      >
        {/* Decorative layered visual with mask gradient */}
        <div className="absolute inset-0 aspect-3/2 px-6 pt-2">
          <div className="relative -mx-4 h-4/5 px-4 pt-6 before:absolute before:inset-x-6 before:bottom-0 before:top-4 before:z-1 before:rounded-t-xl before:border before:border-transparent before:bg-background before:shadow-sm before:ring-1 before:ring-foreground/10 after:absolute after:inset-x-9 after:bottom-0 after:top-2 after:rounded-t-xl after:border after:border-transparent after:bg-background/75 after:ring-1 after:ring-foreground/5 mask-[linear-gradient(to_bottom,black_35%,transparent)]">
            {/* Main card layer */}
            <div className="relative z-10 h-full overflow-hidden rounded-t-xl border border-transparent bg-card p-8 text-sm shadow-xl shadow-black/25 ring-1 ring-foreground/10">
              {/* Light mode image */}
              <Image
                src="/images/promo-card-light.png"
                alt={title}
                fill
                className="block object-cover dark:hidden"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {/* Dark mode image */}
              <Image
                src="/images/promo-card-dark.png"
                alt={title}
                fill
                className="hidden object-cover dark:block"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-0.5 self-end p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
            Featured
          </p>
          <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground">
            {title}
          </h3>
          <p className="line-clamp-1 text-xs text-foreground/60">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Product Mega Panel                                */
/* -------------------------------------------------------------------------- */

type ProductMegaPanelProps = MegaPanelProps;

function ProductMegaPanel({
  item,
  prefersReducedMotion,
}: ProductMegaPanelProps) {
  const hasPromo = Boolean(item.promo);

  // Split sections: first section goes in left column, rest go in middle grid
  const [firstSection, ...restSections] = item.sections;

  return (
    <div
      data-slot="navigation-menu-viewport"
      className="relative mt-1.5 w-full origin-top overflow-hidden rounded-xl border border-transparent bg-popover p-0.5 text-popover-foreground shadow-xl shadow-black/10 ring-1 ring-foreground/10 transition-[width,height] duration-200 data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in"
    >
      <div
        data-slot="navigation-menu-content"
        className="origin-top p-2 pb-1.5 pl-1 pr-4 pt-1"
      >
        <div
          className={cn(
            "grid w-full gap-1",
            hasPromo ? "min-w-6xl grid-cols-4 pr-18.5" : "grid-cols-3"
          )}
        >
          {/* Column 1: First section (Features) */}
          {firstSection && (
            <div className="row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border bg-card p-1 pt-3">
              <motion.span
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: DURATIONS.fast, ease: EASING_CURVES.easeOut }
                }
                className="ml-2 text-xs text-muted-foreground"
              >
                {firstSection.title}
              </motion.span>
              <ul>
                {firstSection.items.map((link, index) => (
                  <FeatureLink
                    key={link.href}
                    link={link}
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* Column 2-3: Rest of sections (More Features) - 2-column grid */}
          {restSections.length > 0 && (
            <div className="col-span-2 row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border bg-card p-1 pt-3">
              <motion.span
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: DURATIONS.fast, ease: EASING_CURVES.easeOut }
                }
                className="ml-2 text-xs text-muted-foreground"
              >
                {restSections[0]?.title || "More Features"}
              </motion.span>
              <ul className="grid grid-cols-2">
                {restSections.flatMap((section) =>
                  section.items.map((link, itemIndex) => (
                    <FeatureLink
                      key={link.href}
                      link={link}
                      index={itemIndex}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  ))
                )}
              </ul>
            </div>
          )}

          {/* Column 4: Promo Card */}
          {hasPromo && item.promo && (
            <PromoCard
              title={item.promo.title}
              description={item.promo.description}
              href={item.promo.href}
              cta={item.promo.cta}
              prefersReducedMotion={prefersReducedMotion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Solutions Mega Panel                              */
/* -------------------------------------------------------------------------- */

type SolutionsMegaPanelProps = MegaPanelProps;

function SolutionsMegaPanel({
  item,
  prefersReducedMotion,
}: SolutionsMegaPanelProps) {
  // Split sections: first section goes in left column, rest go in middle column
  const [firstSection, secondSection] = item.sections;

  return (
    <div
      data-slot="navigation-menu-viewport"
      className="relative mt-1.5 w-full origin-top overflow-hidden rounded-xl border border-transparent bg-popover p-0.5 text-popover-foreground shadow-xl shadow-black/10 ring-1 ring-foreground/10 transition-[width,height] duration-200 data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in"
    >
      <div
        data-slot="navigation-menu-content"
        className="origin-top p-2 pb-1.5 pl-1 pr-4 pt-1"
      >
        <div className="grid w-full grid-cols-3 gap-1">
          {/* Column 1: First section (Core platform) - 2-column grid */}
          {firstSection && (
            <div className="col-span-2 row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border bg-card p-1 pt-3">
              <motion.span
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: DURATIONS.fast, ease: EASING_CURVES.easeOut }
                }
                className="ml-2 text-xs text-muted-foreground"
              >
                {firstSection.title}
              </motion.span>
              <ul className="grid grid-cols-2">
                {firstSection.items.map((link, index) => (
                  <FeatureLink
                    key={link.href}
                    link={link}
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* Column 2: Second section (Content) - single column */}
          {secondSection && (
            <div className="row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border bg-card p-1 pt-3">
              <motion.span
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
                className="ml-2 text-xs text-muted-foreground"
              >
                {secondSection.title}
              </motion.span>
              <ul>
                {secondSection.items.map((link, itemIndex) => (
                  <FeatureLink
                    key={link.href}
                    link={link}
                    index={itemIndex}
                    sectionDelay={0.05}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                       Exported Link Components                             */
/* -------------------------------------------------------------------------- */

type RichLinkProps = { link: NavLink };

export function RichLink({ link }: RichLinkProps) {
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

type SimpleLinkProps = { link: NavLink };

export function SimpleLink({ link }: SimpleLinkProps) {
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

type MegaLinkProps = { link: NavLink };

export function MegaLink({ link }: MegaLinkProps) {
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
  cta = "Explore",
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
