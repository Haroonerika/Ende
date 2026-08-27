/* ==================================================================
   OHVERA — zentrale Inhaltsdatei
   ------------------------------------------------------------------
   ALLE Texte, Preise, Paketinhalte, FAQ und Standorte stehen hier.
   Wer etwas ändern will, ändert es HIER — und nirgends sonst.

   Drei Regeln, die beim Ändern gelten:
   1. Keine Kundenlogos, Testimonials, Bewertungen oder Fallstudien.
   2. Keine Reichweiten-, Kontakt- oder Zuschauerzahlen. Die 648
      Ausspielungen sind reine Schleifenmathematik, keine Reichweite.
   3. Fehlende Daten bleiben als Platzhalter in eckigen Klammern
      stehen, z. B. [TELEFONNUMMER EINTRAGEN]. Nichts erfinden.
      Offene Platzhalter sind zusätzlich in TODO.md gesammelt.
   4. Tonfall: OHVERA spricht von sich als „wir" — vier Menschen,
      zwei in der Gestaltung, zwei im Vertrieb. Den Kunden duzen wir,
      in Rechtstexten und Formularen siezen wir. In Impressum und
      Datenschutz bleibt die Ich-Form stehen: Diensteanbieter und
      Verantwortlicher ist rechtlich eine einzelne Person.
   5. Namen nennen wir nur von Menschen, die zugestimmt haben. Alle
      anderen erscheinen ausschließlich mit ihrer Rolle.
   ================================================================== */

/* ------------------------------------------------------------------
   1 · Marke
------------------------------------------------------------------- */

export const marke = {
  name: 'OHVERA',
  domain: 'ohvera.de',
  url: 'https://ohvera.de',
  inhaber: 'Haroon Mishkoo',
  /** Ein Satz, der überall als Kurzbeschreibung dient (Footer, SEO, Schema.org) */
  kurzbeschreibung:
    'OHVERA bringt lokale Unternehmen auf digitale Werbedisplays in Schaufenstern. Gestaltung inklusive, Ausspielung nachgewiesen.',
} as const;

/* ------------------------------------------------------------------
   2 · Kontaktdaten
   Solange etwas in eckigen Klammern steht, zeigt die Website den
   Platzhalter sichtbar an und verlinkt ihn NICHT. Sobald ein echter
   Wert eingetragen wird, entstehen Links automatisch.
------------------------------------------------------------------- */

export const kontakt = {
  email: '[E-MAIL-ADRESSE EINTRAGEN]',
  telefon: '[TELEFONNUMMER EINTRAGEN]',
  /** International, ohne Leerzeichen und ohne +, z. B. 4915112345678 */
  whatsappNummer: '[WHATSAPP-NUMMER EINTRAGEN]',
  strasse: '[STRASSE UND HAUSNUMMER EINTRAGEN]',
  plzOrt: '[PLZ UND ORT EINTRAGEN]',
  ansprechpartner: 'Haroon Mishkoo',
  /** WhatsApp ist bewusst ein gleichwertiger Kontaktweg – die Zielgruppe nutzt ihn täglich. */
  whatsappAktiv: true,
  antwortzeit: 'Wir antworten in der Regel am selben oder am nächsten Tag.',
} as const;

/** Erkennt einen noch nicht ausgefüllten Platzhalter wie [E-MAIL EINTRAGEN]. */
export function istPlatzhalter(wert: string): boolean {
  return wert.trim().startsWith('[') && wert.trim().endsWith(']');
}

/* ------------------------------------------------------------------
   3 · Das Produkt — die Zahlen der Schleife
   Diese Werte sind die Grundlage aller Angaben auf der Website.
   Wird hier etwas geändert, ändert sich es überall automatisch mit.
------------------------------------------------------------------- */

export const produkt = {
  spotSekunden: 10,
  slotsGesamt: 10,
  slotsVerkaeuflich: 8,
  slotsReserviert: 2,
  schleifeSekunden: 100,
  betriebVon: '07:00',
  betriebBis: '01:00',
  betriebStunden: 18,
  formatBreite: 1080,
  formatHoehe: 1920,
} as const;

/** 18 Stunden = 64.800 Sekunden ÷ 100 Sekunden Schleife = 648 Ausspielungen. */
export const ausspielungenProTag =
  (produkt.betriebStunden * 3600) / produkt.schleifeSekunden;

/** Die Rechnung in Einzelschritten – wird auf der Seite ausgeschrieben. */
export const schleifenrechnung = [
  {
    formel: `${produkt.spotSekunden} s`,
    erklaerung: 'Ein Spot',
  },
  {
    formel: `× ${produkt.slotsGesamt}`,
    erklaerung: 'Plätze in der Schleife',
  },
  {
    formel: `= ${produkt.schleifeSekunden} s`,
    erklaerung: 'Ein kompletter Durchlauf',
  },
  {
    formel: `${produkt.betriebStunden} h = 64.800 s`,
    erklaerung: `Betriebszeit ${produkt.betriebVon}–${produkt.betriebBis} Uhr`,
  },
  {
    formel: `64.800 ÷ ${produkt.schleifeSekunden} = ${ausspielungenProTag}`,
    erklaerung: 'Ausspielungen pro Tag und Kunde',
  },
] as const;

/* ------------------------------------------------------------------
   4 · Die Schleife als Grafik
   Reihenfolge und Belegung der zehn Plätze. 'frei' = verkäuflich,
   'partner' = fester Platz des Standortpartners, 'ohvera' = eigener Platz.
------------------------------------------------------------------- */

export type SlotTyp = 'frei' | 'partner' | 'ohvera';

export const schleifenSlots: { nummer: number; typ: SlotTyp }[] = [
  { nummer: 1, typ: 'frei' },
  { nummer: 2, typ: 'frei' },
  { nummer: 3, typ: 'frei' },
  { nummer: 4, typ: 'frei' },
  { nummer: 5, typ: 'ohvera' },
  { nummer: 6, typ: 'frei' },
  { nummer: 7, typ: 'frei' },
  { nummer: 8, typ: 'frei' },
  { nummer: 9, typ: 'frei' },
  { nummer: 10, typ: 'partner' },
];

export const slotBeschriftung: Record<SlotTyp, string> = {
  frei: 'frei',
  partner: 'reserviert',
  ohvera: 'reserviert',
};

export const slotErklaerung: Record<SlotTyp, string> = {
  frei: 'Buchbarer Werbeplatz',
  partner: 'Fester Platz des Standortpartners',
  ohvera: 'Fester Platz von OHVERA',
};

/* ------------------------------------------------------------------
   5 · Die Pakete
   Preise ohne Umsatzsteuerausweis (Kleinunternehmerregelung § 19 UStG).
   Alle Pakete sind monatlich kündbar.
------------------------------------------------------------------- */

export type Paket = {
  id: string;
  name: string;
  preis: number | null;
  preisZusatz: string;
  einzeiler: string;
  /** Eine Zeile Entscheidungshilfe: Für wen ist dieses Paket gedacht? */
  fuerWen: string;
  merkmale: { text: string; hervorgehoben?: boolean }[];
  laufzeit: string;
  empfohlen?: boolean;
  buchbar: boolean;
  hinweis?: string;
};

