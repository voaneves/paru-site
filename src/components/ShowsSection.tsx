import { useEffect, useState } from 'react';
import { CalendarPlus, MapPin, MessageCircle, Send, Ticket } from 'lucide-react';
import { downloadIcs } from '../services/ics';
import type { Show } from '../data/shows';
import { loadShows } from '../services/calendarService';
import { whatsappLink } from '../config/site';
import { DemoTag, SectionHead } from './Brand';

const STATUS: Record<Show['status'], { label: string; tone: string }> = {
  'on-sale': { label: 'Ingressos', tone: 'green' },
  'few-left': { label: 'Últimos ingressos', tone: 'pink' },
  'sold-out': { label: 'Esgotado', tone: 'dim' },
  soon: { label: 'Em breve', tone: 'dim' },
  guestlist: { label: 'Lista', tone: 'green' },
};

function parts(iso: string) {
  const d = new Date(iso);
  const tz = { timeZone: 'America/Sao_Paulo' } as const;
  return {
    day: d.toLocaleDateString('pt-BR', { ...tz, day: '2-digit' }),
    month: d.toLocaleDateString('pt-BR', { ...tz, month: 'short' }).replace('.', '').toUpperCase(),
    weekday: d.toLocaleDateString('pt-BR', { ...tz, weekday: 'short' }).replace('.', '').toUpperCase(),
    year: d.toLocaleDateString('pt-BR', { ...tz, year: 'numeric' }),
  };
}

export function ShowsSection() {
  const [shows, setShows] = useState<Show[] | null>(null);

  useEffect(() => {
    loadShows().then(setShows);
  }, []);

  const hasDemo = shows?.some((s) => s.demo);

  return (
    <section id="shows" className="section section--chassi" aria-labelledby="shows-title">
      <div className="container">
        <SectionHead
          section="shows"
          id="shows-title"
          cmd="cat ./agenda.log"
          tag={hasDemo ? <DemoTag /> : undefined}
          title="Próximos shows"
          lead="O próximo show está configurado. Vejo vocês no centro do som."
        />

        {shows === null ? (
          <p className="mono dim" aria-live="polite">
            &gt; CARREGANDO AGENDA<span className="caret" />
          </p>
        ) : shows.length === 0 ? (
          <div className="empty mono">
            <p>&gt; NENHUMA DATA PÚBLICA NO MOMENTO.</p>
            <p className="dim">&gt; Novas sequências ao vivo em breve — ou traga PARU para a sua pista.</p>
          </div>
        ) : (
          <ol className="shows" role="list">
            {shows.map((s) => {
              const p = parts(s.date);
              const st = STATUS[s.status];
              const canBuy = s.ticketUrl && s.status !== 'sold-out';
              return (
                <li key={s.id} className="show">
                  <time className="show__date" dateTime={s.date}>
                    <span className="show__day">{p.day}</span>
                    <span className="show__month mono">
                      {p.month}
                      <br />
                      <span className="dim">
                        {p.weekday} · {p.year}
                      </span>
                    </span>
                  </time>
                  <div className="show__place">
                    <span className="show__city">
                      {s.city}
                      {s.state ? <span className="dim">, {s.state}</span> : null}
                    </span>
                    <span className="show__venue mono">
                      <MapPin size={13} aria-hidden="true" className="show__pin" />
                      {s.venue}
                      {s.event ? <span className="dim"> // {s.event}</span> : null}
                    </span>
                  </div>
                  <div className="show__action">
                    {canBuy ? (
                      <a className={`btn ${s.status === 'few-left' ? 'btn--pink' : 'btn--primary'} btn--sm`} href={s.ticketUrl} target="_blank" rel="noreferrer">
                        <Ticket size={16} aria-hidden="true" /> {st.label}
                      </a>
                    ) : (
                      <span className={`status mono ${st.tone}`}>{st.label}</span>
                    )}
                    <button
                      className="icon-btn icon-btn--square"
                      onClick={() => downloadIcs(s)}
                      aria-label={`Salvar o show de ${s.city} na sua agenda`}
                      title="Salvar na agenda"
                    >
                      <CalendarPlus size={18} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        <aside className="book-cta">
          <div>
            <p className="mono pink small">&gt; CLUBS, FESTIVAIS E EVENTOS</p>
            <p className="book-cta__title">Quer PARU no seu line-up?</p>
          </div>
          <div className="book-cta__actions">
            <a className="btn btn--primary" href="#booking">
              <Send size={16} aria-hidden="true" /> Solicitar data
            </a>
            <a className="btn btn--ghost" href={whatsappLink('Olá! Quero consultar disponibilidade de data para o PARU.')} target="_blank" rel="noreferrer">
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
