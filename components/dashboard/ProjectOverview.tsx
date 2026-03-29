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
      className="bg-gradient-to-br from-[#1a1f2e] to-[#0d0f14] border border-[#334155]/30 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-[#F4F6F8] mb-6">Project Overview</h2>

      <div className="space-y-6">
        {/* Budget Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#889EAA] text-sm">Budget Utilization</span>
            <span className="text-[#1FE0E4] font-bold">{spentPercentage.toFixed(1)}%</span>
          </div>
          <div className="relative w-full h-3 bg-black/30 rounded-full overflow-hidden border border-[#334155]/30">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${spentPercentage}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#1FE0E4] via-[#D911E3] to-[#f59e0b]"
            />
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#0d0f14]/50 border border-[#334155]/20 rounded-lg">
            <p className="text-[#889EAA] text-xs mb-2">Total Budget</p>
            <p className="text-2xl font-bold text-[#F4F6F8]">₹{(data.totalBudget / 100000).toFixed(1)}L</p>
            <p className="text-[#1FE0E4] text-xs mt-1">Allocated</p>
          </div>

          <div className="p-4 bg-[#0d0f14]/50 border border-[#334155]/20 rounded-lg">
            <p className="text-[#889EAA] text-xs mb-2">Spent</p>
            <p className="text-2xl font-bold text-[#D911E3]">₹{(data.totalSpent / 1000).toFixed(0)}K</p>
            <p className="text-[#f59e0b] text-xs mt-1">In progress</p>
          </div>
        </div>

        <div className="p-4 bg-[#0d0f14]/50 border border-[#334155]/20 rounded-lg">
          <p className="text-[#889EAA] text-xs mb-2">Remaining Budget</p>
          <p className="text-2xl font-bold text-[#10b981]">₹{(remaining / 1000).toFixed(0)}K</p>
          <p className="text-[#10b981] text-xs mt-1">{((remaining / data.totalBudget) * 100).toFixed(1)}% Available</p>
        </div>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-[#334155]/30">
          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
            <span className="text-[#889EAA] text-sm">Active Projects</span>
            <span className="text-[#1FE0E4] font-bold text-lg">{data.activeProjects}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
