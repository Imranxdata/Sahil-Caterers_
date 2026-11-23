import React from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Layers,
  MessageSquare,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/cateringData';
import { PosterRibbonBanner } from './PosterMotifs';

const ICON_MAP = {
  tailored: ClipboardList,
  'veg-nonveg': CheckCircle2,
  scale: Users,
  variety: Layers,
  flexible: SlidersHorizontal,
  events: CalendarCheck,
  booking: MessageSquare,
  memorable: HeartHandshake,
} as const;

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-poster-crimson-alt py-16 sm:py-20 text-white border-t border-[#F39200]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PosterRibbonBanner
          title="Why Choose Us"
          eyebrow="Dependable Catering in Badlapur"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = ICON_MAP[item.id];
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-[#F5DFB5]/20 bg-[#3A0205]/70 p-5 transition-colors hover:border-[#F39200]/65"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102] shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-[#F5DFB5]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-white/85">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
