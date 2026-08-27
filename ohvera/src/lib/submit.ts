/* ==================================================================
   Versand aller Formulare — die einzige Stelle im Projekt, die Daten
   nach außen gibt.
   ------------------------------------------------------------------
   AKTUELLER WEG (ohne Backend):
   Die Formulare schicken nichts an einen Server. Die Eingaben werden im
   Browser zu einer lesbaren Nachricht zusammengesetzt; beim Abschicken
   öffnet sich WhatsApp oder das E-Mail-Programm mit fertigem Text.
   Erst das Senden dort bringt die Anfrage an — genau so steht es auch
   in der Datenschutzerklärung.

   SPÄTERER WEG (mit Backend):
   Sobald in LEAD_ENDPOINT eine Adresse steht, zeigen die Formulare
   stattdessen einen einzelnen Absenden-Knopf und schicken die Daten
   per POST dorthin. Der Rest der Seite bleibt unverändert.
   ================================================================== */

import { kontakt, istPlatzhalter, marke } from '../content/site';

/** Ziel-URL für serverseitigen Versand. Leer = WhatsApp und E-Mail. */
export const LEAD_ENDPOINT = '';

/** true, sobald ein Endpoint hinterlegt ist. */
export const versandEingerichtet = LEAD_ENDPOINT !== '';

export type LeadTyp = 'kampagne' | 'standortpartner' | 'kontakt';
export type Versandweg = 'whatsapp' | 'email';
export type LeadDaten = Record<string, string | number | boolean | undefined>;

/** Eine Zeile der fertigen Nachricht. */
export type Nachrichtenzeile = { bezeichnung: string; wert: string };

export type VersandErgebnis =
  | { ok: true; weg: Versandweg }
  | { ok: false; grund: 'kein-kontakt' | 'spam' | 'netzwerk' | 'server'; nachricht: string };

const BETREFF: Record<LeadTyp, string> = {
  kampagne: 'Kampagnenanfrage über ohvera.de',
  standortpartner: 'Standort anbieten über ohvera.de',
  kontakt: 'Nachricht über ohvera.de',
};

const FEHLERTEXTE = {
  'kein-kontakt':
    'Dieser Weg ist noch nicht eingerichtet — deine Anfrage wurde deshalb nicht abgeschickt. Bitte nutz den anderen Knopf oder melde dich direkt bei uns. Wir lassen das hier bewusst so stehen, statt dir einen Versand vorzuspielen, der nicht stattfindet.',
  spam: 'Die Anfrage wurde nicht abgeschickt.',
  netzwerk:
    'Die Verbindung hat nicht geklappt. Bitte prüf deine Internetverbindung und versuch es noch einmal — oder melde dich direkt bei uns.',
  server:
    'Auf unserer Seite ist etwas schiefgelaufen, deine Anfrage ist nicht angekommen. Bitte versuch es später noch einmal oder melde dich direkt bei uns.',
} as const;

const nurZiffern = (wert: string) => wert.replace(/[^\d+]/g, '').replace(/^\+/, '');

/** Baut aus den Formularangaben eine Nachricht, die man auch lesen kann. */
export function nachrichtErzeugen(typ: LeadTyp, zeilen: Nachrichtenzeile[]): string {
  const inhalt = zeilen
    .filter((zeile) => zeile.wert.trim() !== '')
    .map((zeile) => `${zeile.bezeichnung}: ${zeile.wert.trim()}`)
    .join('\n');

  return `${BETREFF[typ]}\n\n${inhalt}\n\n— gesendet über ${marke.domain}`;
}

/**
 * Öffnet WhatsApp oder das E-Mail-Programm mit fertiger Nachricht.
 * Muss direkt aus einem Klick heraus aufgerufen werden, sonst blockiert
 * der Browser das Fenster.
 */
export function anfrageOeffnen(
  typ: LeadTyp,
  weg: Versandweg,
  zeilen: Nachrichtenzeile[],
  honigtopf = '',
): VersandErgebnis {
  // Honeypot: ein unsichtbares Feld, das nur automatisierte Skripte ausfüllen.
  if (honigtopf.trim() !== '') {
    return { ok: false, grund: 'spam', nachricht: FEHLERTEXTE.spam };
  }

  const text = nachrichtErzeugen(typ, zeilen);

  if (weg === 'whatsapp') {
    if (!kontakt.whatsappAktiv || istPlatzhalter(kontakt.whatsappNummer)) {
      return { ok: false, grund: 'kein-kontakt', nachricht: FEHLERTEXTE['kein-kontakt'] };
    }
    const ziel = `https://wa.me/${nurZiffern(kontakt.whatsappNummer)}?text=${encodeURIComponent(text)}`;
    window.open(ziel, '_blank', 'noopener,noreferrer');
    return { ok: true, weg };
  }

  if (istPlatzhalter(kontakt.email)) {
    return { ok: false, grund: 'kein-kontakt', nachricht: FEHLERTEXTE['kein-kontakt'] };
  }

  const betreff = encodeURIComponent(BETREFF[typ]);
  const koerper = encodeURIComponent(text);
  window.location.href = `mailto:${kontakt.email}?subject=${betreff}&body=${koerper}`;
  return { ok: true, weg };
}

/**
 * Serverseitiger Versand. Wird erst genutzt, wenn LEAD_ENDPOINT gesetzt ist.
 * Ohne Endpoint wird bewusst kein Erfolg vorgetäuscht.
 */
export async function submitLead(
  typ: LeadTyp,
  daten: LeadDaten,
  dateien: File[] = [],
): Promise<VersandErgebnis> {
  if (typeof daten.website === 'string' && daten.website.trim() !== '') {
    return { ok: false, grund: 'spam', nachricht: FEHLERTEXTE.spam };
  }

  if (!LEAD_ENDPOINT) {
    return { ok: false, grund: 'kein-kontakt', nachricht: FEHLERTEXTE['kein-kontakt'] };
  }

  try {
    let antwort: Response;

    if (dateien.length > 0) {
      const form = new FormData();
      form.append('typ', typ);
      Object.entries(daten).forEach(([schluessel, wert]) => {
        if (wert !== undefined) form.append(schluessel, String(wert));
      });
      dateien.forEach((datei, i) => form.append(`datei_${i + 1}`, datei, datei.name));
      antwort = await fetch(LEAD_ENDPOINT, { method: 'POST', body: form });
    } else {
      antwort = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ typ, ...daten, gesendetAm: new Date().toISOString() }),
      });
    }

    if (!antwort.ok) return { ok: false, grund: 'server', nachricht: FEHLERTEXTE.server };
    return { ok: true, weg: 'email' };
  } catch {
    return { ok: false, grund: 'netzwerk', nachricht: FEHLERTEXTE.netzwerk };
  }
}
