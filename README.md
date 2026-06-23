# City Cut ✂️

Webseite für den Friseursalon **City Cut** in Haren (Ems) –
*Dein Style, unsere Leidenschaft.*

**Live-Demo:** https://haroonerika.github.io/ende/
**Instagram:** [@citycut_haren](https://www.instagram.com/citycut_haren/)

## Bereiche
- ✨ Hero / Startbereich
- 💇 Leistungen & Preise (Damen, Herren/Barber, Pflege)
- 🖼️ Galerie mit Lightbox
- 👥 Team
- ⭐ Google-Bewertungen
- 🕐 Öffnungszeiten, Adresse & Karte

## Stil & Effekte
Premium-Look – dunkles Design mit Gold-Akzenten, edle Serifen-Schrift,
**mobile-first** und mit viel Bewegung:
- ✂️ scroll-gesteuerte **Scheren-Animation**, die eine Linie „durchschneidet" (mit fallenden Haarschnipseln)
- 📊 Scroll-Fortschrittsbalken oben
- 🔢 hochzählende Zahlen (Bewertung, Kund:innen)
- 🌀 Parallax-Hintergrund & schwebende Icons
- ✨ Wort-für-Wort-Einblendung im Hero, Reveal-Animationen beim Scrollen
- 🏃 laufendes Service-Band (Marquee)
- 🧲 magnetische Buttons (Desktop)
- 📱 fixierter „Termin anfragen"-Button am Handy

Reines HTML/CSS/JS, keine Abhängigkeiten. Bewegung wird bei
`prefers-reduced-motion` automatisch reduziert.

## Header-Video einsetzen
Der Startbereich zeigt ein Hintergrund-Video im Dauer-Loop.
Lege dafür einfach deine Videodatei **`hero.mp4`** (optional zusätzlich
`hero.webm`) in den Projektordner – fertig.

- Empfehlung: kurzer Clip (8–20 Sek.), quer, ohne Ton, möglichst komprimiert.
- Solange kein Video vorhanden ist, wird automatisch ein Poster-Bild mit
  sanftem Zoom angezeigt (in `index.html` beim `<video poster="…">` änderbar).

## Eigene Inhalte einpflegen
Die meisten Inhalte lassen sich leicht anpassen:

| Was | Wo |
|-----|-----|
| Galerie-Bilder | `script.js` → `GALLERY` |
| Team (Namen, Fotos, Rollen) | `script.js` → `TEAM` |
| Bewertungen | `script.js` → `REVIEWS` |
| Preise | `index.html` → Abschnitt „Leistungen" |
| Öffnungszeiten / Adresse | `index.html` → Abschnitt „Kontakt" |
| Telefonnummer | `index.html` → alle `tel:`-Links |

> ⚠️ Telefonnummer und genaue Öffnungszeiten sind aktuell Platzhalter –
> bitte mit den echten Daten ersetzen.

## Lokal starten
Einfach `index.html` im Browser öffnen.
