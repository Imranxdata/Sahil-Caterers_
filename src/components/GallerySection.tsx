import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, UtensilsCrossed, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem, MEDIA_DIMENSIONS } from '../data/cateringData';
import { PosterRibbonBanner } from './PosterMotifs';
import { ResponsivePicture } from './ResponsivePicture';

const GALLERY_FILTERS = [
  'All',
  'Biryani & Rice',
  'Thalis & Starters',
  'Desserts & Juices',
] as const;

export const GallerySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<(typeof GALLERY_FILTERS)[number]>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredItems: GalleryItem[] =
    selectedFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const activeLightboxItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="bg-poster-crimson py-16 sm:py-24 text-white border-t border-[#F39200]/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PosterRibbonBanner title="Culinary Gallery" eyebrow="Fresh From Our Badlapur Kitchens" />

        {/* Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter gallery"
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {GALLERY_FILTERS.map((filter) => {
            const active = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedFilter(filter);
                  setActiveLightboxIndex(null);
                }}
                className={`min-h-[40px] rounded-full px-4 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#F39200] text-[#2D0102] shadow-md'
                    : 'border border-[#F5DFB5]/35 bg-[#3A0205]/70 text-[#F5DFB5] hover:border-[#F39200] hover:text-white'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Balanced 3x2 Uniform Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#F5DFB5]/25 bg-[#2C0103] shadow-xl"
            >
              {!imgErrors[item.id] ? (
                <ResponsivePicture
                  jpgSrc={item.image}
                  alt={item.alt}
                  width={MEDIA_DIMENSIONS[item.image]?.width ?? 1200}
                  height={MEDIA_DIMENSIONS[item.image]?.height ?? 896}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                  loading="lazy"
                  onError={() => setImgErrors((prev) => ({ ...prev, [item.id]: true }))}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#4E0306] p-6 text-center text-[#F5DFB5]">
                  <UtensilsCrossed className="h-8 w-8 opacity-75" />
                  <span className="mt-2 font-display text-base font-bold">{item.title}</span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#240102]/95 via-[#240102]/25 to-transparent"
              />

              <button
                type="button"
                onClick={() => setActiveLightboxIndex(idx)}
                aria-label={`View larger photo of ${item.title}`}
                className="absolute inset-0 flex flex-col justify-end p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F39200] cursor-pointer"
              >
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F39200] text-[#2D0102] shadow-md transition-transform group-hover:scale-105">
                  <Expand className="h-4 w-4" />
                </span>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#F39200]">
                  <span>{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#F5DFB5]">{item.dietary}</span>
                </div>

                <h3 className="mt-1 font-display text-lg font-extrabold text-[#F5DFB5]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-white/85 line-clamp-2">{item.caption}</p>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setActiveLightboxIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#F39200]/40 bg-[#350103] text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close image preview"
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5DFB5] text-[#3A0305] hover:bg-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-[#1C0102]">
                <ResponsivePicture
                  jpgSrc={activeLightboxItem.image}
                  alt={activeLightboxItem.alt}
                  width={MEDIA_DIMENSIONS[activeLightboxItem.image]?.width ?? 1200}
                  height={MEDIA_DIMENSIONS[activeLightboxItem.image]?.height ?? 896}
                  sizes="(max-width: 640px) 95vw, 896px"
                  loading="eager"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#F39200]">
                    {activeLightboxItem.category} · {activeLightboxItem.dietary}
                  </p>
                  <h3 className="mt-0.5 font-display text-lg font-extrabold text-[#F5DFB5]">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/85">{activeLightboxItem.caption}</p>
                </div>

                {filteredItems.length > 1 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveLightboxIndex(
                          (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
                        )
                      }
                      aria-label="Previous photo"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5DFB5]/35 text-[#F5DFB5] hover:bg-[#F39200] hover:text-[#2D0102] cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length)
                      }
                      aria-label="Next photo"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5DFB5]/35 text-[#F5DFB5] hover:bg-[#F39200] hover:text-[#2D0102] cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
