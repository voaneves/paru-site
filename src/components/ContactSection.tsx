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

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: '', email: '', message: '' });
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

  // Sem servidor: abre o app de e-mail do visitante com a mensagem pronta.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Contato pelo site — ${f.name}`;
    const body = `${f.message}\n\n— ${f.name}\n${f.email}`;
    window.location.href = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contato" className="section" aria-labelledby="contato-title">
      <div className="container">
        <SectionHead section="contato" id="contato-title" cmd="./contato.sh" title="Contato" lead="Shows, imprensa e parcerias." />

        <div className="booking">
          <ul className="contacts" role="list">
            <li>
              <a className="contact" href={whatsappLink('Olá, PARU! Vim pelo site.')} target="_blank" rel="noreferrer">
                <MessageCircle size={22} />
                <span>
                  <span className="contact__label mono">WhatsApp</span>
                  <span className="contact__value">{SITE.contact.whatsappDisplay}</span>
                </span>
              </a>
            </li>
            <li className="contact contact--split">
              <a href={`mailto:${SITE.contact.email}`}>
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

          <form className="contact-form" onSubmit={submit}>
            <div className="fields">
              <label>
                <span>Nome</span>
                <input required autoComplete="name" value={f.name} onChange={set('name')} />
              </label>
              <label>
                <span>E-mail</span>
                <input required type="email" autoComplete="email" value={f.email} onChange={set('email')} />
              </label>
              <label className="fields__full">
                <span>Mensagem</span>
                <textarea required rows={5} value={f.message} onChange={set('message')} />
              </label>
            </div>
            <button type="submit" className="btn btn--primary btn--block">
              <Send size={16} /> Enviar mensagem
            </button>
            <p className="mono small" role="status" aria-live="polite">
              {sent ? <span className="green">&gt; Abrimos seu app de e-mail com a mensagem pronta. É só enviar.</span> : null}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
