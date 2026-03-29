'use client';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import EnhancedButton from './EnhancedButton';

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

        <div className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1] font-[var(--font-syne)] drop-shadow-[0_0_30px_rgba(31,224,228,0.3)]">
          <TextReveal text="Ready to" className="text-[#F4F6F8] block" delay={0.1} />
          <TextReveal text="Break" className="text-[#1FE0E4] block" delay={0.15} />
          <TextReveal text="Ground?" className="text-[#D911E3] block" delay={0.2} />
        </div>

        <motion.p 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: false }} 
          transition={{ delay: 0.1 }} 
          className="text-[#889EAA] text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of project managers and homeowners building smarter with Build Master.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: false }}
        >
          <EnhancedButton variant="primary" size="lg">
            Create Free Account
          </EnhancedButton>
        </motion.div>
      </div>
    </section>
  );
}
