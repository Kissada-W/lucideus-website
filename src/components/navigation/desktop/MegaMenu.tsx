"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DURATIONS, EASING_CURVES, SPRING_CONFIGS } from "../animation-config";
import type { NavLink, NavSection, TopNavItem } from "../data";

/* -------------------------------------------------------------------------- */
/*                          Desktop Mega/Rich Panels                          */
/* -------------------------------------------------------------------------- */

export type MegaMenuProps = {
  item: Extract<TopNavItem, { sections: NavSection[] }>;
  prefersReducedMotion: boolean;
};

export function MegaMenu({ item, prefersReducedMotion }: MegaMenuProps) {
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

function FeatureLink({
  link,
  index,
  sectionDelay = 0,
  prefersReducedMotion,
}: FeatureLinkProps) {
  const Icon = link.icon;

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
        className="group grid grid-cols-[auto_1fr] gap-3.5 rounded-lg p-2 text-sm outline-none transition-all hover:bg-nav-hover-bg hover:text-nav-hover-text focus:bg-nav-hover-bg focus:text-nav-hover-text focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:bg-nav-hover-bg data-[active=true]:text-nav-hover-text"
      >
        <div className="relative flex size-10 items-center justify-center rounded border border-transparent bg-card shadow ring-1 ring-nav-border">
          <Icon
            className={cn(iconColor)}
            size={20}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <div className="space-y-0.5">
          <div className="text-sm font-medium text-nav-text group-hover:text-nav-hover-text">
            {link.label}
          </div>
          <p className="line-clamp-1 text-xs text-muted-foreground group-hover:text-nav-hover-text/80">
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
        className="group relative row-span-2 grid overflow-hidden rounded-xl bg-linear-to-b from-white via-white/50 to-sky-100 p-1 ring-1 ring-inset ring-nav-border transition-all duration-200 hover:ring-nav-border/50 dark:from-background dark:via-background/50 dark:to-sky-900/30"
      >
        <div className="absolute inset-0 aspect-3/2 px-6 pt-2">
          <div className="relative -mx-4 h-4/5 px-4 pt-6 before:absolute before:inset-x-6 before:bottom-0 before:top-4 before:z-1 before:rounded-t-xl before:border before:border-transparent before:bg-background before:shadow-sm before:ring-1 before:ring-nav-border after:absolute after:inset-x-9 after:bottom-0 after:top-2 after:rounded-t-xl after:border after:border-transparent after:bg-background/75 after:ring-1 after:ring-nav-border/50 mask-[linear-gradient(to_bottom,black_35%,transparent)]">
            <div className="relative z-10 h-full overflow-hidden rounded-t-xl border border-transparent bg-card p-8 text-sm shadow-xl shadow-black/25 ring-1 ring-nav-border">
              <Image
                src="/images/promo-card-light.png"
                alt={title}
                fill
                className="block object-cover dark:hidden"
                sizes="(max-width: 768px) 100vw, 400px"
              />
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

        <div className="space-y-0.5 self-end p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
            Featured
          </p>
          <h3 className="text-sm font-medium text-nav-text transition-colors group-hover:text-nav-hover-text">
            {title}
          </h3>
          <p className="line-clamp-1 text-xs text-nav-text/60 group-hover:text-nav-hover-text/60">
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

type ProductMegaPanelProps = MegaMenuProps;

function ProductMegaPanel({
  item,
  prefersReducedMotion,
}: ProductMegaPanelProps) {
  const hasPromo = Boolean(item.promo);
  const [firstSection, ...restSections] = item.sections;

  return (
    <div
      data-slot="navigation-menu-viewport"
      className="relative mt-1.5 w-full origin-top overflow-hidden rounded-xl border border-transparent bg-nav-bg p-0.5 text-nav-text shadow-xl shadow-black/10 ring-1 ring-nav-border transition-[width,height] duration-200"
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

type SolutionsMegaPanelProps = MegaMenuProps;

function SolutionsMegaPanel({
  item,
  prefersReducedMotion,
}: SolutionsMegaPanelProps) {
  const [firstSection, secondSection] = item.sections;

  return (
    <div
      data-slot="navigation-menu-viewport"
      className="relative mt-1.5 w-full origin-top overflow-hidden rounded-xl border border-transparent bg-nav-bg p-0.5 text-nav-text shadow-xl shadow-black/10 ring-1 ring-nav-border transition-[width,height] duration-200"
    >
      <div
        data-slot="navigation-menu-content"
        className="origin-top p-2 pb-1.5 pl-1 pr-4 pt-1"
      >
        <div className="grid w-full grid-cols-3 gap-1">
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
