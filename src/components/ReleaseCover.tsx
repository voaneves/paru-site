import type { Track } from '../data/tracks';
import { Wordmark } from './Brand';

// dimensões reais dos PNGs das poses (evita salto de layout)
const POSE_SIZE: Record<Track['pose'], [number, number]> = {sit: [406, 470], stretch: [327, 355], pounce: [310, 362], rest: [346, 315], prowl: [376, 312]};

/** Capa provisória montada com os elementos da marca (usada enquanto o lançamento não tem arte oficial). */
export function ReleaseCover({ track, large = false }: { track: Track; large?: boolean }) {
  if (track.cover) {
    return <img className="cover" src={track.cover} alt={`Capa de ${track.title}`} loading="lazy" width={1000} height={1000} />;
  }
  return (
    <div className={`cover cover--gen cover--${track.accent} ${large ? 'cover--lg' : ''}`} role="img" aria-label={`Arte de ${track.title}`}>
      <div className="cover__texture" />
      <img className="cover__cat" src={`./brand/cat-${track.pose}.webp`} alt="" loading="lazy" width={POSE_SIZE[track.pose][0]} height={POSE_SIZE[track.pose][1]} />
      <div className="cover__meta mono">
        <span>{track.bpm} BPM</span>
        <span>{track.genre.toUpperCase()}</span>
      </div>
      <div className="cover__title">{track.title}</div>
      <Wordmark className="cover__logo" />
    </div>
  );
}
