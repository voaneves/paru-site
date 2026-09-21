import React, { useState } from 'react';
import { Terminal, Send, Mail, Phone, Copy, Check } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event: '',
    city: '',
    date: '',
    message: '',
  });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking dispatch or format WhatsApp message
    const waText = encodeURIComponent(
      `Olá, proposta de booking via site PARU:\n\nNome: ${formData.name}\nEmail: ${formData.email}\nEvento: ${formData.event}\nCidade: ${formData.city}\nData: ${formData.date}\nMensagem: ${formData.message}`
    );
    window.open(`https://wa.me/5511947236278?text=${waText}`, '_blank');
    setSentSuccess(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-[#12FE07] font-mono text-xs tracking-widest uppercase mb-2">
          <Terminal className="w-4 h-4" />
          <span>04 // TERMINAL DE COMUNICAÇÃO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-[#F9F9F9] font-title">
          GET IN TOUCH & BOOKING
        </h2>
        <p className="text-sm font-mono text-[#888888] mt-2">
          Canal direto para clubs, festivais, gravadoras e imprensa mundial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quick Channels & Direct Contacts (Brandbook Page 16) */}
        <div className="lg:col-span-5 space-y-4">
          {/* WhatsApp Direct Card */}
          <a
            href="https://wa.me/5511947236278?text=Olá,%20gostaria%20de%20consultar%20disponibilidade%20para%20o%20DJ%20PARU"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl bg-[#141414] border border-[#222222] hover:border-[#12FE07] p-5 transition-all duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-lg bg-[#12FE07]/10 text-[#12FE07] border border-[#12FE07]/30 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#888888] uppercase">WHATSAPP / BOOKING DIRETO</div>
                  <div className="text-lg font-bold text-[#F9F9F9] font-title group-hover:text-[#12FE07] transition-colors">
                    +55 11 94723-6278
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-[#12FE07] bg-[#12FE07]/10 px-2.5 py-1 rounded border border-[#12FE07]/30">
                DISPONÍVEL
              </span>
            </div>
          </a>

          {/* Email Direct Card */}
          <div className="rounded-xl bg-[#141414] border border-[#222222] hover:border-[#FF2E88] p-5 transition-all duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.5)] group flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-lg bg-[#FF2E88]/10 text-[#FF2E88] border border-[#FF2E88]/30 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#888888] uppercase">EMAIL OFICIAL & MANAGEMENT</div>
                <a
                  href="mailto:paru@site.com"
                  className="text-base sm:text-lg font-bold text-[#F9F9F9] font-title hover:text-[#FF2E88] transition-colors"
                >
                  paru@site.com
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy('paru@site.com', 'email')}
              className="p-2 rounded bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-[#F9F9F9] transition-colors"
              title="Copiar email"
            >
              {copiedField === 'email' ? <Check className="w-4 h-4 text-[#12FE07]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Instagram Direct Card */}
          <a
            href="https://instagram.com/paruvegan"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl bg-[#141414] border border-[#222222] hover:border-[#F9F9F9] p-5 transition-all duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-lg bg-white/10 text-white border border-white/20 group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#888888] uppercase">INSTAGRAM OFICIAL</div>
                  <div className="text-base sm:text-lg font-bold text-[#F9F9F9] font-title group-hover:text-white transition-colors">
                    @paruvegan
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-[#888888] group-hover:text-[#F9F9F9]">
                SEGUIR &gt;
              </span>
            </div>
          </a>
        </div>

        {/* Right: Interactive Terminal Proposal Form */}
        <div className="lg:col-span-7 rounded-xl bg-[#0F0F0F] border-2 border-[#1A1A1A] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
          {/* Terminal Title Bar */}
          <div className="bg-[#181818] px-4 py-2.5 border-b border-[#222222] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF2E88]" />
              <span className="w-3 h-3 rounded-full bg-[#EAB308]" />
              <span className="w-3 h-3 rounded-full bg-[#12FE07]" />
              <span className="text-[11px] font-mono text-[#888888] ml-2">
                booking_terminal_v2.0.sh
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#12FE07] animate-pulse">
              [CONEXÃO SEGURA]
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-xs font-mono text-[#12FE07] mb-2">
              &gt; INICIAR FORMULÁRIO DE PROPOSTA DE SHOW...
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-[#888888] mb-1">
                  SEU NOME / AGÊNCIA *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome do contratante"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#141414] border border-[#262626] text-xs font-mono text-[#F9F9F9] focus:border-[#12FE07] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#888888] mb-1">
                  EMAIL DE CONTATO *
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@evento.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#141414] border border-[#262626] text-xs font-mono text-[#F9F9F9] focus:border-[#12FE07] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-[#888888] mb-1">
                  EVENTO / CLUB *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome do evento"
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#141414] border border-[#262626] text-xs font-mono text-[#F9F9F9] focus:border-[#12FE07] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#888888] mb-1">
                  CIDADE / PAÍS *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: São Paulo / BR"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#141414] border border-[#262626] text-xs font-mono text-[#F9F9F9] focus:border-[#12FE07] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#888888] mb-1">
                  DATA PREVISTA *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#141414] border border-[#262626] text-xs font-mono text-[#F9F9F9] focus:border-[#12FE07] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#888888] mb-1">
                DETALHES DA PROPOSTA (HORÁRIO, FORMATO, EXPECTATIVA)
              </label>
              <textarea
                rows={3}
                placeholder="Insira detalhes sobre o set, rider ou estrutura..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded bg-[#141414] border border-[#262626] text-xs font-mono text-[#F9F9F9] focus:border-[#12FE07] outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-mono text-[#666]">
                &gt; ENVIO AUTOMÁTICO VIA WHATSAPP &amp; DISPATCH
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#12FE07] hover:bg-[#0fdc04] text-black font-bold font-mono text-xs tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(18,254,7,0.4)] transition-transform active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 fill-black" />
                <span>ENVIAR PROPOSTA</span>
              </button>
            </div>

            {sentSuccess && (
              <div className="p-3 rounded bg-[#12FE07]/10 border border-[#12FE07]/40 text-[#12FE07] text-xs font-mono">
                &gt; PROPOSTA TRANSMITIDA COM SUCESSO! A EQUIPE PARU ENTRARÁ EM CONTATO EM BREVE.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
