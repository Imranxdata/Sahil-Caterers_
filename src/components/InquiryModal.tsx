import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { CateringInquiryForm } from './CateringInquiryForm';
import { businessConfig } from '../config/businessConfig';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledEventType?: string;
  prefilledMenuNote?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  prefilledEventType,
  prefilledMenuNote,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#F39200]/45 bg-[#3B0205] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#F39200]/30 bg-[#560307] px-5 py-4 text-[#F5DFB5]">
              <div>
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#F39200]">
                  {businessConfig.name} · {businessConfig.heritageLabel}
                </p>
                <h2 id="inquiry-modal-title" className="font-display text-lg font-extrabold text-[#F5DFB5]">
                  Plan Your Event Catering
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close inquiry modal"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5DFB5]/35 text-[#F5DFB5] hover:bg-[#F39200] hover:text-[#2D0102] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[82vh] overflow-y-auto p-4 sm:p-5">
              <CateringInquiryForm
                compact
                prefilledEventType={prefilledEventType}
                prefilledMenuNote={prefilledMenuNote}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
