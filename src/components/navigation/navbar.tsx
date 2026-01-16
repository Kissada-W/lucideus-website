"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { DURATIONS, EASING_CURVES, SPRING_CONFIGS } from "./animation-config";
import { topNav, type NavSection, type TopNavItem } from "./data";
import { DesktopMegaTrigger, DesktopSimpleLink } from "./desktop-nav";
import { MegaPanel } from "./mega-panel";
import { MobileMegaItem, MobileSimpleItem } from "./mobile-nav";
import { useReducedMotion } from "./use-reduced-motion";

/* -------------------------------------------------------------------------- */
/*                                Main Navbar                                 */
/* -------------------------------------------------------------------------- */

type MainNavProps = { className?: string };

/** Detect menu items that have sections (mega/rich menus). */
function isMegaItem(
  item: TopNavItem
): item is Extract<TopNavItem, { sections: NavSection[] }> {
  return "sections" in item;
}

export function Navbar({ className }: MainNavProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Desktop state
  const [openMegaId, setOpenMegaId] = React.useState<string | null>(null);

  // Mobile state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileOpenId, setMobileOpenId] = React.useState<string | null>(null);

  // Measure nav height so the fixed mega panel sits exactly under it
  const barRef = React.useRef<HTMLDivElement | null>(null);
  const [megaTop, setMegaTop] = React.useState(80); // sensible default

  React.useEffect(() => {
    const compute = () => {
      if (!barRef.current) return;
      setMegaTop(barRef.current.offsetHeight + 8); // small offset like Tailark
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Close any open menus on route change
  React.useEffect(() => {
    setOpenMegaId(null);
    setMobileOpen(false);
    setMobileOpenId(null);
  }, [pathname]);

  const openMegaItem = React.useMemo(
    () =>
      topNav.find((i) => isMegaItem(i) && i.id === openMegaId) as
        | Extract<TopNavItem, { sections: NavSection[] }>
        | undefined,
    [openMegaId]
  );

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur-xl",
        className
      )}
    >
      <div
        ref={barRef}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[68px] lg:px-8"
      >
        {/* Brand / Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/trademarks/icon.svg" alt="Logo" width={28} height={28} />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Lucideus
          </span>
        </Link>

        {/* Desktop nav - Centered */}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {topNav.map((item) =>
            isMegaItem(item) ? (
              <DesktopMegaTrigger
                key={item.id}
                item={item}
                isActive={pathname === item.href}
                onOpen={() => setOpenMegaId(item.id)}
                onClose={() =>
                  setOpenMegaId((id) => (id === item.id ? null : id))
                }
                isOpen={openMegaId === item.id}
              />
            ) : (
              <DesktopSimpleLink
                key={item.id}
                item={item as Extract<TopNavItem, { type?: "link" }>}
                isActive={pathname === item.href}
              />
            )
          )}
        </nav>

        {/* Right-side CTA + mobile toggle */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Login - hidden on mobile */}
          <Link
            href="/login"
            className="hidden rounded-md border border-border/60 bg-background px-3.5 py-1.5 text-sm font-medium text-foreground shadow-sm shadow-black/5 transition-colors hover:bg-muted/60 sm:inline-flex"
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
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-border/60 bg-background/80 p-2 text-foreground shadow-sm shadow-black/10 transition-colors hover:bg-muted/60 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

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
              <MegaPanel
                item={openMegaItem}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu: full-height sheet with sticky CTA, collapsible sections */}
      <AnimatePresence mode="wait">
        {mobileOpen && (
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
            className="fixed inset-x-0 z-50 border-t border-border/40 bg-background/95 shadow-lg shadow-black/10 backdrop-blur-xl will-change-transform lg:hidden"
            style={{ top: megaTop }}
            role="dialog"
            aria-modal="true"
          >
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
              <div className="flex-1 overflow-y-auto px-4 pb-4 pt-3 sm:px-6">
                <div className="space-y-1">
                  {topNav.map((item) =>
                    isMegaItem(item) ? (
                      <MobileMegaItem
                        key={item.id}
                        item={item}
                        pathname={pathname}
                        openId={mobileOpenId}
                        setOpenId={setMobileOpenId}
                      />
                    ) : (
                      <MobileSimpleItem
                        key={item.id}
                        item={item as Extract<TopNavItem, { type?: "link" }>}
                        pathname={pathname}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Sticky footer actions */}
              <div className="shrink-0 border-t border-border/40 bg-background px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-center text-sm font-medium shadow-sm shadow-black/5 transition-colors hover:bg-muted/60"
                  >
                    Login
                  </Link>
                  <Link
                    href="/get-started"
                    className="flex-1 rounded-md border border-primary bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/90"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
