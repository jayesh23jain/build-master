'use client';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  userName: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#F4F6F8] mb-2">
        {getGreeting()}, {userName.split(' ')[0]}! 👋
      </h2>
      <p className="text-[#889EAA] text-lg">
        Here's an overview of your construction projects and budget tracking
      </p>
    </motion.div>
  );
}
