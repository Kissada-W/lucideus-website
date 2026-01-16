"use client";

import * as React from "react";
import { NavLink } from "../atoms/NavLink";
import { NavTrigger } from "../atoms/NavTrigger";
import { NavSection, TopNavItem } from "../data";

type DesktopNavProps = {
  items: TopNavItem[];
  pathname: string;
  openMegaId: string | null;
  setOpenMegaId: (id: string | null) => void;
};

function isMegaItem(
  item: TopNavItem
): item is Extract<TopNavItem, { sections: NavSection[] }> {
  return "sections" in item;
}

export function DesktopNav({
  items,
  pathname,
  openMegaId,
  setOpenMegaId,
}: DesktopNavProps) {
  return (
    <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
      {items.map((item) =>
        isMegaItem(item) ? (
          <div
            key={item.id}
            onMouseEnter={() => setOpenMegaId(item.id)}
            onMouseLeave={() => setOpenMegaId(null)}
          >
            <NavTrigger
              label={item.label}
              isOpen={openMegaId === item.id}
            />
          </div>
        ) : (
          <NavLink
            key={item.id}
            href={item.href}
            label={item.label}
            isActive={pathname === item.href}
          />
        )
      )}
    </nav>
  );
}
