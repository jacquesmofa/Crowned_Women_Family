import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import SiteGallery from '@/components/feature/SiteGallery';

// Gallery: real photos from src/content/gallery.json, in the site's warm brown + amber palette.
export default function Gallery() {
  usePageMeta('gallery');
  const { s } = useTx();
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <section className="px-6 pt-36 pb-14 md:pt-44 md:pb-20">
        <div className="max-w-[1100px] mx-auto">
          <p className="stamp" style={{ fontFamily: 'var(--font-label)', color: 'var(--accent)', letterSpacing: '.2em', textTransform: 'uppercase', fontSize: 13 }}>{s('gallery.stamp')}</p>
          <Rich as="h1" html={s('gallery.title')} className="mt-4 text-[clamp(38px,6vw,84px)] leading-[.98] tracking-[-.04em] font-semibold max-w-[14ch]" />
          <p className="mt-6 text-lg max-w-[46ch]" style={{ color: 'var(--muted)' }}>{s('gallery.sub')}</p>
        </div>
      </section>
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-[1300px] mx-auto">
          <SiteGallery
            theme={{
              layout: 'masonry',
              ink: 'var(--text)',
              muted: 'var(--muted)',
              accent: 'var(--accent)',
              accentInk: 'var(--bg)',
              tabBg: 'var(--surface)',
              radius: '4px',
            }}
          />
          <div className="mt-14 text-center">
            <Link to="/get-involved" className="inline-block px-7 py-3 rounded-full font-semibold" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
              {s('gallery.cta')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
