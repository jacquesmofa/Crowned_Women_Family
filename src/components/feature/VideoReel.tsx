import { useState } from 'react';
import MuxPlayer from '@mux/mux-player-react/lazy';
import useTx from '@/hooks/useTx';
import Rich from '@/components/base/Rich';
import JsonLd from '@/components/base/JsonLd';
import videos from '@/content/videos.json';

type Lang = 'en' | 'fr';
interface Video {
  playbackId: string;
  duration: string;
  thumbnailTime?: number;
  title: Record<Lang, string>;
  blurb: Record<Lang, string>;
}

const ITEMS = (videos.items as Video[]).filter((v) => v.playbackId);
const thumb = (v: Video, width = 640) =>
  `https://image.mux.com/${v.playbackId}/thumbnail.webp?width=${width}&time=${v.thumbnailTime ?? 0}`;
/** "1:25" -> "PT1M25S" for schema.org */
const isoDuration = (d: string) => {
  const [m, s] = d.split(':').map(Number);
  return `PT${m || 0}M${s || 0}S`;
};

/**
 * Food Pantry film reel: one player (loaded only when scrolled into view) plus a
 * strip of chapters. Picking a chapter swaps the film without reloading the page.
 * Videos are edited in src/content/videos.json.
 */
export default function VideoReel({ id = 'food-pantry' }: { id?: string }) {
  const { s, lang } = useTx();
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  if (!ITEMS.length) return null;
  const v = ITEMS[Math.min(active, ITEMS.length - 1)];

  const pick = (i: number) => {
    setActive(i);
    setAutoPlay(true);
  };

  return (
    <section id={id} className="reel scroll-mt-24" aria-labelledby={`${id}-title`}>
      <span className="reel-ring w-[46vmin] h-[46vmin] -left-[8vmin] top-[8%]" data-parallax="0.4" aria-hidden="true" />
      <div className="reel-inner">
        <header className="reel-head">
          <p className="stamp" data-reveal>{s('films.stamp')}</p>
          <Rich as="h2" id={`${id}-title`} html={s('films.title')} data-reveal />
          <p className="sub" data-reveal>{s('films.sub')}</p>
        </header>

        <div className="reel-grid">
          <figure className="reel-stage m-0" data-reveal>
            <div className="reel-frame">
              <MuxPlayer
                key={v.playbackId}
                loading="viewport"
                playbackId={v.playbackId}
                streamType="on-demand"
                title={v.title[lang]}
                thumbnailTime={v.thumbnailTime}
                accentColor="#e8a24a"
                primaryColor="#ece7ec"
                secondaryColor="#35200b"
                autoPlay={autoPlay}
                playsInline
                metadata={{ video_id: v.playbackId, video_title: v.title.en, page_type: 'website' }}
                style={{ aspectRatio: '16 / 9', width: '100%', display: 'block' }}
              />
            </div>
            <figcaption className="reel-caption">
              <span className="reel-now">{s('films.nowPlaying')}</span>
              <strong>{v.title[lang]}</strong>
              <span>{v.blurb[lang]}</span>
            </figcaption>
          </figure>

          <ol className="reel-list" aria-label={s('films.listLabel')}>
            {ITEMS.map((item, i) => (
              <li key={item.playbackId} data-reveal>
                <button
                  type="button"
                  className="reel-item"
                  aria-current={i === active ? 'true' : undefined}
                  aria-label={`${s('films.play')}: ${item.title[lang]} (${item.duration})`}
                  onClick={() => pick(i)}
                >
                  <span className="reel-thumb">
                    <img src={thumb(item, 320)} alt="" width={160} height={90} loading="lazy" decoding="async" />
                    <span className="reel-time">{item.duration}</span>
                    {i === active && <span className="reel-badge"><i className="ri-play-fill" aria-hidden="true" /></span>}
                  </span>
                  <span className="reel-meta">
                    <span className="reel-idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="reel-title">{item.title[lang]}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <JsonLd
        id={`videos-${id}`}
        data={{
          '@context': 'https://schema.org',
          '@graph': ITEMS.map((item) => ({
            '@type': 'VideoObject',
            name: item.title[lang],
            description: item.blurb[lang],
            thumbnailUrl: [thumb(item, 1280).replace('.webp', '.jpg')],
            uploadDate: '2026-11-10',
            duration: isoDuration(item.duration),
            contentUrl: `https://stream.mux.com/${item.playbackId}.m3u8`,
            embedUrl: `https://player.mux.com/${item.playbackId}`,
            inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
            publisher: { '@type': 'Organization', name: 'Crowned Women and Family Community Services' },
          })),
        }}
      />
    </section>
  );
}
