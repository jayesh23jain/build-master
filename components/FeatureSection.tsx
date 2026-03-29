'use client';
import { motion } from 'framer-motion';
import { features } from '@/data/phases';
import TextReveal from './TextReveal';

export default function FeatureSection() {
  return (
    <section className="w-full bg-[#0d0f14] border-t border-[#334155]/60 py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[#1FE0E4] font-['JetBrains_Mono'] tracking-[0.25em] text-[10px] font-bold uppercase">
              02 / PLATFORM FEATURES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-wide leading-[1.1] quintessential">
            <TextReveal text="Everything in One Place" className="text-[#F4F6F8]" delay={0.1} />
          </h2>
        </div>

        {/* 3-Column Engineered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-[#334155]/30">
          
          {/* Left Column */}
          <div className="flex flex-col lg:border-r border-[#334155]/30">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex-1 flex flex-col p-8 md:p-12 border-b border-[#334155]/30 bg-[#0A0D14] hover:bg-[#111622] transition-colors duration-500 group relative">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#1FE0E4] via-[#3B82F6] to-[#9333EA] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              <span className="text-[#1FE0E4] text-[9px] tracking-[0.3em] font-['JetBrains_Mono'] uppercase mb-8 block">
                F - 01
              </span>
              <h3 className="text-lg font-bold text-[#F4F6F8] font-sans tracking-tight mb-4">{features[0].title}</h3>
              <p className="text-[#889EAA] text-[13px] leading-relaxed pr-4">{features[0].description}</p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex-1 flex flex-col p-8 md:p-12 bg-[#0A0D14] border-b lg:border-b-0 border-[#334155]/30 hover:bg-[#111622] transition-colors duration-500 group relative">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#1FE0E4] via-[#3B82F6] to-[#9333EA] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              <span className="text-[#1FE0E4] text-[9px] tracking-[0.3em] font-['JetBrains_Mono'] uppercase mb-8 block">
                F - 02
              </span>
              <h3 className="text-lg font-bold text-[#F4F6F8] font-sans tracking-tight mb-4">{features[1].title}</h3>
              <p className="text-[#889EAA] text-[13px] leading-relaxed pr-4">{features[1].description}</p>
            </motion.div>
          </div>

          {/* Middle Column - BM Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col lg:border-r border-[#334155]/30 items-center justify-center p-12 bg-[#0A0D14] border-b lg:border-b-0 hover:bg-[#111622] transition-colors duration-500">
            <div className="w-56 h-56 border border-[#334155]/30 mb-8 relative group overflow-hidden bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:28px_28px]">
              <div className="absolute inset-0 bg-[#0A0D14]/80 flex items-center justify-center z-10">
                <span className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#1FE0E4] via-[#3B82F6] to-[#9333EA] drop-shadow-[0_0_15px_rgba(31,224,228,0.3)]">
                  BM
                </span>
              </div>
            </div>
            <p className="text-center font-['JetBrains_Mono'] text-[9px] tracking-[0.25em] text-[#889EAA]/60 uppercase leading-relaxed">
              BUILD MASTER PLATFORM<br/>
              <span className="text-[#1FE0E4]">V2.0 - PRODUCTION READY</span>
            </p>
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col">
            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex-1 flex flex-col p-8 md:p-12 border-b border-[#334155]/30 bg-[#0A0D14] hover:bg-[#111622] transition-colors duration-500 group relative">
              <div className="absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-[#1FE0E4] via-[#3B82F6] to-[#9333EA] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              <span className="text-[#1FE0E4] text-[9px] tracking-[0.3em] font-['JetBrains_Mono'] uppercase mb-8 block">
                F - 03
              </span>
              <h3 className="text-lg font-bold text-[#F4F6F8] font-sans tracking-tight mb-4">{features[2].title}</h3>
              <p className="text-[#889EAA] text-[13px] leading-relaxed pr-4">{features[2].description}</p>
            </motion.div>
            {/* Feature 4 */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex-1 flex flex-col p-8 md:p-12 bg-[#0A0D14] hover:bg-[#111622] transition-colors duration-500 group relative">
              <div className="absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-[#1FE0E4] via-[#3B82F6] to-[#9333EA] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              <span className="text-[#1FE0E4] text-[9px] tracking-[0.3em] font-['JetBrains_Mono'] uppercase mb-8 block">
                F - 04
              </span>
              <h3 className="text-lg font-bold text-[#F4F6F8] font-sans tracking-tight mb-4">{features[3].title}</h3>
              <p className="text-[#889EAA] text-[13px] leading-relaxed pr-4">{features[3].description}</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
