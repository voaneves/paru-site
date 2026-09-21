import { useState, type FormEvent } from 'react';
import { Check, Copy, Mail, MessageCircle, Send } from 'lucide-react';
import { SITE, whatsappLink } from '../config/site';
import { SectionHead } from './Brand';

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const EVENT_TYPES = ['Club', 'Festival', 'Evento privado / corporativo', 'Outro'];

export function BookingSection() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: '', contact: '', type: EVENT_TYPES[0], city: '', date: '', message: '' });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* sem permissão de clipboard: o link mailto continua funcionando */
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const date = f.date ? new Date(f.date + 'T12:00:00').toLocaleDateString('pt-BR') : 'a definir';
    const text =
      `Olá, PARU! Proposta de booking pelo site:\n\n` +
      `• Nome/agência: ${f.name}\n• Contato: ${f.contact}\n• Tipo: ${f.type}\n• Cidade: ${f.city}\n• Data: ${date}\n` +
      (f.message ? `• Detalhes: ${f.message}\n` : '');
    window.open(whatsappLink(text), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section id="booking" className="section" aria-labelledby="booking-title">
      <div className="container">
        <SectionHead id="booking-title" cmd="./booking.sh --new" title="Get in touch" lead="Canal direto para clubs, festivais, selos e imprensa." />

        <div className="booking">
          <div>
          <ul className="contacts" role="list">
            <li>
              <a className="contact" href={whatsappLink('Olá! Quero falar sobre uma data com o PARU.')} target="_blank" rel="noreferrer">
                <MessageCircle size={22} />
                <span>
                  <span className="contact__label mono">WhatsApp · resposta mais rápida</span>
                  <span className="contact__value">{SITE.contact.whatsappDisplay}</span>
                </span>
              </a>
            </li>
            <li className="contact contact--split">
              <a href={`mailto:${SITE.contact.email}?subject=Booking%20PARU`}>
                <Mail size={22} />
                <span>
                  <span className="contact__label mono">E-mail</span>
                  <span className="contact__value">{SITE.contact.email}</span>
                </span>
              </a>
              <button onClick={copy} className="icon-btn" aria-label="Copiar e-mail">
                {copied ? <Check size={18} className="green" /> : <Copy size={18} />}
              </button>
            </li>
            <li>
              <a className="contact" href={SITE.links.instagram} target="_blank" rel="noreferrer">
                <InstagramIcon size={22} />
                <span>
                  <span className="contact__label mono">Instagram</span>
                  <span className="contact__value">@{SITE.contact.instagram}</span>
                </span>
              </a>
            </li>
          </ul>
          <div className="booking__avatar" aria-hidden="true">
            <img src="./brand/cat-sit.webp" alt="" loading="lazy" />
            <p className="mono dim">
              &gt; AVATAR DO SISTEMA: ONLINE
              <br />
              &gt; AGUARDANDO SUA PROPOSTA_
            </p>
          </div>
          </div>
          <form className="terminal-form" onSubmit={submit}>
            <div className="terminal-form__bar mono">
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              booking_terminal.sh
            </div>
            <p className="mono green small">&gt; PROPOSTA DE SHOW — os dados abrem uma conversa no WhatsApp.</p>
            <div className="fields">
              <label>
                <span>Nome / agência</span>
                <input required autoComplete="name" value={f.name} onChange={set('name')} />
              </label>
              <label>
                <span>E-mail ou telefone</span>
                <input required autoComplete="email" value={f.contact} onChange={set('contact')} />
              </label>
              <label>
                <span>Tipo de evento</span>
                <select value={f.type} onChange={set('type')}>
                  {EVENT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Cidade / UF</span>
                <input required placeholder="São Paulo / SP" value={f.city} onChange={set('city')} />
              </label>
              <label>
                <span>Data prevista</span>
                <input type="date" value={f.date} onChange={set('date')} />
              </label>
              <label className="fields__full">
                <span>Detalhes (horário, formato do set, estrutura)</span>
                <textarea rows={3} value={f.message} onChange={set('message')} />
              </label>
            </div>
            <button type="submit" className="btn btn--primary btn--block">
              <Send size={16} /> Enviar proposta
            </button>
            <p className="mono small" role="status" aria-live="polite">
              {sent ? <span className="green">&gt; PROPOSTA PRONTA NO WHATSAPP. É SÓ CONFIRMAR O ENVIO.</span> : null}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
