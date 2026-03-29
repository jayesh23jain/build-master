'use client';
import { motion } from 'framer-motion';
import PhaseCard from './PhaseCard';
import { buildPhases } from '@/data/phases';

export default function PhaseShowcase() {
  return (
    <section className="w-full bg-[#0d0f14] py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#1FE0E4] text-[10px] font-bold tracking-[0.25em] uppercase font-['JetBrains_Mono']">
              01 / CONSTRUCTION PHASES
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium text-[#F4F6F8] tracking-wide leading-[1.1] font-[var(--font-syne)] mb-6">
            Manage Every Stage
          </h2>
          <p className="text-[#889EAA] text-sm md:text-base max-w-2xl leading-relaxed tracking-wide">
            From ground-breaking to final walkthrough — every phase tracked, every vendor vetted.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch w-full border border-[#334155]/30">
          {buildPhases.map((phase, index) => (
            <PhaseCard key={phase.id} phase={phase} index={index} total={buildPhases.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
