// Tracks Configuration for PARU Website
// Placeholder tracks ready to be replaced with PARU's official releases

export interface Track {
  id: string;
  title: string;
  subtitle: string;
  version: string;
  bpm: number;
  key: string;
  duration: string;
  coverImage: string;
  releaseDate: string;
  genre: 'Indie Dance' | 'Minimal Deep Tech' | 'Tech House' | 'Melodic Techno';
  label: string;
  description: string;
  links: {
    spotify?: string;
    beatport?: string;
    appleMusic?: string;
    soundcloud?: string;
    youtube?: string;
  };
  audioUrl?: string; // Optional real MP3/WAV, otherwise Web Audio Synth plays 128 BPM groove
  isFeatured?: boolean;
}

export const TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'SYSTEM OVERRIDE',
    subtitle: 'PARU // ORIGINAL MIX',
    version: 'Club Edit',
    bpm: 128,
    key: 'F Minor',
    duration: '06:14',
    coverImage: './assets/track_system_override.jpg',
    releaseDate: '2026.08.15',
    genre: 'Indie Dance',
    label: 'PARU CORE RECORDS',
    description: 'Bassline hipnótica conduzida por sintetizadores analógicos em 128 BPM com precisão cirúrgica.',
    links: {
      spotify: 'https://open.spotify.com/artist/paru',
      beatport: 'https://www.beatport.com/artist/paru',
      appleMusic: 'https://music.apple.com/artist/paru',
      soundcloud: 'https://soundcloud.com/paruvegan',
    },
    isFeatured: true,
  },
  {
    id: 'track-2',
    title: 'SONIC ARCHITECTURE',
    subtitle: 'PARU // DEEP TECH ODYSSEY',
    version: 'Extended Mix',
    bpm: 126,
    key: 'A Minor',
    duration: '07:22',
    coverImage: './assets/track_sonic_architecture.jpg',
    releaseDate: '2026.06.20',
    genre: 'Minimal Deep Tech',
    label: 'SYSTEM AUDIO LABS',
    description: 'Texturas modulares e groove subterrâneo feito para pistas de alta densidade.',
    links: {
      spotify: 'https://open.spotify.com/artist/paru',
      beatport: 'https://www.beatport.com/artist/paru',
      soundcloud: 'https://soundcloud.com/paruvegan',
    },
    isFeatured: true,
  },
  {
    id: 'track-3',
    title: 'HYPNOTIC PROTOCOL',
    subtitle: 'PARU // FELINE AVATAR THEME',
    version: 'Original Mix',
    bpm: 128,
    key: 'D Minor',
    duration: '05:48',
    coverImage: './assets/track_hypnotic_protocol.jpg',
    releaseDate: '2026.04.10',
    genre: 'Indie Dance',
    label: 'PARU CORE RECORDS',
    description: 'Linha de frequência conduzida pelo avatar felino, sintetizando catarse e união.',
    links: {
      spotify: 'https://open.spotify.com/artist/paru',
      beatport: 'https://www.beatport.com/artist/paru',
      appleMusic: 'https://music.apple.com/artist/paru',
      soundcloud: 'https://soundcloud.com/paruvegan',
    },
    isFeatured: false,
  },
  {
    id: 'track-4',
    title: 'FREQUENCY 128',
    subtitle: 'PARU // LIVE BOILER ID',
    version: 'Dub Mix',
    bpm: 128,
    key: 'G Minor',
    duration: '06:40',
    coverImage: './assets/hero_stage.jpg',
    releaseDate: '2026.02.28',
    genre: 'Minimal Deep Tech',
    label: 'UNRELEASED / WHITE LABEL',
    description: 'Faixa secreta testada nos principais clubs de São Paulo e festivais nacionais.',
    links: {
      soundcloud: 'https://soundcloud.com/paruvegan',
    },
    isFeatured: false,
  },
];
