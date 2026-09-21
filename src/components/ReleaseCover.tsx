import type { Track } from '../data/tracks';
import { Wordmark } from './Brand';

/** Capa provisória montada com os elementos da marca (usada enquanto o lançamento não tem arte oficial). */
export function ReleaseCover({ track, large = false }: { track: Track; large?: boolean }) {
  if (track.cover) {
    return <img className="cover" src={track.cover} alt={`Capa de ${track.title}`} loading="lazy" />;
  }
  return (
    <div className={`cover cover--gen cover--${track.accent} ${large ? 'cover--lg' : ''}`} role="img" aria-label={`Arte de ${track.title}`}>
      <div className="cover__texture" />
      <img className="cover__cat" src={`./brand/cat-${track.pose}.webp`} alt="" loading="lazy" />
      <div className="cover__meta mono">
        <span>{track.bpm} BPM</span>
        <span>{track.genre.toUpperCase()}</span>
      </div>
      <div className="cover__title">{track.title}</div>
      <Wordmark className="cover__logo" />
    </div>
  );
}
