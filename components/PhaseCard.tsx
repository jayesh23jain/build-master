'use client';
import { motion } from 'framer-motion';
import { BuildPhase } from '@/data/phases';

interface PhaseCardProps {
  phase: BuildPhase;
  index: number;
  total?: number;
}

export default function PhaseCard({ phase, index, total = 3 }: PhaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className={`group/card relative flex-1 flex flex-col p-6 md:p-10 border-b md:border-b-0 border-[#334155]/30 ${index < total - 1 ? 'md:border-r' : ''} bg-[#0A0D14] hover:bg-[#111622] transition-colors duration-500`}
      style={{
        boxShadow: 'none',
      }}
    >
      
      {/* Animated Gradient Bottom Border on Hover */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#1FE0E4] via-[#3B82F6] to-[#9333EA] origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 ease-out" />

      {/* Top row: tags & rating */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-wrap gap-2">
          {phase.tags.map(tag => (
            <span key={tag} className="border border-[#1FE0E4]/20 bg-transparent px-2.5 py-1 text-[#1FE0E4] text-[8px] tracking-[0.2em] font-['JetBrains_Mono'] uppercase">
              {tag}
            </span>
          ))}
        </div>
        <div className="border border-[#00E676]/20 bg-transparent px-2.5 py-1 text-[#00E676] text-[8px] tracking-[0.2em] font-['JetBrains_Mono'] flex items-center gap-1.5">
          ★ {phase.rating.toFixed(1)}
        </div>
      </div>

      {/* Grid Wireframe Image Placeholder */}
      <div className="w-full h-40 md:h-52 border border-[#334155]/30 mb-8 relative group overflow-hidden bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px]">
        {/* Subtle dark overlay over grid */}
        <div className="absolute inset-0 bg-[#18202F]/80 flex items-center justify-center transition-all duration-500 group-hover:bg-[#18202F]/60">
          <span className="text-[#889EAA]/60 text-[9px] tracking-[0.3em] font-bold font-['JetBrains_Mono'] uppercase group-hover:text-[#1FE0E4] transition-colors duration-500">
            {phase.id.toUpperCase()} / PHASE 0{index + 1}
          </span>
        </div>
      </div>

      {/* Main text content wrapped in a flex-grow to push footer down */}
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-[#F4F6F8] font-sans tracking-tight mb-4">{phase.name}</h3>
        <p className="text-[#889EAA] text-[13px] md:text-sm leading-relaxed mb-auto pr-4">{phase.description}</p>
      </div>

      {/* Footer (Cost and Button) */}
      <div className="flex items-center justify-between border-t border-[#334155]/30 pt-6 mt-10">
        <div>
          <p className="text-[#334155] text-[8px] tracking-[0.2em] font-bold font-['JetBrains_Mono'] uppercase mb-1 text-left">EST. COST</p>
          <p className="text-[#F4F6F8] font-bold font-sans tracking-tight text-sm md:text-[15px]">{phase.estCost}</p>
        </div>

        <button className="border border-[#334155]/50 bg-transparent hover:bg-white/5 hover:border-[#1FE0E4]/50 px-4 py-2 text-[#889EAA] hover:text-[#1FE0E4] text-[8px] uppercase font-bold font-['JetBrains_Mono'] tracking-[0.2em] transition-all duration-300">
          FIND VENDORS
        </button>
      </div>
    </motion.div>
  );
}
