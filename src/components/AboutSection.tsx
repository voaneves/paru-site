import { Download } from 'lucide-react';
import { SITE, whatsappLink } from '../config/site';
import { BrandBar } from './Brand';

const BINARY = '1010011000101110010100101010011001010101010110100110001'.repeat(4);

/** O Arquiteto do Sistema — Mission & Purpose (pág. 5) + Positioning (pág. 6) + Voice (pág. 7). */
export function AboutSection() {
  return (
    <section id="arquiteto" className="section about" aria-labelledby="about-title">
      <div className="about__binary mono" aria-hidden="true">
        {BINARY.slice(0, 4)}
        <span className="pink">1010</span>
        {BINARY.slice(4)}
      </div>
      <div className="container about__grid">
        <figure className="about__photo">
          <img src="./brand/paru-portrait.jpg" alt="PARU, DJ e produtor musical" loading="lazy" width={1100} height={1650} />
          <figcaption className="mono">
            <span className="green">●</span> PARU // O ARQUITETO DO SISTEMA
          </figcaption>
        </figure>

        <div className="about__body">
          <p className="prompt">
            <span className="prompt__user">user@paru-sys</span>:~$ whoami
          </p>
          <h2 id="about-title" className="display">
            O arquiteto
            <br />
            do sistema
          </h2>
          <BrandBar />
          <p className="about__archetype mono">
            O arquétipo adotado é <strong>O Criador / Arquiteto</strong>. A postura transmite mistério e autoridade técnica: as mixagens não são simples
            transições, são verdadeiros upgrades de sistema.
          </p>
          <p>
            Conectar as pessoas ao momento presente através da precisão técnica da música eletrônica. O objetivo é criar espaços de alegria e união por meio
            de uma estética futurista e minimalista, usando a tecnologia para facilitar a catarse e a conexão humana.
          </p>
          <p>
            Como um arquiteto sonoro, a arte serve para transmutar a realidade e elevar a vibração. A tecnologia é uma ferramenta de “resgate humano” que,
            quando aplicada com rigor, não afasta: cria pontes emocionais.
          </p>

          <ul className="voice" aria-label="Pilares da marca">
            <li>Confident</li>
            <li>Authentic</li>
            <li>Inspiring</li>
            <li>Modern</li>
          </ul>

          <div className="about__actions">
            {SITE.pressKitUrl ? (
              <a className="btn btn--primary" href={SITE.pressKitUrl} target="_blank" rel="noreferrer">
                <Download size={16} /> Baixar press kit
              </a>
            ) : (
              <a className="btn btn--primary" href={whatsappLink('Olá! Gostaria de receber o press kit do PARU.')} target="_blank" rel="noreferrer">
                <Download size={16} /> Solicitar press kit
              </a>
            )}
            <a className="btn btn--ghost" href="#booking">
              Rider técnico
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
