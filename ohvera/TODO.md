# TODO — was vor der Veröffentlichung noch fehlt

Alles, was auf der Website in **eckigen Klammern** steht, ist ein sichtbarer
Platzhalter. Nichts davon wurde erfunden. Diese Liste ist vollständig.

Fast alles lässt sich in einer einzigen Datei ändern:
**`src/content/site.ts`** — dort ist jeder Abschnitt auf Deutsch kommentiert.

---

## 1 · Kontaktdaten  (`src/content/site.ts`, Abschnitt 2 „Kontaktdaten")

| Platzhalter | Wo er auftaucht |
|---|---|
| `[E-MAIL-ADRESSE EINTRAGEN]` | Footer, Kontaktseite, Impressum, Datenschutz, Fehlermeldung der Formulare |
| `[TELEFONNUMMER EINTRAGEN]` | Footer, Kontaktseite, Impressum, Datenschutz |
| `[WHATSAPP-NUMMER EINTRAGEN]` | Footer, Kontaktseite (international ohne + und ohne Leerzeichen, z. B. `4915112345678`) |
| `[STRASSE UND HAUSNUMMER EINTRAGEN]` | Impressum, Datenschutz |
| `[PLZ UND ORT EINTRAGEN]` | Impressum, Datenschutz |

Sobald ein echter Wert eingetragen ist, wird daraus automatisch ein
anklickbarer Link (`mailto:`, `tel:`, `wa.me`). Solange der Platzhalter
steht, wird bewusst **nicht** verlinkt.

## 2 · Formularversand  (`src/lib/submit.ts`)

- [ ] `LEAD_ENDPOINT` eintragen — die Adresse, an die Anfragen gehen sollen.

Solange die Konstante leer ist, wird **kein Erfolg vorgetäuscht**: Alle drei
Formulare zeigen stattdessen eine ehrliche Fehlermeldung mit den
Kontaktwegen. Erst danach führt ein erfolgreicher Versand auf `/danke`.

Zum Testen genügt ein Formulardienst, der `POST` mit JSON annimmt. Wenn
Fotos mitgeschickt werden (Standortpartner-Formular), sendet die Funktion
stattdessen `multipart/form-data`.

**Wichtig:** Der Empfänger muss so eingerichtet sein, dass hochgeladene
Fotos **nicht öffentlich abrufbar** sind.

## 3 · Foto von Haroon  (`src/content/site.ts`, Abschnitt 9 „person")

- [ ] `[FOTO HAROON EINFÜGEN]` — echtes Foto in `public/` legen und den Pfad
      in `startseite.person.fotoPfad` eintragen (z. B. `/haroon.jpg`).

Kein Stockfoto und keine KI-Person als Übergangslösung. Solange kein Foto da
ist, zeigt die Seite eine leere, beschriftete Fläche.

## 4 · Impressum  (`src/content/site.ts`, Abschnitt 17)

- [ ] `[RECHTSFORM EINTRAGEN]`
- [ ] `[REGISTERANGABEN EINTRAGEN ODER ABSCHNITT LÖSCHEN]`
- [ ] `[UMSATZSTEUER-IDENTIFIKATIONSNUMMER EINTRAGEN ODER ABSCHNITT ANPASSEN]`
      — aktuell steht dort die Kleinunternehmerregelung nach § 19 UStG.
- [ ] Anschrift (siehe Abschnitt 1 dieser Liste)

## 5 · Datenschutzerklärung  (`src/content/site.ts`, Abschnitt 17)

