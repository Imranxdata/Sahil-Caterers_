import React from 'react';

interface ResponsivePictureProps {
  jpgSrc: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  onError?: () => void;
}

export const ResponsivePicture: React.FC<ResponsivePictureProps> = ({
  jpgSrc,
  alt,
  width,
  height,
  sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 600px',
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
  onError,
}) => {
  const basePath = jpgSrc.replace(/\.jpg$/i, '');
  const webpSrcSet = `${basePath}-sm.webp 640w, ${basePath}.webp ${width}w`;

  return (
    <picture className="block h-full w-full">
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={jpgSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onError={onError}
        className={className}
      />
    </picture>
  );
};