export const pakete: Paket[] = [
  {
    id: 'basis',
    name: 'BASIS',
    preis: 49,
    preisZusatz: '€ / Monat',
    einzeiler: 'Ein Motiv, ein Platz, laufend im Schaufenster.',
    fuerWen: 'Für dich, wenn dein Angebot bleibt, wie es ist.',
    merkmale: [
      { text: '1 Werbemotiv, von OHVERA gestaltet' },
      { text: '1× im Monat tauschbar' },
      { text: `${ausspielungenProTag} Ausspielungen pro Tag` },
      { text: 'Ausspielnachweis am Monatsende' },
    ],
    laufzeit: 'Monatlich kündbar, keine Mindestlaufzeit',
    buchbar: true,
  },
  {
    id: 'plus',
    name: 'PLUS',
    preis: 89,
    preisZusatz: '€ / Monat',
    einzeiler: 'Drei Motive, die sich in der Schleife abwechseln.',
    fuerWen: 'Für dich, wenn du mehrere Dinge gleichzeitig zeigen willst.',
    merkmale: [
      { text: '3 Werbemotive, von OHVERA gestaltet' },
      { text: 'Motive wechseln sich automatisch in der Schleife ab' },
      { text: 'Alle Motive zusätzlich als Datei für Instagram-Story und WhatsApp-Status' },
      { text: 'Ausspielnachweis am Monatsende' },
    ],
    laufzeit: 'Monatlich kündbar, keine Mindestlaufzeit',
    buchbar: true,
  },
  {
    id: 'pro',
    name: 'PRO',
    preis: 99,
    preisZusatz: '€ / Monat',
    einzeiler: 'Wöchentlich neues Motiv — und deine Branche bleibt draußen.',
    fuerWen: 'Für dich, wenn sich dein Angebot oft ändert — oder die Konkurrenz nah ist.',
    merkmale: [
      { text: '5 Werbemotive, von OHVERA gestaltet' },
      {
        text: 'Wöchentlicher Motivwechsel auf Zuruf — Anfrage bis Donnerstag, live am Montag',
        hervorgehoben: true,
      },
      { text: 'Alle Motive zusätzlich für Instagram-Story und WhatsApp-Status' },
      {
        text: 'Branchenexklusivität auf diesem Bildschirm — solange gebucht, wirbt dort kein zweiter Betrieb derselben Branche',
        hervorgehoben: true,
      },
      { text: 'Ausspielnachweis am Monatsende' },
    ],
    laufzeit: 'Monatlich kündbar, keine Mindestlaufzeit',
    empfohlen: true,
    buchbar: true,
  },
  {
    id: 'network',
    name: 'NETWORK',
    preis: null,
    preisZusatz: '',
    einzeiler: 'Ein Motiv auf mehreren Bildschirmen gleichzeitig.',
    fuerWen: 'Für später, wenn es mehr als einen Standort gibt.',
    merkmale: [
      { text: 'Ausspielung an mehreren Standorten' },
      { text: 'Ein gemeinsamer Ausspielnachweis' },
    ],
    laufzeit: '',
    buchbar: false,
    hinweis: 'Ab mehreren Standorten verfügbar — in Vorbereitung',
  },
];

/** Vier Sätze, die die häufigsten Bedenken vorwegnehmen.
    Alle vier sind Zusagen, die ohnehin gelten — hier stehen sie nur dort,
    wo der Kunde über den Preis nachdenkt. */
export const sicherheiten = [
  {
    titel: 'Keine Mindestlaufzeit',
    text: 'Monatlich kündbar. Bringt es dir nichts, hörst du zum Monatsende auf.',
  },
  {
    titel: 'Kein Werbematerial nötig',
    text: 'Logo, ein Foto, ein Satz — den Rest gestalten wir. In jedem Paket enthalten.',
  },
  {
    titel: 'Die Motive gehören dir',
    text: 'Auch nach der Kampagne. Instagram, Schaufenster, gedruckt — wie du willst.',
  },
  {
    titel: 'Ausfall wird ausgeglichen',
    text: 'Steht der Bildschirm länger als 24 Stunden, verlängert sich deine Laufzeit tagesgenau.',
  },
];

/** Der Preis, heruntergebrochen. Reine Division — keine Aussage darüber,
    was die Werbung bringt oder wie viele Menschen sie sehen. */
export const kostenrechnung = {
  titel: 'Was 49 € im Monat bedeuten',
  zeilen: [
    { bezeichnung: 'Im Monat', wert: '49 €' },
    { bezeichnung: 'Am Tag', wert: '1,63 €' },
    { bezeichnung: 'Je Ausspielung', wert: '0,25 Cent' },
  ],
  hinweis:
    'Das ist geteilt, nicht gemessen: 49 € ÷ 30 Tage ÷ 648 Ausspielungen. Es sagt, was ein Durchlauf kostet — nicht, wer ihn sieht.',
};

/** Steht direkt unter den Paketkarten. */
export const paketHinweise = {
  preis:
    'Alle Preise pro Monat. Kein Ausweis von Umsatzsteuer gemäß § 19 UStG (Kleinunternehmerregelung).',
  pilotpreis:
    'Pilotpreis — für die ersten Kunden 12 Monate garantiert, auch wenn weitere Standorte dazukommen.',
  exklusivitaet:
    'Branchenexklusivität gilt jeweils für den gebuchten Bildschirm, nicht für das gesamte Netz.',
};

/** Zusagen, die unabhängig vom Paket gelten. */
export const zusagen = [
  {
    titel: 'Die Motive gehören dir',
    text: 'Alle Motive gehen in dein Eigentum über und dürfen frei weiterverwendet werden — auch nach Ende der Kampagne.',
  },
  {
    titel: 'Ausfall wird ausgeglichen',
    text: 'Bei einem Ausfall über 24 Stunden verlängert sich deine Laufzeit tagesgenau. Ohne Antrag, ohne Diskussion.',
  },
  {
    titel: 'Ein Kunde, ein Platz',
    text: `Jeder Kunde belegt genau einen der ${produkt.slotsVerkaeuflich} verkäuflichen Plätze. Niemand kauft sich die Schleife voll.`,
  },
  {
    titel: 'Exklusivität immer pro Bildschirm',
    text: 'Branchenexklusivität gilt immer nur für den gebuchten Bildschirm, nie netzweit.',
  },
];

/* ------------------------------------------------------------------
   6 · Standorte
   Hier steht ausschließlich, was es wirklich gibt. Der Pilotstandort
   wird NICHT namentlich genannt — er ist bisher nur mündlich zugesagt.
------------------------------------------------------------------- */

export type Standort = {
  id: string;
  titel: string;
  ort: string;
  status: 'in-vorbereitung' | 'live';
  statusText: string;
  zeilen: { bezeichnung: string; wert: string }[];
  cta?: { text: string; ziel: string };
};

export const standorte: Standort[] = [
  {
    id: 'haren-innenstadt',
    titel: 'Haren (Ems) — Schaufenster, Innenstadt',
    ort: 'Haren (Ems)',
    status: 'in-vorbereitung',
    statusText: 'In Vorbereitung',
    zeilen: [
      { bezeichnung: 'Format', wert: `Hochformat ${produkt.formatBreite} × ${produkt.formatHoehe}` },
      { bezeichnung: 'Betriebszeit', wert: `${produkt.betriebVon}–${produkt.betriebBis} Uhr` },
      {
        bezeichnung: 'Belegung',
        wert: `${produkt.slotsVerkaeuflich} von ${produkt.slotsVerkaeuflich} Plätzen frei`,
      },
    ],
    cta: { text: 'Platz sichern', ziel: '/kampagne-starten' },
  },
];

