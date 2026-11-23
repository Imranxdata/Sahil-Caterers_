export interface FoodCategory {
  id: string;
  title: string;
  dietaryScope: 'Veg & Non-Veg' | 'Pure Veg & Sweets' | 'Fresh & Chilled' | 'Custom Event Setup';
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface OccasionItem {
  id: string;
  title: string;
  summary: string;
  eventFormValue: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Biryani & Rice' | 'Thalis & Starters' | 'Desserts & Juices' | 'Event Buffets';
  caption: string;
  dietary: string;
  image: string;
  alt: string;
}

export const HERO_MEDIA = {
  nonVegBiryani: '/src/assets/images/hero_nonveg_biryani_1795412596380.jpg',
  vegBiryani: '/src/assets/images/hero_veg_biryani_1795412596036.jpg',
  pulaoThali: '/src/assets/images/food_pulao_thali_1795412596591.jpg',
  startersKebabs: '/src/assets/images/food_starters_kebabs_1795412596419.jpg',
  cateringFeast: '/src/assets/images/food_catering_feast_1795412594926.jpg',
  indianDesserts: '/src/assets/images/food_indian_desserts_1795414071930.jpg',
  freshJuices: '/src/assets/images/food_fresh_juices_1795414072320.jpg',
} as const;

export const MEDIA_DIMENSIONS: Record<string, { width: number; height: number }> = {
  [HERO_MEDIA.nonVegBiryani]: { width: 896, height: 1200 },
  [HERO_MEDIA.vegBiryani]: { width: 896, height: 1200 },
  [HERO_MEDIA.pulaoThali]: { width: 1200, height: 896 },
  [HERO_MEDIA.startersKebabs]: { width: 1200, height: 896 },
  [HERO_MEDIA.cateringFeast]: { width: 1376, height: 768 },
  [HERO_MEDIA.indianDesserts]: { width: 1200, height: 896 },
  [HERO_MEDIA.freshJuices]: { width: 1200, height: 896 },
};

export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: 'biryani-pulao',
    title: 'Biryani & Pulao',
    dietaryScope: 'Veg & Non-Veg',
    subtitle: 'Slow-cooked dum biryanis & fragrant pulao varieties',
    description:
      'Our signature rice preparations in Badlapur—from aromatic Veg & Paneer Biryani and seasonal Pulaos to flavorful Non-Veg Biryanis crafted with aged basmati and whole spices.',
    highlights: [
      'Traditional Dum Biryani (Veg & Non-Veg)',
      'Aromatic Veg, Matar & Kashmiri Pulao',
      'Separate Vessels for Veg & Non-Veg',
    ],
    image: HERO_MEDIA.nonVegBiryani,
    imageAlt: 'Authentic slow-cooked Indian Dum Biryani garnished with mint and caramelized onions',
  },
  {
    id: 'thalis',
    title: 'Thalis',
    dietaryScope: 'Veg & Non-Veg',
    subtitle: 'Complete customizable meals for every appetite',
    description:
      'Balanced Veg Thalis, Non-Veg Thalis, and special festive platters with curries, dal, rice or pulao, breads, raita, and sweets—fully customizable to your preferences.',
    highlights: [
      'Pure Vegetarian & Special Festive Thalis',
      'Signature Non-Vegetarian Thali Combinations',
      'Customizable Dishes & Portion Options',
    ],
    image: HERO_MEDIA.pulaoThali,
    imageAlt: 'Properly arranged Indian Thali meal with curries, pulao, butter naan, and raita',
  },
  {
    id: 'starters',
    title: 'Starters',
    dietaryScope: 'Veg & Non-Veg',
    subtitle: 'Crisp appetizers & hot tandoori bites',
    description:
      'A wide selection of vegetarian and non-vegetarian starters, smoky skewers, crispy snacks, and house chutneys ideal for individual orders, receptions, and evening parties.',
    highlights: [
      'Smoky Non-Veg Tikka & Appetizers',
      'Crispy Paneer & Vegetarian Starters',
      'Hot Pass-Around Snacks for Gatherings',
    ],
    image: HERO_MEDIA.startersKebabs,
    imageAlt: 'Appetizing Indian starters platter with smoky skewers, crispy paneer bites, and chutneys',
  },
  {
    id: 'desserts',
    title: 'Desserts',
    dietaryScope: 'Pure Veg & Sweets',
    subtitle: 'Traditional Indian sweets & festive desserts',
    description:
      'Classic Indian desserts prepared fresh to finish every meal on a sweet note—from warm saffron gulab jamun and chilled rasmalai to creamy kheer and celebration mithai.',
    highlights: [
      'Warm Saffron Gulab Jamun & Jalebi',
      'Chilled Pistachio Rasmalai & Kheer',
      'Custom Festive Mithai Assortments',
    ],
    image: HERO_MEDIA.indianDesserts,
    imageAlt: 'Traditional Indian desserts featuring warm gulab jamun, rasmalai, and saffron kheer',
  },
  {
    id: 'juices-beverages',
    title: 'Fresh Juices & Beverages',
    dietaryScope: 'Fresh & Chilled',
    subtitle: 'Fruit drinks, coolers & event refreshments',
    description:
      'Refreshing welcome beverages including fresh seasonal fruit juices, saffron mango lassi, mint-lime coolers, traditional chaas, and hot tea or coffee service.',
    highlights: [
      'Fresh Seasonal Fruit Juices & Coolers',
      'Saffron Mango Lassi & Spiced Chaas',
      'Welcome Drink & Tea-Coffee Counters',
    ],
    image: HERO_MEDIA.freshJuices,
    imageAlt: 'Colorful fresh fruit juices, mango lassi, and chilled mint-lime coolers in crystal glasses',
  },
  {
    id: 'catering-buffet',
    title: 'Catering & Buffet Services',
    dietaryScope: 'Custom Event Setup',
    subtitle: 'Full buffet setups, party catering & bulk orders',
    description:
      'End-to-end food arrangements for weddings, family functions, and office gatherings across Badlapur, Kalyan, Vitthalwadi, and Thane—complete with buffet counters and bulk trays.',
    highlights: [
      'Organized Buffet Counters & Serving Setup',
      'Bulk Party Orders & Family Function Trays',
      'Custom Menus Tailored to Guest Count',
    ],
    image: HERO_MEDIA.cateringFeast,
    imageAlt: 'Upscale Indian event catering buffet setup with gleaming brass serving vessels',
  },
];

