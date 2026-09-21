import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Radio } from 'lucide-react';
import { ParuLogo } from './ParuLogo';
import { soundEngine } from '../services/audioEngine';

export const Navbar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const unsub = soundEngine.subscribe(() => {
      setIsPlaying(soundEngine.getIsPlaying());
    });
    return () => unsub();
  }, []);

  // Update São Paulo live time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('pt-BR', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    soundEngine.togglePlay();
  };

  const navLinks = [
    { label: '01. MÚSICA', href: '#releases' },
    { label: '02. SHOWS', href: '#tour' },
    { label: '03. ARQUITETO', href: '#bio' },
    { label: '04. BOOKING', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-[#222222] py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Terminal HUD status */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-[#888888]">
          <div className="flex items-center gap-1.5 text-[#12FE07]">
            <span className="w-2 h-2 rounded-full bg-[#12FE07] animate-ping" />
            <span className="font-semibold">PARU_CORE_v2.0</span>
          </div>
          <span className="text-[#333]">|</span>
          <span>SP [{timeStr || '12:00:00'}]</span>
          <span className="text-[#333]">|</span>
          <span className="text-[#F9F9F9] flex items-center gap-1">
            <Radio className={`w-3 h-3 ${isPlaying ? 'text-[#12FE07] animate-spin' : 'text-[#666]'}`} />
            128 BPM
          </span>
        </div>

        {/* Center: Brand Logo */}
        <a href="#" className="flex items-center gap-3">
          <ParuLogo size="md" />
        </a>

        {/* Right: Actions & Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#CCCCCC] hover:text-[#12FE07] transition-colors relative py-1 tracking-wider group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#12FE07] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Audio Quick Switch */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#12FE07]/15 border-[#12FE07] text-[#12FE07] shadow-[0_0_12px_rgba(18,254,7,0.3)]'
                : 'bg-[#141414] border-[#2A2A2A] text-[#888888] hover:text-[#F9F9F9]'
            }`}
            title={isPlaying ? 'Pausar áudio 128 BPM' : 'Ativar áudio 128 BPM'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">128 BPM: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AUDIO: OFF</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#141414] text-[#F9F9F9] border border-[#2A2A2A] cursor-pointer"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-[#222222] px-6 py-6 font-mono text-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F] text-xs text-[#888]">
            <span>STATUS: ONLINE</span>
            <span className="text-[#12FE07]">BPM: 128</span>
          </div>

          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F9F9F9] hover:text-[#12FE07] text-base font-bold py-1 border-b border-[#1A1A1A]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                toggleAudio();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded bg-[#12FE07] text-black font-bold flex items-center justify-center gap-2"
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlaying ? 'DESATIVAR ÁUDIO' : 'ATIVAR GROOVE 128 BPM'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
