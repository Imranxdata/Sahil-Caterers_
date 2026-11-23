import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { businessConfig, buildTelUrl, buildWhatsAppUrl } from '../config/businessConfig';
import { GoldBrushSwoosh } from './PosterMotifs';
import { WhatsAppIcon } from './WhatsAppIcon';

import { SERVICE_AREA_PAGES } from '../data/serviceAreasData';

interface FooterProps {
  onOpenInquiry: () => void;
  onNavigateHome?: (hash?: string) => void;
  onSelectServiceArea?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenInquiry,
  onNavigateHome,
  onSelectServiceArea,
}) => {
  const whatsAppUrl = buildWhatsAppUrl(
    'Hello Sahil Caterers! I would like to enquire about catering services.'
  );
  const telUrl = buildTelUrl();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome(hash);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#2A0102] text-white border-t border-[#F39200]/35">
      {/* Bottom-Right Subtle Corner Wave Echoing Poster */}
      <svg
        viewBox="0 0 220 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-24 w-36 sm:h-28 sm:w-44 opacity-85"
      >
        <path
          d="M220 140H35C52 102 78 86 118 76C166 64 194 42 220 12V140Z"
          fill="#E07200"
        />
        <path
          d="M220 140H60C76 110 100 94 136 85C175 76 200 56 220 30V140Z"
          fill="#F39200"
        />
        <path
          d="M28 140C47 98 75 80 116 70C162 58 192 36 220 5"
          stroke="#F5DFB5"
          strokeWidth="2"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Lockup */}
          <div className="md:col-span-5">
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#F5DFB5]">
                {businessConfig.name}
              </span>
              <span className="mt-0.5 text-[11px] font-extrabold tracking-[0.26em] text-[#F39200] uppercase">
                {businessConfig.heritageLabel}
              </span>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">
              Freshly prepared Vegetarian and Non-Vegetarian catering—Biryani, Pulao, Thalis,
              Starters, Desserts, and Fresh Juices for weddings, celebrations, and gatherings from{' '}
              {businessConfig.fullLocation}.
            </p>

            <div className="mt-4 inline-flex flex-col">
              <span className="font-script text-2xl sm:text-3xl font-bold leading-none text-white">
                {businessConfig.tagline}
              </span>
              <GoldBrushSwoosh className="mt-1 h-2.5 w-48" />
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#F39200] px-5 py-2 text-xs font-extrabold text-[#2D0102] transition-colors hover:bg-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              )}
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex min-h-[40px] items-center rounded-full border border-[#F5DFB5]/45 px-5 py-2 text-xs font-bold text-[#F5DFB5] transition-colors hover:bg-[#5E0307] cursor-pointer"
              >
                Plan Your Event
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xs font-extrabold tracking-widest text-[#F5DFB5] uppercase">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>
                <a
                  href="/#hero"
                  onClick={(e) => handleNavClick(e, '#hero')}
                  className="hover:text-[#F39200] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#our-food"
                  onClick={(e) => handleNavClick(e, '#our-food')}
                  className="hover:text-[#F39200] transition-colors"
                >
                  Our Food
                </a>
              </li>
              <li>
                <a
                  href="/#occasions"
                  onClick={(e) => handleNavClick(e, '#occasions')}
                  className="hover:text-[#F39200] transition-colors"
                >
                  Occasions
                </a>
              </li>
              <li>
                <a
                  href="/#gallery"
                  onClick={(e) => handleNavClick(e, '#gallery')}
                  className="hover:text-[#F39200] transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-[#F39200] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="hover:text-[#F39200] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xs font-extrabold tracking-widest text-[#F5DFB5] uppercase">
              Occasions
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>Weddings &amp; Engagements</li>
              <li>Haldi &amp; Wedding Functions</li>
              <li>Birthday &amp; Private Parties</li>
              <li>Corporate &amp; Office Lunches</li>
              <li>Religious &amp; Family Gatherings</li>
              <li>Community &amp; Custom Events</li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs font-extrabold tracking-widest text-[#F5DFB5] uppercase">
              Reach Us
            </h3>
            <div className="mt-3 space-y-3 text-sm text-white/90">
              <a
                href={businessConfig.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#F5DFB5] transition-colors"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span>{businessConfig.fullLocation}</span>
              </a>
              <a
                href={telUrl}
                className="flex items-center gap-2.5 font-bold text-white hover:text-[#F5DFB5] tabular-nums"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <span>Call: {businessConfig.rawPhone}</span>
              </a>
              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-bold text-white hover:text-[#F5DFB5] tabular-nums"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>WhatsApp: {businessConfig.whatsappRaw}</span>
                </a>
              )}
              <div className="pt-1 text-xs leading-relaxed text-white/75">
                <span className="font-semibold text-[#F5DFB5]">Areas Served: </span>
                {SERVICE_AREA_PAGES.map((area, idx) => (
                  <React.Fragment key={area.slug}>
                    <a
                      href={`/${area.slug}`}
                      onClick={(e) => {
                        if (onSelectServiceArea) {
                          e.preventDefault();
                          onSelectServiceArea(area.slug);
                        }
                      }}
                      className="hover:text-[#F39200] hover:underline"
                    >
                      {area.areaName}
                    </a>
                    {idx < SERVICE_AREA_PAGES.length - 1 ? ', ' : ''}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-[#F39200]/25 pt-6 text-xs text-white/70 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {businessConfig.name}. All rights reserved.
          </p>
          <p>
            Catering Services in {businessConfig.fullLocation} · {businessConfig.heritageLabel}
          </p>
        </div>
      </div>
    </footer>
  );
};
