'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Find Vendors', href: '/marketplace', icon: '🏪' },
    { label: 'My Quotes', href: '/my-quotes', icon: '📮' },
    { label: 'Mood-Board', href: '/moodboard', icon: '🎨' },
    { label: 'Document Vault', href: '/vault', icon: '📁' },
    { label: 'Estimator', href: '/calculator', icon: '🧮' },
    { label: 'Material Prices', href: '/price-check', icon: '💰' },
    { label: 'Budget Tracker', href: '/budget', icon: '📈' },
    { label: '3D Studio', href: '/design-studio', icon: '🎭' },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 lg:hidden z-40 p-2 rounded-lg bg-[#1a1f2e] border border-[#334155] text-[#1FE0E4]"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-[#1a1f2e] to-[#0d0f14] border-r border-[#334155]/30 pt-20 overflow-y-auto lg:relative lg:translate-x-0 z-30 lg:z-0"
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 border-b border-[#334155]/30 mb-6">
          <h1 className="text-xl font-bold text-[#1FE0E4] font-['JetBrains_Mono'] flex items-center gap-2">
            <span>🏗️</span> BUILD MASTER
          </h1>
          <p className="text-xs text-[#889EAA] mt-2">Construction Dashboard</p>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 space-y-2">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    isActive
                      ? 'bg-[#1FE0E4]/20 border border-[#1FE0E4] text-[#1FE0E4] shadow-lg shadow-[#1FE0E4]/10'
                      : 'text-[#889EAA] hover:text-[#1FE0E4] hover:bg-[#1FE0E4]/10 border border-[#334155]/20'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#334155]/30 bg-gradient-to-t from-[#0d0f14] to-transparent">
          <div className="bg-[#1FE0E4]/10 border border-[#1FE0E4]/30 rounded-lg p-4 text-center">
            <p className="text-sm text-[#889EAA] mb-2">Need Help?</p>
            <button className="w-full px-3 py-2 bg-[#1FE0E4] text-[#050505] rounded-lg font-semibold text-sm hover:bg-[#00D9E0] transition-colors">
              Support
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-20 top-20"
        />
      )}
    </>
  );
}
