import React, { useEffect } from 'react';
import { getCanonicalBaseUrl } from '../config/businessConfig';

interface SeoHeadProps {
  title: string;
  description: string;
  noIndex?: boolean;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ title, description, noIndex = false }) => {
  useEffect(() => {
    document.title = title;

    const baseUrl = getCanonicalBaseUrl();
    const cleanPath = window.location.pathname === '/index.html' ? '/' : window.location.pathname;
    const canonicalUrl = baseUrl ? `${baseUrl}${cleanPath}` : cleanPath;

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const setMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const ogImageUrl = baseUrl
      ? `${baseUrl}/src/assets/images/food_catering_feast_1795412594926.jpg`
      : '/src/assets/images/food_catering_feast_1795412594926.jpg';

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'
    );
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImageUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImageUrl);
  }, [title, description, noIndex]);

  return null;
};
