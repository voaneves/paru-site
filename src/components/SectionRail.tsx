import { ArrowUp } from 'lucide-react';
import { NAV } from '../config/nav';

/** Índice lateral (desktop): mostra onde o visitante está e leva direto a cada seção. */
export function SectionRail({ active }: { active: string }) {
  const atTop = active === 'topo';
  return (
    <nav className={`rail ${atTop ? 'is-hidden' : ''}`} aria-label="Índice das seções">
      <ol>
        {NAV.map(({ id, label, icon: Icon }, i) => {
          const on = active === id;
          return (
            <li key={id}>
              <a href={`#${id}`} className={on ? 'is-active' : ''} aria-current={on ? 'location' : undefined} tabIndex={atTop ? -1 : undefined}>
                <span className="rail__label">
                  <Icon size={14} aria-hidden="true" /> {label}
                </span>
                <span className="rail__num mono">0{i + 1}</span>
              </a>
            </li>
          );
        })}
        <li>
          <a href="#topo" className="rail__top" aria-label="Voltar ao topo" tabIndex={atTop ? -1 : undefined}>
            <span className="rail__label">Topo</span>
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </li>
      </ol>
    </nav>
  );
}
