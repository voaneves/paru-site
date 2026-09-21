import React from 'react';
import { ParuLogo } from './ParuLogo';
import { Music, Radio, ArrowUp } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080808] border-t border-[#1A1A1A] pt-16 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Background Binary Matrix Watermark (Brandbook Page 07) */}
      <div className="absolute inset-0 select-none overflow-hidden opacity-[0.03] font-mono text-2xl text-[#12FE07] pointer-events-none leading-none tracking-widest break-all">
        101001100010111001010010101001100101010101010101010100101001100010111000111010111001011010101001010101010010101010101101010100101001010101010010101010
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-between space-y-10">
        {/* Top: Brand & Tagline */}
        <div className="flex flex-col items-center text-center space-y-3">
          <ParuLogo size="md" />
          <p className="font-mono text-xs text-[#888888] tracking-widest uppercase">
            PARU // FREQUÊNCIA CONDUZIDA // 128 BPM
          </p>
        </div>

        {/* Social Links & Streaming */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-[#888888]">
          <a
            href="https://open.spotify.com/artist/paru"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#12FE07] transition-colors flex items-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5" />
            <span>SPOTIFY</span>
          </a>
          <a
            href="https://soundcloud.com/paruvegan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FF2E88] transition-colors flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>SOUNDCLOUD</span>
          </a>
          <a
            href="https://instagram.com/paruvegan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F9F9F9] transition-colors flex items-center gap-1.5"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>INSTAGRAM</span>
          </a>
          <a
            href="https://www.beatport.com/artist/paru"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#12FE07] transition-colors"
          >
            BEATPORT
          </a>
        </div>

        {/* Bottom Bar: System & Scroll to Top */}
        <div className="w-full pt-8 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#666666]">
          <div>
            &copy; {new Date().getFullYear()} PARU CORE v2.0. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#888888] hover:text-[#12FE07] transition-colors cursor-pointer"
          >
            <span>VOLTAR AO TOPO</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
