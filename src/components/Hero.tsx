import { useEffect, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { BrandBar, CatHead, Wordmark } from './Brand';
import { SITE } from '../config/site';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// Texto exato da capa do brandbook (pág. 1)
const BOOT = [
  'login: admin',
  'password: ••••••••••••',
  '> AUTHENTICATION SUCCESSFUL',
  '> INICIANDO SISTEMA_PARU_CORE_v2.0...',
  '> CARREGANDO PROTOCOLOS DE IDENTIDADE... [OK]',
  '> RENDERIZANDO INTERFACE EM DARK_MODE... [OK]',
];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [lines, setLines] = useState(reduced ? BOOT.length : 0);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setLines((n) => (n >= BOOT.length ? n : n + 1)), 380);
    return () => window.clearInterval(t);
  }, [reduced]);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 15000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="topo" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__texture hero__texture--green" />
        <div className="hero__texture hero__texture--pink" />
        <div className="hero__scan" />
      </div>

      <div className="hero__center">
        <CatHead interactive className="hero__cat" label="Mascote PARU — o felino, avatar do sistema" />
        <h1 id="hero-title" className="hero__title">
          <Wordmark className="hero__wordmark" title="PARU" />
        </h1>
        <p className="hero__genres mono">
          <span className="green">INDIE DANCE</span> <span className="dim">//</span> <span className="pink">MINIMAL DEEP TECH</span>
        </p>
        <p className="hero__promise">{SITE.promise}</p>
        <div className="hero__cta">
          <a href="#musica" className="btn btn--primary">
            <Play size={16} fill="currentColor" /> Ouvir agora
          </a>
          <a href="#shows" className="btn btn--ghost">
            Próximos shows
          </a>
        </div>
      </div>

      <div className="hero__foot container">
        <pre className="hero__boot mono" aria-label="Sistema PARU iniciado">
          {BOOT.slice(0, lines).join('\n')}
          {lines < BOOT.length && <span className="caret" />}
          {lines >= BOOT.length && (
            <>
              {'\n'}
              <span className="dim">user@paru-sys:~$</span> <span className="caret" />
            </>
          )}
        </pre>
        <div className="hero__status mono">
          <span>
            <i className="dot" /> SYSTEM ONLINE
          </span>
          <span>SÃO PAULO {time}</span>
          <span className="green">{SITE.bpm} BPM</span>
        </div>
        <a href="#manifesto" className="hero__scroll" aria-label="Rolar para o manifesto">
          <ArrowDown size={18} />
        </a>
      </div>
      <BrandBar className="hero__bar" />
    </section>
  );
}
