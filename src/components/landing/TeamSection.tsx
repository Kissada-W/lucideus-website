"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";

// ============================================================================
// Types
// ============================================================================

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  link: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

// ============================================================================
// Data
// ============================================================================

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Saika Kawakita",
    role: "AV Actress (S1 No.1 Style)",
    avatar: "/images/actress/saika-kawakita-avatar.jpg",
    link: "#",
  },
  {
    name: "Miru",
    role: "AV Actress (S1 No.1 Style)",
    avatar: "/images/actress/miru-avatar.jpg",
    link: "#",
  },
  {
    name: "Riri Nanatsumori",
    role: "AV Actress (S1 No.1 Style)",
    avatar: "/images/actress/riri-nanatsumori-avatar.jpg",
    link: "#",
  },
  {
    name: "Hinata Matsumoto",
    role: "AV Actress (Moodyz)",
    avatar: "/images/actress/hinata-matsumoto-avatar.jpg",
    link: "#",
  },
  {
    name: "Nozomi Ishihara",
    role: "AV Actress (Moodyz)",
    avatar: "/images/actress/nozomi-iIshihara-avatar.jpg",
    link: "#",
  },
  {
    name: "Rikka Ono",
    role: "AV Actress (Moodyz)",
    avatar: "/images/actress/rikka-ono-avatar.jpg",
    link: "#",
  },
];

// ============================================================================
// Animation Variants (Performance-Optimized)
// ============================================================================

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const imageHoverVariants: Variants = {
  idle: {
    filter: "grayscale(100%)",
    scale: 1,
    borderRadius: "0.375rem",
  },
  hover: {
    filter: "grayscale(0%)",
    scale: 1.02,
    borderRadius: "0.75rem",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const infoRevealVariants: Variants = {
  idle: {
    y: 16,
    opacity: 0,
  },
  hover: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

// ============================================================================
// Subcomponents
// ============================================================================

/**
 * TeamMemberCard - Optimized card with hardware-accelerated animations
 * Memoized to prevent unnecessary re-renders
 */
const TeamMemberCard = memo(function TeamMemberCard({
  member,
  index,
}: TeamMemberCardProps) {
  const formattedIndex = useMemo(
    () => `_${String(index + 1).padStart(2, "0")}`,
    [index]
  );

  return (
    <motion.article
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      className="group relative overflow-hidden"
      aria-labelledby={`team-member-${index}-name`}
    >
      {/* Image Container with Optimized Animations */}
      <motion.div
        className="relative aspect-2/3 w-full overflow-hidden"
        variants={imageHoverVariants}
      >
        <Image
          src={member.avatar}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
          loading="lazy"
          quality={85}
        />
      </motion.div>

      {/* Info Section */}
      <div className="px-2 pt-3 sm:pt-4">
        <div className="flex items-baseline justify-between">
          <h3
            id={`team-member-${index}-name`}
            className="text-base font-medium tracking-tight transition-all duration-300 group-hover:tracking-wide"
          >
            {member.name}
          </h3>
          <span
            className="text-muted-foreground text-xs font-mono"
            aria-hidden="true"
          >
            {formattedIndex}
          </span>
        </div>

        <div className="mt-1.5 flex items-center justify-between">
          <motion.span
            variants={infoRevealVariants}
            className="text-muted-foreground text-sm"
          >
            {member.role}
          </motion.span>

          <motion.div variants={infoRevealVariants}>
            <Link
              href={member.link}
              className="text-primary hover:text-primary/80 text-sm font-medium tracking-wide transition-colors hover:underline hover:underline-offset-4"
              aria-label={`View ${member.name}'s Linktree`}
            >
              Linktree
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
});

// ============================================================================
// Main Component
// ============================================================================

/**
 * TeamSection - Performance-optimized team showcase
 *
 * Features:
 * - Viewport-triggered stagger animations
 * - Hardware-accelerated transforms via Framer Motion
 * - Optimized Next.js Images with responsive sizes
 * - Spring-based micro-interactions
 * - Accessible markup with ARIA labels
 */
export function TeamSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="bg-muted/30 py-16 md:py-24 lg:py-32 dark:bg-transparent"
      aria-label="Team Members"
    >
      <div className="mx-auto max-w-5xl border-t border-border px-6">
        {/* Section Label */}
        <span className="text-muted-foreground -ml-6 -mt-3.5 block w-max bg-muted/30 px-6 text-xs font-medium uppercase tracking-widest dark:bg-background">
          Team
        </span>

        {/* Header Grid */}
        <motion.div
          variants={headerVariants}
          className="mt-12 gap-6 sm:grid sm:grid-cols-2 md:mt-20 lg:mt-24"
        >
          <div className="sm:w-4/5 lg:w-3/5">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Our dream team
            </h2>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-muted-foreground leading-relaxed">
              During the working process, we perform regular fitting with the
              client because he is the only person who can feel whether a new
              suit fits or not.
            </p>
          </div>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 md:mt-20 lg:mt-24"
        >
          <div
            className="grid gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8"
            role="list"
            aria-label="Team members gallery"
          >
            {TEAM_MEMBERS.map((member, index) => (
              <div key={member.name} role="listitem">
                <TeamMemberCard member={member} index={index} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
