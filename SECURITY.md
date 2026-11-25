# Política de Segurança / Security Policy

## Versões suportadas

O site oficial do **PARU** (`https://voaneves.github.io/paru-site/`) é publicado continuamente a partir da branch `main`. Apenas a versão em produção recebe correções de segurança.

| Versão | Suportada |
| :--- | :--- |
| `main` (produção) | :white_check_mark: |
| Qualquer outra branch | :x: |

## Como reportar uma vulnerabilidade

**Não abra uma issue pública** para falhas de segurança.

Envie um relato privado por e-mail para **victorneves478@gmail.com** com o assunto:

```text
[SECURITY] paru-site: <resumo curto>
```

Inclua, se puder:

- a URL ou o arquivo afetado;
- os passos para reproduzir ou uma prova de conceito mínima;
- o impacto que você enxerga (ex.: XSS, injeção no gerador `.ics`, problema de SSR/prerender ou exposição em fluxo de build);
- o navegador e o sistema usados, quando relevante.

## O que esperar

- Confirmação do recebimento em até **7 dias**.
- Avaliação inicial (reprodução e gravidade) em até **14 dias**.
- Aviso quando a correção for publicada, com crédito caso deseje.

Este é um projeto mantido sem equipe dedicada de segurança: os prazos acima são um esforço de boa-fé, não um compromisso contratual. Não há programa de recompensas (bug bounty).

## Escopo

**Dentro do escopo:** código deste repositório (`src/`, `scripts/prerender.mjs`), geração de eventos `.ics`, integração client-side com a API do Google Calendar, build e workflow de publicação (`workflow.yml`).

**Fora do escopo:**

- falhas na infraestrutura de terceiros (GitHub Pages / GitHub, Google Calendar API, plataformas de streaming), que devem ser reportadas aos respectivos fornecedores;
- ataques de negação de serviço (DoS/DDoS), força bruta ou engenharia social;
- relatórios automáticos de scanners sem impacto concreto demonstrado.

Pedimos prazo razoável para correção antes de qualquer divulgação pública.

---

## English summary

Only the production site (`main` at `https://voaneves.github.io/paru-site/`) receives security fixes.

**Please do not open a public issue.** Send private vulnerability reports to **victorneves478@gmail.com** with subject `[SECURITY] paru-site: <short summary>`, including the affected URL or file, reproduction steps, and impact. Good-faith target: acknowledgement within 7 days and initial assessment within 14 days. No bug bounty. Third-party infrastructure (GitHub Pages, Google Calendar API, streaming platforms), DoS, brute force, social engineering, and unproven scanner output are out of scope.
