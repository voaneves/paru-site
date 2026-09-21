import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CatHead, Wordmark } from './Brand';

export const NAV = [
  { id: 'musica', label: 'Música' },
  { id: 'shows', label: 'Shows' },
  { id: 'arquiteto', label: 'Sobre' },
  { id: 'booking', label: 'Booking' },
];

export function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="container site-header__row">
        <a href="#topo" className="site-header__logo" aria-label="PARU — início" onClick={() => setOpen(false)}>
          <Wordmark />
          <CatHead pulse={false} glow={false} className="site-header__cat" label="" />
        </a>

        <nav className="site-nav" aria-label="Principal">
          {NAV.slice(0, 3).map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
          <a href="#booking" className="btn btn--primary btn--sm">
            Contratar
          </a>
        </nav>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div id="mobile-nav" className="mobile-nav" hidden={!open}>
        <p className="mono dim">&gt; SELECIONE O DESTINO_</p>
        {NAV.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
            <span className="mono green">0{i + 1}</span> {n.label}
          </a>
        ))}
      </div>
    </header>
  );
}
