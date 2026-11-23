/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FoodCategories } from './components/FoodCategories';
import { GallerySection } from './components/GallerySection';
import { Occasions } from './components/Occasions';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { InquiryModal } from './components/InquiryModal';
import { SeoHead } from './components/SeoHead';
import { ServiceAreaPage } from './components/ServiceAreaPage';
import { findServiceAreaBySlug } from './data/serviceAreasData';
import { businessConfig, buildTelUrl, buildWhatsAppUrl } from './config/businessConfig';

const HOME_SEO = {
  title: 'Sahil Caterers — Serving Since 2010 | Best Caterers in Badlapur (421503)',
  description:
    'Catering services in Badlapur since 2010. Sahil Caterers (Badlapur, Maharashtra 421503, India) caters weddings, birthdays, corporate events, and bulk orders across Badlapur, Kalyan, Dombivli, Ambernath, Ulhasnagar, Vangani, Shelu, Karjat & Khopoli.',
};

const NOT_FOUND_SEO = {
  title: 'Page Not Found | Sahil Caterers — Badlapur, Maharashtra',
  description:
    'The page you requested could not be found. Return to Sahil Caterers for event catering services in Badlapur, Maharashtra 421503, India.',
};

export default function App() {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [prefilledEventType, setPrefilledEventType] = useState<string>('');
  const [prefilledMenuNote, setPrefilledMenuNote] = useState<string>('');

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const isHomeRoute = normalizedPath === '/' || normalizedPath === '/index.html';
  const activeArea = !isHomeRoute ? findServiceAreaBySlug(normalizedPath) : undefined;
  const isNotFound = !isHomeRoute && !activeArea;

  const navigateTo = (targetPath: string, hash?: string) => {
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', hash ? `${targetPath}${hash}` : targetPath);
      setPathname(targetPath);
    }
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateHome = (hash?: string) => {
    navigateTo('/', hash);
  };

  const handleNavigateArea = (slug: string) => {
    navigateTo(`/${slug}`);
  };

  const handleOpenGeneralInquiry = () => {
    setInquiryModalOpen(true);
  };

  const handleSelectCategoryForInquiry = (categoryTitle: string) => {
    setPrefilledMenuNote(categoryTitle);
    setInquiryModalOpen(true);
  };

  const handleSelectOccasionForInquiry = (eventType: string) => {
    setPrefilledEventType(eventType);
    setInquiryModalOpen(true);
  };

  const seoTitle = activeArea
    ? activeArea.seoTitle
    : isNotFound
    ? NOT_FOUND_SEO.title
    : HOME_SEO.title;
  const seoDescription = activeArea
    ? activeArea.metaDescription
    : isNotFound
    ? NOT_FOUND_SEO.description
    : HOME_SEO.description;

  const whatsAppUrl = buildWhatsAppUrl(
    'Hello Sahil Caterers! I would like to enquire about catering services.'
  );

  return (
    <MotionConfig reducedMotion="user">
      <SeoHead title={seoTitle} description={seoDescription} noIndex={isNotFound} />

      <div className="min-h-screen flex flex-col bg-[#3E0205] text-white overflow-x-clip">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#F39200] focus:px-4 focus:py-2 focus:text-xs focus:font-extrabold focus:text-[#2D0102] focus:shadow-lg"
        >
          Skip to main content
        </a>

        <Navbar
          onOpenInquiry={handleOpenGeneralInquiry}
          onNavigateHome={!isHomeRoute ? handleNavigateHome : undefined}
        />

        <main id="main-content" className="flex-1">
          {activeArea ? (
            <ServiceAreaPage
              area={activeArea}
              onNavigateHome={() => handleNavigateHome()}
              onNavigateArea={handleNavigateArea}
            />
          ) : isNotFound ? (
            <section className="bg-poster-crimson flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
              <p className="text-xs font-extrabold tracking-[0.22em] text-[#F39200] uppercase">
                {businessConfig.name} · {businessConfig.heritageLabel}
              </p>
              <h1 className="mt-3 font-display text-3xl sm:text-5xl font-black text-[#F5DFB5]">
                Page Not Found
              </h1>
              <p className="mt-4 max-w-md text-sm sm:text-base text-white/85">
                The page you are looking for does not exist or may have moved. Explore our menus,
                service areas, or contact us directly for catering in Badlapur and nearby cities.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleNavigateHome()}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#F5DFB5] px-6 py-2.5 text-xs sm:text-sm font-extrabold text-[#3A0305] uppercase hover:bg-white cursor-pointer"
                >
                  Back to Homepage
                </button>
                <a
                  href={buildTelUrl()}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#F5DFB5]/45 bg-[#520306] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#F5DFB5] hover:bg-[#6E050A] tabular-nums"
                >
                  Call {businessConfig.rawPhone}
                </a>
                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#F39200] px-5 py-2.5 text-xs sm:text-sm font-extrabold text-[#2D0102] hover:bg-white tabular-nums"
                  >
                    WhatsApp {businessConfig.whatsappRaw}
                  </a>
                )}
              </div>
            </section>
          ) : (
            <>
              <Hero onPlanEvent={handleOpenGeneralInquiry} />
              <FoodCategories onSelectCategoryForInquiry={handleSelectCategoryForInquiry} />
              <GallerySection />
              <Occasions onSelectOccasion={handleSelectOccasionForInquiry} />
              <About onOpenInquiry={handleOpenGeneralInquiry} />
              <WhyChooseUs />
              <LocationContact
                prefilledEventType={prefilledEventType}
                prefilledMenuNote={prefilledMenuNote}
                onSelectServiceArea={handleNavigateArea}
              />
            </>
          )}
        </main>

        <Footer
          onOpenInquiry={handleOpenGeneralInquiry}
          onNavigateHome={!isHomeRoute ? handleNavigateHome : undefined}
          onSelectServiceArea={handleNavigateArea}
        />
        <FloatingWhatsAppButton />

        <InquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          prefilledEventType={prefilledEventType}
          prefilledMenuNote={prefilledMenuNote}
        />
      </div>
    </MotionConfig>
  );
}
