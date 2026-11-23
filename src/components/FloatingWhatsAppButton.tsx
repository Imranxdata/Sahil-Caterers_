import React from 'react';
import { buildWhatsAppUrl } from '../config/businessConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsAppButton: React.FC = () => {
  const whatsAppUrl = buildWhatsAppUrl(
    'Hello Sahil Caterers! I would like to enquire about catering services in Badlapur East.'
  );

  if (!whatsAppUrl) return null;

  return (
    <a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sahil Caterers on WhatsApp"
      className="group fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#F39200] px-3.5 sm:px-4 text-[#2D0102] shadow-xl ring-2 ring-[#F5DFB5]/80 transition-all duration-200 hover:bg-white hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline text-xs font-extrabold tracking-wide whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  );
};
