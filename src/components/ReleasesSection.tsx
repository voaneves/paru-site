import React, { useState } from 'react';
import { Play, Pause, ExternalLink, Disc3, Sparkles } from 'lucide-react';
import { TRACKS, type Track } from '../data/tracks';
import { soundEngine } from '../services/audioEngine';
import { CyberdeckPlayer } from './CyberdeckPlayer';

export const ReleasesSection: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [activeTrackId, setActiveTrackId] = useState<string>(TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    const unsub = soundEngine.subscribe(() => {
      setIsPlaying(soundEngine.getIsPlaying());
      setActiveTrackId(soundEngine.getCurrentTrackId());
    });
    return () => unsub();
  }, []);

  const genres = ['ALL', 'Indie Dance', 'Minimal Deep Tech'];

  const filteredTracks = selectedGenre === 'ALL'
    ? TRACKS
    : TRACKS.filter(t => t.genre.toLowerCase() === selectedGenre.toLowerCase());

  const handlePlayCard = (track: Track) => {
    setActiveTrackId(track.id);
    soundEngine.togglePlay(track.id, track.bpm);
  };

  return (
    <section id="releases" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#222222] pb-6 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#12FE07] font-mono text-xs tracking-widest uppercase mb-2">
            <Disc3 className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>01 // ARQUITETURA DE FREQUÊNCIAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-[#F9F9F9] font-title">
            LANÇAMENTOS & DISCOGRAFIA
          </h2>
          <p className="text-sm font-mono text-[#888888] mt-2 max-w-xl">
            Sistemas compilados com precisão cirúrgica em 126–128 BPM. Ouça e sincronize seu pulso.
          </p>
        </div>

        {/* Genre Filters */}
        <div className="flex items-center gap-2">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                selectedGenre === genre
                  ? 'bg-[#12FE07] text-black font-bold shadow-[0_0_10px_rgba(18,254,7,0.3)]'
                  : 'bg-[#1A1A1A] text-[#888888] hover:text-[#F9F9F9] border border-[#2A2A2A]'
              }`}
            >
              {genre === 'ALL' ? 'TODOS' : genre.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Cyberdeck Player Integration */}
      <div className="mb-14">
        <CyberdeckPlayer activeTrackId={activeTrackId} />
      </div>

      {/* Track Grid (Martin Garrix / Peggy Gou Inspired) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTracks.map(track => {
          const isCurrentActive = activeTrackId === track.id;
          const isThisPlaying = isCurrentActive && isPlaying;

          return (
            <div
              key={track.id}
              className={`group rounded-xl bg-[#141414] border transition-all duration-300 p-4 flex flex-col justify-between overflow-hidden relative ${
                isCurrentActive
                  ? 'border-[#12FE07] shadow-[0_0_20px_rgba(18,254,7,0.2)]'
                  : 'border-[#222222] hover:border-[#333333] hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                <span className="text-[#888888]">{track.releaseDate}</span>
                <span className="px-2 py-0.5 rounded bg-[#1A1A1A] text-[#12FE07] border border-[#12FE07]/30">
                  {track.bpm} BPM
                </span>
              </div>

              {/* Artwork with Quick Play Hover Button */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-[#2A2A2A] mb-4 bg-black">
                <img
                  src={track.coverImage}
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Play Trigger Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handlePlayCard(track)}
                    className="w-14 h-14 rounded-full bg-[#12FE07] text-black flex items-center justify-center shadow-[0_0_20px_#12FE07] transition-transform transform hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label={`Tocar ${track.title}`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-6 h-6 fill-black" />
                    ) : (
                      <Play className="w-6 h-6 fill-black ml-1" />
                    )}
                  </button>
                </div>

                {isThisPlaying && (
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded bg-black/80 border border-[#12FE07] text-[#12FE07] text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12FE07] animate-ping" />
                    <span>EM REPRODUÇÃO</span>
                  </div>
                )}
              </div>

              {/* Title & Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#FF2E88] uppercase tracking-wider mb-1">
                    {track.genre}
                  </div>
                  <h4 className="text-lg font-bold text-[#F9F9F9] font-title tracking-tight group-hover:text-[#12FE07] transition-colors">
                    {track.title}
                  </h4>
                  <div className="text-xs font-mono text-[#888888] mt-0.5">
                    {track.subtitle}
                  </div>
                </div>

                {/* Platform Links */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1F1F1F]">
                  {track.links.spotify && (
                    <a
                      href={track.links.spotify}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-1 text-center rounded bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-[#12FE07] text-[10px] font-mono transition-colors border border-[#262626]"
                    >
                      SPOTIFY
                    </a>
                  )}
                  {track.links.beatport && (
                    <a
                      href={track.links.beatport}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-1 text-center rounded bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-[#FF2E88] text-[10px] font-mono transition-colors border border-[#262626]"
                    >
                      BEATPORT
                    </a>
                  )}
                  {track.links.soundcloud && (
                    <a
                      href={track.links.soundcloud}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-[#F9F9F9] transition-colors border border-[#262626]"
                      title="Ouvir no SoundCloud"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder Note for PARU */}
      <div className="mt-8 p-3.5 rounded-lg bg-[#141414] border border-[#222222] flex items-center justify-between text-xs font-mono text-[#888888]">
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#12FE07]" />
          <span>[CONFIG: Faixas demonstrativas com síntese Web Audio. Substitua facilmente em <code className="text-[#12FE07]">src/data/tracks.ts</code>]</span>
        </span>
        <span className="text-[10px] text-[#666] hidden sm:inline">126–128 BPM INDIE DANCE CORE</span>
      </div>
    </section>
  );
};
