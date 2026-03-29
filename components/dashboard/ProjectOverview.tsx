'use client';
import { motion } from 'framer-motion';

interface ProjectOverviewProps {
  data: {
    activeProjects: number;
    totalBudget: number;
    totalSpent: number;
  };
}

export default function ProjectOverview({ data }: ProjectOverviewProps) {
  const remaining = data.totalBudget - data.totalSpent;
  const spentPercentage = (data.totalSpent / data.totalBudget) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-gradient-to-br from-[#1a1f2e] to-[#0d0f14] border border-[#334155]/30 rounded-2xl p-6 hover:border-[#1FE0E4]/50 hover:shadow-lg hover:shadow-[#1FE0E4]/10 transition-all duration-300"
    >
      {/* Top Tags */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="px-3 py-1 border border-[#1FE0E4]/40 text-[#1FE0E4] text-xs font-['JetBrains_Mono'] uppercase tracking-widest rounded hover:border-[#1FE0E4]/70 hover:bg-[#1FE0E4]/10 transition-all"
          >
            Budget
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="px-3 py-1 border border-[#1FE0E4]/40 text-[#1FE0E4] text-xs font-['JetBrains_Mono'] uppercase tracking-widest rounded hover:border-[#1FE0E4]/70 hover:bg-[#1FE0E4]/10 transition-all"
          >
            Active
          </motion.button>
        </div>
        <div className="flex items-center gap-2 text-[#1FE0E4] font-['JetBrains_Mono'] text-sm">
          <span>★</span>
          <span>4.8</span>
        </div>
      </div>

      {/* Grid Background Section */}
      <div className="relative mb-6 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1FE0E4" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>
        <div className="relative z-10 h-40 flex flex-col items-center justify-center">
          <div className="space-y-4 w-full">
            {/* Budget Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#889EAA] text-xs">Budget Utilization</span>
                <span className="text-[#1FE0E4] font-bold text-xs">{spentPercentage.toFixed(1)}%</span>
              </div>
              <div className="relative w-full h-2 bg-black/30 rounded-full overflow-hidden border border-[#334155]/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${spentPercentage}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#1FE0E4] via-[#D911E3] to-[#f59e0b]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#F4F6F8] mb-1">Budget Status</h3>
        <p className="text-[#889EAA] text-xs">
          Current project budget allocation and spending overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div>
          <p className="text-[#889EAA] mb-1">Total Budget</p>
          <p className="text-[#F4F6F8] font-bold">₹{(data.totalBudget / 100000).toFixed(1)}L</p>
        </div>
        <div>
          <p className="text-[#889EAA] mb-1">Spent</p>
          <p className="text-[#D911E3] font-bold">₹{(data.totalSpent / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-end justify-between pt-3 border-t border-[#334155]/30">
        {/* Cost Info */}
        <div>
          <p className="text-[#889EAA] text-xs font-['JetBrains_Mono'] uppercase tracking-widest mb-1">Remaining</p>
          <p className="text-lg font-bold text-[#10b981]">
            ₹{(remaining / 1000).toFixed(0)}K
          </p>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 border border-[#1FE0E4] text-[#1FE0E4] text-xs font-['JetBrains_Mono'] uppercase tracking-widest rounded hover:bg-[#1FE0E4]/10 transition-all"
        >
          Adjust
        </motion.button>
      </div>

      {/* Bottom Gradient Bar */}
      <div className="mt-3 h-1 bg-gradient-to-r from-[#1FE0E4] via-[#D911E3] to-transparent rounded-full"></div>
    </motion.div>
  );
}
