/**
 * PARU // CONFIGURAÇÃO CENTRAL DO SITE
 * ------------------------------------------------------------
 * Tudo que é "dado do artista" mora aqui. Trocou o e-mail,
 * o link do Spotify ou o press kit? Edite só este arquivo.
 *
 * ANTES DE PUBLICAR:
 *  - `email`: "paru@site.com" é o texto do brandbook e parece placeholder. Confirmar o real.
 *  - `links`: preencher com os perfis reais (deixe '' para esconder o botão).
 *  - `pressKitUrl`: link do Drive/Dropbox com o EPK (deixe '' para mostrar "em breve").
 *  - `showDemoContent`: mude para `false` quando houver lançamentos/datas reais.
 */

export const SITE = {
  artist: 'PARU',
  fullName: 'Paulo Victor',
  genres: ['Indie Dance', 'Minimal Deep Tech'] as const,
  bpm: 128,

  // Brandbook — Brand Promise & Taglines (pág. 4)
  promise: 'Arquitetura sonora para mentes conectadas.',
  taglines: [
    'PARU // SYSTEM. OVERRIDE.',
    'PARU // FREQUÊNCIA CONDUZIDA.',
    'PARU // ARQUITETURA SONORA.',
  ],
  // Brandbook — Brand Voice (pág. 7)
  manifesto:
    'A máquina dita o pulso, a pista define a frequência. O próximo show está configurado. Vejo vocês no centro do som.',

  // Brandbook — Get in Touch (pág. 16)
  contact: {
    instagram: 'paruvegan',
    email: 'paru@site.com', // TODO: confirmar e-mail real de booking
    whatsappDisplay: '+55 11 94723-6278',
    whatsappNumber: '5511947236278',
  },

  links: {
    instagram: 'https://instagram.com/paruvegan',
    soundcloud: '', // ex.: 'https://soundcloud.com/...'
    spotify: '', // ex.: 'https://open.spotify.com/artist/...'
    beatport: '',
    youtube: '',
  },

  pressKitUrl: '', // ex.: link do Google Drive com fotos, rider e bio (PT/EN)

  /** Mostra lançamentos e datas de EXEMPLO (marcados como tal). Desligar antes de publicar. */
  showDemoContent: true,
} as const;

export const whatsappLink = (text: string) =>
  `https://wa.me/${SITE.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
