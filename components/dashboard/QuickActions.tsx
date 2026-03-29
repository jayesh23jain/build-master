'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      icon: '📮',
      label: 'My Quotes',
      description: 'View & manage quotes',
      href: '#quotes',
      color: 'from-[#D911E3]',
    },
    {
      icon: '🏪',
      label: 'Find Vendors',
      description: 'Browse marketplace',
      href: '#marketplace',
      color: 'from-[#1FE0E4]',
    },
    {
      icon: '📁',
      label: 'Document Vault',
      description: 'Secure storage',
      href: '#vault',
      color: 'from-[#f59e0b]',
    },
    {
      icon: '🧮',
      label: 'Estimator',
      description: 'Calculate costs',
      href: '#calculator',
      color: 'from-[#10b981]',
    },
    {
      icon: '💰',
      label: 'Budget Tracker',
      description: 'Monitor spending',
      href: '#expenses',
      color: 'from-[#8b5cf6]',
    },
    {
      icon: '🎨',
      label: 'Mood Board',
      description: 'Design inspiration',
      href: '#moodboard',
      color: 'from-[#ec4899]',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-[#1a1f2e] to-[#0d0f14] border border-[#334155]/30 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-[#F4F6F8] mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href={action.href}
              className={`block p-4 bg-gradient-to-br ${action.color} to-black/40 rounded-lg border border-[#334155]/20 hover:border-[#1FE0E4]/50 transition-all group`}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
              <h3 className="text-sm font-bold text-[#F4F6F8] mb-1">{action.label}</h3>
              <p className="text-xs text-[#889EAA]">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
