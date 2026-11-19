import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * ScrollReveal Component
 * Wraps content in smooth view-based entrance animations, respecting reduced motion preferences.
 */
export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  cascade = false,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const directionOffsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = shouldReduceMotion ? { x: 0, y: 0 } : directionOffsets[direction] || directionOffsets.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

