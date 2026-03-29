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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-gradient-to-br from-[#1a1f2e] to-[#0d0f14] border border-[#334155]/30 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-[#F4F6F8] mb-6">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + idx * 0.08 }}
            className="p-4 bg-[#0d0f14]/50 border border-[#334155]/20 rounded-lg hover:border-[#1FE0E4]/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className={`text-2xl flex-shrink-0 w-10 h-10 bg-gradient-to-br ${getActivityColor(activity.type)} to-black/40 rounded-lg flex items-center justify-center`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#F4F6F8] group-hover:text-[#1FE0E4] transition-colors">
                  {activity.title}
                </h3>
                <p className="text-xs text-[#889EAA] mt-1">{activity.description}</p>
                <p className="text-xs text-[#334155] mt-2">{activity.time}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.status === 'completed' ? 'bg-[#10b981]/20 text-[#10b981]' :
                  activity.status === 'pending' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' :
                  'bg-[#1FE0E4]/20 text-[#1FE0E4]'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
