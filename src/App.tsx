import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ReleasesSection } from './components/ReleasesSection';
import { TourSection } from './components/TourSection';
import { BioSection } from './components/BioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveMascot, type MascotPose } from './components/InteractiveMascot';
import { Sparkles, X } from 'lucide-react';

export const App: React.FC = () => {
  const [mascotDockOpen, setMascotDockOpen] = useState(false);
  const [currentPose, setCurrentPose] = useState<MascotPose>('sitting');

  return (
    <div className="min-h-screen bg-black text-[#F9F9F9] selection:bg-[#12FE07] selection:text-black relative">
      {/* Fixed HUD Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <ReleasesSection />
        <TourSection />
        <BioSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Interactive Mascot Dock (Peggy Gou Inspired) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {mascotDockOpen ? (
          <div className="bg-[#141414]/95 backdrop-blur-md border-2 border-[#12FE07] rounded-2xl p-4 shadow-[0_0_30px_rgba(18,254,7,0.35)] flex flex-col items-center relative animate-pulse-glow">
            <button
              onClick={() => setMascotDockOpen(false)}
              className="absolute top-2 right-2 text-[#888888] hover:text-[#F9F9F9] p-1 rounded-full cursor-pointer"
              aria-label="Fechar mascote flutuante"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-[10px] font-mono text-[#12FE07] mb-1 font-bold tracking-wider">
              AVATAR // PARU CORE
            </div>

            <InteractiveMascot
              initialPose={currentPose}
              size={130}
              showBadge={true}
              onPoseChange={(p) => setCurrentPose(p)}
            />
          </div>
        ) : (
          <button
            onClick={() => setMascotDockOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#141414] border border-[#12FE07]/50 text-[#12FE07] shadow-[0_0_15px_rgba(18,254,7,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            title="Abrir Mascote Interativo PARU"
            aria-label="Abrir Mascote Interativo"
          >
            <div className="w-2 h-2 rounded-full bg-[#12FE07] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E88]" />
            <span className="font-mono text-xs font-semibold group-hover:text-[#F9F9F9] transition-colors">
              AVATAR FELINO
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
