'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SubmitQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitQuoteModal({ isOpen, onClose }: SubmitQuoteModalProps) {
  // Prevent form submission from reloading the page for now
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submit logic here later
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0B1018] border border-[#1A2634] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Gradient Glowing Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00D9FF] via-[#D911E3] to-[#86198F] opacity-80 shadow-[0_0_20px_rgba(217,17,227,0.5)]" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-[#1A2634]">
              <h2 className="text-xl md:text-2xl font-bold text-white font-sans tracking-wide">
                Submit Project Quote
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center border border-[#1A2634] text-[#5A728A] hover:text-white hover:border-[#5A728A] transition-colors rounded-sm"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] uppercase mb-3">
                      PHASE
                    </label>
                    <input
                      type="text"
                      defaultValue="Foundation & Groundwork"
                      className="w-full bg-[#0F1620] border border-[#1A2634] text-[#F4F6F8] p-3 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] uppercase mb-3">
                      ESTIMATED PRICE (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 250000"
                      className="w-full bg-[#0F1620] border border-[#1A2634] text-[#F4F6F8] placeholder-[#3A4A5A] p-3 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] uppercase mb-3">
                    WORK DESCRIPTION
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the scope of work..."
                    className="w-full bg-[#0F1620] border border-[#1A2634] text-[#F4F6F8] placeholder-[#3A4A5A] p-3 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors resize-none"
                  />
                </div>

                {/* Materials */}
                <div>
                  <label className="block text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] uppercase mb-3">
                    RAW MATERIALS REQUIRED
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Cement, Bricks, Steel rods..."
                    className="w-full bg-[#0F1620] border border-[#1A2634] text-[#F4F6F8] placeholder-[#3A4A5A] p-3 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors resize-none"
                  />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] uppercase mb-3">
                      EXPERIENCE (YEARS)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 8 years / 40+ projects"
                      className="w-full bg-[#0F1620] border border-[#1A2634] text-[#F4F6F8] placeholder-[#3A4A5A] p-3 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] uppercase mb-3">
                      LICENSE NUMBER
                    </label>
                    <input
                      type="text"
                      placeholder="GC-2024-00123"
                      className="w-full bg-[#0F1620] border border-[#1A2634] text-[#F4F6F8] placeholder-[#3A4A5A] p-3 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
                    />
                  </div>
                </div>

              </div>

              {/* Footer Buttons */}
              <div className="p-6 md:p-8 border-t border-[#1A2634] flex items-center justify-end gap-4 bg-[#090E17]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-[#1A2634] text-[#8A9EB0] hover:text-white text-[10px] font-['JetBrains_Mono'] tracking-[0.2em] uppercase transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#00D9FF] to-[#00b3d6] text-[#050505] font-bold text-[10px] font-['JetBrains_Mono'] tracking-[0.2em] uppercase transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                >
                  SUBMIT QUOTE →
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}