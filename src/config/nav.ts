import { CalendarDays, Disc3, Send, UserRound, type LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  cmd: string;
  icon: LucideIcon;
}

/** Fonte única da navegação: header, barra de abas (celular) e índice lateral (desktop). */
export const NAV: NavItem[] = [
  { id: 'musica', label: 'Música', cmd: 'ls ./frequencias', icon: Disc3 },
  { id: 'shows', label: 'Shows', cmd: 'cat ./agenda.log', icon: CalendarDays },
  { id: 'arquiteto', label: 'Sobre', cmd: 'whoami', icon: UserRound },
  { id: 'booking', label: 'Booking', cmd: './booking.sh --new', icon: Send },
];

/** Todas as seções observadas (inclui topo e manifesto). */
export const SECTIONS = ['topo', 'manifesto', ...NAV.map((n) => n.id)];

export const navIcon = (id: string) => NAV.find((n) => n.id === id)?.icon;
