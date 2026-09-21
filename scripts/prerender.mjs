// Pré-renderiza a página no build: o HTML já sai com o conteúdo,
// o que acelera a primeira pintura no celular e ajuda buscadores.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js');

const { render } = await import(pathToFileURL(ssrEntry).href);
const html = readFileSync(htmlPath, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: <div id="root"></div> não encontrado');
let out = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

// CSS embutido no HTML: elimina uma ida ao servidor antes da primeira pintura.
out = out.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/, (tag, href) => {
  const cssDir = dirname(href); // ex.: ./assets ou /paru-site/assets
  let css = readFileSync(resolve(root, 'dist', href.replace(/^.*?assets\//, 'assets/')), 'utf8');
  // caminhos relativos ao arquivo CSS passam a ser relativos à página
  css = css.replace(/url\((\.{1,2}\/[^)]+)\)/g, (_, u) => `url(${cssDir}/${u})`);
  return `<style>${css}</style>`;
});

writeFileSync(htmlPath, out);
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log('prerender: dist/index.html gerado com conteúdo estático');
