# PARU // Arquitetura Sonora — Plano Mestre do Website

> **Status**: em desenvolvimento
> **Autor do projeto**: Victor Neves — [voaneves.com](https://voaneves.com) · [github.com/voaneves](https://github.com/voaneves)
> **Artista**: Paulo Victor (PARU) — DJ & produtor musical
> **Gênero**: Indie Dance & Minimal Deep Tech
> **Fonte de verdade**: `PARU Brand Guideline Presentation.pdf` (16 páginas, Canva, set/2026)
> **Revisão**: setembro de 2026

---

## 0. Regras de fidelidade à marca

Checklist que defini para garantir que cada elemento do site segue o brandbook. Vale para qualquer peça nova.

| # | Item | Diretriz do brandbook | Como o site aplica | Evitar |
| :-: | :--- | :--- | :--- | :--- |
| 1 | **Mascote** | Felino em **traço neon verde contínuo** e arredondado, **olhos quadrados rosa (pixel)**, **nariz triangular rosa**, **pulso/ECG rosa** abaixo da cabeça ou no peito, **pixels rosa na ponta da cauda** (págs. 11–12) | Cabeça vetorizada a partir do arquivo original + poses oficiais em `public/brand/` | Versões facetadas/low-poly, olhos redondos, recolorir |
| 2 | **Poses** | 6 oficiais: Cabeça, Sentado, 01 Stretch (frente), 02 Pounce (3/4 esq.), 03 Rest (3/4 dir.), 04 Prowl (perfil dir.) (pág. 11) | Só essas 6 | Inventar poses novas |
| 3 | **Logotipo** | Desenhado, não é fonte: itálico, "A" sem travessão (ponta de seta), cantos agudos + curvas (pág. 9). Variações: horizontal, "PA/RU", monograma empilhado, *lockups* com a cabeça (págs. 10 e 12) | `public/brand/paru-wordmark.svg` + lockup com a cabeça | Escrever "PARU" com fonte, distorcer, aplicar 3D |
| 4 | **Tipografia** | **Codec Pro** Bold/ExtraBold reta e em caixa alta nos títulos (só o logo é itálico); Fira Code no terminal; Inter no texto (págs. 13–14) | Codec Pro com fallback Outfit (licença pendente — ver §7) | Títulos em itálico, outras famílias |
| 5 | **Fotos** | Fotos reais do PARU (pág. 10). A pág. 4 ainda pede a "FOTO BOLADA DE PARU EM PÉ FAZENDO ALGO" | Foto da pág. 10 na seção Sobre | Imagens de banco ou de outras pessoas |
| 6 | **Capas** | — | Arte oficial quando existir; até lá, capa provisória com pose do mascote + textura oficial | Capas com nome de outro artista |
| 7 | **Agenda** | — | Só datas confirmadas; exemplos neutros marcados como **EXEMPLO** e desligáveis | Datas fictícias em clubs reais |
| 8 | **Áudio** | — | Pré-escuta só com arquivo real (`previewUrl`) | Loops sintetizados apresentados como faixa |
| 9 | **Integrações** | — | Google Calendar configurado só por `.env` | Pedir chave de API na interface |
| 10 | **Press kit** | — | Link real configurável; sem link, "Solicitar press kit" via WhatsApp | Botões que simulam download |
| 11 | **Elementos-assinatura** | Barra **verde longa + segmento rosa** (págs. 2 e 5); ícone `</>` verde/rosa (pág. 6); fundo binário `1010` com destaque rosa (pág. 7); texturas facetadas verde/rosa (pág. 1); log de terminal da capa | Todos aplicados | Novos ornamentos fora do sistema |
| 12 | **Textos** | Filosofia, missão, posicionamento, promessa, taglines e manifesto já estão escritos (págs. 4–7) | Textos literais | Parafrasear ou inventar selos/parceiros |
| 13 | **Contato** | @paruvegan · paru@site.com · +55 11 94723-6278 (pág. 16) | `src/config/site.ts` | Publicar sem confirmar o e-mail ("site.com" parece provisório) |
| 14 | **Paleta** | `#1A1A1A`, `#12FE07`, `#FF2E88`, `#F9F9F9`, `#000000` (pág. 15) | Tokens em `src/index.css` | Cores fora da paleta |

### Observações sobre o brandbook (para alinhar com o PARU)
- O sumário cita páginas 14, 21 e 26 ("Colors", "Typography", "Adhibitions"), mas o PDF tem 16 páginas — numeração herdada do template.
- "ADHIBITIONS" provavelmente deveria ser "APPLICATIONS" (aplicações da marca).
- O texto fala em "geometria brutalista", mas os desenhos do felino são traço neon arredondado. **O site segue os desenhos.**
- Mistura de idiomas no log ("FREQUENCY ESTABILIZADA"). Mantido como voz da marca; confirmar se é intencional.

---

## 1. Visão geral & propósito

Plataforma oficial do DJ e produtor **PARU**, posicionando-o como referência de autoridade técnica e vanguarda no Indie Dance e Minimal Deep Tech.

O conceito do site traduz o manifesto do artista:
**"A máquina dita o pulso, a pista define a frequência. O próximo show está configurado. Vejo vocês no centro do som."**

Três objetivos, em ordem:
1. **Reconhecimento de marca** — em 1 segundo o visitante vê o logo, o felino neon e a paleta verde/rosa, exatamente como no brandbook.
2. **Conversão de booking** — contratante chega ao WhatsApp em no máximo 2 toques, de qualquer seção.
3. **Música** — ouvir/seguir nas plataformas.

Referências (o que pegamos de cada uma):
- **Martin Garrix** ([martingarrix.com](https://martingarrix.com/)) — catálogo de lançamentos profissional com metadados e links de streaming.
- **James Hype** ([jameshype.com](https://jameshype.com/)) — agenda clara, ingresso em 1 clique, booking fácil de achar.
- **Peggy Gou** ([peggygou.com](https://www.peggygou.com/)) — avatar carismático que acompanha a navegação e torna o site inconfundível.

---

## 2. Identidade visual (brandbook PARU)

| Atributo | Diretriz oficial | Aplicação no website |
| :--- | :--- | :--- |
| **Arquétipo** | O Criador / Arquiteto — mistério e autoridade técnica; "mixagens são upgrades de sistema" (pág. 6) | Interface de "sistema operacional sonoro": prompts `user@paru-sys:~$`, log de boot, status `SYSTEM ONLINE` |
| **Missão** | Conectar pessoas ao momento presente pela precisão técnica; tecnologia como "resgate humano" (pág. 5) | Texto literal na seção "O arquiteto do sistema" |
| **Promessa** | "Arquitetura sonora para mentes conectadas." (pág. 4) | Tagline do hero e bloco "Brand promise" |
| **Taglines** | PARU // SYSTEM. OVERRIDE. · PARU // FREQUÊNCIA CONDUZIDA. · PARU // ARQUITETURA SONORA. | Letreiro rolante após o manifesto + rodapé |
| **Voz** | Confident · Authentic · Inspiring · Modern — "confiante, moderna e autêntica, com clareza e propósito, evitando formalidades" (pág. 7) | Microtextos curtos, diretos, em formato de comando |
| **Cores** | Grafite/Chassi `#1A1A1A` · Terminal Green `#12FE07` · Neon (rosa rim light) `#FF2E88` · White `#F9F9F9` · Black `#000000` (pág. 15) | Fundo preto; seções alternadas em grafite; verde = ação principal; rosa = destaque/alerta; branco no manifesto (como a pág. 4) |
| **Tipografia** | **Codec Pro** (logo e títulos, Heavy/Black, respiro amplo) · **Fira Code** (terminal/metadados) · **Inter** (texto longo) (págs. 13–14) | Títulos Codec Pro ExtraBold caixa alta · BPM, datas, labels e botões em Fira Code · parágrafos em Inter |
| **Logo** | Wordmark itálico customizado; "A" sem travessão; curvas + cantos agudos (pág. 9–10) | SVG vetorizado do original; nunca redesenhado com fonte |
| **Mascote** | Felino neon — avatar do sistema (pág. 11) | Ver §3 |
| **Moodboard** | Máquinas retrô, rave, pista rosa/azul, techwear, estética lúdica (gato meme) (pág. 8) | Texturas facetadas, scanlines sutis, humor no avatar |

### Registros visuais do brandbook
| Capa & Logo 3D Glow | Brand Voice & Terminal |
| :---: | :---: |
| ![Capa Brandbook](./docs/assets/brand_cover.png) | ![Brand Voice](./docs/assets/brand_voice.png) |
| **Moodboard** | **Mascote: Felino neon** |
| ![Moodboard](./docs/assets/brand_moodboard.png) | ![Mascote Felino](./docs/assets/brand_mascot.png) |
| **Tipografia oficial** | **Paleta de cores** |
| ![Tipografia](./docs/assets/brand_typography.png) | ![Cores](./docs/assets/brand_colors.png) |

---

## 3. Mascote — especificação fiel

**Anatomia (não alterar):**
- Contorno em **traço verde neon `#12FE07`** espesso e arredondado, com brilho (glow). Interior vazio (preto).
- Cabeça: duas orelhas pontudas, laterais retas e queixo arredondado em "escudo".
- **Olhos**: dois **quadrados rosa `#FF2E88`** (estética pixel). Não usar círculos nem íris.
- **Nariz**: pequeno triângulo rosa invertido.
- **Pulso (ECG)** rosa: abaixo da cabeça (versão ícone) ou no peito (corpo inteiro).
- **Cauda**: ponta com 2–3 pixels quadrados rosa.
- Variações de cor oficiais: verde+rosa (padrão), branco, preto (pág. 12).

**Poses oficiais (arquivos em `public/brand/`):**

| Pose | Arquivo | Onde aparece no site |
| :--- | :--- | :--- |
| Cabeça (vetor, interativa) | `paru-cat-head.svg` / componente `CatHead` | Hero, header (lockup), rodapé, favicon |
| Sentado | `cat-sit.webp` | Seção Booking ("aguardando sua proposta") |
| 01 Stretch (frente) | `cat-stretch.webp` | Avatar na seção Booking |
| 02 Pounce (3/4 esq.) | `cat-pounce.webp` | Avatar na seção Música |
| 03 Rest (3/4 dir.) | `cat-rest.webp` | Avatar na seção Sobre |
| 04 Prowl (perfil dir.) | `cat-prowl.webp` | Avatar na seção Shows |

**Comportamento (inspirado em Peggy Gou, mas sutil):**
- Hero: cabeça grande; **olhos quadrados seguem o cursor**, **piscam** a cada 3–6 s, **pulso ECG bate a 128 BPM** (0,469 s).
- Ao rolar: o felino aparece no canto inferior direito e **troca de pose conforme a seção**, com um pulinho e um balão de terminal curto (ex.: `> LONG SET_LOADED`). Clique abre/fecha o balão; botão para esconder (lembrado no navegador).
- Celular: avatar menor; balão só abre no toque (não cobre conteúdo).
- `prefers-reduced-motion`: sem animações.

---

## 4. Estrutura do site (implementada)

Single page com navegação por âncoras:

```
┌──────────────────────────────────────────────────────────────────────┐
│ HEADER  [PARU + cabeça]          Música  Shows  Sobre  [CONTRATAR]   │
├──────────────────────────────────────────────────────────────────────┤
│ 01 HERO — recriação da capa do brandbook                             │
│    texturas facetadas verde (sup. esq.) e rosa (inf. dir.)           │
│    cabeça do felino interativa + logo com glow verde                 │
│    INDIE DANCE // MINIMAL DEEP TECH                                  │
│    "ARQUITETURA SONORA PARA MENTES CONECTADAS."                      │
│    [OUVIR AGORA]  [PRÓXIMOS SHOWS]                                   │
│    log de boot da capa (login: admin ... [OK]) · SÃO PAULO hh:mm · 128 BPM │
├──────────────────────────────────────────────────────────────────────┤
│ 02 BRAND PHILOSOPHY — fundo branco, como a pág. 4                    │
│    texto literal + destaque "MECÂNICA, HIPNÓTICA..." + promessa/taglines │
│    letreiro rolante com as 3 taglines                                │
├──────────────────────────────────────────────────────────────────────┤
│ 03 FREQUÊNCIAS (música)                                              │
│    último lançamento em destaque: capa, BPM, tom, gênero, selo, data │
│    pré-escuta 30 s (se houver MP3) + links Spotify/Beatport/SC/Apple │
│    grade dos demais lançamentos                                      │
├──────────────────────────────────────────────────────────────────────┤
│ 04 PRÓXIMOS SHOWS (fundo grafite)                                    │
│    DIA grande | cidade/UF | local // evento | [INGRESSOS]            │
│    estado vazio elegante + banner "Quer PARU no seu line-up?"        │
├──────────────────────────────────────────────────────────────────────┤
│ 05 O ARQUITETO DO SISTEMA (sobre / EPK)                              │
│    foto real + arquétipo + missão + CONFIDENT AUTHENTIC INSPIRING MODERN │
│    [BAIXAR/SOLICITAR PRESS KIT] [RIDER TÉCNICO]                      │
├──────────────────────────────────────────────────────────────────────┤
│ 06 GET IN TOUCH (booking)                                            │
│    WhatsApp · e-mail (copiar) · Instagram                            │
│    formulário "booking_terminal.sh" → abre WhatsApp com a proposta   │
├──────────────────────────────────────────────────────────────────────┤
│ FOOTER  lockup + manifesto · taglines · redes · "// ACESSO AO LINK NA BIO. //" │
└──────────────────────────────────────────────────────────────────────┘
          [avatar felino flutuante — muda de pose por seção]
```

### Decisões de UX
- **Booking sempre a 1 clique**: botão verde "Contratar" fixo no header; banner no fim da agenda; WhatsApp como canal principal (é o que contratantes no Brasil usam).
- **Formulário sem backend**: monta a proposta e abre o WhatsApp já preenchido — zero custo, zero spam, nada se perde.
- **Honestidade de conteúdo**: nada de datas, faixas ou fotos falsas publicadas como reais. Conteúdo de exemplo aparece com etiqueta **EXEMPLO** e é desligado com uma flag.
- **Acessibilidade**: contraste AA (cinza de apoio `#A3A3A3` sobre preto = 8,3:1), foco visível verde, link "pular para o conteúdo", `aria-*` nos controles, respeito a movimento reduzido, alvos de toque ≥ 44 px.
- **Mobile first**: testado em 390 px sem rolagem horizontal; menu em tela cheia com tipografia grande.
- **Performance**: fontes auto-hospedadas (sem Google Fonts), imagens WebP, sem bibliotecas de animação (CSS puro), JS ~87 kB gzip.

---

## 5. Arquitetura técnica

- **Vite 8 + React 19 + TypeScript** (já no repositório). Build estático → deploy grátis em **Vercel**, **Netlify** ou **Cloudflare Pages**.
  - *Por que não Next.js?* O site é uma página única sem conteúdo dinâmico no servidor; Vite entrega o mesmo resultado com menos complexidade. Migrar só se surgir blog/CMS.
- **CSS próprio** com tokens do brandbook em `src/index.css` (sem Tailwind).
- **Dependências**: apenas `react`, `react-dom`, `lucide-react` (ícones).
- **Onde editar conteúdo** (sem mexer em layout):
  - `src/config/site.ts` → contatos, redes, press kit, `showDemoContent`.
  - `src/data/tracks.ts` → lançamentos (capa, BPM, tom, selo, links, `previewUrl`).
  - `src/data/shows.ts` → agenda.
  - Opcional: agenda via Google Calendar com `.env` (`VITE_GOOGLE_CALENDAR_ID`, `VITE_GOOGLE_CALENDAR_API_KEY` restrita ao domínio).
- **Arquivos de marca** extraídos do PDF em `public/brand/` (logo SVG, cabeça SVG, 5 poses, texturas, foto, og-image).

---

## 6. Cronograma

| Etapa | Foco | Status |
| :---: | :--- | :---: |
| 1 | Design system fiel (cores, fontes, logo e mascote oficiais) | Feito |
| 2 | Hero da capa + mascote interativo + avatar por seção | Feito |
| 3 | Música, agenda, sobre, booking, rodapé; responsivo e acessível | Feito |
| 3.1 | Navegação e ícones (§8) | Feito |
| 3.2 | Performance, acessibilidade e SEO (§9) | Feito |
| 4 | Conteúdo real do PARU (lista §7) | Aguardando |
| 5 | Domínio, deploy, og:image com URL absoluta, Lighthouse 95+ | Depois da etapa 4 |

---

## 7. Pendências para publicar (checklist com o PARU)

1. **E-mail de booking real** — `paru@site.com` parece placeholder do brandbook.
2. **"Foto bolada de PARU em pé"** — a pág. 4 do brandbook ainda pede essa foto. Ideal: 1 vertical (sobre) + 1 horizontal escura com rim light rosa (hero opcional).
3. **Lançamentos reais**: título, versão, BPM, tom, selo, data, capa (3000×3000) e links. Pré-escuta de 30 s em MP3 é opcional.
4. **Agenda real** — ou link da agenda Google pública.
5. **Links**: Spotify, SoundCloud, Beatport, YouTube.
6. **Press kit (EPK)**: pasta no Drive com fotos em alta, bio PT/EN, rider técnico e mapa de palco.
7. **Licença web da Codec Pro** (Zetafonts) — a licença do Canva não cobre site. Enquanto isso, o site usa Outfit (visual muito próximo). Instruções em `public/fonts/LEIA-ME.txt`.
8. **Domínio** (ex.: `parumusic.com.br`) — depois disso, trocar `og:image` para URL absoluta no `index.html`.
9. Mudar `showDemoContent` para `false` em `src/config/site.ts`.

## 8. Navegação e ícones (v1.1)

**Diagnóstico da navegação atual**
- Página longa (6 seções) sem indicação de onde o visitante está nem de quanto falta.
- Menu do celular escondido no ícone ☰, no topo — longe do polegar.
- "Booking" some do menu desktop (só existe o botão "Contratar", que não mostra estado ativo).
- Links e botões só com texto: pouca leitura rápida, principalmente no celular.
- A URL não muda ao rolar: não dá para compartilhar o link direto de "Shows".
- Datas da agenda sem ação útil além do ingresso.

**Plano**

| # | Melhoria | Onde | Ícones (lucide) |
| :-: | :--- | :--- | :--- |
| 1 | Configuração única da navegação (id, rótulo, ícone, comando de terminal) usada por todos os menus | `src/config/nav.ts` | — |
| 2 | Menu desktop com ícone + rótulo, "Booking" com estado ativo no botão "Contratar" | Header | Disc3, CalendarDays, UserRound, Send |
| 3 | Barra de progresso de leitura verde→rosa (a barra-assinatura do brandbook) na base do header | Header | — |
| 4 | Atalho de WhatsApp no header | Header | MessageCircle |
| 5 | **Barra de abas fixa no rodapé do celular** (Música · Shows · Sobre · Booking), com ícone, rótulo e aba ativa em verde — substitui o menu ☰ | Novo `MobileTabBar` | mesmos do item 2 |
| 6 | **Índice lateral no desktop** (01–05 + Topo) estilo terminal, com a seção ativa marcada e rótulo ao passar o mouse | Novo `SectionRail` | ArrowUp |
| 7 | URL acompanha a seção (`#shows`, `#musica`…) sem pular a página | `useActiveSection` | — |
| 8 | Ícone no prompt de cada seção + ícones nos botões principais (ouvir, agenda, ingressos, WhatsApp, rider, press kit) | Seções | Play, CalendarDays, Ticket, MessageCircle, FileText, Download |
| 9 | Agenda: pino de local, e botão **"Salvar na agenda"** que baixa o evento (.ics) para Google/Apple/Outlook | Shows | MapPin, CalendarPlus |
| 10 | No celular, o mascote flutuante sai de cena (a barra de abas tem prioridade; o felino segue no topo da página) | CSS | — |

**Critérios de aceite**: alvos de toque ≥ 44 px; `aria-current` no item ativo; navegação 100% por teclado; sem rolagem horizontal em 360 px; respeita movimento reduzido.

## 9. Performance, acessibilidade e SEO (v1.2)

Auditoria com Lighthouse (celular com 4G simulado e desktop) e axe-core (WCAG 2.1 AA).

| Métrica | Antes | Depois |
| :--- | :-: | :-: |
| Performance — celular | 86 | **93** |
| Performance — desktop | 100 | 100 |
| Acessibilidade | 100 (axe: 2 falhas graves) | **100 (axe: 0 falhas)** |
| Boas práticas | 100 | 100 |
| SEO | 92 | **100** |
| LCP — celular | 3,3 s | **2,8 s** |

**O que foi feito**
- **Pré-renderização no build** (`scripts/prerender.mjs`): o HTML já sai com todo o conteúdo e o React só "hidrata". A página aparece antes do JavaScript carregar e os buscadores leem o texto.
- **CSS embutido no HTML**: uma requisição a menos antes da primeira pintura.
- **Texturas do topo em WebP** (190 KB → 40 KB) e pré-carregadas com prioridade alta.
- **Imagens com largura/altura** declaradas (sem saltos de layout).
- **SEO**: `robots.txt`, `sitemap.xml`, URL canônica e dados estruturados (JSON-LD `MusicGroup` do PARU + `WebSite` com o criador).
- **Página 404** na identidade ("frequência perdida") com retorno ao site.
- **Acessibilidade**: ícones decorativos do mascote ocultos para leitores de tela; fundo binário decorativo fora da árvore de leitura; verde do manifesto no fundo branco escurecido para 4,5:1; título "Brand Philosophy" com contorno escuro fino.

**Observação**: no GitHub Pages de projeto, o `robots.txt` fica em `/paru-site/robots.txt` e não na raiz do domínio. Com domínio próprio ele passa a valer automaticamente; até lá, enviar o `sitemap.xml` pelo Google Search Console.

---
*Plano elaborado por Victor Neves a partir do `PARU Brand Guideline Presentation.pdf` e da análise dos benchmarks Martin Garrix, James Hype e Peggy Gou.*
