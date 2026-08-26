# OHVERA — Website

Website für OHVERA: digitale Werbedisplays in Schaufenstern lokaler Betriebe.
Deutsch, mobile-first, ohne externe Dienste.

**Status:** Das Unternehmen ist im Aufbau. Auf der Website steht kein Kunde,
keine Bewertung und keine Reichweitenzahl — weil es sie noch nicht gibt.
Offene Punkte stehen in [`TODO.md`](./TODO.md).

## Starten

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # Produktionsbuild nach dist/
npm run preview  # Build lokal ansehen
```

## Texte und Preise ändern

**Alles steht in einer Datei: [`src/content/site.ts`](./src/content/site.ts).**

Preise, Paketinhalte, FAQ, Standorte, Kontaktdaten, Rechtstexte und sämtliche
Fließtexte. Die Datei ist auf Deutsch kommentiert und nach Themen sortiert.
Im Code steht nichts doppelt — wer dort 49 in 59 ändert, ändert den Preis
überall auf der Seite.

Die Zahlen der Schleife (10 Sekunden, 10 Plätze, 100 Sekunden, 18 Stunden)
stehen im Objekt `produkt`. Die 648 Ausspielungen werden daraus **gerechnet**,
nicht getippt — sie stimmen also immer.

## Formulare

Es gibt noch kein Backend. Der gesamte Versand steckt in einer Funktion:
[`src/lib/submit.ts`](./src/lib/submit.ts) mit der Konstante `LEAD_ENDPOINT`
ganz oben.

Solange dort nichts eingetragen ist, zeigen alle Formulare eine ehrliche
Fehlermeldung mit den Kontaktwegen — **kein vorgetäuschter Erfolg.**

## Aufbau

```
src/
  content/site.ts     Alle Inhalte (Texte, Preise, FAQ, Rechtstexte)
  lib/submit.ts       Formularversand, Endpoint-Konstante
  lib/loop.ts         Gemeinsame Uhr der 100-Sekunden-Schleife
  lib/seo.ts          Titel, Meta, Open Graph, strukturierte Daten
  lib/validierung.ts  Prüfregeln der Formulare
  components/         Bausteine (Schleife, Schaufenster, Motive, Pakete …)
  pages/              Eine Datei je Seite
```

Zwei Komponenten tragen die Seite:

- **`Schleife.tsx`** — die live laufende 100-Sekunden-Schleife. Zehn Plätze
  im Hochformat, ein wandernder Fortschrittsindikator, ein Sekundenzähler.
- **`Schaufenster.tsx`** — die Straßenperspektive, vollständig aus CSS und
  SVG gebaut. Kein Foto, keine KI-Bilder. Das Motiv im Bildschirm wechselt
  im selben Takt wie die Schleife im Hero.

Beide hängen an derselben Uhr (`lib/loop.ts`) und stehen still, wenn im
Betriebssystem reduzierte Bewegung eingestellt ist.

## Datenschutz

Bewusst ohne Cookie-Banner — und damit das so bleibt:

- Schriften werden lokal ausgeliefert (kein Google-Fonts-Server)
- keine Analytics, kein Tracking, keine Karten-Einbindung
- keine externen Skripte, keine nicht-notwendigen Cookies

Wer eines davon einbaut, braucht ein Einwilligungsbanner. Bitte vorher
überlegen, ob es das wert ist.

## Technik

React 18, TypeScript, Vite, Tailwind CSS, React Router.
Schriften: Archivo (Expanded, für Überschriften), IBM Plex Sans (Fließtext),
IBM Plex Mono (Zahlen, Sekunden, Preise) — alle lokal gebündelt.

## Zwischenstand ohne Server ansehen

```bash
npm run vorschau
```

Erzeugt `vorschau.html` — eine einzige Datei mit eingebautem CSS, JavaScript
und eingebetteten Schriften. Die lässt sich per Doppelklick im Browser
öffnen, verschicken oder auf dem Handy ansehen, ohne dass ein Server läuft.

Diese Variante nutzt Adressen mit Raute (`…/#/werben`), weil ohne Server
keine echten Pfade funktionieren. Am Livebetrieb ändert das nichts — dort
bleiben die sauberen URLs.

## Veröffentlichen

`npm run build` erzeugt `dist/`. Das ist eine Single-Page-App: Der Hoster
muss alle Pfade auf `index.html` umleiten, sonst liefert ein direkter Aufruf
von `/werben` einen 404. Für Netlify liegt `public/_redirects` bei.
