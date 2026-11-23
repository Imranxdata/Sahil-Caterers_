import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, MapPin, Phone, UtensilsCrossed } from 'lucide-react';
import { HERO_MEDIA, MEDIA_DIMENSIONS } from '../data/cateringData';
import { businessConfig, buildTelUrl, buildWhatsAppUrl } from '../config/businessConfig';
import { GoldBrushSwoosh, PosterCornerWaves } from './PosterMotifs';
import { ResponsivePicture } from './ResponsivePicture';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onPlanEvent: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlanEvent }) => {
  const heroRef = useRef<HTMLElement>(null);
  const [nonVegImgError, setNonVegImgError] = useState(false);
  const [vegImgError, setVegImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const leftDishY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const rightDishY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  const whatsAppUrl = buildWhatsAppUrl(
    'Hello Sahil Caterers! I would like to enquire about catering services in Badlapur East.'
  );
  const telUrl = buildTelUrl();

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-poster-crimson pt-16 text-white"
    >
      {/* Exact Corner Amber-Orange Waves with Cream Outline */}
      <PosterCornerWaves />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 pb-6 pt-4 sm:px-6 lg:px-8 lg:py-6">
        {/* Exact Poster Title Lockup: SAHIL CATERERS in #F5DFB5 Montserrat Black + Tapered Divider + Script Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >
          <h1
            className="font-display font-black leading-[0.9] tracking-tight text-[#F5DFB5] drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
            style={{
              fontSize: 'clamp(2.85rem, 7vw, 5.25rem)',
              textWrap: 'balance',
            }}
          >
            Sahil <span className="block sm:inline">Caterers</span>
          </h1>

          {/* Sculpted Gold-Accented Serving Since 2010 Heritage Crest Flanking Tapered Lines */}
          <div className="mt-3 flex w-full max-w-xl items-center gap-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#F39200]/70 to-[#F5DFB5]/90" />
            <div className="inline-flex items-center gap-2 rounded-sm border border-[#F39200]/70 bg-gradient-to-b from-[#5E0307]/95 to-[#2D0102]/95 px-3.5 py-1 shadow-[0_6px_22px_rgba(243,146,0,0.22)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[#F39200]" />
              <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.26em] text-[#F5DFB5] uppercase whitespace-nowrap">
                Serving Since{' '}
                <span className="text-[#F39200]">{businessConfig.establishedYear}</span>
              </span>
              <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[#F39200]" />
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#F39200]/70 to-[#F5DFB5]/90" />
          </div>

          <p className="mt-2 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F39200] uppercase">
            {businessConfig.fullLocation}
          </p>

          <div className="mt-1.5 flex flex-col items-center">
            <p className="font-display text-lg sm:text-2xl font-semibold italic text-white">
              Good Food. Great Gatherings. Unforgettable Moments.
            </p>
            <GoldBrushSwoosh className="mt-1 h-2.5 w-48 sm:w-64" />
          </div>
        </motion.div>

        {/* Central Split Biryani Showcase: LEFT = Non-Veg, RIGHT = Veg */}
        <div className="relative my-4 sm:my-5 flex flex-1 items-center">
          <div className="relative grid w-full grid-cols-2 items-stretch gap-3 sm:gap-7 lg:gap-12">
            {/* Animated Vertical Dividing Line */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="pointer-events-none absolute left-1/2 top-2 bottom-2 z-20 w-[1.5px] -translate-x-1/2 origin-top bg-gradient-to-b from-transparent via-[#F5DFB5]/75 to-transparent"
            />

            {/* LEFT SIDE — NON-VEGETARIAN BIRYANI */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: leftDishY }}
              className="group relative flex flex-col justify-between"
            >
              {/* Exact Poster Script Label + Gold Swoosh */}
              <div className="mb-2 flex items-end justify-between pr-2 sm:pr-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-xs border border-[#F5DFB5] bg-[#C83E2B]"
                      title="Non-Vegetarian"
                    />
                    <span className="font-script text-2xl sm:text-4xl font-bold leading-none text-white">
                      Non-Veg
                    </span>
                  </div>
                  <GoldBrushSwoosh className="mt-0.5 h-2 w-20 sm:w-28" />
                </div>
                <span className="hidden md:inline text-xs font-semibold text-[#F5DFB5]">
                  Signature Non-Veg Biryani
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-[#F5DFB5]/30 bg-[#2C0103] shadow-[0_20px_50px_rgba(0,0,0,0.55)] aspect-[4/5] sm:aspect-[4/4] lg:aspect-[16/12]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-1/4 top-2 z-10 h-20 rounded-full bg-white/10 blur-xl animate-steam-slow"
                />

                {!nonVegImgError ? (
                  <ResponsivePicture
                    jpgSrc={HERO_MEDIA.nonVegBiryani}
                    alt="Sahil Caterers Non-Vegetarian Dum Biryani catering in Badlapur Maharashtra 421503"
                    width={MEDIA_DIMENSIONS[HERO_MEDIA.nonVegBiryani].width}
                    height={MEDIA_DIMENSIONS[HERO_MEDIA.nonVegBiryani].height}
                    sizes="(max-width: 640px) 46vw, 560px"
                    loading="eager"
                    fetchPriority="high"
                    onError={() => setNonVegImgError(true)}
                    className="h-full w-full object-cover object-center animate-float-gentle transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#4E0306] p-4 text-center">
                    <UtensilsCrossed className="h-8 w-8 text-[#F5DFB5]" />
                    <span className="mt-2 font-display text-sm font-bold text-[#F5DFB5]">
                      Signature Non-Veg Dum Biryani
                    </span>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#240102]/95 via-[#240102]/20 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#1E0102] via-[#240102]/90 to-transparent p-2.5 sm:p-5">
                  <h2 className="font-display text-xs sm:text-xl lg:text-2xl font-extrabold leading-tight text-[#F5DFB5]">
                    All Kinds of Biryani — Non-Veg &amp; Veg
                  </h2>
                  <p className="mt-1 text-[10px] sm:text-xs font-medium leading-snug text-white/95 line-clamp-3 sm:line-clamp-none">
                    We cook all kinds of Veg &amp; Non-Veg Biryani, Pulaos, Veg &amp; Non-Veg
                    Thalis, Starters, Desserts, Fresh Juices &amp; complete event catering.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE — VEGETARIAN BIRYANI */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              style={{ y: rightDishY }}
              className="group relative flex flex-col justify-between"
            >
              {/* Exact Poster Script Label + Gold Swoosh */}
              <div className="mb-2 flex items-end justify-between pl-2 sm:pl-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-xs border border-[#F5DFB5] bg-[#2B8A3E]"
                      title="Pure Vegetarian"
                    />
                    <span className="font-script text-2xl sm:text-4xl font-bold leading-none text-white">
                      Veg
                    </span>
                  </div>
                  <GoldBrushSwoosh className="mt-0.5 h-2 w-16 sm:w-24" />
                </div>
                <span className="hidden md:inline text-xs font-semibold text-[#F5DFB5]">
                  Pure Veg · Paneer &amp; Spices
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-[#F5DFB5]/30 bg-[#2C0103] shadow-[0_20px_50px_rgba(0,0,0,0.55)] aspect-[4/5] sm:aspect-[4/4] lg:aspect-[16/12]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-1/4 top-2 z-10 h-20 rounded-full bg-white/10 blur-xl animate-steam-delayed"
                />

                {!vegImgError ? (
                  <ResponsivePicture
                    jpgSrc={HERO_MEDIA.vegBiryani}
                    alt="Sahil Caterers Pure Vegetarian Dum Biryani catering in Badlapur Maharashtra 421503"
                    width={MEDIA_DIMENSIONS[HERO_MEDIA.vegBiryani].width}
                    height={MEDIA_DIMENSIONS[HERO_MEDIA.vegBiryani].height}
                    sizes="(max-width: 640px) 46vw, 560px"
                    loading="eager"
                    fetchPriority="high"
                    onError={() => setVegImgError(true)}
                    className="h-full w-full object-cover object-center animate-float-gentle-delayed transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#4E0306] p-4 text-center">
                    <UtensilsCrossed className="h-8 w-8 text-[#F5DFB5]" />
                    <span className="mt-2 font-display text-sm font-bold text-[#F5DFB5]">
                      Pure Veg Dum Biryani
                    </span>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#240102]/95 via-[#240102]/20 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 sm:p-5">
                  <h2 className="font-display text-xs sm:text-xl lg:text-2xl font-extrabold leading-tight text-[#F5DFB5]">
                    Vegetable &amp; Paneer Biryani
                  </h2>
                  <p className="mt-1 text-[10px] sm:text-xs font-medium leading-snug text-white/90 line-clamp-2 sm:line-clamp-none">
                    Prepared separately in dedicated veg handis with fragrant herbs &amp; spices.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Supporting Copy & Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >
          <p className="max-w-2xl text-xs sm:text-sm md:text-base font-medium leading-relaxed text-white/90">
            Trusted catering experience since 2010—bringing thoughtfully prepared food and reliable
            service to weddings, family functions, corporate events, and bulk orders.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onPlanEvent}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F5DFB5] px-6 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide text-[#3A0305] uppercase shadow-lg transition-all duration-150 hover:bg-white cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#our-food"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#F39200]/75 bg-[#3A0205]/70 px-6 py-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#F5DFB5] uppercase transition-colors duration-150 hover:bg-[#6D050A] whitespace-nowrap shrink-0"
            >
              <span>Explore Our Food</span>
            </a>
          </div>
        </motion.div>

        {/* Poster Bottom Contact Bar with Orange Circular Icons */}
        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#F39200]/35 pt-4 text-xs sm:grid-cols-3 sm:items-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
            <a
              href={telUrl}
              aria-label={`Call Sahil Caterers on ${businessConfig.rawPhone}`}
              className="inline-flex items-center gap-2 font-bold tracking-wide text-white hover:text-[#F5DFB5] tabular-nums"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span>{businessConfig.rawPhone}</span>
            </a>
            {whatsAppUrl && (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp Sahil Caterers on ${businessConfig.whatsappRaw}`}
                className="inline-flex items-center gap-2 font-bold tracking-wide text-white hover:text-[#F5DFB5] tabular-nums"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102] transition-colors hover:bg-white">
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </span>
                <span>{businessConfig.whatsappRaw}</span>
              </a>
            )}
          </div>

          <div className="flex justify-center">
            <a
              href="#our-food"
              className="inline-flex items-center gap-1.5 font-semibold text-[#F5DFB5] hover:text-white"
            >
              <span>Explore Food Categories</span>
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
              <MapPin className="h-3.5 w-3.5" />
            </span>
            <span className="font-semibold text-white">{businessConfig.fullLocation}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
