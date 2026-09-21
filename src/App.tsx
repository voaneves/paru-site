import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { MusicSection } from './components/MusicSection';
import { ShowsSection } from './components/ShowsSection';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { MascotCompanion } from './components/MascotCompanion';
import { useActiveSection } from './hooks/useActiveSection';

const SECTIONS = ['topo', 'manifesto', 'musica', 'shows', 'arquiteto', 'booking'];

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
      <MascotCompanion section={active} />
    </>
  );
}
