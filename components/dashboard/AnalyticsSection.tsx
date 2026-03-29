'use client';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsSectionProps {
  data: {
    monthlyExpense: { month: string; amount: number }[];
    projectBreakdown: { name: string; value: number; percentage: number }[];
  };
}

export default function AnalyticsSection({ data }: AnalyticsSectionProps) {
  const COLORS = ['#1FE0E4', '#D911E3', '#f59e0b', '#10b981'];

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1f2e] border border-[#334155] p-2 rounded text-[#F4F6F8] text-sm">
          <p>{`₹${(payload[0].value / 1000).toFixed(1)}K`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Monthly Expense Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#1a1f2e] to-[#0d0f14] border border-[#334155]/30 rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-[#F4F6F8] mb-6">Monthly Expense Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.monthlyExpense}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#889EAA" style={{ fontSize: '12px' }} />
            <YAxis stroke="#889EAA" style={{ fontSize: '12px' }} />
            <Tooltip content={customTooltip} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#889EAA' }} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#1FE0E4"
              strokeWidth={3}
              dot={{ fill: '#D911E3', r: 5 }}
              activeDot={{ r: 7 }}
              name="Expenses (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Project Budget Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-[#1a1f2e] to-[#0d0f14] border border-[#334155]/30 rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-[#F4F6F8] mb-6">Budget Breakdown by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.projectBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.projectBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-4">
            {data.projectBreakdown.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="p-4 bg-[#0d0f14]/50 border border-[#334155]/20 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-[#F4F6F8] font-semibold">{item.name}</span>
                  </div>
                  <span className="text-[#1FE0E4] font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 + idx * 0.1 }}
                    className="h-full bg-gradient-to-r"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${COLORS[idx % COLORS.length]}, ${COLORS[(idx + 1) % COLORS.length]})`,
                    }}
                  />
                </div>
                <p className="text-xs text-[#889EAA] mt-2">₹{(item.value / 100000).toFixed(1)}L</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
