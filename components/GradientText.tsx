'use client';

import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
  colors?: string[];
  speed?: number;
}

export default function GradientText({
  text,
  className = '',
  colors = ['#1FE0E4', '#3B82F6', '#9333EA', '#D911E3', '#1FE0E4'],
  speed = 4,
}: GradientTextProps) {
  const gradientStops = colors.join(', ');

  return (
    <motion.span
      className={className}
      initial={{ backgroundPosition: '0% center' }}
      whileInView={{
        backgroundPosition: ['0% center', '100% center', '0% center'],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
      }}
      viewport={{ once: false, amount: 0.8 }}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientStops})`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </motion.span>
  );
}
