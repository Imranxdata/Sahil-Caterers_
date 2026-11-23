import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { OCCASIONS_LIST } from '../data/cateringData';
import { GoldBrushSwoosh, PosterRibbonBanner } from './PosterMotifs';

interface OccasionsProps {
  onSelectOccasion: (eventType: string) => void;
}

export const Occasions: React.FC<OccasionsProps> = ({ onSelectOccasion }) => {
  return (
    <section
      id="occasions"
      className="bg-poster-crimson-alt py-16 sm:py-24 text-white border-t border-[#F39200]/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PosterRibbonBanner
          title="Events & Occasions"
          eyebrow="Badlapur · Kalyan · Ambernath · Karjat"
        />

        <div className="mx-auto mt-6 max-w-3xl text-center">
          <h3
            className="font-display font-black tracking-tight text-[#F5DFB5]"
            style={{
              fontSize: 'clamp(1.65rem, 3vw, 2.5rem)',
              textWrap: 'balance',
            }}
          >
            Every Occasion, Served with Love.
          </h3>
          <GoldBrushSwoosh className="mx-auto mt-1.5 h-2.5 w-48" />

          <p className="mt-4 text-sm sm:text-base font-medium leading-relaxed text-white/90">
            From intimate family gatherings to grand celebrations, we bring delicious food,
            customized menus, and reliable catering services to make every occasion memorable.
          </p>
        </div>

        {/* Balanced 12-Occasion Grid (3x4 Desktop, 2x6 Tablet, 1x12 Mobile) */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OCCASIONS_LIST.map((occasion, idx) => (
            <motion.button
              key={occasion.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.28, delay: Math.min(idx * 0.025, 0.22) }}
              onClick={() => onSelectOccasion(occasion.eventFormValue)}
              className="group flex h-full items-start gap-3.5 rounded-xl border border-[#F5DFB5]/20 bg-[#3A0205]/65 p-5 text-left transition-all duration-150 hover:border-[#F39200]/75 hover:bg-[#4D0408] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F39200] cursor-pointer"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102] shadow-sm transition-transform group-hover:scale-110">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </span>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#F5DFB5] group-hover:text-white">
                    {occasion.title}
                  </h4>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#F39200] opacity-75 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-white/85">
                  {occasion.summary}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom Prompt */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#F39200]/30 pt-8 text-center sm:flex-row sm:text-left">
          <p className="font-display text-lg sm:text-2xl font-bold text-[#F5DFB5]">
            Have an occasion in mind? We’ll take care of the food.
          </p>
          <button
            type="button"
            onClick={() => onSelectOccasion('Special Occasion / Custom Gathering')}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#F5DFB5] px-7 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide text-[#3A0305] uppercase shadow-lg transition-colors hover:bg-white cursor-pointer whitespace-nowrap shrink-0"
          >
            Get a Catering Quote
          </button>
        </div>
      </div>
    </section>
  );
};
