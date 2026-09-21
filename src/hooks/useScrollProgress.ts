import { useEffect, useState } from 'react';

/** 0 → 1 conforme a página é rolada. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  return p;
}
