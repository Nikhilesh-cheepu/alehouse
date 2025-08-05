import { Variants } from 'framer-motion'

// Framer Motion variants for common animations
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// GSAP animation presets
export const gsapPresets = {
  fadeIn: { opacity: 0, duration: 0.8, ease: "power2.out" },
  slideUp: { y: 50, opacity: 0, duration: 1, ease: "power2.out" },
  scaleIn: { scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(1.7)" },
  slideInLeft: { x: -100, opacity: 0, duration: 1, ease: "power2.out" },
  slideInRight: { x: 100, opacity: 0, duration: 1, ease: "power2.out" }
} 