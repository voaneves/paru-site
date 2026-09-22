import { CalendarDays, Disc3, Info, Mail, PlaySquare, type LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  cmd: string;
  icon: LucideIcon;
}

/** Fonte única da navegação: header, barra de abas (celular) e índice lateral (desktop). */
export const NAV: NavItem[] = [
  { id: 'musica', label: 'Música', cmd: 'ls ./tracks', icon: Disc3 },
  { id: 'videos', label: 'Vídeos', cmd: 'ls ./videos', icon: PlaySquare },
  { id: 'shows', label: 'Shows', cmd: 'cat ./agenda.log', icon: CalendarDays },
  { id: 'info', label: 'Info', cmd: 'cat ./info.txt', icon: Info },
  { id: 'contato', label: 'Contato', cmd: './contato.sh', icon: Mail },
];

/** Todas as seções observadas (inclui o topo). */
export const SECTIONS = ['topo', ...NAV.map((n) => n.id)];

export const navIcon = (id: string) => NAV.find((n) => n.id === id)?.icon;
