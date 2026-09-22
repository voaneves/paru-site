import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { VIDEOS, youtubeId, type Video } from '../data/videos';
import { SITE } from '../config/site';
import { SectionHead } from './Brand';

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(video.url);
  if (!id) return null;
  return (
    <li className="video">
      <div className="video__frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button className="video__poster" onClick={() => setPlaying(true)} aria-label={`Assistir: ${video.title}`}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
            <span className="video__play" aria-hidden="true">
              <Play size={22} fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <h3 className="video__title">{video.title}</h3>
      {video.subtitle && <p className="mono dim small">{video.subtitle}</p>}
    </li>
  );
}

export function VideosSection() {
  return (
    <section id="videos" className="section section--chassi" aria-labelledby="videos-title">
      <div className="container">
        <SectionHead section="videos" id="videos-title" cmd="ls ./videos" title="Vídeos" lead="Sets, lives e bastidores." />
        {VIDEOS.length ? (
          <ul className="video-grid" role="list">
            {VIDEOS.map((v) => (
              <VideoCard key={v.url} video={v} />
            ))}
          </ul>
        ) : (
          <div className="empty mono">
            <p>&gt; NOVOS VÍDEOS EM BREVE.</p>
          </div>
        )}
        {SITE.links.youtube && (
          <div className="follow">
            <a className="btn btn--ghost" href={SITE.links.youtube} target="_blank" rel="noreferrer">
              Canal no YouTube <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
