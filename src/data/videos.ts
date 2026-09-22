/**
 * VÍDEOS (YouTube)
 * ------------------------------------------------------------
 * Cole o link do vídeo em `url` (youtube.com/watch?v=..., youtu.be/... ou /live/...).
 * A miniatura e o player são carregados só quando o visitante clica (site continua leve).
 */

export interface Video {
  url: string;
  title: string;
  subtitle?: string; // ex.: "Live set · São Paulo · 2026"
}

export const VIDEOS: Video[] = [
  // { url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', title: 'Live set', subtitle: 'São Paulo · 2026' },
];

/** Extrai o ID de 11 caracteres de qualquer formato comum de link do YouTube. */
export function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m?.[1] ?? null;
}
