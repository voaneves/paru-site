/**
 * AGENDA DE SHOWS
 * ------------------------------------------------------------
 * Datas reais entram aqui (ou via Google Calendar — ver services/calendarService.ts).
 * `demo: true` = exemplo, só aparece com SITE.showDemoContent = true.
 * Não cadastre clubs/festivais reais como exemplo: parece anúncio de verdade.
 */

export interface Show {
  id: string;
  date: string; // ISO: 2026-10-10T23:00:00-03:00
  city: string;
  state?: string;
  country: string;
  venue: string;
  event?: string;
  ticketUrl?: string;
  status: 'on-sale' | 'few-left' | 'sold-out' | 'soon' | 'guestlist';
  demo?: boolean;
}

export const SHOWS: Show[] = [
  { id: 'd1', date: '2026-10-10T23:00:00-03:00', city: 'São Paulo', state: 'SP', country: 'BR', venue: 'Local a anunciar', event: 'PARU // System Override', status: 'soon', demo: true },
  { id: 'd2', date: '2026-10-24T22:00:00-03:00', city: 'Rio de Janeiro', state: 'RJ', country: 'BR', venue: 'Local a anunciar', event: 'Long Set', status: 'soon', demo: true },
  { id: 'd3', date: '2026-11-14T23:00:00-03:00', city: 'Belo Horizonte', state: 'MG', country: 'BR', venue: 'Local a anunciar', status: 'soon', demo: true },
];
