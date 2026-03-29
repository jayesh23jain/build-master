'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BudgetTrackerProps {
  data: {
    projectBreakdown: { name: string; value: number; percentage: number }[];
  };
}

export default function BudgetTracker({ data }: BudgetTrackerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleViewDetails = () => {
    alert('Opening Budget Details modal...');
    console.log('View Details clicked');
  };
  const chartData = data.projectBreakdown.map(item => ({
    name: item.name,
    value: item.value / 1000,
  }));

  const COLORS = ['#1FE0E4', '#D911E3', '#f59e0b', '#10b981'];
  const totalBudget = data.projectBreakdown.reduce((sum, item) => sum + item.value, 0);
  const minCost = Math.min(...data.projectBreakdown.map(item => item.value)) / 1000;
  const maxCost = Math.max(...data.projectBreakdown.map(item => item.value)) / 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="bg-gradient-to-br from-[#1a1f2e] to-[#0d0f14] border border-[#334155]/30 rounded-2xl p-6 hover:border-[#1FE0E4]/50 hover:shadow-lg hover:shadow-[#1FE0E4]/10 transition-all duration-300"
    >
      {/* Top Tags */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          {data.projectBreakdown.map((item, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveCategory(activeCategory === item.name ? null : item.name)}
              className={`px-3 py-1 border text-xs font-['JetBrains_Mono'] uppercase tracking-widest rounded transition-all ${
                activeCategory === item.name
                  ? 'border-[#1FE0E4] text-[#F4F6F8] bg-[#1FE0E4]/20'
                  : 'border-[#1FE0E4]/40 text-[#1FE0E4] hover:border-[#1FE0E4]/70 hover:bg-[#1FE0E4]/10'
              }`}
            >
              {item.name.toUpperCase()}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[#1FE0E4] font-['JetBrains_Mono'] text-sm">
          <span>★</span>
          <span>5.0</span>
        </div>
      </div>

      {/* Grid Background Section */}
      <div className="relative mb-6 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1FE0E4" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 h-48 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis dataKey="name" stroke="#889EAA" style={{ fontSize: '12px' }} />
              <YAxis stroke="#889EAA" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f2e',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#F4F6F8',
                }}
                formatter={(value) => `₹${value.toFixed(0)}K`}
                labelStyle={{ color: '#889EAA' }}
              />
              <Bar dataKey="value" fill="#1FE0E4" radius={[8, 8, 0, 0]}>
                {data.projectBreakdown.map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="value" fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#F4F6F8] mb-2">Spending Overview</h3>
        <p className="text-[#889EAA] text-sm">
          Track your project budget allocation across different phases and categories
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-end justify-between pt-4 border-t border-[#334155]/30">
        {/* Cost Info */}
        <div>
          <p className="text-[#889EAA] text-xs font-['JetBrains_Mono'] uppercase tracking-widest mb-1">Est. Cost</p>
          <p className="text-xl font-bold text-[#F4F6F8]">
            ${minCost.toFixed(0)}k - ${maxCost.toFixed(0)}k
          </p>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleViewDetails}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 border border-[#1FE0E4] text-[#1FE0E4] text-xs font-['JetBrains_Mono'] uppercase tracking-widest rounded hover:bg-[#1FE0E4]/10 hover:shadow-lg hover:shadow-[#1FE0E4]/20 transition-all"
        >
          View Details
        </motion.button>
      </div>

      {/* Bottom Gradient Bar */}
      <div className="mt-4 h-1 bg-gradient-to-r from-[#1FE0E4] via-[#D911E3] to-transparent rounded-full"></div>
    </motion.div>
  );
}
