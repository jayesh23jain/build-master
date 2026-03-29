'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const stats = [
  { value: 2400, suffix: '+', suffixColor: 'text-[#1FE0E4]', label: 'ACTIVE PROJECTS' },
  { value: 98, suffix: '%', suffixColor: 'text-[#1FE0E4]', label: 'ON-TIME DELIVERY' },
  { value: 840, suffix: '+', suffixColor: 'text-[#1FE0E4]', label: 'VERIFIED CONTRACTORS' },
  { prefix: '$', value: 1.2, suffix: 'B', suffixColor: 'text-[#D911E3]', label: 'PROJECTS MANAGED', glow: true },
];

export default function StatsBanner() {
  return (
    <section className="w-full bg-[#111520] border-y border-[#334155]/60 relative z-20 font-[var(--font-syne)] overflow-hidden">
      <div className="flex flex-col md:flex-row items-stretch w-full max-w-[2000px] mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: false, amount: 0.5 }}
            className={`flex-1 flex flex-col items-center justify-center py-12 md:py-14 relative border-b md:border-b-0 md:border-r border-[#334155]/60 ${i === stats.length - 1 ? 'md:border-none' : ''}`}
          >
            {/* Top Glow bar for the last section */}
            {stat.glow && (
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#1FE0E4]/10 via-[#1FE0E4] to-transparent shadow-[0_0_15px_#1FE0E4] opacity-50" />
            )}

            <div className="flex items-baseline justify-center whitespace-nowrap overflow-visible leading-none tracking-tighter">
              <AnimatedCounter
                from={0}
                to={stat.value}
                duration={2}
                delay={i * 0.1}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className={`text-[12vw] md:text-[4vw] lg:text-[3.5vw] font-black transform md:scale-x-[1.2] ${i === stats.length - 1 ? 'text-[#F4F6F8]' : 'text-[#F4F6F8]'}`}
              />
              <span className={`text-[12vw] md:text-[4vw] lg:text-[3.5vw] font-black transform md:scale-x-[1.2] ml-1 md:ml-2 ${stat.suffixColor}`}>
                {stat.suffix}
              </span>
            </div>

            <span className="mt-4 md:mt-6 text-[#889EAA] text-[8px] md:text-[9px] font-['JetBrains_Mono'] tracking-[0.25em] font-medium uppercase text-center">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
