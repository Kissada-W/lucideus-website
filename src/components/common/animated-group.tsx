"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import React, { forwardRef, useMemo, type ReactNode } from "react";

// =============================================================================
// Types & Interfaces
// =============================================================================

export type PresetType =
  | "fade"
  | "slide"
  | "scale"
  | "blur"
  | "blur-slide"
  | "zoom"
  | "flip"
  | "bounce"
  | "rotate"
  | "swing";

type MotionElementType =
  | "div"
  | "ul"
  | "ol"
  | "section"
  | "article"
  | "nav"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "span";

export interface AnimatedGroupProps {
  /** Content to animate as staggered children */
  children: ReactNode;
  /** Optional CSS class for the container */
  className?: string;
  /** Custom Framer Motion variants for container and items */
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  /** Predefined animation preset */
  preset?: PresetType;
  /** HTML element type for the container (default: "div") */
  as?: MotionElementType;
  /** HTML element type for each child wrapper (default: "div") */
  asChild?: MotionElementType;
}

// =============================================================================
// Animation Constants (Pre-computed for Performance)
// =============================================================================

const DEFAULT_STAGGER_DELAY = 0.1;
const DEFAULT_ITEM_DURATION = 0.4;

const defaultContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: DEFAULT_STAGGER_DELAY,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DEFAULT_ITEM_DURATION, ease: "easeOut" },
  },
};

/**
 * Pre-computed preset variants merged with default item animation.
 * Each preset extends the base fade animation with additional transforms.
 */
const PRESET_VARIANTS: Record<PresetType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DEFAULT_ITEM_DURATION, ease: "easeOut" },
    },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DEFAULT_ITEM_DURATION, ease: "easeOut" },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: DEFAULT_ITEM_DURATION, ease: "easeOut" },
    },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: DEFAULT_ITEM_DURATION, ease: "easeOut" },
    },
  },
  "blur-slide": {
    hidden: { opacity: 0, filter: "blur(4px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: DEFAULT_ITEM_DURATION, ease: "easeOut" },
    },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -180 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { opacity: 0, rotate: -10 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 8 },
    },
  },
};

/** Reduced motion variant: instant visibility, no animation */
const reducedMotionItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

// =============================================================================
// Motion Component Map
// =============================================================================

const MotionComponents = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  section: motion.section,
  article: motion.article,
  nav: motion.nav,
  main: motion.main,
  aside: motion.aside,
  header: motion.header,
  footer: motion.footer,
  span: motion.span,
} as const;

// =============================================================================
// Component Implementation
// =============================================================================

/**
 * AnimatedGroup provides staggered animations for a group of children.
 *
 * Features:
 * - Multiple animation presets (fade, slide, scale, blur, zoom, flip, bounce, rotate, swing)
 * - Custom element types for container and children
 * - Accessibility: respects prefers-reduced-motion
 * - Composable with forwardRef
 *
 * @example
 * ```tsx
 * <AnimatedGroup preset="blur-slide" as="ul" asChild="li">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </AnimatedGroup>
 * ```
 */
const AnimatedGroup = forwardRef<HTMLElement, AnimatedGroupProps>(
  (
    {
      children,
      className,
      variants,
      preset = "fade",
      as = "div",
      asChild = "div",
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    // Select the correct motion components based on element type
    const ContainerComponent = MotionComponents[as] ?? motion.div;
    const ChildComponent = MotionComponents[asChild] ?? motion.div;

    // Derive final variants
    const containerVariants = useMemo(
      () => variants?.container ?? defaultContainerVariants,
      [variants?.container]
    );

    const itemVariants = useMemo(() => {
      if (shouldReduceMotion) {
        return reducedMotionItemVariants;
      }
      return variants?.item ?? PRESET_VARIANTS[preset] ?? defaultItemVariants;
    }, [shouldReduceMotion, variants?.item, preset]);

    return (
      <ContainerComponent
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Polymorphic component requires dynamic ref type
        ref={ref as any}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={className}
      >
        {React.Children.map(children, (child, index) => (
          <ChildComponent key={index} variants={itemVariants}>
            {child}
          </ChildComponent>
        ))}
      </ContainerComponent>
    );
  }
);

AnimatedGroup.displayName = "AnimatedGroup";

export { AnimatedGroup };
