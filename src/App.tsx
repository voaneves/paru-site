import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MusicSection } from './components/MusicSection';
import { VideosSection } from './components/VideosSection';
import { ShowsSection } from './components/ShowsSection';
import { InfoSection } from './components/InfoSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MascotCompanion } from './components/MascotCompanion';
import { MobileTabBar } from './components/MobileTabBar';
import { SectionRail } from './components/SectionRail';
import { useActiveSection } from './hooks/useActiveSection';
import { SECTIONS } from './config/nav';

export default function App() {
  const active = useActiveSection(SECTIONS);
  return (
    <>
      <Header active={active} />
      <main id="conteudo">
        <Hero />
        <MusicSection />
        <VideosSection />
        <ShowsSection />
        <InfoSection />
        <ContactSection />
      </main>
      <Footer />
      <SectionRail active={active} />
      <MobileTabBar active={active} />
      <MascotCompanion section={active} />
    </>
  );
}
