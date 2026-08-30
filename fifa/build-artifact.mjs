/**
 * Baut aus index.html + style.css + app.js + teams.js eine einzelne HTML-Datei,
 * die sich als Artifact/Static-Page veröffentlichen lässt.
 *
 *   node build-artifact.mjs <ausgabedatei>
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const read = (f) => readFileSync(resolve(here, f), 'utf8');
const out = process.argv[2] || resolve(here, 'standalone.html');

const html = read('index.html');
const css = read('style.css');
const js = read('teams.js') + '\n' + read('app.js');

const title = (html.match(/<title>([^<]+)<\/title>/) || [, 'Kick-Off Roulette'])[1];

let body = html.split('<body>')[1].split('</body>')[0];
body = body
  .replace(/\s*<a class="icon-btn" href="\.\.\/"[^>]*>[\s\S]*?<\/a>/, '')   // Zurück-Link ohne Elternseite
  .replace(/\s*<script src="[^"]+"><\/script>/g, '')                        // externe Skripte inlinen
  .trim();

writeFileSync(out, [
  `<title>${title}</title>`,
  '<link rel="preconnect" href="https://fonts.googleapis.com" />',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" />',
  `<style>\n${css}\n</style>`,
  body,
  `<script>\n${js}\n</script>`,
  ''
].join('\n'), 'utf8');

console.log('geschrieben:', out);
