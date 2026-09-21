import { SITE } from '../config/site';

/** Brand Philosophy (pág. 4) — texto literal do brandbook, mesma composição. */
export function Manifesto() {
  const marquee = [...SITE.taglines, ...SITE.taglines];
  return (
    <section id="manifesto" className="manifesto" aria-labelledby="manifesto-title">
      <div className="container manifesto__grid">
        <div className="manifesto__main">
          <h2 id="manifesto-title" className="manifesto__title">
            Brand
            <br />
            Philosophy
          </h2>
          <div className="manifesto__text mono">
            <p>
              PARU não é apenas um DJ; é um <strong>arquiteto de sistemas sonoros</strong>.
            </p>
            <p>
              No universo do <span className="green">Indie Dance</span> e <span className="pink">Minimal Deep Tech</span>, não reagimos à pista,
              nós a programamos.
            </p>
            <p>A música flui como código perfeitamente compilado:</p>
            <p className="manifesto__highlight">
              <span>Mecânica, hipnótica e conduzida com precisão cirúrgica.</span>
            </p>
          </div>
        </div>
        <dl className="manifesto__side">
          <div>
            <dt className="mono">Brand promise</dt>
            <dd>{SITE.promise}</dd>
          </div>
          <div>
            <dt className="mono">Taglines</dt>
            {SITE.taglines.map((t) => (
              <dd key={t}>{t}</dd>
            ))}
          </div>
          <div className="manifesto__cat" aria-hidden="true">
            <span className="code-icon">
              <span className="green">&lt;/</span>
              <span className="pink">&gt;</span>
            </span>
          </div>
        </dl>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {marquee.map((t, i) => (
            <span key={i}>
              {t}
              <i className="marquee__sep">■</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
