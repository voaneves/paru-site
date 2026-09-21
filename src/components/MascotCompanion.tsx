import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { CatPose } from '../data/tracks';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Avatar do sistema (inspiração Peggy Gou): o felino oficial acompanha a navegação,
 * trocando de pose conforme a seção — usando SOMENTE as poses do brandbook (pág. 11).
 */
const BY_SECTION: Record<string, { pose: CatPose; lines: string[] }> = {
  musica: { pose: 'pounce', lines: ['> NÃO REAGIMOS À PISTA. NÓS A PROGRAMAMOS.', '> FREQUÊNCIA ESTABILIZADA EM 128 BPM'] },
  shows: { pose: 'prowl', lines: ['> INITIATING SEQUENCE...', '> LONG SET_LOADED'] },
  arquiteto: { pose: 'rest', lines: ['> MODO CONTEMPLATIVO.', '> AVATAR DO SISTEMA EM REPOUSO.'] },
  booking: { pose: 'stretch', lines: ['> SISTEMA PRONTO PARA O REBOOT.', '> BORA MARCAR ESSA DATA?'] },
};
const POSES: CatPose[] = ['pounce', 'prowl', 'rest', 'stretch'];
const KEY = 'paru.mascot.hidden';

export function MascotCompanion({ section }: { section: string }) {
  const reduced = usePrefersReducedMotion();
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(KEY) === '1';
    } catch {
      return false;
    }
  });
  const [talk, setTalk] = useState(false);
  const [hop, setHop] = useState(0);
  const conf = BY_SECTION[section];

  // fala sozinho rapidamente ao chegar numa nova seção
  useEffect(() => {
    if (!conf) return;
    setHop((h) => h + 1);
    // no celular o balão só abre no toque, para não cobrir o conteúdo
    if (!window.matchMedia('(min-width: 860px)').matches) return;
    setTalk(true);
    const t = window.setTimeout(() => setTalk(false), 3200);
    return () => window.clearTimeout(t);
  }, [section, conf]);

  const hide = () => {
    setHidden(true);
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
  };
  const show = () => {
    setHidden(false);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  };

  if (!conf) return null; // no hero a cabeça já está em destaque; no manifesto (fundo branco) o neon não funciona
  if (hidden)
    return (
      <button className="mascot-restore" onClick={show} aria-label="Mostrar o mascote">
        <img src="./brand/cat-head-neon.webp" alt="" width={28} />
      </button>
    );

  return (
    <div className="mascot" data-reduced={reduced}>
      {talk && (
        <div className="mascot__bubble mono" role="status">
          {conf.lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
      <button className="mascot__close" onClick={hide} aria-label="Esconder mascote">
        <X size={12} />
      </button>
      <button className="mascot__btn" onClick={() => setTalk((v) => !v)} aria-label="Falar com o felino PARU">
        {POSES.map((p) => (
          <img
            key={p}
            src={`./brand/cat-${p}.webp`}
            alt=""
            className={`mascot__img ${p === conf.pose ? 'is-on' : ''}`}
            data-hop={p === conf.pose ? hop % 2 : undefined}
            draggable={false}
          />
        ))}
      </button>
    </div>
  );
}
