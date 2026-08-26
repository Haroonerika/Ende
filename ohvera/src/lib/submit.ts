/* ==================================================================
   Versand aller Formulare — die einzige Stelle im Projekt, die Daten
   nach außen schickt.
   ------------------------------------------------------------------
   Es gibt derzeit KEIN Backend. Trage die Adresse, an die Anfragen
   gehen sollen, in die Konstante LEAD_ENDPOINT ein (z. B. ein
   Formulardienst oder eine eigene Funktion).

   Solange LEAD_ENDPOINT leer ist, wird bewusst KEIN Erfolg vorgetäuscht:
   Die Formulare zeigen dann eine ehrliche Fehlermeldung mit den
   hinterlegten Kontaktwegen.
   ================================================================== */

/** Ziel-URL für Formularanfragen. Leer lassen = Versand deaktiviert. */
export const LEAD_ENDPOINT = '';

export type LeadTyp = 'kampagne' | 'standortpartner' | 'kontakt';

export type LeadDaten = Record<string, string | number | boolean | undefined>;

export type SubmitErgebnis =
  | { ok: true }
  | {
      ok: false;
      grund: 'kein-endpoint' | 'netzwerk' | 'server' | 'spam';
      nachricht: string;
    };

const FEHLERTEXTE = {
  'kein-endpoint':
    'Der Online-Versand ist noch nicht eingerichtet — deine Anfrage wurde daher nicht abgeschickt. Bitte schick mir die Angaben direkt per E-Mail, Telefon oder WhatsApp. Ich lasse das hier bewusst so stehen, statt dir einen Versand vorzuspielen, der nicht stattfindet.',
  netzwerk:
    'Die Verbindung hat nicht geklappt. Bitte prüfe deine Internetverbindung und versuch es noch einmal — oder melde dich direkt bei mir.',
  server:
    'Auf meiner Seite ist etwas schiefgelaufen, deine Anfrage ist nicht angekommen. Bitte versuch es später noch einmal oder melde dich direkt bei mir.',
  spam: 'Die Anfrage wurde nicht abgeschickt.',
} as const;

/**
 * Schickt eine Anfrage ab.
 *
 * @param typ     Welches Formular gesendet wurde
 * @param daten   Die Formularfelder
 * @param dateien Optionale Datei-Anhänge (nur Standortpartner-Formular)
 */
export async function submitLead(
  typ: LeadTyp,
  daten: LeadDaten,
  dateien: File[] = [],
): Promise<SubmitErgebnis> {
  // Honeypot: Ein unsichtbares Feld, das nur automatisierte Skripte ausfüllen.
  if (typeof daten.website === 'string' && daten.website.trim() !== '') {
    return { ok: false, grund: 'spam', nachricht: FEHLERTEXTE.spam };
  }

  if (!LEAD_ENDPOINT) {
    // Kein Endpoint hinterlegt: ehrlich scheitern statt Erfolg vortäuschen.
    return { ok: false, grund: 'kein-endpoint', nachricht: FEHLERTEXTE['kein-endpoint'] };
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

    if (!antwort.ok) {
      return { ok: false, grund: 'server', nachricht: FEHLERTEXTE.server };
    }

    return { ok: true };
  } catch {
    return { ok: false, grund: 'netzwerk', nachricht: FEHLERTEXTE.netzwerk };
  }
}

/** true, sobald ein Endpoint hinterlegt ist. */
export const versandEingerichtet = LEAD_ENDPOINT !== '';
