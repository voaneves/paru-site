// Google Calendar Service for PARU Tour Dates
// Fetches live events from Google Calendar API v3 with automatic parsing and formatting
// Includes realistic fallback tour dates for offline/demo/testing mode

export interface TourDate {
  id: string;
  title: string;
  venue: string;
  city: string;
  country: string;
  date: string; // ISO or formatted
  displayDate: string;
  dayOfWeek: string;
  time: string;
  ticketUrl: string;
  status: 'AVAILABLE' | 'FEW_TICKETS' | 'SOLD_OUT' | 'GUESTLIST';
  lineupInfo?: string;
  isHeadline?: boolean;
}

// Default Google Calendar Config (Can be set in .env or modified here)
export const CALENDAR_CONFIG = {
  // Public Google Calendar ID (e.g. c_xxx@group.calendar.google.com)
  calendarId: import.meta.env.VITE_GOOGLE_CALENDAR_ID || '',
  // Google Cloud API Key with Google Calendar API enabled
  apiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || '',
};

// Curated Tour Dates as immediate high-standard demonstration
export const FALLBACK_TOUR_DATES: TourDate[] = [
  {
    id: 'tour-1',
    title: 'MOTHERSHIP // PARU SYSTEM OVERRIDE',
    venue: 'D-EDGE Club',
    city: 'São Paulo',
    country: 'Brasil',
    date: '2026-10-10T23:59:00',
    displayDate: '10.OUT.2026',
    dayOfWeek: 'SÁBADO',
    time: '23:59 - 07:00',
    ticketUrl: 'https://site.com/tickets/d-edge',
    status: 'FEW_TICKETS',
    lineupInfo: 'PARU (Extended 4h Set) + Guests',
    isHeadline: true,
  },
  {
    id: 'tour-2',
    title: 'TEMPLE SESSIONS // MINIMAL DEEP TECH',
    venue: 'Warung Beach Club',
    city: 'Itajaí / SC',
    country: 'Brasil',
    date: '2026-10-24T22:00:00',
    displayDate: '24.OUT.2026',
    dayOfWeek: 'SÁBADO',
    time: '22:00 - Sunrise',
    ticketUrl: 'https://site.com/tickets/warung',
    status: 'AVAILABLE',
    lineupInfo: 'PARU + Warung Savages',
    isHeadline: true,
  },
  {
    id: 'tour-3',
    title: 'SURREAL PARK // CHURCH STAGE',
    venue: 'Surreal Park',
    city: 'Camboriú / SC',
    country: 'Brasil',
    date: '2026-11-07T23:00:00',
    displayDate: '07.NOV.2026',
    dayOfWeek: 'SÁBADO',
    time: '23:00 - 08:00',
    ticketUrl: 'https://site.com/tickets/surreal',
    status: 'AVAILABLE',
    lineupInfo: 'PARU (Indie Dance Odyssey)',
    isHeadline: false,
  },
  {
    id: 'tour-4',
    title: 'AME CLUB // SUNSET TO DAWN',
    venue: 'Ame Club',
    city: 'Valinhos / SP',
    country: 'Brasil',
    date: '2026-11-21T17:00:00',
    displayDate: '21.NOV.2026',
    dayOfWeek: 'SÁBADO',
    time: '17:00 - 04:00',
    ticketUrl: 'https://site.com/tickets/ame',
    status: 'AVAILABLE',
    lineupInfo: 'PARU // Live Visual Architecture',
    isHeadline: true,
  },
  {
    id: 'tour-5',
    title: 'TIME WARP BRAZIL 2026',
    venue: 'Vale do Anhangabaú',
    city: 'São Paulo',
    country: 'Brasil',
    date: '2026-12-05T20:00:00',
    displayDate: '05.DEZ.2026',
    dayOfWeek: 'SEXTA',
    time: '20:00 - 09:00',
    ticketUrl: 'https://site.com/tickets/timewarp',
    status: 'SOLD_OUT',
    lineupInfo: 'Main Stage Floor // Special B2B',
    isHeadline: false,
  },
  {
    id: 'tour-6',
    title: 'RÉVEILLON CARNEIROS // BEACH STAGE',
    venue: 'Praia dos Carneiros',
    city: 'Tamandaré / PE',
    country: 'Brasil',
    date: '2026-12-30T22:00:00',
    displayDate: '30.DEZ.2026',
    dayOfWeek: 'QUARTA',
    time: '22:00 - 07:00',
    ticketUrl: 'https://site.com/tickets/carneiros',
    status: 'AVAILABLE',
    lineupInfo: 'PARU (Sunset into Midnight)',
    isHeadline: true,
  },
];

