import React from 'react';
import { ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { businessConfig, buildTelUrl, buildWhatsAppUrl } from '../config/businessConfig';
import { CateringInquiryForm } from './CateringInquiryForm';
import { PosterRibbonBanner } from './PosterMotifs';
import { WhatsAppIcon } from './WhatsAppIcon';

import { SERVICE_AREA_PAGES } from '../data/serviceAreasData';

interface LocationContactProps {
  prefilledEventType?: string;
  prefilledMenuNote?: string;
  onSelectServiceArea?: (slug: string) => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({
  prefilledEventType,
  prefilledMenuNote,
  onSelectServiceArea,
}) => {
  const whatsAppUrl = buildWhatsAppUrl(
    'Hello Sahil Caterers! I would like to discuss catering for an upcoming event in Badlapur.'
  );
  const telUrl = buildTelUrl();

  return (
    <section
      id="contact"
      className="bg-poster-crimson py-16 sm:py-24 text-white border-t border-[#F39200]/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PosterRibbonBanner
          title="Contact & Catering Inquiry"
          eyebrow="Gather everyone. We’ll take care of the food."
        />

        <p className="mx-auto mt-4 max-w-3xl text-center text-sm sm:text-base font-medium text-[#F5DFB5]/90">
          Primary location in {businessConfig.fullLocation}—serving catering across Badlapur East,
          Badlapur West, Kalyan, Dombivli, Ambernath, Ulhasnagar, Vitthalwadi, Shahad, Vangani,
          Shelu, Karjat, Khopoli, and nearby towns.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Location, Google Maps, Direct Phone & WhatsApp */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-[#F5DFB5]/25 bg-[#3A0205]/85 p-6 shadow-xl">
              <h3 className="font-display text-2xl font-black text-[#F5DFB5]">
                {businessConfig.name}
              </h3>
              <p className="mt-1 text-sm text-white/85">
                Primary Location: <strong>{businessConfig.fullLocation}</strong>. Wedding, birthday,
                corporate &amp; bulk food catering across surrounding cities.
              </p>

              <div className="mt-6 space-y-4 border-t border-[#F39200]/30 pt-5">
                <a
                  href={businessConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-white hover:text-[#F5DFB5] transition-colors"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block font-bold text-[#F5DFB5]">Primary Business Address</strong>
                    <span className="underline decoration-[#F5DFB5]/40 underline-offset-2">
                      {businessConfig.fullLocation}
                    </span>
                  </span>
                </a>

                <a
                  href={telUrl}
                  className="flex items-start gap-3 text-sm text-white hover:text-[#F5DFB5] transition-colors"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block font-bold text-[#F5DFB5]">Calling Number</strong>
                    <span className="text-base font-extrabold text-white tabular-nums">
                      {businessConfig.rawPhone}
                    </span>
                  </span>
                </a>

                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-white hover:text-[#F5DFB5] transition-colors"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                      <WhatsAppIcon className="h-4 w-4" />
                    </span>
                    <span>
                      <strong className="block font-bold text-[#F5DFB5]">WhatsApp Number</strong>
                      <span className="text-base font-extrabold text-white tabular-nums">
                        {businessConfig.whatsappRaw}
                      </span>
                    </span>
                  </a>
                )}

                {businessConfig.openingHours ? (
                  <p className="text-xs text-white/80">Hours: {businessConfig.openingHours}</p>
                ) : null}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F39200] px-4 py-2.5 text-xs font-extrabold text-[#2D0102] transition-colors hover:bg-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>WhatsApp Now</span>
                  </a>
                )}

                <a
                  href={businessConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#F5DFB5]/45 bg-[#520306] px-4 py-2.5 text-xs font-bold text-[#F5DFB5] transition-colors hover:bg-[#6E050A]"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </a>
              </div>

              <div className="mt-5 border-t border-[#F39200]/25 pt-4">
                <p className="text-xs font-bold text-[#F5DFB5]">
                  Areas We Serve (Click for local service details)
                </p>
                <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1.5 text-xs text-white/85">
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
                        className="font-medium underline decoration-[#F39200]/50 underline-offset-2 transition-colors hover:text-[#F39200]"
                      >
                        {area.areaName}
                      </a>
                      {idx < SERVICE_AREA_PAGES.length - 1 && (
                        <span aria-hidden="true" className="text-white/35">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Embedded Badlapur East Google Map */}
            <div className="overflow-hidden rounded-2xl border border-[#F5DFB5]/25 bg-[#3A0205] shadow-xl">
              <div className="flex items-center justify-between border-b border-[#F39200]/25 px-4 py-3">
                <span className="text-xs font-bold text-[#F5DFB5]">
                  Map · {businessConfig.fullLocation}
                </span>
                <a
                  href={businessConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#F39200] hover:underline"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="aspect-[16/10] w-full bg-[#2A0102]">
                <iframe
                  title="Sahil Caterers Location Map in Badlapur East, Maharashtra"
                  src={businessConfig.googleMapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Multi-Step Catering Inquiry System */}
          <div id="inquiry" className="lg:col-span-7">
            <CateringInquiryForm
              prefilledEventType={prefilledEventType}
              prefilledMenuNote={prefilledMenuNote}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