- [ ] `[HOSTING-ANBIETER EINTRAGEN]` und Vertrag zur Auftragsverarbeitung
- [ ] `[MIT HOSTER KLÄREN UND ANPASSEN]` — werden IP-Adressen gekürzt?
- [ ] `[SPEICHERDAUER EINTRAGEN, üblich: 7 Tage]` — Server-Logfiles
- [ ] `[SPEICHERDAUER EINTRAGEN]` — hochgeladene Fotos
- [ ] `[FORMULAR-EMPFÄNGER / DIENSTLEISTER EINTRAGEN]`
- [ ] `[ANGABEN ZUM EINGESETZTEN WHATSAPP-DIENST PRÜFEN UND ERGÄNZEN]`
- [ ] `[ZUSTÄNDIGE BEHÖRDE ANHAND DES TATSÄCHLICHEN SITZES PRÜFEN]`
- [ ] `[DATUM EINTRAGEN]` — Stand der Erklärung

## 6 · Rechtsprüfung

- [ ] **Impressum und Datenschutzerklärung vor der Veröffentlichung
      juristisch prüfen lassen.** Beides ist ein Gerüst, kein geprüfter
      Rechtstext. Solange noch Platzhalter enthalten sind, steht ein
      sichtbarer Entwurfshinweis über dem Text — er verschwindet
      automatisch, sobald alle Klammern ersetzt sind.
- [ ] AGB oder Leistungsbeschreibung prüfen: monatliche Kündbarkeit,
      tagesgenaue Verlängerung bei Ausfall über 24 Stunden,
      Branchenexklusivität pro Bildschirm, Übergang der Motivrechte.

## 7 · Vor dem Livegang

- [ ] Domain `ohvera.de` verbinden und HTTPS aktivieren.
- [ ] **SPA-Fallback beim Hoster einrichten** — alle Pfade müssen auf
      `index.html` zeigen, sonst liefern `/werben` & Co. beim direkten
      Aufruf einen 404. Für Netlify liegt `public/_redirects` bereits bei.
- [ ] Open-Graph-Bild ergänzen: eine Datei `public/og.png` (1200 × 630)
      anlegen und in `index.html` als `og:image` eintragen. Ohne Bild zeigen
      geteilte Links nur Titel und Beschreibung.
- [ ] `sitemap.xml` und `robots.txt` in `public/` prüfen, falls sich die
      Domain ändert.

## 8 · Sobald es echte Kunden gibt

- [ ] Erst wenn Gründungskunden **schriftlich zugestimmt** haben: Einträge in
      `referenzen` in `src/content/site.ts` ergänzen (Logo, Zitat,
      Betriebsname, Ort). Der Abschnitt „Was Kunden sagen" erscheint dann
      automatisch. Solange das Array leer ist, wird er nicht gerendert.
- [ ] Sobald der Pilotstandort schriftlich zugesagt ist: Standortangaben in
      `standorte` präzisieren. Der Standort wird **erst dann** namentlich
      genannt, wenn die Zusage schriftlich vorliegt.
- [ ] Sobald der Bildschirm läuft: Status der Standortkarte von
      `In Vorbereitung` auf den tatsächlichen Stand ändern und die freien
      Plätze aktualisieren.
- [ ] `NETWORK`-Paket auf `buchbar: true` setzen und einen Preis eintragen,
      sobald es mehr als einen Standort gibt.

---

## Was bewusst NICHT auf der Seite steht

Damit das beim Weiterbauen nicht versehentlich aufweicht:

- keine Kundenlogos, Testimonials, Sternebewertungen, Fallstudien
- keine Reichweiten-, Kontakt- oder Impressionszahlen
- keine Zahl von Standorten, Kunden oder erreichten Menschen
- keine Auszeichnungen, Presse- oder Partnerlogos
- keine Fotos eines angeblich installierten OHVERA-Bildschirms
- keine realen Unternehmensnamen als Kunden oder Standorte
- kein `LocalBusiness` in den strukturierten Daten, solange keine bestätigte
  Geschäftsanschrift existiert (nur `Organization` und `FAQPage`)

Die 648 Ausspielungen sind überall als **Schleifenmathematik** formuliert,
nie als Reichweite oder Zuschauerzahl. Bitte so lassen.