export const OCCASIONS_LIST: OccasionItem[] = [
  {
    id: 'birthday-parties',
    title: 'Birthday Parties',
    summary: 'Crowd-pleasing starters, biryanis, desserts, and juices for kids and milestone birthdays.',
    eventFormValue: 'Birthday',
  },
  {
    id: 'weddings',
    title: 'Weddings',
    summary: 'Grand wedding feasts with thoughtfully planned Veg and Non-Veg menus and buffet service.',
    eventFormValue: 'Wedding',
  },
  {
    id: 'haldi-ceremonies',
    title: 'Haldi Ceremonies',
    summary: 'Vibrant daytime thalis, light pulao spreads, snacks, and chilled welcome refreshments.',
    eventFormValue: 'Haldi',
  },
  {
    id: 'engagements',
    title: 'Engagements',
    summary: 'Refined celebration menus crafted for ring ceremonies and intimate family introductions.',
    eventFormValue: 'Engagement',
  },
  {
    id: 'wedding-functions',
    title: 'Wedding Functions',
    summary: 'Seamless catering across mehendi, sangeet, reception dinners, and pre-wedding rituals.',
    eventFormValue: 'Reception',
  },
  {
    id: 'religious-functions',
    title: 'Religious Functions & Gatherings',
    summary: 'Pure, respectful traditional preparations suited for poojas, prayers, and festive feasts.',
    eventFormValue: 'Festival',
  },
  {
    id: 'family-celebrations',
    title: 'Family Celebrations',
    summary: 'Warm home-style catering for anniversaries, reunions, and joyful weekend get-togethers.',
    eventFormValue: 'Family Gathering',
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    summary: 'Punctual, polished catering service for annual days, milestones, and company celebrations.',
    eventFormValue: 'Corporate Event',
  },
  {
    id: 'office-lunches',
    title: 'Office Lunches & Meetings',
    summary: 'Convenient, neatly packed thalis, biryani boxes, and buffet spreads for teams and clients.',
    eventFormValue: 'Office Party',
  },
  {
    id: 'private-parties',
    title: 'Private Parties',
    summary: 'Effortless house-party platters, hot starters, and bulk food orders delivered ready to serve.',
    eventFormValue: 'Private Party',
  },
  {
    id: 'community-events',
    title: 'Community Events',
    summary: 'Reliable, well-coordinated large-scale catering for housing societies and local associations.',
    eventFormValue: 'Community Event',
  },
  {
    id: 'special-custom',
    title: 'Special Occasions & Custom Gatherings',
    summary: 'Flexible menu planning for any special gathering across Badlapur, Kalyan, and nearby areas.',
    eventFormValue: 'Other',
  },
];

