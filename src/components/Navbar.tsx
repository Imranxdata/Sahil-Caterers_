import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { businessConfig, buildTelUrl, buildWhatsAppUrl } from '../config/businessConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onOpenInquiry: () => void;
  onNavigateHome?: (hash?: string) => void;
}

const NAV_LINKS = [
  { label: 'Our Food', href: '#our-food' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, onNavigateHome }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [directContactOpen, setDirectContactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDirectContactOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDirectContactOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const whatsAppUrl = buildWhatsAppUrl(
    'Hello Sahil Caterers! I would like to connect directly regarding catering in Badlapur.'
  );
  const telUrl = buildTelUrl();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome(hash);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#350103]/95 backdrop-blur-md border-b border-[#F39200]/35 shadow-xl'
          : 'bg-gradient-to-b from-[#2A0102]/95 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
        {/* Zone 1: Brand Wordmark + Gold-Accented Serving Since 2010 Heritage Lockup */}
        <a
          href="/#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="inline-flex items-center gap-2 sm:gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F39200] rounded-sm"
        >
          <span className="font-display text-lg sm:text-xl font-black tracking-tight text-[#F5DFB5] whitespace-nowrap">
            {businessConfig.name}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#F39200]/55 bg-gradient-to-b from-[#5E0307]/90 to-[#2D0102]/95 px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold tracking-[0.16em] text-[#F39200] uppercase shadow-[0_2px_10px_rgba(243,146,0,0.16)] whitespace-nowrap">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[#F39200] shrink-0" />
            <span className="xl:hidden">Since {businessConfig.establishedYear}</span>
            <span className="hidden xl:inline">{businessConfig.heritageLabel}</span>
          </span>
        </a>

        {/* Zone 2: 5 Concise Single-Line Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-semibold text-white/90"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={`/${link.href}`}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F5DFB5] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-[#F39200] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F39200] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Combined WhatsApp + Call Single Action Button + Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDirectContactOpen((prev) => !prev)}
              aria-expanded={directContactOpen}
              aria-haspopup="menu"
              aria-label="Contact Sahil Caterers via WhatsApp or Call"
              className="inline-flex h-10 sm:h-11 items-center gap-2 rounded-full border border-[#F39200]/70 bg-[#F5DFB5] px-3.5 sm:px-4 text-xs sm:text-sm font-bold text-[#3A0305] shadow-md transition-all duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F39200] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="inline-flex items-center gap-1.5" aria-hidden="true">
                <WhatsAppIcon className="h-4 w-4 text-[#128C7E]" />
                <span className="text-[#3A0305]/35">/</span>
                <Phone className="h-3.5 w-3.5 text-[#7E060B]" />
              </span>
              <span className="hidden sm:inline">Quick Contact</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  directContactOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {directContactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  role="menu"
                  className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-[#F39200]/40 bg-[#3A0205] p-1.5 shadow-2xl ring-1 ring-black/40"
                >
                  <div className="px-3 py-2 border-b border-[#F5DFB5]/15">
                    <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#F39200] uppercase">
                      {businessConfig.heritageLabel}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#F5DFB5]">
                      {businessConfig.fullLocation}
                    </p>
                  </div>

                  {whatsAppUrl ? (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setDirectContactOpen(false)}
                      className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6E050A] focus-visible:outline-none focus-visible:bg-[#6E050A]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                        <WhatsAppIcon className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col text-left">
                        <span className="leading-tight">WhatsApp Directly</span>
                        <span className="text-xs font-medium text-[#F5DFB5] tabular-nums">
                          {businessConfig.whatsappDisplay}
                        </span>
                      </span>
                    </a>
                  ) : null}

                  <a
                    href={telUrl}
                    role="menuitem"
                    onClick={() => setDirectContactOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6E050A] focus-visible:outline-none focus-visible:bg-[#6E050A]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col text-left">
                      <span className="leading-tight">Call Me Directly</span>
                      <span className="text-xs font-medium text-[#F5DFB5] tabular-nums">
                        {businessConfig.phone}
                      </span>
                    </span>
                  </a>

                  <div className="mt-1 border-t border-[#F5DFB5]/15 pt-1">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setDirectContactOpen(false);
                        onOpenInquiry();
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-[#F5DFB5] transition-colors hover:bg-[#F5DFB5]/10 cursor-pointer"
                    >
                      Open Catering Inquiry Form →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#F5DFB5]/35 text-[#F5DFB5] transition-colors hover:bg-[#F5DFB5]/10 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-[#F39200]/30 bg-[#350103] px-4 pb-5 pt-2 md:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[#F5DFB5]/10">
              <a
                href="/#hero"
                onClick={(e) => handleLinkClick(e, '#hero')}
                className="py-3 text-base font-semibold text-[#F5DFB5] hover:text-white"
              >
                Home
              </a>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-3 text-base font-semibold text-[#F5DFB5] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[#F39200] px-3 py-2 text-xs font-bold text-[#2D0102] tabular-nums"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              )}
              <a
                href={telUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-[#F5DFB5]/45 bg-[#520306] px-3 py-2 text-xs font-bold text-[#F5DFB5] tabular-nums"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>Call {businessConfig.rawPhone}</span>
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="mt-2.5 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#F5DFB5] px-4 py-2.5 text-sm font-bold text-[#3A0305] cursor-pointer"
            >
              Plan Your Event
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
