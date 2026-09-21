/**
 * LANÇAMENTOS
 * ------------------------------------------------------------
 * Substitua pelos lançamentos oficiais do PARU.
 * - `cover`: caminho de uma arte real (ex.: './covers/nome.jpg'). Sem arte,
 *   o site gera uma capa na identidade visual usando uma pose do mascote.
 * - `previewUrl`: MP3 de 30s (pré-escuta). Sem ele, o botão de play some.
 * - `demo: true`: conteúdo de exemplo — só aparece se SITE.showDemoContent = true.
 */

export type CatPose = 'sit' | 'stretch' | 'pounce' | 'rest' | 'prowl';

export interface Track {
  id: string;
  title: string;
  version: string;
  genre: 'Indie Dance' | 'Minimal Deep Tech';
  bpm: number;
  key?: string;
  label?: string;
  releaseDate: string; // AAAA-MM-DD
  cover?: string;
  pose: CatPose;
  accent: 'green' | 'pink';
  previewUrl?: string;
  links: { spotify?: string; beatport?: string; soundcloud?: string; appleMusic?: string; youtube?: string };
  demo?: boolean;
}

export const TRACKS: Track[] = [
  {
    id: 'system-override',
    title: 'System Override',
    version: 'Original Mix',
    genre: 'Indie Dance',
    bpm: 128,
    key: 'F min',
    label: 'Selo a definir',
    releaseDate: '2026-08-15',
    pose: 'pounce',
    accent: 'green',
    links: {},
    demo: true,
  },
  {
    id: 'frequencia-conduzida',
    title: 'Frequência Conduzida',
    version: 'Extended Mix',
    genre: 'Minimal Deep Tech',
    bpm: 126,
    key: 'A min',
    label: 'Selo a definir',
    releaseDate: '2026-06-20',
    pose: 'prowl',
    accent: 'pink',
    links: {},
    demo: true,
  },
  {
    id: 'arquitetura-sonora',
    title: 'Arquitetura Sonora',
    version: 'Original Mix',
    genre: 'Indie Dance',
    bpm: 128,
    key: 'D min',
    label: 'Selo a definir',
    releaseDate: '2026-04-10',
    pose: 'stretch',
    accent: 'green',
    links: {},
    demo: true,
  },
  {
    id: 'reboot',
    title: 'Reboot',
    version: 'Dub Mix',
    genre: 'Minimal Deep Tech',
    bpm: 127,
    key: 'G min',
    label: 'White label',
    releaseDate: '2026-02-28',
    pose: 'rest',
    accent: 'pink',
    links: {},
    demo: true,
  },
];
