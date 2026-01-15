import { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type NavLink = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export type NavSection = {
  title: string;
  items: NavLink[];
};

export type NavPromo = {
  title: string;
  href: string;
  description: string;
  cta?: string;
  imageLight?: string;
  imageDark?: string;
};

export type TopNavItem =
  | {
      id: string;
      label: string;
      href: string;
      type?: "link";
    }
  | {
      id: string;
      label: string;
      href: string;
      type?: "mega";
      layout?: "product" | "solutions";
      sections: NavSection[];
      promo?: NavPromo;
    };

/* -------------------------------------------------------------------------- */
/*                              Navigation Data                               */
/* -------------------------------------------------------------------------- */

export const topNav: TopNavItem[] = [
  {
    id: "",
    label: "",
    href: "",
    type: "link",
  },
  {
    id: "",
    label: "",
    href: "",
    type: "mega",
    layout: "product",
    sections: [],
    promo: {
      title: "",
      href: "",
      description: "",
      cta: "",
      imageLight: "",
      imageDark: "",
    },
  }
]