export const WHY_CHOOSE_US = [
  {
    id: 'tailored',
    title: 'Menus tailored to your occasion',
    detail: 'Every gathering has different preferences; we plan dishes around your guests and schedule.',
  },
  {
    id: 'veg-nonveg',
    title: 'Vegetarian and non-vegetarian options',
    detail: 'Dedicated pure vegetarian spreads alongside flavorful non-vegetarian specialties.',
  },
  {
    id: 'scale',
    title: 'Food for small and large gatherings',
    detail: 'Equally attentive for intimate home functions and grand celebrations across Badlapur & Kalyan.',
  },
  {
    id: 'variety',
    title: 'Variety of cuisines and dishes',
    detail: 'From dum biryani and pulao to thalis, smoky starters, traditional desserts, and fresh juices.',
  },
  {
    id: 'flexible',
    title: 'Flexible menu planning',
    detail: 'Adjust spice levels, dish combinations, and serving formats to suit your family.',
  },
  {
    id: 'events',
    title: 'Catering for different types of events',
    detail: 'Weddings, haldi, birthdays, office lunches, religious gatherings, and community events.',
  },
  {
    id: 'booking',
    title: 'Easy inquiry and booking process',
    detail: 'Share your date and guest count in moments and connect directly on WhatsApp or phone.',
  },
  {
    id: 'memorable',
    title: 'A focus on delicious food and memorable gatherings',
    detail: 'Freshly prepared meals that let hosts relax and enjoy time with their guests.',
  },
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Signature Non-Veg Dum Biryani',
    category: 'Biryani & Rice',
    caption: 'Saffron-infused long-grain basmati slow-cooked with aromatic spices and tender cuts.',
    dietary: 'Non-Veg Specialty',
    image: HERO_MEDIA.nonVegBiryani,
    alt: 'Steaming Non-Vegetarian Dum Biryani served in hammered copper handi',
  },
  {
    id: 'gal-2',
    title: 'Pure Veg & Paneer Dum Biryani',
    category: 'Biryani & Rice',
    caption: 'Fragrant basmati rice layered with golden seared paneer, garden vegetables, and herbs.',
    dietary: 'Pure Vegetarian',
    image: HERO_MEDIA.vegBiryani,
    alt: 'Steaming Pure Veg Dum Biryani with paneer and whole spices',
  },
  {
    id: 'gal-3',
    title: 'Customizable Thalis & Pulao',
    category: 'Thalis & Starters',
    caption: 'Rich curries, aromatic peas pulao, warm naan, and cooling raita arranged neatly.',
    dietary: 'Veg & Non-Veg Options',
    image: HERO_MEDIA.pulaoThali,
    alt: 'Traditional Indian Thali and Pulao spread in brass bowls',
  },
  {
    id: 'gal-4',
    title: 'Smoky Starters & Appetizers',
    category: 'Thalis & Starters',
    caption: 'Hot tandoori skewers and golden crispy bites served with vibrant house chutneys.',
    dietary: 'Veg & Non-Veg Starters',
    image: HERO_MEDIA.startersKebabs,
    alt: 'Appetizing Indian party starters and skewers on dark platter',
  },
  {
    id: 'gal-5',
    title: 'Traditional Indian Desserts',
    category: 'Desserts & Juices',
    caption: 'Warm saffron gulab jamun, pistachio rasmalai, and rich festive kheer.',
    dietary: 'Pure Veg Sweets',
    image: HERO_MEDIA.indianDesserts,
    alt: 'Traditional Indian gulab jamun, rasmalai, and saffron kheer desserts',
  },
  {
    id: 'gal-6',
    title: 'Fresh Juices & Welcome Coolers',
    category: 'Desserts & Juices',
    caption: 'Chilled seasonal fruit juices, saffron mango lassi, and refreshing mint-lime coolers.',
    dietary: 'Fresh Beverages',
    image: HERO_MEDIA.freshJuices,
    alt: 'Colorful fresh fruit juices, mango lassi, and mint-lime coolers',
  },
];

export const EVENT_TYPE_OPTIONS = [
  'Wedding',
  'Wedding Function / Reception',
  'Haldi Ceremony',
  'Engagement',
  'Birthday Party',
  'Religious Function / Gathering',
  'Family Celebration',
  'Corporate Event',
  'Office Lunch / Meeting',
  'Private Party',
  'Community Event',
  'Special Occasion / Custom Gathering',
] as const;

export const FOOD_PREFERENCE_OPTIONS = [
  'Vegetarian',
  'Non-Vegetarian',
  'Both Veg & Non-Veg',
] as const;
