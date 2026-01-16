import {
  Activity,
  BarChart,
  Book,
  Cpu,
  Database,
  FileMusic,
  FileUser,
  HatGlasses,
  KeySquare,
  Lock,
  LucideIcon,
  Music,
  Settings,
  Shield,
  Slice,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

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
    id: "home",
    label: "Home",
    href: "/",
    type: "link",
  },
  {
    id: "products",
    label: "Products",
    href: "/products",
    type: "mega",
    sections: [
      {
        title: "Services",
        items: [
          {
            label: "ECU Remapping",
            href: "/product/remap-ecu",
            description:
              "Optimize and remap your main ECU for enhanced performance and engine efficiency.",
            icon: Cpu,
          },
          {
            label: "Beat Production / Edit / Mix & Master",
            href: "/product/music-production",
            description:
              "Comprehensive music production services — from beat creation to professional mixing and mastering.",
            icon: Music,
          },
          {
            label: "System Development & Workflow Tools",
            href: "/product/system-development",
            description:
              "Design, develop, and build customized tools or systems that seamlessly fit your workflow.",
            icon: Wrench,
          },
        ],
      },
      {
        title: "Features",
        items: [
          {
            label: "Encryption & Decryption",
            href: "/product/encryption",
            description:
              "Secure data transmission with advanced encryption and decryption algorithms ensuring confidentiality and integrity.",
            icon: Lock,
          },
          {
            label: "Social Engineering Awareness",
            href: "/product/social-engineer",
            description:
              "Educate and protect users from manipulation attacks through simulated scenarios and awareness training.",
            icon: Users,
          },
          {
            label: "Dashboard & Analytics",
            href: "/product/dashboard",
            description:
              "Gain complete visibility into your system’s performance through real-time dashboards and insightful analytics.",
            icon: BarChart,
          },
          {
            label: "Performance Optimization",
            href: "/product/performance",
            description:
              "Monitor and enhance system efficiency with automated performance tracking and optimization tools.",
            icon: Activity,
          },
          {
            label: "Advanced Security",
            href: "/product/security",
            description:
              "Comprehensive protection with multi-layered security protocols, monitoring, and threat prevention.",
            icon: Shield,
          },
          {
            label: "Automation",
            href: "/product/automation",
            description:
              "Streamline operations through intelligent automation that reduces manual workload and increases accuracy.",
            icon: Settings,
          },
        ],
      },
    ],
    promo: {
      title: "Join for Free Today!",
      href: "/signup",
      description:
        "Unlock exclusive member-only content — insider tips, expert insights, and premium updates you won’t find anywhere else!",
      cta: "Join Now for Free",
      imageLight: "/images/promo-light.jpg",
      imageDark: "/images/promo-dark.jpg",
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    href: "/solutions",
    type: "mega",
    sections: [
      {
        title: "Core platform",
        items: [
          {
            label: "Music sound sauce file",
            href: "/product/music-sound-sauce",
            description:
              "High-quality music sauce files for enhanced production creativity.",
            icon: FileMusic,
          },
          {
            label: "Various VST plugin keys",
            href: "/product/vst-plugins",
            description:
              "Access multiple professional VST plugin keys for your music setup.",
            icon: KeySquare,
          },
          {
            label: "Web scraper",
            href: "/product/web-scraper",
            description:
              "Efficient data scraping tools to extract valuable web insights.",
            icon: Slice,
          },
          {
            label: "Status profile",
            href: "/product/status-profile",
            description:
              "Customizable status profiles for tracking and analytics.",
            icon: FileUser,
          },
          {
            label: "Resources",
            href: "/product/resources",
            description:
              "A library of premium resources to boost your digital workflow.",
            icon: Book,
          },
          {
            label: "NSFW content",
            href: "/product/nsfw-content",
            description:
              "Restricted section with content subject to compliance policies.",
            icon: HatGlasses,
          },
        ],
      },
      {
        title: "Content",
        items: [
          {
            label: "Announcements",
            href: "/content/announcements",
            description:
              "Product announcements, changelog highlights, and important updates from Lucideus.",
            icon: Zap,
          },
          {
            label: "Documentation",
            href: "/docs",
            description:
              "Comprehensive documentation for Lucideus products and services.",
            icon: Database,
          },
          {
            label: "Blog",
            href: "/content/blog",
            description:
              "Opinionated articles on modern front-end stacks, UX, and building creator-focused tools with Lucideus.",
            icon: Cpu,
          },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    type: "link",
  },
];
