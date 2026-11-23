import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CakeSlice,
  Check,
  Citrus,
  CookingPot,
  Flame,
  Utensils,
  UtensilsCrossed,
} from 'lucide-react';
import { FOOD_CATEGORIES, MEDIA_DIMENSIONS } from '../data/cateringData';
import { PosterRibbonBanner } from './PosterMotifs';
import { ResponsivePicture } from './ResponsivePicture';

interface FoodCategoriesProps {
  onSelectCategoryForInquiry: (categoryTitle: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'biryani-pulao': CookingPot,
  thalis: Utensils,
  starters: Flame,
  desserts: CakeSlice,
  'juices-beverages': Citrus,
  'catering-buffet': UtensilsCrossed,
};

const SPECIALITIES_ROW = [
  'Authentic Biryani & Pulao',
  'Customizable Veg & Non-Veg Thalis',
  'Wide Range of Starters',
  'Traditional Indian Desserts',
  'Fresh Juices & Beverages',
];

export const FoodCategories: React.FC<FoodCategoriesProps> = ({
  onSelectCategoryForInquiry,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <section id="our-food" className="bg-poster-crimson-alt py-16 sm:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Exact Poster Cream Ribbon Banner */}
        <PosterRibbonBanner title="Our Food Categories" eyebrow="Badlapur, Maharashtra 421503" />

        <p className="mx-auto mt-4 max-w-2xl text-center text-sm sm:text-base font-medium leading-relaxed text-[#F5DFB5]/90">
          Explore our complete range of freshly prepared Vegetarian and Non-Vegetarian food
          categories—crafted for individual orders, family meals, and grand event celebrations.
        </p>

        {/* Circular Category Quick-Jump Icons Row */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:divide-x lg:divide-[#F5DFB5]/20">
          {FOOD_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] ?? Utensils;
            return (
              <a
                key={category.id}
                href={`#menu-${category.id}`}
                className="group flex flex-col items-center gap-2 px-2 py-2 text-center focus-visible:outline-none"
              >
                <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-[#F5DFB5]/70 bg-[#3B0205]/70 text-white transition-all duration-150 group-hover:border-[#F39200] group-hover:bg-[#F39200] group-hover:text-[#2D0102]">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold leading-tight text-white/90 group-hover:text-[#F5DFB5]">
                  {category.title}
                </span>
              </a>
            );
          })}
        </div>

        {/* Clean, Uniform 6-Tile Menu Categories Grid in Exact Requested Order */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FOOD_CATEGORIES.map((category, idx) => (
            <motion.article
              key={category.id}
              id={`menu-${category.id}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.2) }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#F5DFB5]/25 bg-poster-panel shadow-xl transition-colors duration-200 hover:border-[#F39200]/70"
            >
              {/* Uniform 16:10 Food Photography Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#240102]">
                {!imgErrors[category.id] ? (
                  <ResponsivePicture
                    jpgSrc={category.image}
                    alt={category.imageAlt}
                    width={MEDIA_DIMENSIONS[category.image]?.width ?? 1200}
                    height={MEDIA_DIMENSIONS[category.image]?.height ?? 896}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                    loading="lazy"
                    onError={() => setImgErrors((prev) => ({ ...prev, [category.id]: true }))}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#4E0306] p-6 text-center">
                    <UtensilsCrossed className="h-9 w-9 text-[#F5DFB5]" />
                    <span className="mt-2 font-display text-base font-bold text-[#F5DFB5]">
                      {category.title}
                    </span>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#240102]/70 via-transparent to-transparent"
                />
              </div>

              {/* Card Body with Uniform Typography & Bottom-Aligned Action */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F39200]">
                    <span className="tabular-nums">0{idx + 1}.</span>
                    <span aria-hidden="true">·</span>
                    <span>{category.dietaryScope}</span>
                  </div>

                  <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#F5DFB5]">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold italic text-white/95">
                    {category.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    {category.description}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-[#F39200]/25 pt-4">
                    {category.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-xs font-medium text-white/95"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102]">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectCategoryForInquiry(category.title)}
                    className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full bg-[#F5DFB5] px-4 py-2 text-xs font-extrabold tracking-wide text-[#3A0305] uppercase shadow-sm transition-colors duration-150 hover:bg-white cursor-pointer"
                  >
                    <span>Enquire for {category.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Exact Poster "Our Specialities" Cream Card Row */}
        <div className="mt-14">
          <PosterRibbonBanner title="Our Specialities" />

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SPECIALITIES_ROW.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => onSelectCategoryForInquiry(label)}
                className={`flex min-h-[76px] items-center justify-center rounded-xl bg-[#F5DFB5] px-4 py-3.5 text-center font-display text-sm sm:text-base font-extrabold leading-snug text-[#3A0305] shadow-md transition-transform duration-150 hover:-translate-y-0.5 hover:bg-white cursor-pointer ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
