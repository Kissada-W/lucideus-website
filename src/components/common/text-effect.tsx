"use client"

import { motion, Variants } from "framer-motion"
import React from "react"

type TextEffectProps = {
  children: string
  className?: string
  as?: React.ElementType
  preset?: "fade-in-blur" | "fade-in" | "slide-up"
  per?: "char" | "word" | "line"
  speedSegment?: number
  delay?: number
}

export function TextEffect({
  children,
  className,
  as: Component = "p",
  preset = "fade-in",
  per = "word",
  speedSegment = 0.05,
  delay = 0,
}: TextEffectProps) {
  const words = React.useMemo(() => children.split(" "), [children])

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: speedSegment, delayChildren: delay * i },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: preset === "fade-in-blur" ? "blur(10px)" : "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  if (per === "line") {
    return (
      <Component className={className}>
        <motion.span
          initial="hidden"
          animate="visible"
          variants={container}
          aria-hidden="true"
        >
          <motion.span variants={child}>{children}</motion.span>
        </motion.span>
      </Component>
    )
  }

  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={container}
        aria-hidden="true"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block whitespace-nowrap">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Component>
  )
}