export const standortHinweis =
  'Weitere Standorte in Haren, Meppen und Lingen sind geplant. Hier steht nur, was es wirklich gibt.';

/* ------------------------------------------------------------------
   7 · Referenzen
   Bleibt leer, bis echte Gründungskunden schriftlich zugestimmt haben.
   Solange das Array leer ist, wird der Abschnitt NICHT gerendert.
   Eintragen genügt — es muss kein Code angefasst werden.
------------------------------------------------------------------- */

export type Referenz = {
  /** Pfad zu einer Bilddatei im Ordner public/, z. B. '/referenzen/betrieb.svg' */
  logo?: string;
  zitat: string;
  betrieb: string;
  ort: string;
};

export const referenzen: Referenz[] = [];

/* ------------------------------------------------------------------
   8 · Navigation
------------------------------------------------------------------- */

export const navigation = {
  hauptmenue: [
    { text: 'Werben', ziel: '/werben' },
    { text: 'Standorte', ziel: '/standorte' },
    { text: 'Für Standortpartner', ziel: '/standortpartner' },
    { text: "So funktioniert's", ziel: '/so-funktionierts' },
    { text: 'Kontakt', ziel: '/kontakt' },
  ],
  hauptCta: { text: 'Werbung schalten', ziel: '/kampagne-starten' },
  zweitCta: { text: 'Standortpartner werden', ziel: '/standortpartner' },
  rechtliches: [
    { text: 'Impressum', ziel: '/impressum' },
    { text: 'Datenschutz', ziel: '/datenschutz' },
  ],
};

/* ------------------------------------------------------------------
   9 · Startseite
------------------------------------------------------------------- */

