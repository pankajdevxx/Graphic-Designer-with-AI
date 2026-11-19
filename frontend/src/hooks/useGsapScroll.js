import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useGsapScroll Hook
 * Sets up custom GSAP animations tied to scroll triggers and automatically cleans them up on unmount.
 */
export const useGsapScroll = (animationCallback, dependencies = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      if (typeof animationCallback === 'function') {
        animationCallback(gsap, ScrollTrigger);
      }
    }, containerRef);

    return () => {
      ctx.revert(); // Automatically cleans up all tweens and ScrollTriggers inside context
    };
  }, dependencies);

  return containerRef;
};

export default useGsapScroll;

