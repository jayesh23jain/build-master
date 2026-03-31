'use client';

interface VendorProfileProps {
  showToast: (message: string) => void;
}

const VENDOR_DATA = {
  name: 'Kapil Patel',
  email: 'kapil.patel@buildco.in',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  bio: 'Specializing in high-grade steel and timber frameworks. Licensed for projects up to ₹5Cr. CREDAI certified.',
  trade: 'Structural Framing',
  license: 'GC-2024-00881',
  experience: '12 years',
  rating: 5.0,
  reviews: 14,
};

const TRADE_OPTIONS = ['Structural Framing', 'Foundation & Excavation', 'Electrical & MEP', 'Interiors & Woodwork', 'General Contractor', 'Roofing', 'Architecture & Design'];

export default function VendorProfile({ showToast }: VendorProfileProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Personal Details */}
      <div className="col-span-1 bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(168,85,247,.12), transparent)',
          }} />

        <div className="flex items-center gap-2 px-6 py-5 border-b border-[#1e2a3a] font-['Syne'] text-sm font-semibold text-[#e2eef5]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7]"
            style={{ boxShadow: '0 0 6px rgba(168,85,247,0.6)' }} />
          Personal Details
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">Full Name</label>
            <input type="text" defaultValue={VENDOR_DATA.name} className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all" />
          </div>

          <div>
            <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">Email Address</label>
            <input type="email" defaultValue={VENDOR_DATA.email} className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all" />
          </div>

          <div>
            <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">Phone Number</label>
            <input type="tel" defaultValue={VENDOR_DATA.phone} className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all" />
          </div>

          <div>
            <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">Location</label>
            <input type="text" defaultValue={VENDOR_DATA.location} className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all" />
          </div>

          <div>
            <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">Bio / Description</label>
            <textarea defaultValue={VENDOR_DATA.bio} className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all resize-vertical min-h-24" />
          </div>

          <button
            onClick={() => showToast('Profile updated!')}
            className="w-full px-5 py-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 mt-3"
            style={{
              boxShadow: '0 0 10px rgba(168,85,247,0.14)'
            }}
          >
            Save Changes →
          </button>
        </div>
      </div>

      {/* Trade & Credentials + Rating */}
      <div className="col-span-2 space-y-6">
        {/* Trade & Credentials */}
        <div className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(52,211,153,.12), transparent)',
            }} />

          <div className="flex items-center gap-2 px-6 py-5 border-b border-[#1e2a3a] font-['Syne'] text-sm font-semibold text-[#e2eef5]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]"
              style={{ boxShadow: '0 0 6px rgba(52,211,153,.5)' }} />
            Trade & Credentials
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">Trade / Specialty</label>
              <select defaultValue={VENDOR_DATA.trade} className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all cursor-pointer">
                {TRADE_OPTIONS.map((trade) => (
                  <option key={trade} value={trade} style={{ background: '#161c28' }}>
                    {trade}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">License Number</label>
                <input type="text" defaultValue={VENDOR_DATA.license} className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all" />
              </div>

              <div>
                <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">Years of Experience</label>
                <input type="text" defaultValue={VENDOR_DATA.experience} className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all" />
              </div>
            </div>

            <button
              onClick={() => showToast('Credentials updated!')}
              className="w-full px-5 py-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                boxShadow: '0 0 10px rgba(168,85,247,0.14)'
              }}
            >
              Update Credentials →
            </button>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(245,158,74,.12), transparent)',
            }} />

          <div className="flex items-center gap-2 px-6 py-5 border-b border-[#1e2a3a] font-['Syne'] text-sm font-semibold text-[#e2eef5]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f59e4a]"
              style={{ boxShadow: '0 0 6px rgba(245,158,74,.4)' }} />
            Rating Overview
          </div>

          <div className="p-6 text-center">
            <div className="font-['Syne'] text-6xl font-bold text-[#a855f7] tracking-tight mb-4">
              {VENDOR_DATA.rating}
            </div>
            <div className="text-3xl tracking-widest mb-3" style={{ color: '#f59e4a' }}>★★★★★</div>
            <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
              Based on {VENDOR_DATA.reviews} reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
