"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { AnimatedThemeToggler } from "../common/animated-theme-toggler";
import {
  DURATIONS,
  EASING_CURVES,
  SPRING_CONFIGS,
} from "../navigation/animation-config";
import { MobileToggle } from "../navigation/atoms/MobileToggle";
import { NavContainer } from "../navigation/atoms/NavContainer";
import { NavSection, TopNavItem, topNav } from "../navigation/data";
import { DesktopNav } from "../navigation/desktop/DesktopNav";
import { MegaMenu } from "../navigation/desktop/MegaMenu";
import { useNavState } from "../navigation/hooks/useNavState";
import { useReducedMotion } from "../navigation/use-reduced-motion";

const MobileNav = dynamic(
  () => import("../navigation/mobile/MobileNav").then((mod) => mod.MobileNav),
  { ssr: false }
);

/* -------------------------------------------------------------------------- */
/*                                Main Navbar                                 */
/* -------------------------------------------------------------------------- */

/** Detect menu items that have sections (mega/rich menus). */
function isMegaItem(
  item: TopNavItem
): item is Extract<TopNavItem, { sections: NavSection[] }> {
  return "sections" in item;
}

export function Navbar({
  className,
  items = topNav,
}: {
  className?: string;
  items?: TopNavItem[];
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { openMegaId, setOpenMegaId, mobileOpen, setMobileOpen } =
    useNavState();

  // Measure nav height so the fixed mega panel sits exactly under it
  const barRef = React.useRef<HTMLDivElement | null>(null);
  const [megaTop, setMegaTop] = React.useState(80); // sensible default

  React.useEffect(() => {
    if (!barRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.borderBoxSize) {
          setMegaTop(entry.borderBoxSize[0].blockSize + 8);
        } else {
          // Fallback for older browsers
          setMegaTop(entry.target.getBoundingClientRect().height + 8);
        }
      }
    });

    resizeObserver.observe(barRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const openMegaItem = React.useMemo(
    () =>
      items.find((i) => isMegaItem(i) && i.id === openMegaId) as
        | Extract<TopNavItem, { sections: NavSection[] }>
        | undefined,
    [items, openMegaId]
  );

  return (
    <nav
      className={cn(
        "sticky inset-x-0 top-0 z-40 border-b border-nav-border bg-nav-bg/80 backdrop-blur-xl transition-colors",
        className
      )}
    >
      <NavContainer ref={barRef}>
        {/* Brand / Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/trademarks/icon.svg" alt="Logo" width={50} height={50} />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Lucideus
          </span>
        </Link>

        {/* Desktop nav - Centered */}
        <DesktopNav
          items={items}
          pathname={pathname}
          openMegaId={openMegaId}
          setOpenMegaId={setOpenMegaId}
        />

        {/* Right-side CTA + mobile toggle */}
        <div className="flex shrink-0 items-center gap-2">
          <AnimatedThemeToggler />
          {/* Login - hidden on mobile */}
          <Link
            href="/login"
            className="hidden rounded-md border border-nav-border bg-nav-bg px-3.5 py-1.5 text-sm font-medium text-nav-text shadow-sm shadow-black/5 transition-colors hover:bg-nav-hover-bg hover:text-nav-hover-text sm:inline-flex"
          >
            Login
          </Link>

          {/* Get Started - hidden on mobile */}
          <Link
            href="/get-started"
            className="hidden rounded-md border border-primary bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Get Started
          </Link>

          {/* Mobile menu toggle */}
          <MobileToggle
            isOpen={mobileOpen}
            onToggle={() => setMobileOpen(!mobileOpen)}
          />
        </div>
      </NavContainer>

      {/* Desktop mega layer (fixed + centered like Tailark) */}
      <AnimatePresence mode="wait">
        {openMegaItem && (
          <motion.div
            key={openMegaItem.id}
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.96, y: -8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.98, y: -4 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : {
                    opacity: {
                      duration: DURATIONS.fast,
                      ease: EASING_CURVES.easeOut,
                    },
                    scale: SPRING_CONFIGS.responsive,
                    y: SPRING_CONFIGS.responsive,
                  }
            }
            className="fixed inset-x-0 z-50 will-change-transform"
            style={{ top: megaTop }}
            onMouseEnter={() => {
              // Keep menu open when mouse enters panel
              setOpenMegaId(openMegaItem.id);
            }}
            onMouseLeave={() => {
              // Close when mouse leaves the panel area
              setOpenMegaId(null);
            }}
          >
            <div className="mx-auto w-[min(100vw-2rem,1120px)]">
              <MegaMenu
                item={openMegaItem}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu: full-height sheet with sticky CTA, collapsible sections */}
      <MobileNav
        items={items}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        topOffset={megaTop}
        pathname={pathname}
      />
    </nav>
  );
}
