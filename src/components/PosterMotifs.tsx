import React from 'react';

interface PosterRibbonBannerProps {
  title: string;
  eyebrow?: string;
}

export const PosterRibbonBanner: React.FC<PosterRibbonBannerProps> = ({ title, eyebrow }) => (
  <div className="flex flex-col items-center text-center">
    {eyebrow && (
      <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#F5DFB5]/85 uppercase">
        {eyebrow}
      </p>
    )}
    <div className="flex w-full items-center gap-3 sm:gap-5">
      <div className="h-[1.5px] flex-1 poster-divider-line" aria-hidden="true" />
      <h2 className="inline-flex items-center justify-center rounded-full bg-[#F5DFB5] px-5 sm:px-9 py-2 text-center font-display text-base sm:text-2xl font-extrabold italic leading-tight tracking-tight text-[#3A0305] shadow-md sm:whitespace-nowrap">
        {title}
      </h2>
      <div className="h-[1.5px] flex-1 poster-divider-line" aria-hidden="true" />
    </div>
  </div>
);

interface GoldBrushSwooshProps {
  className?: string;
}

export const GoldBrushSwoosh: React.FC<GoldBrushSwooshProps> = ({ className = 'w-32 h-3' }) => (
  <svg
    viewBox="0 0 180 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 11.5C45 2.5 118 0.5 177 5.5C120 5.5 52 7.5 3 11.5Z"
      fill="#F39200"
    />
  </svg>
);

export const PosterCornerWaves: React.FC = () => (
  <>
    {/* Top-Left Corner Amber Wave Accent */}
    <svg
      viewBox="0 0 220 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-14 z-10 h-24 w-36 sm:h-32 sm:w-52 opacity-90"
    >
      <path
        d="M0 0H185C168 38 142 54 102 64C54 76 26 98 0 128V0Z"
        fill="#E07200"
      />
      <path
        d="M0 0H160C144 30 120 46 84 55C45 64 20 84 0 110V0Z"
        fill="#F39200"
      />
      <path
        d="M192 0C173 42 145 60 104 70C58 82 28 104 0 135"
        stroke="#F5DFB5"
        strokeWidth="2"
      />
    </svg>

    {/* Bottom-Right Corner Amber Wave Accent */}
    <svg
      viewBox="0 0 220 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0 z-10 h-24 w-36 sm:h-32 sm:w-52 opacity-90"
    >
      <path
        d="M220 140H35C52 102 78 86 118 76C166 64 194 42 220 12V140Z"
        fill="#E07200"
      />
      <path
        d="M220 140H60C76 110 100 94 136 85C175 76 200 56 220 30V140Z"
        fill="#F39200"
      />
      <path
        d="M28 140C47 98 75 80 116 70C162 58 192 36 220 5"
        stroke="#F5DFB5"
        strokeWidth="2"
      />
    </svg>
  </>
);
