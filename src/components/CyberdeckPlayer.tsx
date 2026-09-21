import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Radio, ExternalLink } from 'lucide-react';
import { soundEngine } from '../services/audioEngine';
import { TRACKS, type Track } from '../data/tracks';

interface CyberdeckPlayerProps {
  activeTrackId?: string;
  onTrackChange?: (track: Track) => void;
}

export const CyberdeckPlayer: React.FC<CyberdeckPlayerProps> = ({
  activeTrackId,
  onTrackChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  // Sync with activeTrackId prop if provided
  useEffect(() => {
    if (activeTrackId) {
      const idx = TRACKS.findIndex(t => t.id === activeTrackId);
      if (idx !== -1 && idx !== currentTrackIndex) {
        setCurrentTrackIndex(idx);
      }
    }
  }, [activeTrackId, currentTrackIndex]);

  // Audio Engine State Listener
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(() => {
      setIsPlaying(soundEngine.getIsPlaying());
    });
    return () => unsubscribe();
  }, []);

  // Step sequencer ticker (visual 16-step LEDs)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = (60 / currentTrack.bpm / 4) * 1000;
    const timer = setInterval(() => {
      setCurrentStep(s => (s + 1) % 16);
    }, interval);
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.bpm]);

  // Waveform Canvas Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const data = soundEngine.getAnalyserData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 32;
      const barWidth = canvas.width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const val = isPlaying ? data[i % data.length] || 0 : Math.sin(Date.now() / 400 + i * 0.3) * 6 + 10;
        const barHeight = Math.max(3, (val / 255) * canvas.height * 0.9);
        const x = i * (barWidth + 2);
        const y = canvas.height - barHeight;

        // Gradient or alternating brand colors
        const isPinkAccent = i % 4 === 0;
        ctx.fillStyle = isPinkAccent ? '#FF2E88' : '#12FE07';
        ctx.shadowColor = isPinkAccent ? '#FF2E88' : '#12FE07';
        ctx.shadowBlur = isPlaying ? 8 : 2;

        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    soundEngine.togglePlay(currentTrack.id, currentTrack.bpm);
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    if (onTrackChange) onTrackChange(TRACKS[nextIdx]);
    if (isPlaying) {
      soundEngine.playTrack(TRACKS[nextIdx].id, TRACKS[nextIdx].bpm);
    }
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    if (onTrackChange) onTrackChange(TRACKS[prevIdx]);
    if (isPlaying) {
      soundEngine.playTrack(TRACKS[prevIdx].id, TRACKS[prevIdx].bpm);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    soundEngine.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      soundEngine.setVolume(volume || 0.4);
    } else {
      setIsMuted(true);
      soundEngine.setVolume(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl bg-[#141414] border-2 border-[#1A1A1A] p-5 md:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Carbon texture & subtle scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Cyberdeck Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#222222] pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#12FE07] shadow-[0_0_10px_#12FE07] animate-pulse" />
          <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#12FE07]">
            CYBERDECK // AUDIO_CORE_v2.0
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#1A1A1A] text-[10px] font-mono text-[#FF2E88] border border-[#FF2E88]/30">
            {currentTrack.genre.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#888888]">
          <span className="flex items-center gap-1.5">
            <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#12FE07] animate-spin' : 'text-[#888888]'}`} />
            <span>FREQ: <strong className="text-[#F9F9F9]">{currentTrack.bpm} BPM</strong></span>
          </span>
          <span>KEY: <strong className="text-[#F9F9F9]">{currentTrack.key}</strong></span>
        </div>
      </div>

      {/* Main Controls & Display Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Track Artwork / Cassette View */}
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-lg overflow-hidden border-2 border-[#2A2A2A] shadow-[0_0_20px_rgba(0,0,0,0.7)] group">
            <img
              src={currentTrack.coverImage}
              alt={currentTrack.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            
            {/* Spinning Center Record Ring */}
            <div className={`absolute inset-0 m-auto w-12 h-12 rounded-full border-2 border-dashed border-[#12FE07] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />

            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-[#F9F9F9]">
              <span className="bg-black/70 px-1.5 py-0.5 rounded border border-[#333]">
                {currentTrack.duration}
              </span>
              <span className="text-[#12FE07] font-semibold">
                {currentTrack.version}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Track Metadata & Live Audio Visualizer */}
        <div className="md:col-span-8 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="text-[10px] font-mono text-[#12FE07] tracking-wider uppercase mb-1">
              {currentTrack.subtitle}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black italic tracking-wide text-[#F9F9F9] font-title">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-[#888888] mt-1 font-mono leading-relaxed">
              {currentTrack.description}
            </p>
          </div>

          {/* Waveform Visualizer Canvas */}
          <div className="w-full h-16 bg-[#0A0A0A] rounded border border-[#222222] p-2 relative overflow-hidden flex items-end">
            <canvas
              ref={canvasRef}
              width={380}
              height={50}
              className="w-full h-full"
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-mono text-[#888888] bg-black/60 px-2 py-0.5 rounded border border-[#222]">
                  [CLICK PLAY PARA SINTETIZAR GROOVE 128 BPM]
                </span>
              </div>
            )}
          </div>

          {/* 16-Step LED Grid */}
          <div className="flex items-center gap-1.5 py-1">
            {Array.from({ length: 16 }).map((_, i) => {
              const isCurrent = isPlaying && currentStep === i;
              const isKickStep = i % 4 === 0;
              return (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-sm transition-all duration-75 ${
                    isCurrent
                      ? 'bg-[#12FE07] shadow-[0_0_8px_#12FE07] scale-110'
                      : isKickStep
                      ? 'bg-[#2A2A2A]'
                      : 'bg-[#181818]'
                  }`}
                />
              );
            })}
          </div>

          {/* Player Transport Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#222222]">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] text-[#F9F9F9] hover:text-[#12FE07] transition-colors border border-[#2A2A2A]"
                aria-label="Faixa anterior"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="px-5 py-2.5 rounded-lg bg-[#12FE07] hover:bg-[#0fdc04] text-black font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(18,254,7,0.4)] transition-transform active:scale-95 cursor-pointer"
                aria-label={isPlaying ? 'Pausar áudio' : 'Tocar áudio'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-black" />
                    <span className="text-xs font-mono tracking-wider">PAUSAR</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black ml-0.5" />
                    <span className="text-xs font-mono tracking-wider">TOCAR</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] text-[#F9F9F9] hover:text-[#12FE07] transition-colors border border-[#2A2A2A]"
                aria-label="Próxima faixa"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-[#888888] hover:text-[#F9F9F9] transition-colors"
                aria-label={isMuted ? 'Desmutar' : 'Mutar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#FF2E88]" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 sm:w-24 h-1.5 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#12FE07]"
              />
            </div>

            {/* External Links */}
            <div className="flex items-center gap-2">
              {currentTrack.links.spotify && (
                <a
                  href={currentTrack.links.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-[#12FE07] text-[11px] font-mono border border-[#2A2A2A] flex items-center gap-1 transition-colors"
                >
                  <span>SPOTIFY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {currentTrack.links.beatport && (
                <a
                  href={currentTrack.links.beatport}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-[#FF2E88] text-[11px] font-mono border border-[#2A2A2A] flex items-center gap-1 transition-colors"
                >
                  <span>BEATPORT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
