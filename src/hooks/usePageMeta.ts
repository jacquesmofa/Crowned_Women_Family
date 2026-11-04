import { useEffect } from 'react';
import useTx from '@/hooks/useTx';
import { PAGES, SITE, absoluteUrl } from '@/seo/site';

// --- small DOM helpers -------------------------------------------------------
// Every tag is created only once and then updated, so navigating between pages
// never leaves duplicate meta tags behind.

function setMeta(key: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][data-seo="page"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('data-seo', 'page');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Sets per-route title, description, canonical, robots, Open Graph, Twitter card
 * and page-level structured data for the current route + language.
 *
 * NOTE: search and social crawlers read the static HTML of index.html, which
 * carries site-wide defaults. Per-route tags are applied here for browsers and
 * for crawlers that do execute JavaScript. True per-route static tags need
 * pre-rendering at build time (hosting level) - see project_plan.md.
 */
export default function usePageMeta(key: string) {
  const { o, lang } = useTx();
  const [title, desc] = o<string[]>(`meta.${key}`);
  const page = PAGES[key] ?? PAGES.home;
  const url = absoluteUrl(page.path);

  useEffect(() => {
    const inLanguage = lang === 'fr' ? 'fr-CA' : 'en-CA';

    document.title = title;

    // --- core --------------------------------------------------------------
    setMeta('description', desc);
    setMeta('robots', page.robots);
    setLink('canonical', url);

    // --- Open Graph (Facebook, WhatsApp, LinkedIn, Telegram, Slack, iMessage)
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', SITE.name, 'property');
    setMeta('og:title', title, 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', SITE.shareImage, 'property');
    setMeta('og:image:secure_url', SITE.shareImage, 'property');
    setMeta('og:image:type', 'image/jpeg', 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:image:alt', SITE.shareImageAlt, 'property');
    setMeta('og:locale', SITE.locale, 'property');
    setMeta('og:locale:alternate', SITE.localeAlt, 'property');

    // --- X / Twitter card --------------------------------------------------
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', SITE.shareImage);
    setMeta('twitter:image:alt', SITE.shareImageAlt);

    // --- page-level structured data ---------------------------------------
    setJsonLd('cw-page-schema', {
      '@context': 'https://schema.org',
      '@type': page.type,
      '@id': `${url}#webpage`,
      url,
      name: title,
      description: desc,
      inLanguage,
      isPartOf: { '@id': `${SITE.domain}/#website` },
      about: { '@id': `${SITE.domain}/#organization` },
      primaryImageOfPage: { '@type': 'ImageObject', url: SITE.shareImage },
      ...(key === 'notFound' ? {} : { potentialAction: { '@type': 'ReadAction', target: [url] } }),
    });
  }, [title, desc, url, page.type, page.robots, lang]);
}