export const startseite = {
  /* 9.1 Hero ----------------------------------------------------- */
  hero: {
    h1: 'Werbung, die vor Ort gesehen wird.',
    unterzeile:
      'OHVERA bringt lokale Unternehmen auf digitale Werbedisplays in Schaufenstern — dort, wo ihre Kunden jeden Tag vorbeigehen. Erster Standort in Haren (Ems), in Vorbereitung.',
    ctaPrimaer: { text: 'Werbung schalten', ziel: '/kampagne-starten' },
    ctaSekundaer: { text: "So funktioniert's", ziel: '/so-funktionierts' },
    /* Bewusst rein qualitativ — keine Zahlen, keine Reichweite. */
    vertrauenszeile: [
      'Gestaltung inklusive',
      'Ausspielung wird nachgewiesen',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    /* Preis direkt im Hero: Wer den Preis nicht findet, fragt nicht nach —
       er geht. */
    preisanker: {
      ab: 'Ab 49 € im Monat',
      zusatz: 'Gestaltung inklusive. Monatlich kündbar.',
    },
  },

  /* 9.1b Auf einen Blick — beantwortet „Was kaufe ich eigentlich?"
     in fünf Zahlen, direkt unter dem Hero. */
  aufEinenBlick: {
    titel: 'Was du buchst, in Zahlen',
    hinweis:
      'Das sind Angaben zur Technik und zur Schleife — keine Reichweite. Wie viele Menschen vorbeigehen, messen wir nicht.',
    zahlen: [
      { wert: 10, einheit: 'Sekunden', bezeichnung: 'läuft dein Spot je Durchlauf' },
      { wert: ausspielungenProTag, einheit: 'Mal am Tag', bezeichnung: 'wird er ausgespielt' },
      { wert: 18, einheit: 'Stunden', bezeichnung: 'Betrieb, 07:00 bis 01:00 Uhr' },
      { wert: 8, einheit: 'von 10 Plätzen', bezeichnung: 'sind überhaupt verkäuflich' },
      { wert: 1, einheit: 'Ansprechpartner', bezeichnung: 'den du persönlich erreichst' },
    ],
  },

  /* 9.2 Problem -------------------------------------------------- */
  problem: {
    h2: 'Dein Flyer ist gedruckt. Dein Angebot nicht.',
    punkte: [
      {
        titel: 'Gedrucktes ist festgelegt.',
        text: 'Neue Aktion heißt neuer Druck — und der alte Stapel wandert in den Müll.',
      },
      {
        titel: 'Social Media erreicht, wer dir schon folgt.',
        text: 'Wer dich noch nicht kennt, sieht dich dort nicht.',
      },
      {
        titel: 'Große Außenwerbung ist nicht für dich gemacht.',
        text: 'Mindestbuchungen im vierstelligen Bereich, Buchungswege über Agenturen.',
      },
    ],
  },

  /* 9.3 So funktioniert's ---------------------------------------- */
  ablauf: {
    h2: "So funktioniert's.",
    unterzeile:
      'Vier Schritte. Mehr als Schritt 1 musst du nicht selbst machen.',
    schritte: [
      {
        marke: 'Heute',
        titel: 'Du sagst, was beworben werden soll.',
        text: 'Logo, ein gutes Foto, ein Satz zum Angebot. Per WhatsApp reicht.',
      },
      {
        marke: 'Wenige Tage später',
        titel: 'Wir gestalten dein Motiv.',
        text: 'Fertig in wenigen Tagen, eine Korrekturrunde inklusive.',
      },
      {
        marke: 'Sobald du freigibst',
        titel: 'Dein Spot läuft.',
        text: `${produkt.spotSekunden} Sekunden, ${ausspielungenProTag} Mal am Tag, von 7 Uhr morgens bis 1 Uhr nachts.`,
      },
      {
        marke: 'Am Monatsende',
        titel: 'Du bekommst den Nachweis.',
        text: 'Ausspielprotokoll am Monatsende — und du kannst jederzeit selbst vorbeigehen.',
      },
    ],
  },

  /* 9.4 Kreativservice ------------------------------------------- */
  kreativ: {
    h2: 'Die Werbung machen wir.',
    text: 'Die meisten kleinen Betriebe haben keine Designabteilung und keine Zeit, sich eine zu suchen. Deshalb ist die Gestaltung in jedem Paket enthalten — nicht als Aufpreis. Zwei Designer arbeiten bei uns an nichts anderem. Du schickst uns Logo, ein Foto und dein Angebot, den Rest übernehmen wir. Das fertige Motiv gehört dir und darfst du überall weiterverwenden: Instagram, dein eigenes Schaufenster, WhatsApp-Status.',
  },

  /* 9.4b So sieht es aus ----------------------------------------- */
  schaufenster: {
    h2: 'So sieht deine Werbung im Schaufenster aus.',
    bildunterschrift: 'Visualisierung. Der erste Standort ist in Vorbereitung.',
    motiveTitel: 'Die Motive einzeln',
    motiveText:
      'Vier Beispiele im Format Hochformat — so groß, dass man sie aus einigen Metern Entfernung noch lesen kann.',
    abschlusssatz: 'So ein Motiv erstellen wir für dich — in jedem Paket enthalten.',
    kennzeichnung: 'Beispielgestaltung',
  },

  /* 9.5 Pakete --------------------------------------------------- */
  paketeAbschnitt: {
    h2: 'Drei Pakete. Gestaltung immer inklusive.',
  },

  /* 9.6 Standorte ------------------------------------------------ */
  standorteAbschnitt: {
    h2: 'Wo deine Werbung läuft.',
  },

  /* 9.7 Warum OHVERA --------------------------------------------- */
  versprechen: {
    h2: 'Was wir versprechen — und was nicht.',
    ja: {
      titel: 'Das bekommst du:',
      punkte: [
        'Einen echten, benannten Standort',
        'Eine feste Ausspielfrequenz, die du nachrechnen kannst',
        'Gestaltung durch unsere Designer, in jedem Paket',
        'Ein Ausspielprotokoll am Monatsende',
        'Tagesgenaue Verlängerung bei Ausfall',
        'Einen festen Ansprechpartner, den du persönlich erreichst',
      ],
    },
    nein: {
      titel: 'Das versprechen wir nicht:',
      punkte: [
        'Keine Reichweitenzahlen. Wir messen nicht, wie viele Menschen vorbeigehen — also behaupten wir es auch nicht.',
        'Keine Umsatzversprechen. Was Werbung dir bringt, wissen wir nicht.',
        'Keine erfundenen Kunden oder Bewertungen.',
        'Keine Standorte, die es nicht gibt.',
      ],
    },
  },

  /* 9.7b Wer dahintersteht ---------------------------------------
     Ersetzt das, was auf anderen Websites die Kundenlogos wären.
     Bewusst nur Rollen — keine erfundenen Namen, keine erfundenen
     Lebensläufe. Wer namentlich genannt wird, hat dem zugestimmt. */
  person: {
    h2: 'Hinter OHVERA stehen vier Menschen.',
    text: 'Zwei von uns gestalten, zwei sind im Vertrieb unterwegs. Gegründet hat OHVERA Haroon Mishkoo — er arbeitet als Friseur in Haren und kennt die Betriebe hier persönlich. Wir starten mit einem Bildschirm, nicht mit einem Netzwerk, weil wir es erst beweisen wollen, bevor wir es verkaufen. Wenn etwas nicht läuft, rufst du keine Hotline an. Du rufst deinen Ansprechpartner an.',
    rollen: [
      {
        anzahl: '2',
        titel: 'Gestaltung',
        text: 'Zwei Designer machen nichts anderes als die Werbemotive. Deshalb ist Gestaltung bei uns kein Aufpreis, sondern der Kern des Angebots.',
      },
      {
        anzahl: '2',
        titel: 'Vor Ort',
        text: 'Zwei sind im Vertrieb unterwegs, sprechen mit Betrieben und schauen sich Schaufenster an. Wer bucht, bekommt einen festen Ansprechpartner aus diesem Team.',
      },
    ],
    /* Kein Stockfoto und keine KI-Person als Übergangslösung.
       Solange hier ein Platzhalter steht, zeigt die Seite eine leere Fläche. */
    fotoPlatzhalter: '[FOTO HAROON EINFÜGEN]',
    fotoUnterschrift: 'Haroon Mishkoo, Gründer',
    fotoPfad: '',
  },

  /* 9.8 Standortpartner ------------------------------------------ */
  partner: {
    h2: 'Du hast ein Schaufenster. Wir haben den Bildschirm.',
    text: 'Wir installieren und betreiben den Bildschirm auf eigene Kosten und kümmern uns um Technik, Inhalte und Vermarktung. Du stellst die Fläche und den Strom. Dafür bekommst du einen eigenen festen Werbeplatz in der Schleife — dauerhaft und kostenlos.',
    cta: { text: 'Standortpartner werden', ziel: '/standortpartner' },
  },

  /* 9.9 FAQ-Überschrift ------------------------------------------ */
  faqAbschnitt: {
    h2: 'Fragen, die uns gestellt werden.',
    unterzeile: 'Alles, was Kunden vor der ersten Buchung wissen wollen.',
    abschlussTitel: 'Deine Frage ist nicht dabei?',
    abschlussText:
      'Dann schreib sie uns. Es gibt keine Hotline und kein Ticketsystem — du bekommst die Antwort von deinem Ansprechpartner, meistens noch am selben Tag.',
  },

  /* 9.10 Abschluss ----------------------------------------------- */
  abschluss: {
    h2: 'Zwei Wege.',
    karten: [
      {
        titel: 'Ich möchte werben',
        text: 'Du hast einen Betrieb und willst vor Ort sichtbar sein. Fünf kurze Fragen, dann melden wir uns.',
        cta: { text: 'Kampagne starten', ziel: '/kampagne-starten' },
      },
      {
        titel: 'Ich habe eine Fläche',
        text: 'Du hast ein Schaufenster in Haren, Meppen oder Lingen. Wir schauen sie uns an.',
        cta: { text: 'Standortpartner werden', ziel: '/standortpartner' },
      },
    ],
  },
};

/* ------------------------------------------------------------------
   10 · Beispielmotive für den Abschnitt „So sieht es aus"
   Bewusst neutrale Betriebsbezeichnungen: keine echten Firmennamen,
   keine echten Marken, keine nachgebauten Logos.
------------------------------------------------------------------- */

export type Beispielmotiv = {
  id: string;
  /** Steuert das Layout der Motivkarte: dunkel, hell oder blau */
  variante: 'dunkel' | 'hell' | 'blau';
  branche: string;
  /** Neutrale Bezeichnung in der Logo-Fläche — nie ein echter Firmenname */
  logoWort: string;
  kicker: string;
  headline: string;
  angebot: string;
  details: string[];
  kontaktzeile: string;
  /** Fläche für QR-Code oder Kontaktangabe */
  aktion: string;
};

export const beispielmotive: Beispielmotiv[] = [
  {
    id: 'handwerk',
    variante: 'dunkel',
    branche: 'Handwerksbetrieb, Stellenanzeige',
    logoWort: 'Dachdeckerei',
    kicker: 'Wir stellen ein',
    headline: 'Wir suchen einen Dachdecker',
    angebot: 'Festanstellung, unbefristet',
    details: ['Geselle oder Meister', 'Firmenwagen ab Tag eins', 'Keine Montage, alles regional'],
    kontaktzeile: 'Bewerbung per WhatsApp genügt',
    aktion: 'QR scannen',
  },
  {
    id: 'restaurant',
    variante: 'blau',
    branche: 'Restaurant, Mittagsangebot',
    logoWort: 'Restaurant',
    kicker: 'Mittagstisch',
    headline: 'Jeden Mittag frisch gekocht',
    angebot: '9,90 €',
    details: ['Montag bis Freitag', '11:30 – 14:30 Uhr', 'Wechselnde Gerichte, auch vegetarisch'],
    kontaktzeile: 'Ohne Reservierung — einfach reinkommen',
    aktion: 'Speisekarte per QR',
  },
  {
    id: 'autohaus',
    variante: 'hell',
    branche: 'Autohaus, Saisonaktion',
    logoWort: 'Autohaus',
    kicker: 'Saisonaktion',
    headline: 'Wintercheck für 29 €',
    angebot: 'Bremsen, Batterie, Reifen, Licht',
    details: ['Termin innerhalb einer Woche', 'Ersatzwagen auf Wunsch', 'Alle Marken'],
    kontaktzeile: 'Termin telefonisch oder online',
    aktion: 'QR scannen',
  },
  {
    id: 'immobilien',
    variante: 'dunkel',
    branche: 'Immobilienbüro, ein Objekt',
    logoWort: 'Immobilienbüro',
    kicker: 'Zu verkaufen',
    headline: 'Einfamilienhaus mit Garten',
    angebot: '4 Zimmer · 128 m² · Baujahr 1998',
    details: ['Ruhige Lage', 'Garage und Carport', 'Frei ab Frühjahr'],
    kontaktzeile: 'Besichtigung nach Vereinbarung',
    aktion: 'Exposé per QR',
  },
];

/* ------------------------------------------------------------------
   11 · FAQ
   Erscheint als Akkordeon auf der Startseite und als strukturierte
   Daten (FAQPage) in der Suchmaschine.
------------------------------------------------------------------- */

export const faq: { frage: string; antwort: string }[] = [
  {
    frage: 'Wie viele Menschen sehen meine Werbung?',
    antwort: `Das können wir dir nicht sagen, weil wir es nicht messen — und wer dir eine Zahl nennt, hat sie meistens auch nicht gemessen. Was feststeht: Dein Spot läuft ${ausspielungenProTag} Mal am Tag, ${produkt.betriebStunden} Stunden lang, an einem Schaufenster in der Innenstadt. Wie viel dort los ist, kannst du als Ortskundiger besser einschätzen als jede Statistik.`,
  },
  {
    frage: 'Was kostet eine Kampagne?',
    antwort:
      'Ab 49 € im Monat inklusive Gestaltung. Drei Pakete, alle Preise stehen auf dieser Seite.',
  },
  {
    frage: 'Wie lange bin ich gebunden?',
    antwort:
      'Nicht länger als einen Monat. Alle drei Pakete laufen monatlich und sind zum Monatsende kündbar — keine Mindestlaufzeit, keine Jahresbindung. Auch bei PLUS und PRO nicht, obwohl wir dafür mehrere Motive gestalten.',
  },
  {
    frage: 'Ich habe kein Werbematerial. Geht das trotzdem?',
    antwort:
      'Ja, das ist der Normalfall. Gestaltung ist in jedem Paket enthalten. Wir brauchen dein Logo, ein bis zwei gute Fotos und einen Satz, was beworben werden soll.',
  },
  {
    frage: 'Kann ich das Motiv während der Laufzeit ändern?',
    antwort:
      'Bei BASIS einmal im Monat. Bei PLUS wechseln drei Motive automatisch. Bei PRO jede Woche auf Zuruf — Anfrage bis Donnerstag, ab Montag läuft es.',
  },
  {
    frage: 'Was passiert, wenn der Bildschirm ausfällt?',
    antwort:
      'Bei einem Ausfall über 24 Stunden verlängert sich deine Laufzeit tagesgenau. Ohne Antrag, ohne Diskussion.',
  },
  {
    frage: 'Wie wird die Ausspielung nachgewiesen?',
    antwort:
      'Du bekommst am Monatsende ein Protokoll aus dem Ausspielsystem und ein aktuelles Foto vom laufenden Bildschirm.',
  },
  {
    frage: 'Was heißt Branchenexklusivität?',
    antwort:
      'Im PRO-Paket sperren wir deine Branche auf dem gebuchten Bildschirm. Solange du buchst, wirbt dort kein zweiter Betrieb aus deinem Bereich. Die Sperre gilt für diesen Bildschirm, nicht für das ganze Netz.',
  },
  {
    frage: 'Kann ich die Motive auch woanders verwenden?',
    antwort:
      'Ja. Alle Motive gehen in dein Eigentum über. Du kannst sie für Social Media, dein eigenes Schaufenster oder gedruckt weiterverwenden — auch nach Ende der Kampagne.',
  },
  {
    frage: 'Wie werde ich Standortpartner?',
    antwort:
      'Über das Formular auf der Standortpartner-Seite. Wir schauen uns die Fläche an, und wenn sie passt, halten wir alles schriftlich fest, bevor irgendetwas installiert wird.',
  },
];

/* ------------------------------------------------------------------
   12 · Unterseiten
------------------------------------------------------------------- */

export const seiteWerben = {
  eyebrow: 'Für Werbekunden',
  h1: 'Ein Platz in der Schleife. Gestaltung inklusive.',
  einleitung: `Zehn Plätze hat die Schleife, ${produkt.slotsVerkaeuflich} davon sind buchbar. Jeder Kunde belegt genau einen. Was du buchst, ist kein Werbeplatz irgendwo, sondern ein fester Platz auf einem konkreten Bildschirm — mit einer Frequenz, die du nachrechnen kannst.`,
  ablaufTitel: 'Von der Anfrage bis zum ersten Spot',
  vergleichTitel: 'Die Pakete im Vergleich',
  vergleichZeilen: [
    { merkmal: 'Werbemotive, von uns gestaltet', basis: '1', plus: '3', pro: '5' },
    { merkmal: 'Motivwechsel', basis: '1× im Monat', plus: 'automatisch in der Schleife', pro: 'wöchentlich auf Zuruf' },
    { merkmal: 'Ausspielungen pro Tag', basis: String(ausspielungenProTag), plus: String(ausspielungenProTag), pro: String(ausspielungenProTag) },
    { merkmal: 'Dateien für Instagram und WhatsApp', basis: '—', plus: 'ja', pro: 'ja' },
    { merkmal: 'Branchenexklusivität auf dem Bildschirm', basis: '—', plus: '—', pro: 'ja' },
    { merkmal: 'Ausspielnachweis', basis: 'ja', plus: 'ja', pro: 'ja' },
    { merkmal: 'Laufzeit', basis: 'monatlich kündbar', plus: 'monatlich kündbar', pro: 'monatlich kündbar' },
  ],
  zusagenTitel: 'Was in jedem Paket gilt',
};

export const seiteStandorte = {
  eyebrow: 'Standorte',
  h1: 'Ein Bildschirm. Ehrlich aufgeführt.',
  einleitung:
    'OHVERA startet mit einem Standort. Solange das so ist, gibt es hier keine Karte, keine Marker und keine Filter — das wäre Fassade.',
  geplantTitel: 'Was geplant ist',
  geplantText:
    'Nach dem ersten Bildschirm folgen schrittweise weitere Standorte in Haren, Meppen und Lingen. Sobald einer davon feststeht, steht er hier — vorher nicht.',
  partnerHinweis:
    'Du hast selbst ein Schaufenster in einer dieser Städte? Dann ist der nächste Standort vielleicht deiner.',
};

export const seiteStandortpartner = {
  eyebrow: 'Für Standortpartner',
  h1: 'Du hast ein Schaufenster. Wir haben den Bildschirm.',
  einleitung:
    'Wir installieren und betreiben den Bildschirm auf eigene Kosten und kümmern uns um Technik, Inhalte und Vermarktung. Du stellst die Fläche und den Strom.',
  gegenleistungTitel: 'Was du bekommst',
  gegenleistung: [
    {
      titel: 'Ein eigener fester Werbeplatz',
      text: 'Ein Platz in der Schleife gehört dauerhaft dir — für dein eigenes Geschäft, kostenlos, solange der Bildschirm bei dir steht.',
    },
    {
      titel: 'Keine Kosten, kein Aufwand',
      text: 'Gerät, Montage, Wartung, Inhalte und Vermarktung übernehmen wir. Du musst dich um nichts kümmern.',
    },
    {
      titel: 'Ein moderner Blickfang',
      text: 'Ein hochformatiger Bildschirm im Schaufenster fällt auf — auch außerhalb deiner Öffnungszeiten.',
    },
    {
      titel: 'Alles schriftlich',
      text: 'Bevor irgendetwas installiert wird, halten wir Laufzeit, Stromkosten und Kündigung schriftlich fest.',
    },
  ],
  vorausTitel: 'Was die Fläche mitbringen sollte',
  voraussetzungen: [
    'Ein Schaufenster mit Blick auf eine Straße oder einen Gehweg, an dem Menschen vorbeikommen',
    'Eine Steckdose in Fensternähe',
    'Ungefähr 60 × 110 cm Platz im Fenster für ein Gerät im Hochformat',
    'WLAN wäre gut, ist aber kein Muss — Mobilfunk geht auch',
  ],
  ablaufTitel: 'Wie es abläuft',
  ablauf: [
    { titel: 'Du meldest dich', text: 'Über das Formular unten. Fotos vom Fenster helfen uns sehr.' },
    { titel: 'Wir schauen uns die Fläche an', text: 'Vor Ort, unverbindlich und ohne Verkaufsgespräch.' },
    { titel: 'Wir halten es schriftlich fest', text: 'Laufzeit, Strom, Kündigung, dein fester Werbeplatz.' },
    { titel: 'Wir installieren und übernehmen den Rest', text: 'Aufbau, Einrichtung, Inhalte und Vermarktung liegen bei uns.' },
  ],
  formularTitel: 'Fläche anbieten',
  formularEinleitung:
    'Je genauer die Angaben, desto besser können wir einschätzen, ob die Fläche passt. Die Ausrichtung des Fensters ist dabei wichtiger, als sie klingt: Sie entscheidet über die nötige Helligkeit des Geräts.',
};

export const seiteSoFunktionierts = {
  eyebrow: "So funktioniert's",
  h1: 'Zwei Wege durch dasselbe System.',
  einleitung:
    'OHVERA verbindet zwei Seiten: Betriebe, die werben wollen, und Ladenbesitzer, die ein Schaufenster haben. Beide Wege stehen hier getrennt.',
  technikTitel: 'Die Technik dahinter',
  technik: [
    {
      titel: 'Ein Gerät im Hochformat',
      text: `Ein Profi-Bildschirm im Format ${produkt.formatBreite} × ${produkt.formatHoehe} Pixel, hell genug für den Blick von der Straße, hinter der Fensterscheibe montiert.`,
    },
    {
      titel: 'Ferngesteuerte Ausspielung',
      text: 'Die Motive liegen in einem Ausspielsystem. Wir tauschen sie aus der Ferne — ohne dass jemand vor Ort etwas tun muss.',
    },
    {
      titel: 'Feste Schleife statt Zufall',
      text: `${produkt.slotsGesamt} Plätze zu je ${produkt.spotSekunden} Sekunden, immer in derselben Reihenfolge. Kein Bieterverfahren, keine schwankende Ausspielung.`,
    },
    {
      titel: 'Protokoll statt Behauptung',
      text: 'Das System schreibt mit, was wann gelaufen ist. Daraus entsteht der Nachweis am Monatsende.',
    },
  ],
  rechnungTitel: 'Die Rechnung, offen hingelegt',
  rechnungHinweis:
    'Das ist die geplante Schleifenlogik, kein gemessenes Ergebnis. Sie sagt, wie oft dein Spot läuft — nicht, wie viele Menschen ihn sehen.',
};

export const seiteKontakt = {
  eyebrow: 'Kontakt',
  h1: 'Du erreichst uns direkt.',
  einleitung:
    'Keine Hotline, kein Ticketsystem, keine Warteschleife. Du hast einen festen Ansprechpartner — und wenn der gerade nicht rangeht, ruft er zurück.',
  wegeTitel: 'Kontaktwege',
  formularTitel: 'Oder schreib uns hier',
  formularEinleitung:
    'Für alles, was keine komplette Kampagnenanfrage ist. Für eine Kampagne führt dich das mehrstufige Formular schneller ans Ziel.',
};

/* ------------------------------------------------------------------
   13 · Formular „Kampagne starten"
   Fünf Schritte, ein Schritt pro Ansicht.
------------------------------------------------------------------- */

export const kampagnenformular = {
  eyebrow: 'Kampagne starten',
  h1: 'Fünf Fragen, dann melden wir uns.',
  einleitung:
    'Das Formular dauert etwa zwei Minuten. Es ist unverbindlich — es entsteht keine Buchung und keine Kostenpflicht.',
  schritte: [
    {
      id: 'ziel',
      frage: 'Was möchtest du bewerben?',
      optionen: [
        'Mein Unternehmen',
        'Ein Angebot oder eine Aktion',
        'Eine Veranstaltung',
        'Eine offene Stelle',
        'Eine Eröffnung',
        'Sonstiges',
      ],
    },
    {
      id: 'paket',
      frage: 'Welches Paket interessiert dich?',
      optionen: ['BASIS', 'PLUS', 'PRO', 'Noch unsicher'],
    },
    {
      id: 'start',
      frage: 'Wann soll es losgehen?',
      optionen: [
        'So früh wie möglich',
        'Innerhalb eines Monats',
        'Später',
        'Noch unsicher',
      ],
    },
    {
      id: 'material',
      frage: 'Hast du Material?',
      optionen: [
        'Logo und Fotos vorhanden',
        'Nur Logo',
        'Nichts davon — bitte komplett gestalten',
      ],
    },
  ],
  kontaktschritt: {
    frage: 'Wie erreiche ich dich?',
    hinweisBranche:
      'Die Branche brauchen wir, um die Branchenexklusivität auf dem Bildschirm zu prüfen.',
  },
  erfolg: {
    h1: 'Angekommen. Danke.',
    text: 'Deine Anfrage liegt bei uns.',
    schritte: [
      'Dein Ansprechpartner meldet sich innerhalb von zwei Werktagen — per E-Mail oder Telefon, wie du es angegeben hast.',
      'Wir klären kurz, was beworben werden soll und ob dein Wunschplatz frei ist.',
      'Erst danach entsteht ein Angebot. Mit dieser Anfrage hast du nichts gebucht und nichts bezahlt.',
    ],
  },
};

/* ------------------------------------------------------------------
   14 · Standortpartner-Formular
------------------------------------------------------------------- */

export const partnerformular = {
  standortarten: [
    'Einzelhandel',
    'Gastronomie',
    'Dienstleistung / Büro',
    'Friseur / Kosmetik',
    'Leerstand',
    'Sonstiges',
  ],
  ausrichtungen: ['Nord', 'Ost', 'Süd', 'West', 'Weiß ich nicht'],
  jaNeinUnklar: ['Ja', 'Nein', 'Unklar'],
  jaNein: ['Ja', 'Nein'],
  uploadHinweis: 'Höchstens 3 Dateien, je 5 MB, als JPG, PNG oder HEIC.',
  erfolg: {
    h1: 'Danke — wir schauen uns die Fläche an.',
    text: 'Deine Anfrage liegt bei uns.',
    schritte: [
      'Wir melden uns innerhalb von zwei Werktagen bei dir.',
      'Wenn die Fläche grundsätzlich passt, kommen wir unverbindlich vorbei und schauen sie uns an.',
      'Erst wenn alles schriftlich festgehalten ist, wird etwas installiert.',
    ],
  },
};

/** Was auf der Dankeseite steht, wenn die Nachricht über WhatsApp oder
    das E-Mail-Programm vorbereitet wurde. Bewusst deutlich: Ohne den
    letzten Klick kommt nichts an. */
export const versandHinweis = {
  titel: 'Fast geschafft — ein Klick fehlt noch.',
  whatsapp:
    'WhatsApp hat sich mit deiner fertigen Nachricht geöffnet. Bei uns ist sie erst, wenn du dort auf Senden gedrückt hast. Falls sich nichts geöffnet hat, schreib uns einfach direkt.',
  email:
    'Dein E-Mail-Programm hat sich mit der fertigen Nachricht geöffnet. Bei uns ist sie erst, wenn du dort auf Senden gedrückt hast. Falls sich nichts geöffnet hat, schreib uns einfach direkt.',
};

/** Grenzwerte für den Foto-Upload — clientseitig geprüft. */
export const uploadRegeln = {
  maxDateien: 3,
  maxGroesseMB: 5,
  erlaubteTypen: ['image/jpeg', 'image/png', 'image/heic', 'image/heif'],
  erlaubteEndungen: ['.jpg', '.jpeg', '.png', '.heic', '.heif'],
};

/* ------------------------------------------------------------------
   15 · Footer
------------------------------------------------------------------- */

export const footer = {
  beschreibung:
    'OHVERA baut ein Netz digitaler Werbebildschirme in Schaufenstern lokaler Betriebe auf. Erster Standort in Haren (Ems), in Vorbereitung.',
  hinweis:
    'OHVERA ist im Aufbau. Auf dieser Website steht kein Kunde, keine Bewertung und keine Reichweitenzahl — weil es sie noch nicht gibt.',
};

/* ------------------------------------------------------------------
   16 · SEO — Titel und Beschreibung je Seite
------------------------------------------------------------------- */

export const seo: Record<
  string,
  { titel: string; beschreibung: string; pfad: string }
> = {
  start: {
    titel: 'OHVERA — Werbung, die vor Ort gesehen wird',
    beschreibung:
      'Digitale Werbedisplays in Schaufenstern lokaler Betriebe. Gestaltung inklusive, feste Ausspielfrequenz, Nachweis am Monatsende. Erster Standort in Haren (Ems), in Vorbereitung.',
    pfad: '/',
  },
  werben: {
    titel: 'Werbung schalten — Pakete und Preise | OHVERA',
    beschreibung: `Drei Pakete ab 49 € im Monat, Gestaltung immer inklusive. ${ausspielungenProTag} Ausspielungen pro Tag, monatlich kündbar.`,
    pfad: '/werben',
  },
  standorte: {
    titel: 'Standorte | OHVERA',
    beschreibung:
      'Der erste OHVERA-Bildschirm entsteht in Haren (Ems). Weitere Standorte in Haren, Meppen und Lingen sind geplant.',
    pfad: '/standorte',
  },
  standortpartner: {
    titel: 'Standortpartner werden | OHVERA',
    beschreibung:
      'Du hast ein Schaufenster, wir haben den Bildschirm. Installation und Betrieb auf unsere Kosten, ein fester Werbeplatz dauerhaft für dich.',
    pfad: '/standortpartner',
  },
  soFunktionierts: {
    titel: "So funktioniert's | OHVERA",
    beschreibung: `${produkt.slotsGesamt} Plätze zu je ${produkt.spotSekunden} Sekunden, ${produkt.schleifeSekunden} Sekunden Schleife, ${produkt.betriebStunden} Stunden am Tag. Die Schleifenlogik zum Nachrechnen.`,
    pfad: '/so-funktionierts',
  },
  kampagneStarten: {
    titel: 'Kampagne starten | OHVERA',
    beschreibung:
      'Unverbindliche Anfrage in fünf Schritten. Wir melden uns innerhalb von zwei Werktagen.',
    pfad: '/kampagne-starten',
  },
  kontakt: {
    titel: 'Kontakt | OHVERA',
    beschreibung:
      'Direkter Kontakt zum OHVERA-Team — per E-Mail, Telefon, WhatsApp oder Formular.',
    pfad: '/kontakt',
  },
  impressum: {
    titel: 'Impressum | OHVERA',
    beschreibung: 'Anbieterkennzeichnung nach § 5 DDG.',
    pfad: '/impressum',
  },
  datenschutz: {
    titel: 'Datenschutzerklärung | OHVERA',
    beschreibung: 'Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 DSGVO.',
    pfad: '/datenschutz',
  },
  danke: {
    titel: 'Danke für deine Anfrage | OHVERA',
    beschreibung: 'Deine Anfrage ist angekommen.',
    pfad: '/danke',
  },
};

/* ==================================================================
   17 · RECHTSTEXTE
   ------------------------------------------------------------------
   ⚠️  ACHTUNG: Beides ist ein GERÜST, kein geprüfter Rechtstext.
   Impressum und Datenschutzerklärung müssen VOR der Veröffentlichung
   von einer Rechtsanwältin oder einem Rechtsanwalt geprüft und an die
   tatsächlichen Verhältnisse angepasst werden (Rechtsform, Register,
   Hoster, Auftragsverarbeiter, tatsächliche Datenflüsse).
   Alle Platzhalter in eckigen Klammern müssen ersetzt werden.
   ================================================================== */

/** Ein Wort ändern genügt: Der Name taucht in der Datenschutzerklärung auf. */
export const hostinganbieter = '[HOSTING-ANBIETER EINTRAGEN]';

export const rechtshinweis =
  'Dieses Dokument ist ein Entwurf und muss vor der Veröffentlichung juristisch geprüft werden. Alle Angaben in eckigen Klammern sind noch einzutragen.';

export type Rechtsabschnitt = {
  titel: string;
  absaetze: string[];
  liste?: string[];
};

export const impressum: Rechtsabschnitt[] = [
  {
    titel: 'Angaben gemäß § 5 DDG',
    absaetze: [
      'OHVERA',
      'Einzelunternehmen, Inhaber: Haroon Mishkoo',
      '[STRASSE UND HAUSNUMMER EINTRAGEN]',
      '[PLZ UND ORT EINTRAGEN]',
      'Deutschland',
    ],
  },
  {
    titel: 'Kontakt',
    absaetze: [
      'Telefon: [TELEFONNUMMER EINTRAGEN]',
      'E-Mail: [E-MAIL-ADRESSE EINTRAGEN]',
    ],
  },
  {
    titel: 'Umsatzsteuer',
    absaetze: [
      'Gemäß § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet und daher auch nicht ausgewiesen (Kleinunternehmerregelung).',
      'Eine Umsatzsteuer-Identifikationsnummer besteht daher nicht. Sollte sich die Besteuerung ändern, ist dieser Abschnitt anzupassen.',
    ],
  },
  {
    titel: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
    absaetze: [
      'Haroon Mishkoo',
      '[STRASSE UND HAUSNUMMER EINTRAGEN]',
      '[PLZ UND ORT EINTRAGEN]',
    ],
  },
  {
    titel: 'Streitschlichtung',
    absaetze: [
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
  {
    titel: 'Haftung für Inhalte',
    absaetze: [
      'Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.',
    ],
  },
  {
    titel: 'Haftung für Links',
    absaetze: [
      'Dieses Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
    ],
  },
  {
    titel: 'Urheberrecht',
    absaetze: [
      'Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung.',
      'Hinweis zu Kundenmotiven: Werbemotive, die ich im Rahmen einer Buchung gestalte, gehen in das Eigentum der Kundin oder des Kunden über und dürfen frei weiterverwendet werden.',
    ],
  },
];

export const datenschutz: Rechtsabschnitt[] = [
  {
    titel: '1. Verantwortlicher',
    absaetze: [
      'Verantwortlich für die Datenverarbeitung auf dieser Website ist:',
      'OHVERA, Inhaber: Haroon Mishkoo',
      '[STRASSE UND HAUSNUMMER EINTRAGEN], [PLZ UND ORT EINTRAGEN]',
      'E-Mail: [E-MAIL-ADRESSE EINTRAGEN], Telefon: [TELEFONNUMMER EINTRAGEN]',
      'Eine Datenschutzbeauftragte oder ein Datenschutzbeauftragter ist nicht bestellt, da die gesetzlichen Voraussetzungen hierfür nicht vorliegen.',
    ],
  },
  {
    titel: '2. Grundsätze dieser Website',
    absaetze: [
      'Diese Website ist bewusst datensparsam aufgebaut:',
    ],
    liste: [
      'Es werden keine Cookies gesetzt, die nicht technisch erforderlich sind.',
      'Es findet keine Webanalyse und kein Tracking statt.',
      'Schriften werden lokal vom eigenen Server ausgeliefert, nicht von Google Fonts oder einem anderen externen Dienst.',
      'Es sind keine Karten, Videos, Social-Media-Plugins oder sonstigen externen Skripte eingebunden.',
      'Beim Aufruf der Seite wird deshalb keine Verbindung zu Dritten aufgebaut.',
    ],
  },
  {
    titel: '3. Hosting und Server-Logfiles',
    absaetze: [
      `Diese Website wird bei ${hostinganbieter} gehostet. Der Anbieter verarbeitet in meinem Auftrag personenbezogene Daten auf Grundlage eines Vertrags zur Auftragsverarbeitung nach Art. 28 DSGVO.`,
      'Beim Aufruf der Website werden automatisch Informationen in sogenannten Server-Logfiles gespeichert, die der Browser übermittelt:',
    ],
    liste: [
      'IP-Adresse',
      'Datum und Uhrzeit des Zugriffs',
      'Aufgerufene Seite und übertragene Datenmenge',
      'Referrer-URL, Browsertyp und Betriebssystem',
    ],
  },
  {
    titel: '4. Rechtsgrundlage der Logfile-Verarbeitung',
    absaetze: [
      'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt im technisch fehlerfreien Betrieb und in der Sicherheit der Website. Die Logfiles werden spätestens nach 7 Tagen gelöscht.',
    ],
  },
  {
    titel: '5. Kontaktaufnahme per E-Mail, Telefon oder WhatsApp',
    absaetze: [
      'Wenn Sie mich per E-Mail, Telefon oder Messenger kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage und für Anschlussfragen gespeichert.',
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage der Anbahnung oder Erfüllung eines Vertrags dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO.',
      'Hinweis zu WhatsApp: Bei einer Kontaktaufnahme über WhatsApp werden Daten durch den Betreiber WhatsApp Ireland Ltd., 4 Grand Canal Square, Dublin, verarbeitet. Auf diese Verarbeitung habe ich keinen Einfluss; es gelten die Datenschutzbestimmungen von WhatsApp. Wenn Sie das vermeiden möchten, nutzen Sie bitte E-Mail oder Telefon.',
    ],
  },
  {
    titel: '6. Formulare auf dieser Website',
    absaetze: [
      'Die Formulare „Kampagne starten", „Standortpartner werden" und das Kontaktformular senden Ihre Eingaben nicht an einen Server dieser Website.',
      'Ihre Angaben werden ausschließlich in Ihrem Browser zu einer Nachricht zusammengestellt. Beim Abschicken öffnet sich Ihr WhatsApp oder Ihr E-Mail-Programm mit einer bereits ausgefüllten Nachricht. Erst wenn Sie dort selbst auf Senden drücken, erreicht mich die Anfrage. Bis dahin verlassen die Daten Ihr Gerät nicht.',
      'Pflichtangaben sind als solche gekennzeichnet. Die Angabe der Branche ist erforderlich, um die zugesagte Branchenexklusivität auf dem jeweiligen Bildschirm prüfen zu können.',
      'Zum Schutz vor automatisierten Zusendungen enthält jedes Formular ein verstecktes Feld (Honeypot). Es werden dabei keine Cookies gesetzt.',
      'Nach Eingang der Nachricht verarbeite ich Ihre Angaben, um die Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen), im Übrigen Art. 6 Abs. 1 lit. f DSGVO.',
    ],
  },
  {
    titel: '7. Fotos Ihrer Fläche',
    absaetze: [
      'Wenn Sie mir Fotos Ihres Schaufensters schicken, verwende ich sie ausschließlich zur Prüfung der Fläche. Sie werden nicht veröffentlicht und nicht öffentlich zugänglich gemacht.',
      'Bitte schicken Sie keine Bilder, auf denen Personen erkennbar sind. Die Dateien werden nach Abschluss der Prüfung gelöscht, spätestens nach sechs Monaten.',
    ],
  },
  {
    titel: '8. Speicherdauer',
    absaetze: [
      'Anfragedaten werden gelöscht, sobald sie für den Zweck der Verarbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Für Geschäftsunterlagen gelten die handels- und steuerrechtlichen Fristen von sechs beziehungsweise zehn Jahren.',
    ],
  },
  {
    titel: '9. Ihre Rechte',
    absaetze: ['Sie haben nach der DSGVO jederzeit folgende Rechte:'],
    liste: [
      'Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)',
      'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
      'Löschung (Art. 17 DSGVO)',
      'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
      'Datenübertragbarkeit (Art. 20 DSGVO)',
      'Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)',
      'Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
    ],
  },
  {
    titel: '10. Beschwerderecht bei der Aufsichtsbehörde',
    absaetze: [
      'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist in der Regel die Behörde am Ort Ihres Wohnsitzes oder am Sitz des Verantwortlichen. Für Niedersachsen ist das die Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover.',
    ],
  },
  {
    titel: '11. Verschlüsselung',
    absaetze: [
      'Diese Website nutzt eine TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in der Adresszeile Ihres Browsers.',
    ],
  },
  {
    titel: '12. Stand',
    absaetze: [
      `Stand dieser Datenschutzerklärung: ${new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}. Bei Änderungen an der Website wird sie angepasst.`,
    ],
  },
];
