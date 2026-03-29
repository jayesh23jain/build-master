'use client';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="w-full bg-[#0d0f14] py-32 md:py-48 relative z-10 overflow-hidden border-t border-[#334155]/60">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:50px_50px] opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-[#1FE0E4] text-[10px] font-bold tracking-[0.25em] uppercase font-['JetBrains_Mono']">
              04 / GET STARTED
            </span>
          </div>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-5xl md:text-7xl lg:text-8xl font-black text-[#F4F6F8] mb-6 tracking-tight leading-[1.1] font-[var(--font-syne)] drop-shadow-[0_0_30px_rgba(31,224,228,0.3)]"
        >
          Ready to<br />
          <span className="text-[#1FE0E4]">Break</span><br />
          <span className="text-[#D911E3]">Ground?</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.1 }} 
          className="text-[#889EAA] text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of project managers and homeowners building smarter with Build Master.
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          className="px-10 py-4 bg-[#1FE0E4] text-[#050505] font-bold text-sm uppercase tracking-[0.2em] font-['JetBrains_Mono'] transition-all duration-300 hover:bg-[#00D9E0] cursor-pointer"
        >
          Create Free Account
        </motion.button>
      </div>
    </section>
  );
}
