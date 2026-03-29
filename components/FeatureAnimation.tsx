'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: '📋',
    title: 'Smart Planning',
    description: 'AI-powered project estimates and timelines',
    color: '#1FE0E4',
  },
  {
    id: 2,
    icon: '👥',
    title: 'Team Collaboration',
    description: 'Real-time updates and team communication',
    color: '#00D9E0',
  },
  {
    id: 3,
    icon: '📊',
    title: 'Budget Tracking',
    description: 'Monitor expenses and ROI in real-time',
    color: '#1FE0E4',
  },
  {
    id: 4,
    icon: '🔔',
    title: 'Smart Alerts',
    description: 'Never miss important project milestones',
    color: '#D911E3',
  },
  {
    id: 5,
    icon: '📱',
    title: 'Mobile Ready',
    description: 'Manage projects on the go seamlessly',
    color: '#1FE0E4',
  },
  {
    id: 6,
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'Bank-level encryption for your data',
    color: '#00D9E0',
  },
];

export default function FeatureAnimation() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0d0f14] via-[#1a1f2e] to-[#0d0f14] rounded-2xl overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-5" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#1FE0E4]/20 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#D911E3]/20 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main Feature Display */}
      <div className="relative h-full p-8 md:p-12 flex flex-col justify-center items-center text-center z-10">
        {/* Feature Showcase */}
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            {features[activeFeature].icon}
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          key={`text-${activeFeature}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h3
            className="text-3xl md:text-4xl font-bold mb-4 font-['JetBrains_Mono'] tracking-tight"
            style={{ color: features[activeFeature].color }}
          >
            {features[activeFeature].title}
          </h3>
          <p className="text-[#889EAA] text-lg md:text-xl max-w-md">
            {features[activeFeature].description}
          </p>
        </motion.div>

        {/* Feature Indicators */}
        <div className="flex gap-2 justify-center flex-wrap">
          {features.map((feature, idx) => (
            <motion.button
              key={feature.id}
              onClick={() => setActiveFeature(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === activeFeature
                  ? 'w-8 bg-[#1FE0E4]'
                  : 'w-3 bg-[#334155]/50 hover:bg-[#334155]'
              }`}
              aria-label={`Show feature ${idx + 1}`}
            />
          ))}
        </div>

        {/* Feature Grid at bottom */}
        <motion.div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer group ${
                idx === activeFeature
                  ? `border-[${feature.color}] bg-[${feature.color}]/10`
                  : 'border-[#334155]/30 bg-transparent hover:border-[#334155]/60'
              }`}
              onClick={() => setActiveFeature(idx)}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <p className="text-xs md:text-sm font-['JetBrains_Mono'] text-[#889EAA] group-hover:text-[#1FE0E4] transition-colors">
                {feature.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
