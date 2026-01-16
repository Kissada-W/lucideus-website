export const SPRING_CONFIGS = {
  gentle: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 },
  responsive: {
    type: "spring" as const,
    stiffness: 400,
    damping: 28,
    mass: 0.5,
  },
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
}

/**
 * Easing curves for non-spring animations
 * Using standard easing curves for consistency
 */
export const EASING_CURVES = {
  easeOut: [0.16, 1, 0.3, 1], // Custom ease-out for smooth deceleration
  easeInOut: [0.4, 0, 0.2, 1], // Material Design standard
  sharp: [0.4, 0, 0.6, 1], // Quick and decisive
} as const

/**
 * Standard animation durations in seconds
 */
export const DURATIONS = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
} as const
