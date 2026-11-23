import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed } from 'lucide-react';
import { HERO_MEDIA, MEDIA_DIMENSIONS } from '../data/cateringData';
import { businessConfig } from '../config/businessConfig';
import { GoldBrushSwoosh, PosterRibbonBanner } from './PosterMotifs';
import { ResponsivePicture } from './ResponsivePicture';

interface AboutProps {
  onOpenInquiry: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenInquiry }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="bg-poster-crimson py-16 sm:py-24 text-white border-t border-[#F39200]/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PosterRibbonBanner
          title="About Sahil Caterers"
          eyebrow={`Serving Since ${businessConfig.establishedYear} · ${businessConfig.fullLocation}`}
        />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Editorial Photo Frame */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#F5DFB5]/30 bg-[#2C0103] shadow-2xl aspect-[16/11]">
              {!imgError ? (
                <ResponsivePicture
                  jpgSrc={HERO_MEDIA.cateringFeast}
                  alt="Sahil Caterers wedding and celebration buffet catering in Badlapur Maharashtra 421503"
                  width={MEDIA_DIMENSIONS[HERO_MEDIA.cateringFeast].width}
                  height={MEDIA_DIMENSIONS[HERO_MEDIA.cateringFeast].height}
                  sizes="(max-width: 1024px) 92vw, 580px"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#4E0306] p-6 text-center text-[#F5DFB5]">
                  <UtensilsCrossed className="h-10 w-10 opacity-75" />
                  <span className="mt-2 font-display text-lg font-bold">{businessConfig.name}</span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#240102]/90 via-transparent to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-semibold text-[#F39200]">
                  {businessConfig.heritageLabel} · {businessConfig.fullLocation}
                </p>
                <p className="mt-0.5 font-display text-lg font-extrabold text-[#F5DFB5]">
                  {businessConfig.tagline}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Brand Story Copy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <h3
              className="font-display font-black tracking-tight text-[#F5DFB5]"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.6rem)',
                textWrap: 'balance',
              }}
            >
              Whatever the occasion, good food brings everyone together.
            </h3>
            <GoldBrushSwoosh className="mt-2 h-2.5 w-44" />

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/90">
              At Sahil Caterers, serving since 2010, food is at the heart of every celebration.
              With years of experience in catering weddings, celebrations, family functions,
              corporate events, and bulk orders, we prepare thoughtful menus and fresh meals that
              bring people together.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/85">
              Whether you are hosting an intimate family function at home or a large wedding
              celebration in {businessConfig.fullLocation} or nearby cities, we work closely with
              you to create a catering experience suited to your occasion, your guests, and your
              menu preferences.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-4 border-t border-[#F39200]/30 pt-6 sm:grid-cols-2">
              <div className="rounded-xl border border-[#F5DFB5]/20 bg-[#3A0205]/65 p-4">
                <h4 className="font-display text-sm font-bold text-[#F5DFB5]">
                  Thoughtful Separation
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-white/80">
                  Respectful, clearly separated preparation for Pure Vegetarian and Non-Vegetarian
                  menus and biryani handis.
                </p>
              </div>
              <div className="rounded-xl border border-[#F5DFB5]/20 bg-[#3A0205]/65 p-4">
                <h4 className="font-display text-sm font-bold text-[#F5DFB5]">
                  Trusted Experience Since 2010
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-white/80">
                  Serving {businessConfig.fullLocation} since 2010, along with Badlapur East &amp;
                  West, Kalyan, Dombivli, Ambernath, Ulhasnagar, Vitthalwadi, Shahad, Vangani,
                  Shelu, Karjat, and Khopoli.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#F5DFB5] px-7 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide text-[#3A0305] uppercase shadow-lg transition-colors hover:bg-white cursor-pointer"
              >
                Discuss Your Menu
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
