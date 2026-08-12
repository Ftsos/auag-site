import type { Variants } from 'framer-motion';

/*
 * The site's single motion vocabulary. Every entrance animation imports from
 * here so the whole page reveals with one voice — no per-file easing or
 * timing decisions. Transform + opacity only (house rule).
 */

/** Expo-out curve — fast start, long settle. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DUR = { fast: 0.45, base: 0.6, slow: 0.9 } as const;

/** Canonical reveal depth for sections. */
export const VIEWPORT = { once: true, amount: 0.3 } as const;

/** For blocks taller than the viewport, where 30% visibility may be unreachable. */
export const VIEWPORT_TALL = { once: true, amount: 0.12 } as const;

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

/** Opacity-only — for on-dark surfaces and quiet blocks like the footer. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.base, ease: 'easeOut' } },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.fast, ease: EASE_OUT },
  },
};

/** Photos settle from a slight over-scale — never clip-path or filters. */
export const photoReveal: Variants = {
  hidden: { opacity: 0, scale: 1.045 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

/** Parent orchestrator — children declare their own variants and inherit timing. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
