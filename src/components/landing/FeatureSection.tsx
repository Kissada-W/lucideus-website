"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  ChartBarIncreasingIcon,
  Database,
  Fingerprint,
  IdCard,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type FeatureKey =
  | "darkroom-access"
  | "unfiltered-stories"
  | "the-hidden-vault"
  | "midnight-society";

interface FeatureData {
  key: FeatureKey;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  alt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Static Data (defined outside component to prevent recreation)
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES: FeatureData[] = [
  {
    key: "darkroom-access",
    icon: Database,
    title: "Darkroom Access",
    description:
      "Unlock a private space reserved only for members — a world of hidden moments and exclusive visuals that were never meant for public eyes. Discover the seductive allure of secrets that exist just for you.",
    image: "/images/darkroom-access.jpg",
    alt: "Darkroom Access preview showing exclusive member content",
  },
  {
    key: "unfiltered-stories",
    icon: Fingerprint,
    title: "Unfiltered Stories",
    description:
      "Dive into raw, unfiltered tales that reveal what lies beneath the surface — intimate, honest, and dangerously captivating. These are stories only insiders are allowed to hear.",
    image: "/images/unfiltered-stories.jpg",
    alt: "Unfiltered Stories preview with intimate narratives",
  },
  {
    key: "the-hidden-vault",
    icon: IdCard,
    title: "The Hidden Vault",
    description:
      "Enter the vault where forbidden treasures lie untouched. Behind this door awaits a curated world of mystery and privilege, crafted exclusively for those who appreciate the art of secrecy.",
    image: "/images/the-hidden-vault.jpg",
    alt: "The Hidden Vault preview showcasing curated exclusives",
  },
  {
    key: "midnight-society",
    icon: ChartBarIncreasingIcon,
    title: "Midnight Society",
    description:
      "Join the private circle of those who crave the thrill of the unknown. Every piece of content is carefully chosen to deliver a refined, indulgent experience that only true members can claim.",
    image: "/images/midnight-society.jpg",
    alt: "Midnight Society preview for elite members",
  },
];

const DEFAULT_FEATURE: FeatureKey = "darkroom-access";

// ─────────────────────────────────────────────────────────────────────────────
// Animation Variants (centralized for consistency & reduced motion support)
// ─────────────────────────────────────────────────────────────────────────────

const imageVariants = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad for smooth deceleration
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.55, 0.055, 0.675, 0.19], // easeInCubic for quick exit
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function FeatureSection() {
  const [activeKey, setActiveKey] = useState<FeatureKey>(DEFAULT_FEATURE);

  // Memoize the feature map for O(1) lookups
  const featureMap = useMemo(
    () => new Map(FEATURES.map((f) => [f.key, f])),
    []
  );

  const activeFeature = featureMap.get(activeKey)!;

  // Stable callback to prevent unnecessary re-renders
  const handleValueChange = useCallback(
    (value: string) => {
      if (value && featureMap.has(value as FeatureKey)) {
        setActiveKey(value as FeatureKey);
      }
    },
    [featureMap]
  );

  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 lg:py-32"
      aria-labelledby="feature-section-heading"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-zinc-100/50
          dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]
          sm:inset-6 sm:rounded-b-3xl"
        aria-hidden="true"
      />

      <div
        className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 md:space-y-14 lg:space-y-20
          dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]"
      >
        {/* Header */}
        <header className="relative z-10 mx-auto max-w-3xl space-y-4 text-center sm:space-y-6">
          <h2
            id="feature-section-heading"
            className="text-balance text-3xl font-semibold tracking-tight
              sm:text-4xl md:text-5xl lg:text-6xl"
          >
            The SECRET content for Members{" "}
            <span className="text-muted-foreground">(NSFW)</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Step inside the private zone where innovation meets desire. Our
            member-only content blends cutting-edge technology, elegant design,
            and exclusive features crafted for those who crave more. Dive into
            personalized dashboards, immersive visuals, and an experience that
            feels as bold as it looks. This is not just a feature — it&apos;s
            your hidden playground.
          </p>
        </header>

        {/* Content Grid */}
        <LayoutGroup>
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Accordion */}
            <Accordion
              type="single"
              value={activeKey}
              onValueChange={handleValueChange}
              className="w-full"
            >
              {FEATURES.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <AccordionItem key={feature.key} value={feature.key}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3 text-base font-medium sm:text-lg">
                        <IconComponent
                          className="size-5 shrink-0 text-primary/80"
                          aria-hidden="true"
                        />
                        <span>{feature.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {/* Image Showcase */}
            <motion.div
              layout
              layoutDependency={activeKey}
              className="relative flex overflow-hidden rounded-2xl border bg-background p-2
                shadow-sm transition-shadow duration-300 hover:shadow-lg
                sm:rounded-3xl sm:p-3"
            >
              {/* Decorative stripe pattern */}
              <div
                className="absolute inset-y-0 right-0 w-12 border-l
                  bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]
                  sm:w-16"
                aria-hidden="true"
              />

              {/* Image container with improved aspect ratio */}
              <div
                className="relative aspect-4/3 w-[calc(100%-2.5rem)] overflow-hidden rounded-xl
                  bg-muted sm:aspect-76/59 sm:w-[calc(100%-3.5rem)] sm:rounded-2xl"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeKey}
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 overflow-hidden rounded-xl bg-zinc-900
                      shadow-inner sm:rounded-2xl"
                  >
                    <Image
                      src={activeFeature.image}
                      alt={activeFeature.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover object-center dark:mix-blend-lighten"
                      priority={activeKey === DEFAULT_FEATURE}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Animated border beam */}
              <BorderBeam
                duration={6}
                size={200}
                className="from-transparent via-amber-500/60 to-transparent
                  dark:via-white/40"
              />
            </motion.div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
