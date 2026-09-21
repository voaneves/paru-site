# PARU — site oficial

Indie Dance & Minimal Deep Tech. *Arquitetura sonora para mentes conectadas.*

Site oficial do DJ e produtor **PARU**, criado e desenvolvido por **[Victor Neves](https://voaneves.com)** ([github.com/voaneves](https://github.com/voaneves)): planejamento, UX/UI, design de interface e código.

Vite + React + TypeScript, fiel ao **PARU Brand Guideline** (ver `plan.md`).

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera ./dist pré-renderizado (HTML com conteúdo + CSS embutido)
npm run preview  # serve o ./dist localmente
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

## Créditos

- **Criação, design e desenvolvimento:** Victor Neves — [voaneves.com](https://voaneves.com) · [github.com/voaneves](https://github.com/voaneves)
- **Identidade visual (logo, mascote, paleta, brandbook):** PARU — todos os direitos da marca pertencem ao artista.
- **Fontes:** Fira Code, Inter e Outfit (SIL Open Font License); Codec Pro (Zetafonts, licença própria).

## Licença

Código sob licença MIT © 2026 Victor Neves (ver `LICENSE`).
A marca PARU, o logotipo, o mascote e as fotos **não** estão cobertos pela licença MIT e não podem ser reutilizados sem autorização do artista.
