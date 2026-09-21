import { useEffect, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { CatHead, Wordmark } from './Brand';
import { NAV } from '../config/nav';
import { whatsappLink } from '../config/site';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const links = NAV.filter((n) => n.id !== 'booking');
  const bookingActive = active === 'booking';

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="container site-header__row">
        <a href="#topo" className="site-header__logo" aria-label="PARU — início">
          <Wordmark />
          <CatHead pulse={false} glow={false} className="site-header__cat" label="" />
        </a>

        <nav className="site-nav" aria-label="Principal">
          {links.map(({ id, label, icon: Icon }) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined}>
              <Icon size={16} aria-hidden="true" />
              {label}
            </a>
          ))}
          <a href="#booking" className={`btn btn--primary btn--sm ${bookingActive ? 'is-active' : ''}`} aria-current={bookingActive ? 'location' : undefined}>
            <Send size={14} aria-hidden="true" /> Contratar
          </a>
        </nav>

        <a
          className="header-wa"
          href={whatsappLink('Olá! Quero falar sobre uma data com o PARU.')}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
          title="Falar no WhatsApp"
        >
          <MessageCircle size={20} />
        </a>
      </div>
      <span className="site-header__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
