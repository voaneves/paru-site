import { useEffect, useState } from 'react';

/** Retorna o id da seção que ocupa o centro da tela e mantém a URL (#hash) em sincronia. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  // link direto (ex.: /#shows): rola até a seção depois que o React montou a página
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h && ids.includes(h)) document.getElementById(h)?.scrollIntoView();
  }, []);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  // atualiza o endereço sem pular a página, para compartilhar o link direto da seção
  useEffect(() => {
    const target = active === ids[0] ? '' : `#${active}`;
    if (window.location.hash !== target) {
      window.history.replaceState(null, '', target || window.location.pathname + window.location.search);
    }
  }, [active, ids]);

  return active;
}
