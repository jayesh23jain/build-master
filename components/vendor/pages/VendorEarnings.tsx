'use client';

import { useState, useEffect } from 'react';

interface VendorEarningsProps {
  showToast: (message: string) => void;
}

const EARNINGS_DATA = {
  total: 8200000,
  thisMonth: 1400000,
  pending: 2500000,
  months: [
    { label: 'Aug', pct: 45 },
    { label: 'Sep', pct: 62 },
    { label: 'Oct', pct: 55 },
    { label: 'Nov', pct: 78 },
    { label: 'Dec', pct: 90 },
    { label: 'Jan', pct: 68 },
  ]
};

const PAYMENTS = [
  { project: 'Borivali Row Houses', amount: '₹7,50,000', status: 'Received', color: '#34d399' },
  { project: 'Borivali Row Houses', amount: '₹7,50,000', status: 'Pending', color: '#f59e4a' },
  { project: 'Versova Townhouses', amount: '₹6,00,000', status: 'Due Feb 1', color: '#f59e4a' },
];

export default function VendorEarnings({ showToast }: VendorEarningsProps) {
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setBarHeights(EARNINGS_DATA.months.map(m => m.pct));
    }, 100);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Revenue Chart */}
      <div className="col-span-2 bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(168,85,247,.12), transparent)',
          }} />

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2a3a]">
          <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7]"
              style={{ boxShadow: '0 0 6px rgba(168,85,247,0.6)' }} />
            Revenue — Last 6 Months
          </div>
          <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
            FY 2024–25
          </div>
        </div>

        <div className="p-6">
          {/* Bar Chart */}
          <div className="flex items-flex-end gap-3 h-40 mb-8">
            {EARNINGS_DATA.months.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-[#1e2a3a] flex items-end"
                  style={{
                    height: '100%',
                    minHeight: '6px'
                  }}>
                  <div
                    className="w-full bg-gradient-to-t from-[#7c3aed] to-[#a855f7] transition-all duration-1200 ease-out"
                    style={{
                      height: `${barHeights[i] || 0}%`,
                      boxShadow: '0 0 8px rgba(168,85,247,0.14)'
                    }}
                  />
                </div>
                <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
                  {month.label}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-px bg-[#1e2a3a] border border-[#1e2a3a]">
            <div className="bg-[#161c28] p-5 text-center hover:bg-[#1a2235] transition-all">
              <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-3">Total Earned</div>
              <div className="font-['Syne'] text-2xl font-bold text-[#a855f7]">₹82L</div>
            </div>
            <div className="bg-[#161c28] p-5 text-center hover:bg-[#1a2235] transition-all">
              <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-3">This Month</div>
              <div className="font-['Syne'] text-2xl font-bold text-[#34d399]">₹14L</div>
            </div>
            <div className="bg-[#161c28] p-5 text-center hover:bg-[#1a2235] transition-all">
              <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-3">Pending Payout</div>
              <div className="font-['Syne'] text-2xl font-bold text-[#f59e4a]">₹25L</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(52,211,153,.12), transparent)',
          }} />

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2a3a]">
          <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]"
              style={{ boxShadow: '0 0 6px rgba(52,211,153,.5)' }} />
            Payment Status
          </div>
        </div>

        <div className="space-y-4 p-6">
          {PAYMENTS.map((payment, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-[#161c28] border border-[#1e2a3a] hover:border-[#2a3d52] transition-all">
              <div className="flex-1 text-base text-[#e2eef5] font-['Syne']">{payment.project}</div>
              <div className="font-['Syne'] font-bold text-[#e2eef5]">{payment.amount}</div>
              <div
                className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest px-3 py-1.5 border rounded"
                style={{
                  color: payment.color,
                  borderColor: `${payment.color}7f`,
                  background: `${payment.color}0f`
                }}
              >
                {payment.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
