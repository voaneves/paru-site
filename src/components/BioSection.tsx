import React from 'react';
import { Download, Cpu, Activity, ShieldCheck, FileText, Zap } from 'lucide-react';

export const BioSection: React.FC = () => {
  const handleDownloadEPK = () => {
    // Generates a mock download or opens drive link
    alert('Iniciando download do Press Kit Oficial PARU // EPK_2026.zip\n(Fotos em alta resolução, rider técnico, mapa de palco e biografia PT/EN)');
  };

  return (
    <section id="bio" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute -top-10 right-0 w-80 h-80 bg-[#FF2E88]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid: Photo & Manifesto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Press Portrait with Cyber HUD Frame */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#1A1A1A] p-2 bg-[#0F0F0F] shadow-[0_0_30px_rgba(0,0,0,0.8)] group">
            {/* Corner Tech Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#12FE07] z-20" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FF2E88] z-20" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FF2E88] z-20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#12FE07] z-20" />

            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black">
              <img
                src="./assets/paru_press_portrait.jpg"
                alt="PARU // O Arquiteto do Sistema"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              {/* Live Status Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#F9F9F9] bg-black/75 backdrop-blur-md p-2.5 rounded border border-[#2A2A2A]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#12FE07] animate-ping" />
                  <span>PARU // SOUND_ARCHITECT</span>
                </div>
                <span className="text-[#FF2E88]">CORE_v2.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Brand Manifesto & Engineering */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="flex items-center gap-2 text-[#12FE07] font-mono text-xs tracking-widest uppercase">
            <Cpu className="w-4 h-4" />
            <span>03 // MANIFESTO DO ARQUITETO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-[#F9F9F9] font-title leading-tight">
            "NÃO REAGIMOS À PISTA, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#12FE07] via-[#F9F9F9] to-[#FF2E88]">
              NÓS A PROGRAMAMOS."
            </span>
          </h2>

          <div className="space-y-4 text-sm sm:text-base font-mono text-[#CCCCCC] leading-relaxed">
            <p>
              PARU não é apenas um DJ; é um arquiteto de sistemas sonoros. No universo do <strong className="text-[#12FE07]">Indie Dance</strong> e <strong className="text-[#FF2E88]">Minimal Deep Tech</strong>, as mixagens não são meras transições, mas verdadeiros upgrades de sistema em tempo real.
            </p>
            <p className="text-[#888888]">
              A música flui como código perfeitamente compilado: mecânica, hipnótica e conduzida com precisão cirúrgica. Conectando pessoas ao momento presente através do rigor tecnológico e criando pontes emocionais de catarse e união no epicentro da pista.
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#141414] border border-[#222222]">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#12FE07] uppercase">
                <Activity className="w-3.5 h-3.5" />
                <span>FREQUÊNCIA</span>
              </div>
              <div className="text-sm font-bold text-[#F9F9F9] font-title mt-1">126–128 BPM</div>
              <div className="text-[10px] font-mono text-[#777]">Indie Dance / Tech</div>
            </div>

            <div className="p-3 rounded-lg bg-[#141414] border border-[#222222]">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF2E88] uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>RIDER TÉCNICO</span>
              </div>
              <div className="text-sm font-bold text-[#F9F9F9] font-title mt-1">CDJ-3000 / DJM</div>
              <div className="text-[10px] font-mono text-[#777]">Pioneer / Xone 96</div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-[#141414] border border-[#222222]">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F9F9F9] uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#12FE07]" />
                <span>EXPERIÊNCIA</span>
              </div>
              <div className="text-sm font-bold text-[#F9F9F9] font-title mt-1">EXTENDED SETS</div>
              <div className="text-[10px] font-mono text-[#777]">3h a 6h Imersão</div>
            </div>
          </div>

          {/* EPK / Press Kit Action */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleDownloadEPK}
              className="px-6 py-3 rounded-lg bg-[#12FE07] hover:bg-[#0fdc04] text-black font-bold font-mono text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(18,254,7,0.35)] transition-transform active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>BAIXAR PRESS KIT COMPLETO (EPK)</span>
            </button>

            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] text-[#F9F9F9] font-mono text-xs tracking-wider border border-[#2A2A2A] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#888888]" />
              <span>SOLICITAR RIDER TÉCNICO</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
