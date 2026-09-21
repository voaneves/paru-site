import type { Show } from '../data/shows';

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (t: string) => t.replace(/[\;,]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');

/** Baixa o show como evento .ics (Google Agenda, Apple Calendário, Outlook). */
export function downloadIcs(show: Show) {
  const start = new Date(show.date);
  const end = new Date(start.getTime() + 5 * 3600 * 1000);
  const place = [show.venue, show.city, show.state].filter(Boolean).join(', ');
  const event = show.event?.replace(/^PARU\s*\/\/\s*/i, '');
  const title = `PARU${event ? ` — ${event}` : ''} · ${show.city}`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PARU//Agenda//PT-BR',
    'BEGIN:VEVENT',
    `UID:${show.id}@paru`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(place)}`,
    show.ticketUrl ? `URL:${show.ticketUrl}` : '',
    `DESCRIPTION:${esc('PARU — Indie Dance & Minimal Deep Tech.' + (show.ticketUrl ? `\nIngressos: ${show.ticketUrl}` : ''))}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `paru-${show.date.slice(0, 10)}-${show.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-')}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
}
