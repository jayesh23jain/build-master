'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function SkeletonLoader({
  count = 3,
  type = 'card',
}: {
  count?: number;
  type?: 'card' | 'text' | 'circular';
}) {
  const shimmer = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 0%'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1],
    },
  };

  if (type === 'card') {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-r from-[#1a1e28] via-[#2a2e38] to-[#1a1e28] bg-[length:200%_100%] rounded-lg"
            animate={shimmer.animate}
            transition={shimmer.transition as any}
            style={{ height: '200px' }}
          />
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-r from-[#1a1e28] via-[#2a2e38] to-[#1a1e28] bg-[length:200%_100%] rounded"
            animate={shimmer.animate}
            transition={shimmer.transition as any}
            style={{ height: '16px', width: i === count - 1 ? '60%' : '100%' }}
          />
        ))}
      </div>
    );
  }

  if (type === 'circular') {
    return (
      <div className="flex gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-r from-[#1a1e28] via-[#2a2e38] to-[#1a1e28] bg-[length:200%_100%] rounded-full"
            animate={shimmer.animate}
            transition={shimmer.transition as any}
            style={{ width: '80px', height: '80px', flexShrink: 0 }}
          />
        ))}
      </div>
    );
  }

  return null;
}
