/* --------------------------------------------------------------------
   Baut aus dist/ eine einzige, in sich geschlossene HTML-Datei.
   Zweck: Zwischenstand ohne Server ansehen (auch auf dem Handy).
   Für den echten Livebetrieb wird weiterhin dist/ verwendet.
-------------------------------------------------------------------- */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const assets = join(dist, 'assets');
const dateien = readdirSync(assets);

const cssDatei = dateien.find((n) => n.endsWith('.css'));
const jsDatei = dateien.find((n) => n.endsWith('.js'));

let css = readFileSync(join(assets, cssDatei), 'utf8');
let js = readFileSync(join(assets, jsDatei), 'utf8');

/* Bilder aus public/ liegen in der Vorschau nicht auf einem Server —
   deshalb werden sie direkt in die Datei eingebettet. */
let bilder = 0;
js = js.replace(/["']\/motive\/([\w-]+\.webp)["']/g, (_treffer, datei) => {
  const daten = readFileSync(join(dist, 'motive', datei)).toString('base64');
  bilder += 1;
  return `"data:image/webp;base64,${daten}"`;
});

/* Schriften: nur die lateinischen Schnitte einbetten, den Rest verwerfen.
   Kyrillisch, Griechisch und Vietnamesisch braucht diese Seite nicht. */
const bloecke = css.split('@font-face');
const kopf = bloecke.shift();
let behalten = 0;
let verworfen = 0;

const gefiltert = bloecke
  .map((block) => {
    const ende = block.indexOf('}');
    const regel = block.slice(0, ende + 1);
    const rest = block.slice(ende + 1);
    const urls = [...regel.matchAll(/url\((?:\.\/|\/)(?:assets\/)?([^)]+)\)/g)].map((m) => m[1]);
    const woff2 = urls.find((u) => u.endsWith('.woff2'));

    if (!woff2 || !/-latin(-ext)?-/.test(woff2)) {
      verworfen += 1;
      return rest; // @font-face fällt weg, nachfolgende Regeln bleiben
    }

    const daten = readFileSync(join(assets, woff2)).toString('base64');
    const neu = regel.replace(
      /src:[^;]+;/,
      `src:url(data:font/woff2;base64,${daten}) format("${woff2.includes('wdth') ? 'woff2-variations' : 'woff2'}");`,
    );
    behalten += 1;
    return '@font-face' + neu + rest;
  })
  .join('');

css = kopf + gefiltert;

const html = readFileSync(join(dist, 'index.html'), 'utf8');
const titel = html.match(/<title>([^<]*)<\/title>/)[1];

const seite = `<title>${titel}</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;

writeFileSync(process.argv[2] ?? 'vorschau.html', seite);
console.log(
  `Schriften: ${behalten} eingebettet, ${verworfen} verworfen · Bilder: ${bilder} · Datei: ${(seite.length / 1024 / 1024).toFixed(2)} MB`,
);
