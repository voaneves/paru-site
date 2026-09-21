import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { CAT_HEAD, WORDMARK } from './brandPaths';
import { navIcon } from '../config/nav';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const flip = (h: number) => `translate(0,${h}) scale(0.1,-0.1)`;

/** Logotipo oficial PARU (vetorizado do brandbook). Cor = currentColor. */
export function Wordmark({ className = '', title = 'PARU', style }: { className?: string; title?: string; style?: CSSProperties }) {
  return (
    <svg className={`wordmark ${className}`} viewBox={`0 0 ${WORDMARK.w} ${WORDMARK.h}`} role="img" aria-label={title} style={style}>
      <g transform={flip(WORDMARK.h)}>
        <path fill="currentColor" d={WORDMARK.d} />
      </g>
    </svg>
  );
}

type HeadProps = {
  className?: string;
  /** mostra a linha de pulso (ECG) abaixo da cabeça */
  pulse?: boolean;
  /** olhos seguem o cursor + piscam */
  interactive?: boolean;
  /** versão monocromática (ex.: 'currentColor') como nas variações do brandbook */
  mono?: string;
  glow?: boolean;
  label?: string;
};

/** Cabeça do mascote — traçado oficial, olhos pixel rosa, nariz e pulso (ECG). */
export function CatHead({ className = '', pulse = true, interactive = false, mono, glow = true, label = 'Mascote PARU' }: HeadProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!interactive || reduced) return;
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.38;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const f = Math.min(dist / 260, 1) * 34; // deslocamento máximo em unidades do viewBox
      setEye({ x: (dx / dist) * f, y: (dy / dist) * f * 0.8 });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [interactive, reduced]);

  useEffect(() => {
    if (!interactive || reduced) return;
    let t: number;
    const loop = () => {
      t = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 140);
        loop();
      }, 3200 + Math.random() * 3000);
    };
    loop();
    return () => window.clearTimeout(t);
  }, [interactive, reduced]);

  const green = mono ?? 'var(--green)';
  const pink = mono ?? 'var(--pink)';
  const h = pulse ? CAT_HEAD.h : 1050;

  return (
    <svg
      ref={ref}
      className={`cat-head ${glow ? 'is-glow' : ''} ${className}`}
      viewBox={`0 0 ${CAT_HEAD.w} ${h}`}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <g transform={flip(CAT_HEAD.h)}>
        <path fill={green} d={CAT_HEAD.outline} className="cat-head__outline" />
        <path fill={pink} d={CAT_HEAD.nose} />
      </g>
      <g style={{ transform: `translate(${eye.x}px, ${eye.y}px)`, transition: 'transform .18s ease-out' }}>
        {CAT_HEAD.eyes.map((e, i) => (
          <rect
            key={i}
            x={e.x}
            y={blink ? e.y + e.h / 2 - 9 : e.y}
            width={e.w}
            height={blink ? 18 : e.h}
            fill={pink}
            style={{ transition: 'all .07s' }}
          />
        ))}
      </g>
      {pulse && (
        <g className="cat-head__pulse">
          <g transform={flip(CAT_HEAD.h)}>
            <path fill={pink} d={CAT_HEAD.pulse} />
          </g>
        </g>
      )}
    </svg>
  );
}

/** Barra verde→rosa (assinatura das páginas Brand Overview / Mission). */
export function BrandBar({ className = '' }: { className?: string }) {
  return <span className={`brand-bar ${className}`} aria-hidden="true" />;
}

/** Cabeçalho de seção: prompt de terminal (Fira Code) + título Codec Pro. */
export function SectionHead({
  section,
  cmd,
  title,
  lead,
  tag,
  id,
}: {
  /** id da seção em NAV — define o ícone do prompt */
  section?: string;
  cmd: string;
  title: ReactNode;
  lead?: ReactNode;
  tag?: ReactNode;
  id?: string;
}) {
  const Icon = section ? navIcon(section) : undefined;
  return (
    <header className="section-head">
      <p className="prompt">
        {Icon && (
          <span className="prompt__icon" aria-hidden="true">
            <Icon size={16} />
          </span>
        )}
        <span className="prompt__user">user@paru-sys</span>:~$ {cmd}
        {tag}
      </p>
      <h2 className="display" id={id}>
        {title}
      </h2>
      <BrandBar />
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

export function DemoTag() {
  return (
    <span className="demo-tag" title="Conteúdo de exemplo — substituir pelos dados reais antes de publicar">
      EXEMPLO
    </span>
  );
}
