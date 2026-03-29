'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface StatCardsProps {
  data: {
    activeProjects: number;
    totalBudget: number;
    totalSpent: number;
    vendors: number;
    quotes: number;
    completedProjects: number;
  };
}

export default function StatCards({ data }: StatCardsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Auto-expand on page load
  useEffect(() => {
    setIsMounted(true);
    // Expand cards after page has fully loaded
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      label: 'Active Projects',
      value: data.activeProjects,
      icon: '🏗️',
      color: 'from-[#1FE0E4]',
      change: '+2',
    },
    {
      label: 'Total Budget',
      value: `₹${(data.totalBudget / 100000).toFixed(1)}L`,
      icon: '💰',
      color: 'from-[#D911E3]',
      change: 'Updated',
    },
    {
      label: 'Spent',
      value: `₹${(data.totalSpent / 1000).toFixed(0)}K`,
      icon: '📊',
      color: 'from-[#f59e0b]',
      percentage: Math.round((data.totalSpent / data.totalBudget) * 100),
    },
    {
      label: 'Active Vendors',
      value: data.vendors,
      icon: '👷',
      color: 'from-[#10b981]',
      change: '+3',
    },
  ];

  return (
    <div className="relative h-96 mb-8 -mx-6 md:-mx-8 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center px-6 md:px-8">
        {stats.map((stat, idx) => {
          const centerIdx = (stats.length - 1) / 2;
          const positionFromCenter = idx - centerIdx;
          
          // Simple spread calculation - each card moves away from center
          const spreadDistance = 300;
          const horizontalOffset = isExpanded ? positionFromCenter * spreadDistance : 0;
          
          // No rotation - keep cards straight
          const scale = isExpanded ? 1 : 0.92 - idx * 0.02;

          return (
            <motion.div
              key={idx}
              style={{
                zIndex: isExpanded 
                  ? Math.abs(positionFromCenter) === 0 ? 1000 : 100 - Math.abs(positionFromCenter)
                  : stats.length - idx,
              }}
              className="absolute w-64 h-64"
            >
              <motion.div
                animate={{
                  x: horizontalOffset,
                  y: 0,
                  scale: scale,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 90, 
                  damping: 18,
                  mass: 1.1,
                }}
                className={`w-full h-full bg-gradient-to-br ${stat.color} to-black/40 p-6 rounded-2xl border border-[#334155]/30 hover:border-[#1FE0E4]/50 transition-all hover:shadow-2xl hover:shadow-[#1FE0E4]/20 flex flex-col justify-between backdrop-blur-sm cursor-pointer`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[#889EAA] text-xs font-['JetBrains_Mono'] mb-1 uppercase tracking-widest">
                        {stat.label}
                      </p>
                      <h3 className="text-4xl font-bold text-[#F4F6F8]">{stat.value}</h3>
                    </div>
                    <span className="text-4xl">{stat.icon}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {stat.percentage ? (
                    <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.percentage}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-[#1FE0E4] to-[#D911E3]"
                      />
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-semibold ${
                        stat.change === 'Updated' ? 'text-[#889EAA]' : 'text-[#10b981]'
                      }`}
                    >
                      {stat.change}
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
