# PARU — site oficial

Indie Dance & Minimal Deep Tech. *Arquitetura sonora para mentes conectadas.*

Vite + React + TypeScript, fiel ao **PARU Brand Guideline** (ver `plan.md`).

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera ./dist para publicar (Vercel, Netlify, Cloudflare Pages)
```

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Contatos, redes, press kit, modo exemplo | `src/config/site.ts` |
| Lançamentos | `src/data/tracks.ts` |
| Agenda de shows | `src/data/shows.ts` (ou Google Calendar via `.env`) |
| Cores, fontes, espaçamentos | `src/index.css` (tokens no `:root`) |
| Logo, mascote, texturas, foto | `public/brand/` (extraídos do brandbook) |

Google Calendar (opcional), em `.env`:

```
VITE_GOOGLE_CALENDAR_ID=xxxx@group.calendar.google.com
VITE_GOOGLE_CALENDAR_API_KEY=AIza...
```

## Fontes

Codec Pro (títulos) é comercial — coloque os `.woff2` licenciados em `src/fonts/` (ver `public/fonts/LEIA-ME.txt`).
Até lá o site usa Outfit. Fira Code e Inter estão auto-hospedadas em `src/fonts/` (licença OFL).

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy.yml` faz build e publica a cada push na `main`.
Uma vez só: **Settings → Pages → Source: GitHub Actions**.
Endereço: https://voaneves.github.io/paru-site/
