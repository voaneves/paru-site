import type { ReactNode } from 'react';
import { ExternalLink, FileText, Newspaper } from 'lucide-react';
import { SITE } from '../config/site';
import { SectionHead } from './Brand';

const SOCIALS: { key: keyof typeof SITE.links; label: string }[] = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'soundcloud', label: 'SoundCloud' },
  { key: 'spotify', label: 'Spotify' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'beatport', label: 'Beatport' },
];

function KitLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return href ? (
    <a className="btn btn--dark" href={href} target="_blank" rel="noreferrer">
      {icon} {label}
    </a>
  ) : (
    <span className="btn btn--dark is-disabled" aria-disabled="true" title="Link em breve">
      {icon} {label} <span className="dim">· em breve</span>
    </span>
  );
}

export function InfoSection() {
  const socials = SOCIALS.filter((s) => SITE.links[s.key]);
  return (
    <section id="info" className="section info" aria-labelledby="info-title">
      <div className="container info__grid">
        <figure className="about__photo">
          <img src="./brand/paru-portrait.jpg" alt="PARU, DJ e produtor musical" loading="lazy" width={1100} height={1650} />
        </figure>

        <div className="info__body">
          <SectionHead section="info" id="info-title" cmd="cat ./info.txt" title="Info" />
          {SITE.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}

          {socials.length > 0 && (
            <ul className="info__links" role="list" aria-label="Redes do PARU">
              {socials.map((s) => (
                <li key={s.key}>
                  <a className="chip" href={SITE.links[s.key]} target="_blank" rel="noreferrer">
                    {s.label} <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="about__actions">
            <KitLink href={SITE.pressKitUrl} icon={<Newspaper size={16} aria-hidden="true" />} label="Press kit" />
            <KitLink href={SITE.mediaKitUrl} icon={<FileText size={16} aria-hidden="true" />} label="Mídia kit" />
          </div>
        </div>
      </div>
    </section>
  );
}
