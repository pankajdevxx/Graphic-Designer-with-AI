import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * AnimatedCounter Component
 * Animates numerical values upwards when scrolled into view.
 */
export const AnimatedCounter = ({
  target = 100,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    let animationFrameId;

    const parseNumeric = typeof target === 'number' ? target : parseFloat(target) || 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * parseNumeric));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(parseNumeric);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={`font-extrabold tabular-nums ${className}`}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;

