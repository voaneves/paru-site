import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { MusicSection } from './components/MusicSection';
import { ShowsSection } from './components/ShowsSection';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
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
        <Manifesto />
        <MusicSection />
        <ShowsSection />
        <AboutSection />
        <BookingSection />
      </main>
      <Footer />
      <SectionRail active={active} />
      <MobileTabBar active={active} />
      <MascotCompanion section={active} />
    </>
  );
}
