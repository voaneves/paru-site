/**
 * Agenda opcional via Google Calendar (API v3, agenda pública).
 * Configure no arquivo .env (nunca na interface do site):
 *   VITE_GOOGLE_CALENDAR_ID=xxxx@group.calendar.google.com
 *   VITE_GOOGLE_CALENDAR_API_KEY=AIza...   (restrinja a chave ao domínio do site)
 *
 * Convenção dos eventos:
 *   - Local: "Nome do club, Cidade, UF"
 *   - Descrição: link de ingresso na 1ª URL; "esgotado" / "últimos" / "lista" mudam o status.
 */
import { SHOWS, type Show } from '../data/shows';
import { SITE } from '../config/site';

const CAL_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined;
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string | undefined;

interface GCalItem {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: { dateTime?: string; date?: string };
}

function parse(item: GCalItem): Show {
  const [venue = 'Local a anunciar', city = '', state = ''] = (item.location ?? '').split(',').map((s) => s.trim());
  const desc = (item.description ?? '').toLowerCase();
  const url = item.description?.match(/https?:\/\/[^\s"<]+/)?.[0];
  let status: Show['status'] = url ? 'on-sale' : 'soon';
  if (desc.includes('esgotado') || desc.includes('sold out')) status = 'sold-out';
  else if (desc.includes('últimos') || desc.includes('few')) status = 'few-left';
  else if (desc.includes('lista')) status = 'guestlist';
  return {
    id: item.id,
    date: item.start?.dateTime ?? item.start?.date ?? new Date().toISOString(),
    venue,
    city,
    state,
    country: 'BR',
    event: item.summary,
    ticketUrl: url,
    status,
  };
}

export async function loadShows(): Promise<Show[]> {
  const local = SHOWS.filter((s) => !s.demo || SITE.showDemoContent);
  if (!CAL_ID || !API_KEY) return upcoming(local);
  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CAL_ID)}/events?key=${API_KEY}&timeMin=${new Date().toISOString()}&singleEvents=true&orderBy=startTime&maxResults=20`;
    const res = await fetch(url);
    if (!res.ok) return upcoming(local);
    const data = (await res.json()) as { items?: GCalItem[] };
    const remote = (data.items ?? []).map(parse);
    return remote.length ? remote : upcoming(local);
  } catch {
    return upcoming(local);
  }
}

function upcoming(list: Show[]) {
  const now = Date.now() - 12 * 3600 * 1000;
  return list.filter((s) => new Date(s.date).getTime() >= now).sort((a, b) => a.date.localeCompare(b.date));
}
