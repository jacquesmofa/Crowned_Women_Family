import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import { SITE } from '@/seo/site';

export default function NotFound() {
  usePageMeta('notFound');
  const { s } = useTx();
  return (
    <section className="panel manifesto" data-side="full">
      <span className="panel-accent left-1/2 -translate-x-1/2 top-[12%]" aria-hidden="true">404</span>
      <div className="panel-copy items-center text-center" style={{ maxWidth: '40ch' }}>
        <img src={SITE.logoMark} alt="Crowned Women and Family Community Services logo" width={80} height={80} decoding="async"
          className="w-20 h-20 rounded-full object-cover" style={{ border: '1px solid color-mix(in srgb, var(--accent) 55%, transparent)' }} />
        <Rich as="h1" html={s('notFound.title')} />
        <p className="sub">{s('notFound.sub')}</p>
        <Link to="/" className="btn btn-gold">{s('common.returnHome')} <i className="ri-arrow-right-line" /></Link>
      </div>
    </section>
  );
}