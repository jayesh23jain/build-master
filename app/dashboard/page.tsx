'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import ProjectOverview from '@/components/dashboard/ProjectOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import BudgetTracker from '@/components/dashboard/BudgetTracker';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    activeProjects: 3,
    totalBudget: 850000,
    totalSpent: 320000,
    vendors: 12,
    quotes: 5,
    completedProjects: 8,
    monthlyExpense: [
      { month: 'Jan', amount: 45000 },
      { month: 'Feb', amount: 52000 },
      { month: 'Mar', amount: 38000 },
      { month: 'Apr', amount: 61000 },
      { month: 'May', amount: 55000 },
      { month: 'Jun', amount: 72000 },
    ],
    projectBreakdown: [
      { name: 'Foundation', value: 180000, percentage: 21 },
      { name: 'Structure', value: 250000, percentage: 29 },
      { name: 'Interior', value: 280000, percentage: 33 },
      { name: 'Finishing', value: 140000, percentage: 17 },
    ],
    recentActivities: [
      { id: 1, type: 'quote', title: 'New Quote Received', description: 'From Blue Sky Builders', time: '2 hours ago', status: 'pending' },
      { id: 2, type: 'project', title: 'Project Update', description: 'Foundation stage completed', time: '5 hours ago', status: 'completed' },
      { id: 3, type: 'document', title: 'Document Uploaded', description: 'Blueprint_v2.pdf', time: '1 day ago', status: 'uploaded' },
      { id: 4, type: 'payment', title: 'Payment Processed', description: 'To Trusted Vendor Co.', time: '2 days ago', status: 'completed' },
    ],
    vendorStats: [
      { name: 'Trusted Builders', projects: 3, rating: 4.8, status: 'active' },
      { name: 'Blue Sky Builders', projects: 2, rating: 4.5, status: 'active' },
      { name: 'Excellence Construction', projects: 1, rating: 4.9, status: 'pending' },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0f14] to-[#0a0c10] text-[#F4F6F8]">
      {/* Navigation Bar */}
      <nav className="border-b border-[#334155]/30 bg-[#0d0f14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-xl tracking-wider text-[#1FE0E4] font-['JetBrains_Mono']">
            BUILD MASTER
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-[#889EAA] text-sm">Welcome, John Doe</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1FE0E4] to-[#D911E3] flex items-center justify-center">
              <span className="text-[#050505] font-bold">JD</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 lg:ml-0 bg-gradient-to-b from-[#0d0f14] via-[#0a0c10] to-[#050507]">
          <div className="max-w-6xl">
            {/* Header with Welcome Message */}
            <DashboardHeader userName="John Doe" />

            {/* Stat Cards */}
            <StatCards data={dashboardData} />

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 gap-6 mt-8">
              {/* Budget Tracker - Full Width */}
              <div>
                <BudgetTracker data={dashboardData} />
              </div>

              {/* Project Overview - Below, aligned properly */}
              <div>
                <ProjectOverview data={dashboardData} />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <RecentActivity activities={dashboardData.recentActivities} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
