'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface VendorQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string | null;
  showToast: (message: string) => void;
}

const REQUESTS = [
  { id: 'req-001', project: 'Greenfield Residence', phase: 'Structural Framing' },
  { id: 'req-002', project: 'Andheri Commercial Block', phase: 'Structural Framing' },
  { id: 'req-005', project: 'Juhu Duplex', phase: 'Structural Framing' },
];

export default function VendorQuoteModal({ isOpen, onClose, requestId, showToast }: VendorQuoteModalProps) {
  const [price, setPrice] = useState('');
  const [timeline, setTimeline] = useState('');
  const [desc, setDesc] = useState('');
  const [materials, setMaterials] = useState('');
  const [experience, setExperience] = useState('12 years / 60+ projects');
  const [team, setTeam] = useState('8 workers + site supervisor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRequestInfo = () => {
    if (!requestId) return { project: 'Submit Quote', phase: 'Project Quote' };
    const request = REQUESTS.find(r => r.id === requestId);
    return request || { project: requestId, phase: 'Structural Framing' };
  };

  const requestInfo = getRequestInfo();

  const handleSubmit = () => {
    if (!price) {
      showToast('Please enter an estimated price.');
      return;
    }
    if (!desc) {
      showToast('Please add a work description.');
      return;
    }
    if (!materials) {
      showToast('Please list required materials.');
      return;
    }
    if (!experience) {
      showToast('Please enter your experience.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onClose();
      setIsSubmitting(false);
      setPrice('');
      setTimeline('');
      setDesc('');
      setMaterials('');
      showToast('Quote submitted successfully!');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/78 z-[200] flex items-center justify-center backdrop-blur"
    >
      <motion.div
        initial={{ opacity: 0, y: 5, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 5, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111520] border border-[#1e2a3a] w-full max-w-[540px] max-h-[88vh] overflow-y-auto relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, #a855f7, #d946ef, transparent)',
            boxShadow: '0 0 24px rgba(168,85,247,0.14)'
          }} />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#1e2a3a]">
          <div>
            <h3 className="font-['Syne'] text-xl font-bold text-[#e2eef5]">Submit Project Quote</h3>
            <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#a855f7] mt-2">
              {requestInfo.project} — {requestInfo.phase}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#161c28] border border-[#1e2a3a] text-[#4a6070] cursor-pointer flex items-center justify-center text-lg transition-all hover:border-[#f87171] hover:text-[#f87171]"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">
                Estimated Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 2500000"
                className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all"
              />
            </div>
            <div>
              <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">
                Timeline (Days)
              </label>
              <input
                type="number"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g. 45"
                className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">
              Work Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe the scope of work, methodology, and approach..."
              className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all resize-vertical min-h-24"
            />
          </div>

          <div className="mb-5">
            <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">
              Raw Materials Required
            </label>
            <textarea
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              placeholder="Cement, Bricks, Steel rods, etc."
              className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all resize-vertical min-h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">
                Relevant Experience (Years / Projects)
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 12 years / 60+ projects"
                className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all"
              />
            </div>
            <div>
              <label className="block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-2.5">
                Team Size
              </label>
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="e.g. 8 workers + supervisor"
                className="w-full px-4 py-3 bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] text-base outline-none focus:border-[#a855f7] focus:shadow-[0_0_0_1px_rgba(168,85,247,0.1)] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-4 border-t border-[#1e2a3a] flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#2a3d52] hover:text-[#e2eef5]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: isSubmitting ? 'none' : '0 0 10px rgba(168,85,247,0.14)'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'SUBMIT QUOTE →'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
