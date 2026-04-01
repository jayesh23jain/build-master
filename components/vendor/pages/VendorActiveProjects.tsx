'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VendorActiveProjectsProps {
  showToast: (message: string) => void;
  data?: any;
}

const ACTIVE_PROJECTS = [
  { name: 'Borivali Row Houses', phase: 'Structural Framing', value: '₹15,00,000', pct: 55, deadline: 'Feb 15, 2025', client: 'Rahul M.' },
  { name: 'Versova Townhouses', phase: 'Frame Phase 1', value: '₹28,50,000', pct: 22, deadline: 'Mar 30, 2025', client: 'Priya S.' },
];

export default function VendorActiveProjects({ showToast, data }: VendorActiveProjectsProps) {
  const [barWidths, setBarWidths] = useState<number[]>([]);

  // Map accepted quotes to active projects
  const displayProjects = data?.activeQuotes?.filter((q: any) => q.status === 'ACCEPTED' || q.status === 'accepted') || ACTIVE_PROJECTS;

  useEffect(() => {
    setTimeout(() => {
      setBarWidths(displayProjects.map((p: any) => p.pct || 40));
    }, 100);
  }, [displayProjects]);

  function mkStat(label: string, val: string, color: string) {
    return (
      <div key={label} className="bg-[#161c28] p-4 text-center hover:bg-[#1a2235] transition-all">
        <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2">{label}</div>
        <div className="font-['Syne'] text-base font-bold" style={{ color }}>{val}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {displayProjects.map((project: any, i: number) => {
        const name = project.project?.title || project.name || 'Ongoing Project';
        const phase = project.request?.phase || project.phase || 'Active Phase';
        const value = project.amount ? `₹${(project.amount / 100000).toFixed(1)}L` : (project.value || 'Consult Client');
        const pct = project.pct || 40;
        const deadline = project.deadline || 'Mar 20, 2025';
        const client = project.project?.customer?.user?.firstName ? `${project.project.customer.user.firstName} ${project.project.customer.user.lastName}` : (project.client || 'Build Master User');

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden"
          >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(168,85,247,.12), transparent)',
            }} />

          <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2a3a]">
            <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]"
                style={{ boxShadow: '0 0 6px rgba(52,211,153,.5)' }} />
              {project.name}
            </div>
            <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
              {project.phase}
            </div>
          </div>

          <div className="px-6 py-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-px bg-[#1e2a3a] border border-[#1e2a3a] mb-6">
              {mkStat('Contract Value', value, '#34d399')}
              {mkStat('Progress', pct + '%', '#a855f7')}
              {mkStat('Deadline', deadline, '#f59e4a')}
              {mkStat('Client', client, '#e2eef5')}
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-[#1e2a3a] mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] transition-all duration-1200 ease-out"
                style={{
                  width: `${barWidths[i] || 0}%`,
                  boxShadow: '0 0 8px rgba(168,85,247,0.14)'
                }}
              />
            </div>

            <div className="flex justify-between mb-6">
              <div className="font-['JetBrains_Mono'] text-xs text-[#7a9aaa]">{pct}% complete</div>
              <div className="font-['JetBrains_Mono'] text-xs text-[#f59e4a]">Due: {deadline}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-[#1e2a3a]">
              <button
                onClick={() => showToast('Uploading progress...')}
                className="px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#a855f7] hover:text-[#a855f7]"
              >
                ↑ Upload Progress
              </button>

              <button
                onClick={() => showToast('Messaging client...')}
                className="px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#a855f7] hover:text-[#a855f7]"
              >
                ✉ Message Client
              </button>

              <button
                onClick={() => showToast('Milestone submitted!')}
                className="ml-auto px-5 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  boxShadow: '0 0 10px rgba(168,85,247,0.14)'
                }}
              >
                Mark Milestone Done →
              </button>
            </div>
          </div>
        </motion.div>
      )})}
    </div>
  );
}
