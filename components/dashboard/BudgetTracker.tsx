'use client';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BudgetTrackerProps {
  data: {
    projectBreakdown: { name: string; value: number; percentage: number }[];
  };
}

export default function BudgetTracker({ data }: BudgetTrackerProps) {
  const chartData = data.projectBreakdown.map(item => ({
    name: item.name,
    value: item.value / 1000, // Convert to thousands for readability
  }));

  const COLORS = ['#1FE0E4', '#D911E3', '#f59e0b', '#10b981'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-[#1a1f2e] to-[#0d0f14] border border-[#334155]/30 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-[#F4F6F8] mb-6">Spending Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#889EAA" style={{ fontSize: '12px' }} />
          <YAxis stroke="#889EAA" style={{ fontSize: '12px' }} label={{ value: 'Amount (₹K)', angle: -90, position: 'insideLeft' }} />
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

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#334155]/30">
        <div className="text-center">
          <p className="text-[#889EAA] text-sm mb-2">Highest Category</p>
          <p className="text-lg font-bold text-[#F4F6F8]">
            {data.projectBreakdown.reduce((max, item) => item.value > max.value ? item : max).name}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[#889EAA] text-sm mb-2">Total Allocated</p>
          <p className="text-lg font-bold text-[#1FE0E4]">
            ₹{(data.projectBreakdown.reduce((sum, item) => sum + item.value, 0) / 100000).toFixed(1)}L
          </p>
        </div>
      </div>
    </motion.div>
  );
}
