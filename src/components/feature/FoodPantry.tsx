import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import Rich from '@/components/base/Rich';
import { EMAIL } from '@/components/feature/forms/FormBits';
import pantry from '@/content/pantry.json';

interface Step { title: string; text: string }

/** Cloudinary: modern format, smart quality, cropped around the subject. */
const cld = (url: string, w: number, h: number) => url.replace('/image/upload/', `/image/upload/f_auto,q_auto,c_fill,g_auto,w_${w},h_${h}/`);

/**
 * Food Pantry for funders and partners: the need, how the pantry works, what support makes possible,
 * what partners receive, real photos and the Executive Director. Sits just above the Food Pantry films.
 */
export default function FoodPantry() {
  const { s, o } = useTx();
  const steps = o<Step[]>('pantry.steps');
  const fund = o<Step[]>('pantry.fund');
  const receive = o<string[]>('pantry.receive');
  const facts = o<string[]>('pantry.facts');
  const [p0, p1, p2, p3, p4] = pantry.photos;
  const subject = encodeURIComponent(s('pantry.packageSubject'));

  return (
    <section id="pantry" className="pantry scroll-mt-24" aria-labelledby="pantry-title">
      <div className="pantry-inner">
        <header className="pantry-head">
          <p className="stamp" data-reveal>{s('pantry.stamp')}</p>
          <Rich as="h2" id="pantry-title" html={s('pantry.title')} data-reveal />
          <p className="sub" data-reveal>{s('pantry.lead')}</p>
          <ul className="pantry-facts" data-reveal>
            {facts.map((f) => <li key={f}><i className="ri-vip-crown-2-line" aria-hidden="true" />{f}</li>)}
          </ul>
        </header>

        <div className="pantry-mosaic" data-reveal>
          <img className="m-a" src={cld(p0, 900, 1100)} alt={s('pantry.alt0')} loading="lazy" decoding="async" />
          <img className="m-b" src={cld(p1, 700, 520)} alt={s('pantry.alt1')} loading="lazy" decoding="async" />
          <img className="m-c" src={cld(p2, 700, 520)} alt={s('pantry.alt2')} loading="lazy" decoding="async" />
          <img className="m-d" src={cld(p3, 700, 520)} alt={s('pantry.alt3')} loading="lazy" decoding="async" />
          <img className="m-e" src={cld(p4, 700, 520)} alt={s('pantry.alt4')} loading="lazy" decoding="async" />
        </div>

        <div className="pantry-block">
          <h3 className="pantry-h3" data-reveal>{s('pantry.howTitle')}</h3>
          <ol className="pantry-steps">
            {steps.map((st, i) => (
              <li key={st.title} className="card" data-reveal>
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <strong>{st.title}</strong>
                <p>{st.text}</p>
                <span className="gold-line" />
              </li>
            ))}
          </ol>
        </div>

        <div className="pantry-split">
          <div className="pantry-block">
            <h3 className="pantry-h3" data-reveal>{s('pantry.fundTitle')}</h3>
            <ul className="pantry-fund">
              {fund.map((f) => (
                <li key={f.title} data-reveal><strong>{f.title}</strong><span>{f.text}</span></li>
              ))}
            </ul>
          </div>
          <aside className="pantry-director card" data-reveal>
            <img src={cld(pantry.director.photo, 480, 600)} alt={s('pantry.directorAlt')} loading="lazy" decoding="async" />
            <div>
              <p className="stamp">{s('pantry.directorStamp')}</p>
              <p className="pantry-director-name">{pantry.director.name}</p>
              <p className="pantry-director-role">{s('pantry.directorRole')}</p>
              <p className="pantry-director-text">{s('pantry.directorText')}</p>
              <a href="#food-pantry" className="more">{s('pantry.directorCta')} →</a>
            </div>
            <span className="gold-line" />
          </aside>
        </div>

        <div className="pantry-partner card" data-reveal>
          <div>
            <h3 className="pantry-h3">{s('pantry.receiveTitle')}</h3>
            <ul className="pantry-receive">{receive.map((r) => <li key={r}><i className="ri-checkbox-circle-line" aria-hidden="true" />{r}</li>)}</ul>
          </div>
          <div className="pantry-cta">
            <Rich as="p" className="pantry-cta-line" html={s('pantry.ctaLine')} />
            <div className="flex flex-wrap gap-3">
              <Link to="/partners" className="btn btn-gold">{s('pantry.ctaFund')} <i className="ri-arrow-right-line" /></Link>
              <a href={`mailto:${EMAIL}?subject=${subject}`} className="btn btn-outline">{s('pantry.ctaPackage')}</a>
            </div>
          </div>
          <span className="gold-line" />
        </div>
      </div>
    </section>
  );
}
