import React from 'react';
import { ArrowLeft, ArrowRight, Check, MapPin, Navigation, Phone } from 'lucide-react';
import { ServiceAreaLanding, SERVICE_AREA_PAGES } from '../data/serviceAreasData';
import { businessConfig, buildTelUrl, buildWhatsAppUrl } from '../config/businessConfig';
import { GoldBrushSwoosh, PosterCornerWaves, PosterRibbonBanner } from './PosterMotifs';
import { CateringInquiryForm } from './CateringInquiryForm';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ServiceAreaPageProps {
  area: ServiceAreaLanding;
  onNavigateHome: () => void;
  onNavigateArea: (slug: string) => void;
}

export const ServiceAreaPage: React.FC<ServiceAreaPageProps> = ({
  area,
  onNavigateHome,
  onNavigateArea,
}) => {
  const whatsAppUrl = buildWhatsAppUrl(
    `Hello Sahil Caterers! I am looking for catering services in ${area.areaName}.`
  );
  const telUrl = buildTelUrl();

  return (
    <div className="bg-poster-crimson pt-20 text-white">
      <div className="relative overflow-hidden pb-16 pt-6">
        <PosterCornerWaves />

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Clean Breadcrumb Back to Primary Badlapur Site */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#F5DFB5]">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 font-bold hover:text-white cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Sahil Caterers — Badlapur (421503)</span>
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-white/85">{area.areaName}</span>
          </nav>

          {/* Local Hero Heading */}
          <div className="max-w-4xl">
            <p className="text-xs font-bold tracking-[0.2em] text-[#F39200] uppercase">
              {businessConfig.heritageLabel} · Area Served from {businessConfig.fullLocation}
            </p>
            <h1
              className="mt-2 font-display font-black tracking-tight text-[#F5DFB5]"
              style={{
                fontSize: 'clamp(2.1rem, 4.5vw, 3.6rem)',
                textWrap: 'balance',
              }}
            >
              {area.headline}
            </h1>
            <GoldBrushSwoosh className="mt-2 h-2.5 w-48" />
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/95">
              {area.intro}
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/85">
              {area.localRelevance}
            </p>
          </div>

          {/* 2-Column Content & Pre-Filled Inquiry Form */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-[#F5DFB5]/25 bg-[#3A0205]/85 p-6 shadow-xl">
                <h2 className="font-display text-xl font-extrabold text-[#F5DFB5]">
                  Catering Offerings in {area.areaName}
                </h2>
                <p className="mt-1 text-xs font-medium text-[#F39200]">{area.nearbyNote}</p>

                <ul className="mt-5 space-y-3 border-t border-[#F39200]/25 pt-4">
                  {area.popularServices.map((service) => (
                    <li key={service} className="flex items-start gap-2.5 text-sm text-white/95">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2.5 border-t border-[#F39200]/25 pt-5">
                  <div className="flex items-start gap-2.5 text-xs text-white/85">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F39200]" />
                    <span>
                      <strong>Primary Location:</strong> {businessConfig.fullLocation}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white/85">
                    <Phone className="h-4 w-4 shrink-0 text-[#F39200]" />
                    <a
                      href={telUrl}
                      className="font-bold text-[#F5DFB5] hover:underline tabular-nums"
                    >
                      Call: {businessConfig.phone}
                    </a>
                  </div>
                  {whatsAppUrl && (
                    <div className="flex items-center gap-2.5 text-xs text-white/85">
                      <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#F39200]" />
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#F5DFB5] hover:underline tabular-nums"
                      >
                        WhatsApp: {businessConfig.whatsappDisplay}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {whatsAppUrl && (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F39200] px-4 py-2 text-xs font-extrabold text-[#2D0102] hover:bg-white transition-colors"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      <span>WhatsApp Us</span>
                    </a>
                  )}
                  <a
                    href={businessConfig.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#F5DFB5]/45 bg-[#520306] px-4 py-2 text-xs font-bold text-[#F5DFB5] hover:bg-[#6E050A] transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Badlapur Map</span>
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#F5DFB5]/40 bg-[#3A0205]/70 px-5 py-2.5 text-xs font-bold tracking-wide text-[#F5DFB5] uppercase hover:bg-[#5E0307] cursor-pointer"
              >
                <span>Explore Full Menu &amp; Gallery</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="lg:col-span-7">
              <CateringInquiryForm
                prefilledMenuNote={`Event in ${area.areaName}`}
              />
            </div>
          </div>

          {/* Internal Links Across All Service Areas */}
          <div className="mt-16 border-t border-[#F39200]/25 pt-10">
            <PosterRibbonBanner title="Other Areas We Serve" />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {SERVICE_AREA_PAGES.map((other) => {
                const isCurrent = other.slug === area.slug;
                return (
                  <a
                    key={other.slug}
                    href={`/${other.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateArea(other.slug);
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'bg-[#F39200] text-[#2D0102]'
                        : 'border border-[#F5DFB5]/30 bg-[#3A0205]/70 text-[#F5DFB5] hover:border-[#F39200] hover:text-white'
                    }`}
                  >
                    Caterers in {other.areaName}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
