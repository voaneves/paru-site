import React, { useState, useEffect } from 'react';
import { Play, Calendar, Terminal, ChevronDown, Sparkles } from 'lucide-react';
import { ParuLogo } from './ParuLogo';
import { InteractiveMascot } from './InteractiveMascot';
import { soundEngine } from '../services/audioEngine';

export const Hero: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);

  const fullLogs = [
    '> INICIANDO SISTEMA_PARU_CORE_v2.0...',
    '> CARREGANDO PROTOCOLOS DE IDENTIDADE... [OK]',
    '> RENDERIZANDO INTERFACE EM DARK_MODE... [OK]',
    '> FREQUÊNCIA ESTABILIZADA EM 128 BPM [OK]',
    '> ARQUITETURA SONORA PRONTA PARA DISPARO.',
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < fullLogs.length) {
        setTerminalLines((prev) => [...prev, fullLogs[currentIdx]]);
        currentIdx++;
      } else {
        setBootDone(true);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const handleListenNow = () => {
    soundEngine.playTrack('track-1', 128);
    const element = document.getElementById('releases');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 overflow-hidden bg-black">
      {/* Background Image with Dark Vignette & Laser Accents */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/hero_stage.jpg"
          alt="PARU Live Stage Atmosphere"
          className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-125 scale-105 transition-transform duration-1000"
        />
        {/* Gradients to blend into black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

        {/* Ambient laser glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#12FE07]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#FF2E88]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Scanline CRT lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,254,7,0.02)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none" />
      </div>

      {/* Top: Terminal Bootloader Box */}
      <div className="relative z-10 max-w-4xl mx-auto w-full pt-4">
        <div className="rounded-lg bg-black/75 border border-[#1A1A1A] p-3 sm:p-4 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between border-b border-[#222222] pb-2 mb-2 text-[10px] font-mono text-[#888888]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#12FE07]" />
              <span>user@paru-sys:~$ cat boot.log</span>
            </div>
            <span className="text-[#12FE07] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12FE07] animate-ping" />
              ONLINE
            </span>
          </div>

          <div className="font-mono text-xs space-y-1 text-[#12FE07]/90 min-h-[55px]">
            {terminalLines.map((line, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="opacity-80">{line}</span>
              </div>
            ))}
            {!bootDone && (
              <span className="inline-block w-2 h-3.5 bg-[#12FE07] animate-pulse align-middle ml-1" />
            )}
          </div>
        </div>
      </div>

      {/* Center: Main Brand Impact & Interactive Mascot */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto py-8 sm:py-12 flex flex-col items-center">
        {/* Interactive Feline Mascot Header Position */}
        <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
          <InteractiveMascot size={150} />
        </div>

        {/* Brand Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#2A2A2A] text-xs sm:text-sm font-mono tracking-widest text-[#FF2E88] uppercase mb-4 shadow-[0_0_15px_rgba(255,46,136,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ARQUITETURA SONORA PARA MENTES CONECTADAS</span>
        </div>

        {/* Gigantic Paru Logo */}
        <h1 className="sr-only">PARU // DJ & Sound Architect</h1>
        <div className="py-2">
          <ParuLogo size="hero" showGlow={true} />
        </div>

        {/* Secondary Manifesto Line */}
        <p className="max-w-2xl text-sm sm:text-lg font-mono text-[#CCCCCC] mt-4 tracking-wide leading-relaxed px-4">
          <span className="text-[#12FE07] font-bold">Mecânica, hipnótica</span> e conduzida com{' '}
          <span className="text-[#FF2E88] font-bold">precisão cirúrgica</span>. O próximo show está configurado.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={handleListenNow}
            className="px-7 py-3.5 rounded-xl bg-[#12FE07] hover:bg-[#0fdc04] text-black font-extrabold font-mono text-xs sm:text-sm tracking-wider flex items-center gap-2.5 shadow-[0_0_25px_rgba(18,254,7,0.45)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>OUVIR ÚLTIMO LANÇAMENTO</span>
          </button>

          <a
            href="#tour"
            className="px-7 py-3.5 rounded-xl bg-[#141414] hover:bg-[#1F1F1F] text-[#F9F9F9] font-mono text-xs sm:text-sm tracking-wider border border-[#2A2A2A] hover:border-[#12FE07] flex items-center gap-2.5 transition-all shadow-[0_5px_20px_rgba(0,0,0,0.6)] cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#FF2E88]" />
            <span>PRÓXIMAS DATAS / SHOWS</span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-4">
        <a
          href="#releases"
          className="flex flex-col items-center gap-1 font-mono text-[10px] text-[#777777] hover:text-[#12FE07] transition-colors"
          aria-label="Rolar para discografia"
        >
          <span>EXPLORAR SISTEMA</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#12FE07]" />
        </a>
      </div>
    </section>
  );
};