const MONTH_NAMES = [
  'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
  'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
];

const WEEKDAY_NAMES = [
  'DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'
];

/**
 * Parses raw Google Calendar API v3 items into formatted TourDate objects
 */
interface GoogleCalendarItem {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: { dateTime?: string; date?: string };
}

export function parseGoogleCalendarEvent(item: GoogleCalendarItem): TourDate {
  const rawDateStr = item.start?.dateTime || item.start?.date || new Date().toISOString();
  const dateObj = new Date(rawDateStr);

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = MONTH_NAMES[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const displayDate = `${day}.${month}.${year}`;
  const dayOfWeek = WEEKDAY_NAMES[dateObj.getDay()];

  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  // Parse location: e.g. "D-EDGE, São Paulo, Brasil"
  let venue = 'Club / Festival';
  let city = 'São Paulo';
  let country = 'Brasil';

  if (item.location) {
    const parts = item.location.split(',').map((p: string) => p.trim());
    if (parts.length >= 1) venue = parts[0];
    if (parts.length >= 2) city = parts[1];
    if (parts.length >= 3) country = parts[2];
  }

  // Parse ticket link from description (e.g. "Ticket: https://...")
  let ticketUrl = 'https://wa.me/5511947236278?text=Ola%20gostaria%20de%20informacoes%20sobre%20o%20show%20do%20PARU';
  let status: 'AVAILABLE' | 'FEW_TICKETS' | 'SOLD_OUT' | 'GUESTLIST' = 'AVAILABLE';

  if (item.description) {
    const urlMatch = item.description.match(/https?:\/\/[^\s]+/);
    if (urlMatch) {
      ticketUrl = urlMatch[0];
    }
    const lowerDesc = item.description.toLowerCase();
    if (lowerDesc.includes('sold out') || lowerDesc.includes('esgotado')) {
      status = 'SOLD_OUT';
    } else if (lowerDesc.includes('últimos') || lowerDesc.includes('few tickets')) {
      status = 'FEW_TICKETS';
    } else if (lowerDesc.includes('guestlist') || lowerDesc.includes('lista')) {
      status = 'GUESTLIST';
    }
  }

  return {
    id: item.id || `gcal-${Math.random()}`,
    title: item.summary || 'PARU // LIVE SESSION',
    venue,
    city,
    country,
    date: rawDateStr,
    displayDate,
    dayOfWeek,
    time,
    ticketUrl,
    status,
    lineupInfo: item.description?.slice(0, 80),
    isHeadline: true,
  };
}

/**
 * Main fetch function: attempts Google Calendar API, returns fallback if not configured
 */
export async function fetchTourDates(
  calendarId = CALENDAR_CONFIG.calendarId,
  apiKey = CALENDAR_CONFIG.apiKey
): Promise<{ dates: TourDate[]; source: 'google_calendar' | 'fallback' }> {
  if (!calendarId || !apiKey) {
    return { dates: FALLBACK_TOUR_DATES, source: 'fallback' };
  }

  try {
    const now = new Date().toISOString();
    const encodedId = encodeURIComponent(calendarId);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodedId}/events?key=${apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=20`;

    const res = await fetch(url);
    if (!res.ok) {
      console.warn('Google Calendar API returned non-200:', res.status);
      return { dates: FALLBACK_TOUR_DATES, source: 'fallback' };
    }

    const data = await res.json();
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return { dates: FALLBACK_TOUR_DATES, source: 'fallback' };
    }

    const parsed = data.items.map((item: GoogleCalendarItem) => parseGoogleCalendarEvent(item));
    return { dates: parsed, source: 'google_calendar' };
  } catch (err) {
    console.error('Error fetching Google Calendar events:', err);
    return { dates: FALLBACK_TOUR_DATES, source: 'fallback' };
  }
}
