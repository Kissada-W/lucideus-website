/** Duration constants in seconds */
export const DURATIONS = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
} as const;

/** CSS-style easing curves for opacity/transform */
export const EASING_CURVES = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1], // Slight overshoot
} as const;

/** Spring configs for physics-based motion */
export const SPRING_CONFIGS = {
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  responsive: { type: "spring", stiffness: 300, damping: 25 },
  gentle: { type: "spring", stiffness: 200, damping: 20 },
  bouncy: { type: "spring", stiffness: 500, damping: 15, mass: 0.8 },
} as const;
