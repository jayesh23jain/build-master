'use client';
import { motion } from 'framer-motion';

interface StatCardsProps {
  data: {
    activeProjects: number;
    totalBudget: number;
    totalSpent: number;
    vendors: number;
    quotes: number;
    completedProjects: number;
  };
}

export default function StatCards({ data }: StatCardsProps) {
  const stats = [
    {
      label: 'Active Projects',
      value: data.activeProjects,
      icon: '🏗️',
      color: 'from-[#1FE0E4]',
      change: '+2',
    },
    {
      label: 'Total Budget',
      value: `₹${(data.totalBudget / 100000).toFixed(1)}L`,
      icon: '💰',
      color: 'from-[#D911E3]',
      change: 'Updated',
    },
    {
      label: 'Spent',
      value: `₹${(data.totalSpent / 1000).toFixed(0)}K`,
      icon: '📊',
      color: 'from-[#f59e0b]',
      percentage: Math.round((data.totalSpent / data.totalBudget) * 100),
    },
    {
      label: 'Active Vendors',
      value: data.vendors,
      icon: '👷',
      color: 'from-[#10b981]',
      change: '+3',
    },
    {
      label: 'Pending Quotes',
      value: data.quotes,
      icon: '📮',
      color: 'from-[#8b5cf6]',
      change: 'New',
    },
    {
      label: 'Completed',
      value: data.completedProjects,
      icon: '✅',
      color: 'from-[#06b6d4]',
      change: '+1',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          className={`bg-gradient-to-br ${stat.color} to-black/40 p-6 rounded-2xl border border-[#334155]/30 hover:border-[#1FE0E4]/50 transition-all hover:shadow-lg hover:shadow-[#1FE0E4]/10`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#889EAA] text-sm font-['JetBrains_Mono'] mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-[#F4F6F8]">{stat.value}</h3>
            </div>
            <span className="text-3xl">{stat.icon}</span>
          </div>
          <div className="flex items-center justify-between">
            {stat.percentage ? (
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.percentage}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#1FE0E4] to-[#D911E3]"
                />
              </div>
            ) : (
              <span className={`text-xs font-semibold ${stat.change === 'Updated' ? 'text-[#889EAA]' : 'text-[#10b981]'}`}>
                {stat.change}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
