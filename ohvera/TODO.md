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

**Eingerichtet:** Die Formulare öffnen beim Abschicken WhatsApp oder das
E-Mail-Programm mit fertig ausgefüllter Nachricht. Dafür braucht es kein
Backend — aber die WhatsApp-Nummer und die E-Mail-Adresse aus Abschnitt 1
müssen eingetragen sein, sonst erscheint eine ehrliche Fehlermeldung statt
eines Versands.

Optional für später:

- [ ] `LEAD_ENDPOINT` eintragen, wenn Anfragen einmal direkt auf einem
      Server ankommen sollen. Dann zeigen die Formulare automatisch einen
      einzelnen Absenden-Knopf und der Foto-Upload im Standortpartner-
      Formular erscheint wieder.

**Wichtig, falls das kommt:** Der Empfänger muss so eingerichtet sein, dass
hochgeladene Fotos **nicht öffentlich abrufbar** sind.

## 3 · Lagebeschreibung der Standorte  (`src/content/site.ts`, Abschnitt 6)

Die Städte und die Anzahl der Bildschirme stehen drin (Lingen 4, Haren 2,
Meppen 2, Nordhorn 2). Was fehlt, ist je Stadt ein kurzer Satz zur Lage —
ohne Firmennamen und ohne Adresse:

- [ ] `[LAGEN IN LINGEN EINTRAGEN]`
- [ ] `[LAGEN IN HAREN EINTRAGEN]`
- [ ] `[LAGEN IN MEPPEN EINTRAGEN]`
- [ ] `[LAGEN IN NORDHORN EINTRAGEN]`

Beispiel: „Zwei in der Fußgängerzone, zwei an einer Ausfallstraße mit
Berufsverkehr." Das reicht, damit sich jemand die Lage vorstellen kann.

## 4 · Foto von Haroon  (`src/content/site.ts`, Abschnitt 9 „person")

- [ ] `[FOTO HAROON EINFÜGEN]` — echtes Foto in `public/` legen und den Pfad
      in `startseite.person.fotoPfad` eintragen (z. B. `/haroon.jpg`).

Kein Stockfoto und keine KI-Person als Übergangslösung. Solange kein Foto da
ist, zeigt die Seite eine leere, beschriftete Fläche.

Das Team steht bewusst nur mit Rollen auf der Seite („zwei in der Gestaltung,
zwei im Vertrieb"). Namen oder Fotos der drei anderen kommen erst dazu, wenn
sie ausdrücklich zugestimmt haben — dann in `startseite.person.rollen`.

## 5 · Impressum  (`src/content/site.ts`, Abschnitt 17)

Rechtsform ist eingetragen: Einzelunternehmen, kein Registereintrag,
Kleinunternehmerregelung nach § 19 UStG. Offen bleibt nur:

- [ ] Anschrift (siehe Abschnitt 1 dieser Liste)

## 6 · Datenschutzerklärung  (`src/content/site.ts`, Abschnitt 17)

Nur noch eine Lücke — ein Wort in der Konstante `hostinganbieter`:

- [ ] `[HOSTING-ANBIETER EINTRAGEN]` — Name des Hosters, sobald entschieden.
      Bei den meisten Anbietern brauchst du zusätzlich einen Vertrag zur
      Auftragsverarbeitung (bei Netlify und Vercel ist der in den AGB
      enthalten und muss nur bestätigt werden).

Alles Übrige ist eingetragen: Logfiles 7 Tage, WhatsApp-Hinweis, zuständige
Aufsichtsbehörde, Stand der Erklärung. Die Formulare senden nichts an einen
Server — das steht so drin und stimmt auch.

## 7 · Rechtsprüfung

- [ ] **Impressum und Datenschutzerklärung vor der Veröffentlichung
      juristisch prüfen lassen.** Beides ist ein Gerüst, kein geprüfter
      Rechtstext. Solange noch Platzhalter enthalten sind, steht ein
      sichtbarer Entwurfshinweis über dem Text — er verschwindet
      automatisch, sobald alle Klammern ersetzt sind.
- [ ] AGB oder Leistungsbeschreibung prüfen: monatliche Kündbarkeit,
      tagesgenaue Verlängerung bei Ausfall über 24 Stunden,
      Branchenexklusivität pro Bildschirm, Übergang der Motivrechte.

## 8 · Vor dem Livegang

- [ ] Domain `ohvera.de` verbinden und HTTPS aktivieren.
- [ ] **SPA-Fallback beim Hoster einrichten** — alle Pfade müssen auf
      `index.html` zeigen, sonst liefern `/werben` & Co. beim direkten
      Aufruf einen 404. Für Netlify liegt `public/_redirects` bereits bei.
- [ ] Open-Graph-Bild ergänzen: eine Datei `public/og.png` (1200 × 630)
      anlegen und in `index.html` als `og:image` eintragen. Ohne Bild zeigen
      geteilte Links nur Titel und Beschreibung.
- [ ] `sitemap.xml` und `robots.txt` in `public/` prüfen, falls sich die
      Domain ändert.

## 9 · Sobald es echte Kunden gibt

- [ ] Erst wenn Gründungskunden **schriftlich zugestimmt** haben: Einträge in
      `referenzen` in `src/content/site.ts` ergänzen (Logo, Zitat,
      Betriebsname, Ort). Der Abschnitt „Was Kunden sagen" erscheint dann
      automatisch. Solange das Array leer ist, wird er nicht gerendert.
- [ ] Neue Bildschirme einfach in `standorte` ergänzen oder die Anzahl je
      Stadt erhöhen. Alle Zahlen auf der Seite (10 Bildschirme, 4 Städte,
      80 Plätze, Ausspielungen im Netz) werden daraus **gerechnet** und
      stimmen dann automatisch.
- [ ] `NETWORK`: Sobald die Kalkulation steht, in `pakete` einen festen
      Preis eintragen — dann verschwindet „Preis auf Anfrage" von selbst.
- [ ] Namen der Partnerbetriebe erscheinen erst, wenn sie schriftlich
      zugestimmt haben. Bis dahin bleibt es bei Stadt und Lage.

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
