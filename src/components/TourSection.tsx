import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Ticket, ExternalLink, RefreshCw, Settings, CheckCircle2, AlertCircle } from 'lucide-react';
import { type TourDate, fetchTourDates } from '../services/calendarService';

export const TourSection: React.FC = () => {
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<'google_calendar' | 'fallback'>('fallback');
  const [filter, setFilter] = useState<'ALL' | 'HEADLINE'>('ALL');
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [customCalendarId, setCustomCalendarId] = useState<string>('');
  const [customApiKey, setCustomApiKey] = useState<string>('');

  const loadDates = async (calId?: string, key?: string) => {
    setLoading(true);
    const res = await fetchTourDates(calId, key);
    setTourDates(res.dates);
    setSource(res.source);
    setLoading(false);
  };

  useEffect(() => {
    loadDates();
  }, []);

  const filteredDates = filter === 'ALL'
    ? tourDates
    : tourDates.filter(d => d.isHeadline);

  const handleSaveCalendarConfig = (e: React.FormEvent) => {
    e.preventDefault();
    loadDates(customCalendarId, customApiKey);
    setShowConfigModal(false);
  };

  const getStatusBadge = (status: TourDate['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#12FE07]/10 text-[#12FE07] border border-[#12FE07]/30 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12FE07] animate-pulse" />
            INGRESSOS
          </span>
        );
      case 'FEW_TICKETS':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FF2E88]/10 text-[#FF2E88] border border-[#FF2E88]/30 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E88] animate-ping" />
            ÚLTIMOS INGRESSOS
          </span>
        );
      case 'SOLD_OUT':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#222222] text-[#888888] border border-[#333333] text-xs font-mono">
            ESGOTADO
          </span>
        );
      case 'GUESTLIST':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded bg-white/10 text-[#F9F9F9] border border-white/20 text-xs font-mono">
            LISTA VIP
          </span>
        );
    }
  };

  return (
    <section id="tour" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#12FE07]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#222222] pb-6 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#FF2E88] font-mono text-xs tracking-widest uppercase mb-2">
            <Calendar className="w-4 h-4" />
            <span>02 // SEQUÊNCIAS AO VIVO & AGENDA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-[#F9F9F9] font-title">
            TOUR DATES & GIGS
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-sm font-mono text-[#888888]">
              Próximas datas sincronizadas. Conexão direta com clubs e festivais.
            </p>
            {source === 'google_calendar' ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#12FE07] bg-[#12FE07]/10 px-2 py-0.5 rounded border border-[#12FE07]/30">
                <CheckCircle2 className="w-3 h-3" /> GOOGLE CALENDAR ATIVO
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#888888] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
                CALENDAR DEMO // PRONTO PARA API
              </span>
            )}
          </div>
        </div>

        {/* Right Tools & Settings */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilter(filter === 'ALL' ? 'HEADLINE' : 'ALL')}
            className="px-3 py-1.5 rounded text-xs font-mono tracking-wider bg-[#1A1A1A] text-[#888888] hover:text-[#F9F9F9] border border-[#2A2A2A] transition-colors cursor-pointer"
          >
            {filter === 'ALL' ? 'TODOS OS SHOWS' : 'APENAS HEADLINE'}
          </button>

          <button
            onClick={() => setShowConfigModal(true)}
            className="p-2 rounded bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-[#12FE07] border border-[#2A2A2A] transition-colors cursor-pointer"
            title="Conectar Google Calendar API"
            aria-label="Configurar Google Calendar"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => loadDates()}
            className="p-2 rounded bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-[#12FE07] border border-[#2A2A2A] transition-colors cursor-pointer"
            title="Recarregar eventos"
            aria-label="Recarregar agenda"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tour Dates Table (James Hype High-Conversion Inspired) */}
      <div className="rounded-xl bg-[#141414] border border-[#222222] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        {loading ? (
          <div className="p-12 text-center text-sm font-mono text-[#12FE07] animate-pulse">
            &gt; CARREGANDO PROTOCOLOS DE AGENDA...
          </div>
        ) : filteredDates.length === 0 ? (
          <div className="p-12 text-center text-sm font-mono text-[#888888]">
            Nenhuma data encontrada com os filtros atuais.
          </div>
        ) : (
          <div className="divide-y divide-[#1F1F1F]">
            {filteredDates.map((gig) => (
              <div
                key={gig.id}
                className="group p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-[#1A1A1A]/80"
              >
                {/* Date & Day */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-[200px]">
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-black font-title tracking-tight text-[#F9F9F9] group-hover:text-[#12FE07] transition-colors">
                      {gig.displayDate}
                    </span>
                    <span className="text-[10px] font-mono text-[#FF2E88] tracking-wider">
                      {gig.dayOfWeek} // {gig.time}
                    </span>
                  </div>
                </div>

                {/* Event Name, Venue & Location */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base sm:text-lg font-bold text-[#F9F9F9] font-title">
                      {gig.title}
                    </h4>
                    {gig.isHeadline && (
                      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#FF2E88]/10 text-[#FF2E88] border border-[#FF2E88]/30 text-[9px] font-mono">
                        HEADLINE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#888888] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#12FE07]" />
                    <span className="text-[#F9F9F9]">{gig.venue}</span>
                    <span>—</span>
                    <span>{gig.city}, {gig.country}</span>
                  </div>
                </div>

                {/* Status Badge & Ticket Action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1F1F1F]">
                  {getStatusBadge(gig.status)}

                  {gig.status !== 'SOLD_OUT' ? (
                    <a
                      href={gig.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#12FE07] hover:bg-[#0fdc04] text-black font-bold font-mono text-xs tracking-wider flex items-center gap-2 shadow-[0_0_12px_rgba(18,254,7,0.3)] transition-transform active:scale-95 cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5 fill-black" />
                      <span>INGRESSOS</span>
                    </a>
                  ) : (
                    <span className="px-4 py-2 rounded-lg bg-[#222222] text-[#666666] font-mono text-xs tracking-wider cursor-not-allowed">
                      ESGOTADO
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promoters Booking Banner */}
      <div className="mt-8 rounded-xl bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-[#2A2A2A] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
        <div>
          <div className="text-[10px] font-mono text-[#12FE07] tracking-wider uppercase mb-1">
            CONTRATAÇÃO DE SHOWS & FESTIVAIS
          </div>
          <h4 className="text-xl sm:text-2xl font-black italic text-[#F9F9F9] font-title">
            DESEJA PARU NO SEU EVENTO?
          </h4>
          <p className="text-xs font-mono text-[#888888] mt-1 max-w-lg">
            Disponível para datas nacionais e internacionais. Entre em contato direto com a equipe de booking.
          </p>
        </div>

        <a
          href="https://wa.me/5511947236278?text=Olá,%20gostaria%20de%20solicitar%20uma%20data%20de%20show%20para%20o%20DJ%20PARU"
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap px-6 py-3 rounded-lg bg-[#FF2E88] hover:bg-[#e02074] text-white font-bold font-mono text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,46,136,0.4)] transition-transform active:scale-95 cursor-pointer"
        >
          <span>SOLICITAR DATA / BOOKING</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Google Calendar Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#141414] border-2 border-[#12FE07] rounded-xl p-6 shadow-[0_0_30px_rgba(18,254,7,0.3)] relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#222222] mb-4">
              <div className="flex items-center gap-2 text-[#12FE07] font-mono text-sm font-bold">
                <Settings className="w-4 h-4" />
                <span>CONEXÃO GOOGLE CALENDAR API</span>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-[#888888] hover:text-[#F9F9F9] font-mono text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs font-mono text-[#888888] leading-relaxed mb-4">
              Insira o ID público da sua agenda do Google Calendar e a chave da API do Google Cloud para sincronizar automaticamente os shows do PARU.
            </p>

            <form onSubmit={handleSaveCalendarConfig} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-[#12FE07] mb-1">
                  CALENDAR ID (ex: seuemail@group.calendar.google.com)
                </label>
                <input
                  type="text"
                  placeholder="ID da agenda do Google"
                  value={customCalendarId}
                  onChange={(e) => setCustomCalendarId(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#0A0A0A] border border-[#2A2A2A] text-xs font-mono text-[#F9F9F9] focus:border-[#12FE07] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#12FE07] mb-1">
                  GOOGLE API KEY (com Calendar API v3 ativa)
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#0A0A0A] border border-[#2A2A2A] text-xs font-mono text-[#F9F9F9] focus:border-[#12FE07] outline-none"
                />
              </div>

              <div className="p-3 rounded bg-[#1A1A1A] border border-[#2A2A2A] flex items-start gap-2 text-[10px] font-mono text-[#888888]">
                <AlertCircle className="w-3.5 h-3.5 text-[#FF2E88] shrink-0 mt-0.5" />
                <span>
                  Se os campos forem deixados em branco, o sistema exibirá automaticamente a agenda de demonstração de alta performance.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#222222]">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded text-xs font-mono text-[#888888] hover:text-[#F9F9F9] cursor-pointer"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#12FE07] text-black font-bold font-mono text-xs shadow-[0_0_10px_#12FE07] hover:bg-[#0fdc04] cursor-pointer"
                >
                  SINCRONIZAR AGORA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
