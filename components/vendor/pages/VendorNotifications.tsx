'use client';

interface VendorNotificationsProps {
  showToast: (message: string) => void;
}

const NOTIFICATIONS = [
  { icon: '◈', cls: 'purple', text: '<strong>New request matching your trade</strong> — Juhu Duplex needs steel framing. 3 bids already.', time: '4h ago', unread: true },
  { icon: '✓', cls: 'green', text: 'Your quote for <strong>Borivali Row Houses</strong> was accepted! Project starts Jan 20.', time: '1d ago', unread: true },
  { icon: '⚑', cls: 'amber', text: 'Client <strong>Greenfield Residence</strong> is reviewing your quote. Expected decision by Jan 15.', time: '2d ago', unread: true },
  { icon: '✉', cls: 'purple', text: '<strong>New message</strong> from Rahul M. — "Can you adjust the timeline to 40 days?"', time: '2d ago', unread: true },
  { icon: '✗', cls: 'red', text: 'Your quote for <strong>Dadar Commercial</strong> was not selected. Another vendor offered lower.', time: '5d ago', unread: false },
  { icon: '◈', cls: 'purple', text: '3 new requests posted in <strong>Structural Framing</strong> category this week.', time: '1w ago', unread: false },
];

export default function VendorNotifications({ showToast }: VendorNotificationsProps) {
  const getColorClasses = (cls: string) => {
    const colors = {
      purple: { bg: '#a855f70f', border: '#a855f733', text: '#a855f7' },
      green: { bg: '#34d3990f', border: '#34d39933', text: '#34d399' },
      amber: { bg: '#f59e4a0f', border: '#f59e4a33', text: '#f59e4a' },
      red: { bg: '#f8717110', border: '#f871713a', text: '#f87171' },
    };
    return colors[cls as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(248,113,113,.12), transparent)',
        }} />

      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2a3a]">
        <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#f87171]"
            style={{ boxShadow: '0 0 6px rgba(248,113,113,.5)' }} />
          All Notifications
        </div>
        <button
          onClick={() => showToast('All marked as read')}
          className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#7a9aaa] hover:text-[#a855f7] transition-colors cursor-pointer"
        >
          Mark all read
        </button>
      </div>

      <div className="divide-y divide-[#1e2a3a] p-6">
        {NOTIFICATIONS.map((notif, i) => {
          const colors = getColorClasses(notif.cls);
          return (
            <div key={i} className={`flex gap-4 py-5 ${notif.unread ? 'bg-[#a855f70a] px-4 -mx-4' : ''}`}>
              {notif.unread && (
                <div className="w-1 h-1 rounded-full bg-[#a855f7] flex-shrink-0 mt-2.5"
                  style={{ boxShadow: '0 0 5px rgba(168,85,247,0.8)' }} />
              )}
              {!notif.unread && <div className="w-1 flex-shrink-0" />}

              <div
                className="w-8 h-8 rounded flex items-center justify-center text-sm flex-shrink-0"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                {notif.icon}
              </div>

              <div className="flex-1">
                <div
                  className="text-base mb-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: notif.text }}
                  style={{ color: '#e2eef5' }}
                />
                <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
                  {notif.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
