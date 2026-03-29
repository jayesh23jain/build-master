'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    // Handle decimal numbers
    if (to % 1 !== 0) {
      return latest.toFixed(1);
    }
    return Math.round(latest).toString();
  });

  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const timer = setTimeout(() => {
            animate(count, to, {
              duration,
              ease: 'easeOut',
            });
          }, delay * 1000);
          return () => clearTimeout(timer);
        } else if (!entry.isIntersecting) {
          // Reset for repeating animation
          hasAnimated.current = false;
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [count, to, duration, delay, from]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
