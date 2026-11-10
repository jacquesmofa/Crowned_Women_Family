// Single source of truth for technical SEO, icons and social share images.
// Change the domain here ONCE and every canonical link, sitemap entry and share
// tag follows it. Keep public/sitemap.xml and public/robots.txt in sync if it changes.

export const SITE = {
  name: 'Crowned Women and Family Community Services',
  shortName: 'CWFCS',
  tagline: 'Empowering Women. Strengthening Families. Building Community.',
  // Canonical host. No trailing slash. The live host must match this exactly.
  domain: 'https://crowned.org',
  email: 'crownedwomencommunityservices@gmail.com',
  street: '6850 Milcreek Drive, Suite 101C',
  city: 'Mississauga',
  region: 'ON',
  country: 'CA',
  areaServed: ['Peel Region', 'Mississauga', 'Brampton', 'Caledon'],
  themeColor: '#35200B',
  backgroundColor: '#35200B',
  locale: 'en_CA',
  localeAlt: 'fr_CA',

  // Logo is the official client mark (hosted on Cloudinary, so we can request
  // exact sizes and formats from one source file instead of shipping binaries).
  logoOriginal: 'https://res.cloudinary.com/hxhakwbe/image/upload/v1793795522/Croned_Logo_zfvshh.jpg',
  // On-page mark, displayed in the header, footer and 404 page.
  logoMark: 'https://res.cloudinary.com/hxhakwbe/image/upload/c_pad,w_160,h_160,b_rgb:2a1a2c,q_auto,f_auto/v1793795522/Croned_Logo_zfvshh.jpg',
  // 512 x 512 square used by Organization structured data + app icons.
  icon512: 'https://res.cloudinary.com/hxhakwbe/image/upload/c_pad,w_512,h_512,b_rgb:2a1a2c,f_png,q_auto/v1793795522/Croned_Logo_zfvshh.png',
  icon192: 'https://res.cloudinary.com/hxhakwbe/image/upload/c_pad,w_192,h_192,b_rgb:2a1a2c,f_png,q_auto/v1793795522/Croned_Logo_zfvshh.png',
  icon180: 'https://res.cloudinary.com/hxhakwbe/image/upload/c_pad,w_180,h_180,b_rgb:2a1a2c,f_png,q_auto/v1793795522/Croned_Logo_zfvshh.png',
  icon32: 'https://res.cloudinary.com/hxhakwbe/image/upload/c_pad,w_32,h_32,b_rgb:2a1a2c,f_png,q_auto/v1793795522/Croned_Logo_zfvshh.png',
  icon16: 'https://res.cloudinary.com/hxhakwbe/image/upload/c_pad,w_16,h_16,b_rgb:2a1a2c,f_png,q_auto/v1793795522/Croned_Logo_zfvshh.png',
  // Branded 1200 x 630 share card: logo centred on the brand background.
  shareImage: 'https://res.cloudinary.com/hxhakwbe/image/upload/c_pad,b_rgb:2a1a2c,w_1200,h_630,f_jpg,q_auto/v1793795522/Croned_Logo_zfvshh.jpg',
  shareImageSquare: 'https://res.cloudinary.com/hxhakwbe/image/upload/c_pad,b_rgb:2a1a2c,w_1200,h_1200,f_jpg,q_auto/v1793795522/Croned_Logo_zfvshh.jpg',
  shareImageAlt: 'Crowned Women and Family Community Services logo on a deep plum background',
} as const;

/** Absolute URL for a site path, e.g. absoluteUrl('/about') -> https://crowned.org/about */
export function absoluteUrl(path: string): string {
  const clean = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return `${SITE.domain}${clean}`;
}

export interface PageSeo {
  /** Real route path, used for the canonical URL and the sitemap. */
  path: string;
  /** schema.org type for the page-level WebPage node. */
  type: string;
  robots: string;
  priority: string;
}

const INDEXABLE = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

// One entry per public route. Keys match the i18n `meta.*` keys.
export const PAGES: Record<string, PageSeo> = {
  home: { path: '/', type: 'WebPage', robots: INDEXABLE, priority: '1.0' },
  about: { path: '/about', type: 'AboutPage', robots: INDEXABLE, priority: '0.8' },
  services: { path: '/services', type: 'CollectionPage', robots: INDEXABLE, priority: '0.9' },
  cgirls: { path: '/cgirls', type: 'WebPage', robots: INDEXABLE, priority: '0.9' },
  events: { path: '/events', type: 'CollectionPage', robots: INDEXABLE, priority: '0.7' },
  partners: { path: '/partners', type: 'CollectionPage', robots: INDEXABLE, priority: '0.7' },
  involved: { path: '/get-involved', type: 'WebPage', robots: INDEXABLE, priority: '0.8' },
  contact: { path: '/contact', type: 'ContactPage', robots: INDEXABLE, priority: '0.8' },
  notFound: { path: '/404', type: 'WebPage', robots: 'noindex, follow', priority: '0' },
};