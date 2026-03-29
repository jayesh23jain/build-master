'use client';
import { motion } from 'framer-motion';

interface Activity {
  id: number;
  type: 'quote' | 'project' | 'document' | 'payment';
  title: string;
  description: string;
  time: string;
  status: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      quote: '📮',
      project: '🏗️',
      document: '📄',
      payment: '💳',
    };
    return icons[type] || '📌';
  };

  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      quote: 'from-[#D911E3]',
      project: 'from-[#10b981]',
      document: 'from-[#1FE0E4]',
      payment: 'from-[#f59e0b]',
    };
    return colors[type] || 'from-[#889EAA]';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
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
            Updates
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="px-3 py-1 border border-[#1FE0E4]/40 text-[#1FE0E4] text-xs font-['JetBrains_Mono'] uppercase tracking-widest rounded hover:border-[#1FE0E4]/70 hover:bg-[#1FE0E4]/10 transition-all"
          >
            Activity
          </motion.button>
        </div>
        <div className="flex items-center gap-2 text-[#1FE0E4] font-['JetBrains_Mono'] text-sm">
          <span>★</span>
          <span>{activities.length}</span>
        </div>
      </div>

      {/* Grid Background Section */}
      <div className="relative mb-6 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1FE0E4" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid3)" />
          </svg>
        </div>
        <div className="relative z-10 h-32 flex items-center justify-center">
          <p className="text-[#889EAA] font-['JetBrains_Mono'] text-xs uppercase tracking-widest">Recent Updates</p>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#F4F6F8] mb-1">Activity Log</h3>
        <p className="text-[#889EAA] text-xs">
          Track all recent project updates and activities
        </p>
      </div>

      {/* Activities List */}
      <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
        {activities.slice(0, 3).map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + idx * 0.05 }}
            className="p-2 bg-[#0d0f14]/50 border border-[#334155]/20 rounded hover:border-[#1FE0E4]/30 transition-all group"
          >
            <div className="flex items-start gap-2">
              <div className={`text-sm flex-shrink-0 w-6 h-6 bg-gradient-to-br ${getActivityColor(activity.type)} to-black/40 rounded flex items-center justify-center`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#F4F6F8] group-hover:text-[#1FE0E4] transition-colors">
                  {activity.title}
                </p>
                <p className="text-xs text-[#889EAA]">{activity.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between pt-3 border-t border-[#334155]/30">
        <p className="text-[#889EAA] text-xs font-['JetBrains_Mono']">{activities.length} Activities</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 border border-[#1FE0E4] text-[#1FE0E4] text-xs font-['JetBrains_Mono'] uppercase tracking-widest rounded hover:bg-[#1FE0E4]/10 transition-all"
        >
          View All
        </motion.button>
      </div>

      {/* Bottom Gradient Bar */}
      <div className="mt-3 h-1 bg-gradient-to-r from-[#1FE0E4] via-[#D911E3] to-transparent rounded-full"></div>
    </motion.div>
  );
}
