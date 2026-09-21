import { ArrowUp } from 'lucide-react';
import { SITE } from '../config/site';
import { BrandBar, CatHead, Wordmark } from './Brand';

export function Footer() {
  const socials = [
    { label: 'Instagram', href: SITE.links.instagram },
    { label: 'SoundCloud', href: SITE.links.soundcloud },
    { label: 'Spotify', href: SITE.links.spotify },
    { label: 'Beatport', href: SITE.links.beatport },
    { label: 'YouTube', href: SITE.links.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="site-footer">
      <BrandBar />
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <div className="lockup">
            <Wordmark />
            <CatHead pulse glow={false} className="lockup__cat" label="" />
          </div>
          <p className="mono dim small">{SITE.manifesto}</p>
        </div>
        <ul className="site-footer__taglines mono" role="list">
          {SITE.taglines.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <nav className="site-footer__social" aria-label="Redes sociais">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </nav>
      </div>
      <div className="container site-footer__bottom mono">
        <span>© {new Date().getFullYear()} PARU. Todos os direitos reservados.</span>
        <span className="dim">&gt; // ACESSO AO LINK NA BIO. //</span>
        <a href="#topo" className="to-top">
          Topo <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
