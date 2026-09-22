import { NAV } from '../config/nav';

/** Barra de abas no rodapé do celular — navegação ao alcance do polegar. */
export function MobileTabBar({ active }: { active: string }) {
  return (
    <nav className="tabbar" aria-label="Navegação rápida">
      {NAV.map(({ id, label, icon: Icon }) => {
        const on = active === id;
        return (
          <a key={id} href={`#${id}`} className={`tabbar__item ${on ? 'is-active' : ''} ${id === 'contato' ? 'tabbar__item--cta' : ''}`} aria-current={on ? 'location' : undefined}>
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
