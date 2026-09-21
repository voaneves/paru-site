import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { TRACKS, type Track } from '../data/tracks';
import { SITE } from '../config/site';
import { DemoTag, SectionHead } from './Brand';
import { ReleaseCover } from './ReleaseCover';

const PLATFORMS: { key: keyof Track['links']; label: string }[] = [
  { key: 'spotify', label: 'Spotify' },
  { key: 'beatport', label: 'Beatport' },
  { key: 'soundcloud', label: 'SoundCloud' },
  { key: 'appleMusic', label: 'Apple Music' },
  { key: 'youtube', label: 'YouTube' },
];

const fmtDate = (iso: string) => iso.split('-').reverse().join('.'); // 15.08.2026 (estilo SYSTEM UPDATE do brandbook)

function PlatformLinks({ track }: { track: Track }) {
  const available = PLATFORMS.filter((p) => track.links[p.key]);
  if (!available.length) return <p className="mono dim small">&gt; LINKS DE STREAMING EM BREVE</p>;
  return (
    <div className="platforms">
      {available.map((p) => (
        <a key={p.key} className="chip" href={track.links[p.key]} target="_blank" rel="noreferrer">
          {p.label} ↗
        </a>
      ))}
    </div>
  );
}

export function MusicSection() {
  const tracks = useMemo(() => TRACKS.filter((t) => !t.demo || SITE.showDemoContent), []);
  const hasDemo = tracks.some((t) => t.demo);
  const [playing, setPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => audio.current?.pause(), []);

  const toggle = (t: Track) => {
    if (!t.previewUrl) return;
    if (playing === t.id) {
      audio.current?.pause();
      setPlaying(null);
      return;
    }
    audio.current?.pause();
    const a = new Audio(t.previewUrl);
    a.volume = 0.8;
    a.ontimeupdate = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    a.onended = () => setPlaying(null);
    a.play();
    audio.current = a;
    setProgress(0);
    setPlaying(t.id);
  };

  if (!tracks.length) {
    return (
      <section id="musica" className="section" aria-labelledby="musica-title">
        <div className="container">
          <SectionHead id="musica-title" cmd="ls ./frequencias" title="Frequências" lead="Novos lançamentos em compilação. Siga PARU para ser o primeiro a ouvir." />
        </div>
      </section>
    );
  }

  const [featured, ...rest] = tracks;

  return (
    <section id="musica" className="section" aria-labelledby="musica-title">
      <div className="container">
        <SectionHead
          id="musica-title"
          cmd="ls ./frequencias"
          tag={hasDemo ? <DemoTag /> : undefined}
          title="Frequências"
          lead="Indie Dance e Minimal Deep Tech compilados com precisão cirúrgica."
        />

        <article className="featured">
          <ReleaseCover track={featured} large />
          <div className="featured__body">
            <p className="mono green small">&gt; ÚLTIMO LANÇAMENTO</p>
            <h3 className="featured__title">{featured.title}</h3>
            <p className="featured__version">{featured.version}</p>
            <dl className="specs mono">
              <div>
                <dt>BPM</dt>
                <dd>{featured.bpm}</dd>
              </div>
              {featured.key && (
                <div>
                  <dt>TOM</dt>
                  <dd>{featured.key}</dd>
                </div>
              )}
              <div>
                <dt>GÊNERO</dt>
                <dd>{featured.genre}</dd>
              </div>
              {featured.label && (
                <div>
                  <dt>SELO</dt>
                  <dd>{featured.label}</dd>
                </div>
              )}
              <div>
                <dt>DATA</dt>
                <dd>{fmtDate(featured.releaseDate)}</dd>
              </div>
            </dl>

            {featured.previewUrl && (
              <div className={`deck ${playing === featured.id ? 'is-playing' : ''}`}>
                <button className="deck__play" onClick={() => toggle(featured)} aria-label={playing === featured.id ? 'Pausar pré-escuta' : 'Tocar pré-escuta de 30 segundos'}>
                  {playing === featured.id ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
                <div className="deck__bars" aria-hidden="true">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <i key={i} style={{ animationDelay: `${(i % 7) * -0.067}s` }} />
                  ))}
                </div>
                <div className="deck__progress" style={{ transform: `scaleX(${playing === featured.id ? progress : 0})` }} />
              </div>
            )}
            <PlatformLinks track={featured} />
          </div>
        </article>

        {rest.length > 0 && (
          <ul className="release-grid" role="list">
            {rest.map((t) => (
              <li key={t.id} className="release">
                <div className="release__art">
                  <ReleaseCover track={t} />
                  {t.previewUrl && (
                    <button className="release__play" onClick={() => toggle(t)} aria-label={`${playing === t.id ? 'Pausar' : 'Tocar'} ${t.title}`}>
                      {playing === t.id ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    </button>
                  )}
                </div>
                <p className="mono dim small">
                  {fmtDate(t.releaseDate)} · {t.bpm} BPM
                </p>
                <h3 className="release__title">{t.title}</h3>
                <p className="release__version">
                  {t.version} · <span className={t.genre === 'Indie Dance' ? 'green' : 'pink'}>{t.genre}</span>
                </p>
                <PlatformLinks track={t} />
              </li>
            ))}
          </ul>
        )}

        {(SITE.links.soundcloud || SITE.links.spotify) && (
          <div className="follow">
            {SITE.links.spotify && (
              <a className="btn btn--ghost" href={SITE.links.spotify} target="_blank" rel="noreferrer">
                Seguir no Spotify ↗
              </a>
            )}
            {SITE.links.soundcloud && (
              <a className="btn btn--ghost" href={SITE.links.soundcloud} target="_blank" rel="noreferrer">
                Sets no SoundCloud ↗
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
