# Hogos Kick-Off Roulette ⚽

Team-Auslosung für FIFA-Abende mit den Kollegen. Modus wählen, Knopf drücken,
jeder bekommt seine Mannschaft – fertig.

**Live:** https://haroonerika.github.io/ende/fifa/

## So läuft's
1. **Modus wählen** – *Länderspiele* (69 Nationalmannschaften) oder
   *Vereine & Champions League* (184 Klubs aus 19 Ligen).
2. **Topf einstellen** – Ligen bzw. Kontinente an-/abwählen, Stärke per
   Sterne-Regler eingrenzen, faire Auslosung an oder aus.
3. **Ziehen** – Spieler 1 drückt seinen Knopf, Spieler 2 seinen.
   Es läuft eine kurze Roulette-Animation, dann steht das Team mit Wappen,
   Sternen und Liga da.

## Features
- 🎲 Zwei getrennte Knöpfe – jeder Spieler zieht selbst
- ⚖️ **Faire Auslosung**: beide Teams höchstens einen halben Stern auseinander
- 🚫 Nie zweimal dasselbe Team in einem Duell
- 🏟️ Filter nach Liga/Kontinent und Stern-Bereich (3–5 ★)
- 🛡️ Eigene Wappen-Grafiken aus Vereinsfarben und Trikotmuster
  (Streifen, Ringe, Hälften, Schärpe) – keine geschützten Logos
- 🏳️ Echte Flaggen-Emojis für alle Nationalmannschaften
- ✏️ Spielernamen frei änderbar, werden gespeichert
- 🕘 Verlauf der letzten 8 Duelle
- ⇄ Teams tauschen, 🎲 beide neu auslosen, Leertaste als Shortcut
- 🔊 Roulette-Sound (abschaltbar)
- 📱 Voll responsiv, reines HTML/CSS/JS, läuft offline

## Ligen im Vereins-Modus
Premier League · Bundesliga · LaLiga · Serie A · Ligue 1 · Eredivisie ·
Liga Portugal · Süper Lig · Saudi Pro League · Scottish Premiership ·
Pro League (BE) · Österreich & Schweiz · Skandinavien · Brasileirão ·
Liga Argentina · Liga MX · MLS · 2. Bundesliga · EFL Championship

## Lokal starten
`fifa/index.html` einfach im Browser öffnen – keine Installation, kein Build.

## Einzeldatei zum Veröffentlichen
`node fifa/build-artifact.mjs meine-seite.html` packt HTML, CSS, JS und die
Team-Datenbank in eine einzige Datei – praktisch zum Hochladen oder Teilen.

## Teams ergänzen
Alles steckt in `teams.js`. Eine Zeile pro Team:

```
Verein:  'Name;KURZ;#Primärfarbe;#Sekundärfarbe;Sterne[;Muster]'
Land:    'Name;KURZ;🏳;#Primärfarbe;#Sekundärfarbe;Sterne'
```

Muster: `plain` (Standard), `stripes`, `halves`, `hoops`, `sash`.
