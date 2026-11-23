export const businessConfig = {
  name: 'Sahil Caterers',
  establishedYear: '2010',
  heritageLabel: 'Serving Since 2010',
  tagline: 'Made for gatherings. Prepared for memories.',
  phone: '+91 92848 50021',
  rawPhone: '9284850021',
  whatsappDisplay: '+91 95030 68188',
  whatsappRaw: '9503068188',
  whatsappNumber: '919503068188', // Country code + WhatsApp number without + or spaces
  address: 'Badlapur',
  city: 'Badlapur',
  state: 'Maharashtra',
  pincode: '421503',
  country: 'India',
  shortLocation: 'Badlapur, Maharashtra – 421503',
  fullLocation: 'Badlapur, Maharashtra 421503, India',
  serviceAreas: [
    'Badlapur East',
    'Badlapur West',
    'Kalyan',
    'Dombivli',
    'Ambernath',
    'Ulhasnagar',
    'Vitthalwadi',
    'Shahad',
    'Vangani',
    'Shelu',
    'Karjat',
    'Khopoli',
  ],
  googleMapsLink:
    'https://www.google.com/maps/search/?api=1&query=Badlapur,+Maharashtra+421503,+India',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Badlapur%2C%20Maharashtra%20421503%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed',
  instagramLink: '',
  facebookLink: '',
  openingHours: '',
} as const;

export function getCanonicalBaseUrl(): string {
  const envUrl = import.meta.env?.VITE_SITE_URL;
  if (typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}

export function isWhatsAppConfigured(): boolean {
  const cleaned = businessConfig.whatsappNumber.replace(/\D/g, '');
  return cleaned.length >= 10;
}

export function buildWhatsAppUrl(message?: string): string | null {
  if (!isWhatsAppConfigured()) {
    return null;
  }
  const cleaned = businessConfig.whatsappNumber.replace(/\D/g, '');
  const defaultMsg =
    'Hello Sahil Caterers! I would like to enquire about catering services in Badlapur, Maharashtra.';
  const encoded = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

export function buildTelUrl(): string {
  const cleaned = businessConfig.rawPhone.replace(/\D/g, '');
  return `tel:+91${cleaned || '9284850021'}`;
}
