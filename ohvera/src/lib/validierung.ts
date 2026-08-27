/* ------------------------------------------------------------------
   Prüfregeln für alle Formulare.
   Fehlermeldungen sind bewusst konkret formuliert — sie sagen, was
   zu tun ist, nicht nur, dass etwas falsch ist.
------------------------------------------------------------------- */

import { uploadRegeln } from '../content/site';

export type Fehlerliste = Record<string, string>;

export function fehltPflichtfeld(wert: string, was: string): string | undefined {
  return wert.trim() === '' ? `Bitte ${was} angeben.` : undefined;
}

export function pruefeEmail(wert: string): string | undefined {
  if (wert.trim() === '') return 'Bitte eine E-Mail-Adresse angeben, damit wir antworten können.';
  // Bewusst tolerant: nur offensichtlich unbrauchbare Eingaben abweisen.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert.trim())) {
    return 'Diese E-Mail-Adresse sieht unvollständig aus. Beispiel: name@betrieb.de';
  }
  return undefined;
}

export function pruefeTelefon(wert: string, pflicht = false): string | undefined {
  const roh = wert.trim();
  if (roh === '') return pflicht ? 'Bitte eine Telefonnummer angeben.' : undefined;
  if (!/^[\d\s+()/.-]{6,}$/.test(roh)) {
    return 'Bitte nur Ziffern, Leerzeichen und + verwenden.';
  }
  return undefined;
}

export function pruefeAuswahl(wert: string, was: string): string | undefined {
  return wert === '' ? `Bitte ${was} auswählen.` : undefined;
}

/** Prüft Dateityp, Dateigröße und Anzahl direkt im Browser. */
export function pruefeDateien(dateien: File[]): { gueltig: File[]; fehler: string[] } {
  const fehler: string[] = [];
  const gueltig: File[] = [];

  dateien.forEach((datei) => {
    const endung = datei.name.slice(datei.name.lastIndexOf('.')).toLowerCase();
    const typPasst =
      uploadRegeln.erlaubteTypen.includes(datei.type) ||
      uploadRegeln.erlaubteEndungen.includes(endung);

    if (!typPasst) {
      fehler.push(`„${datei.name}" ist kein JPG, PNG oder HEIC.`);
      return;
    }
    if (datei.size > uploadRegeln.maxGroesseMB * 1024 * 1024) {
      const mb = (datei.size / (1024 * 1024)).toFixed(1);
      fehler.push(`„${datei.name}" ist ${mb} MB groß — erlaubt sind ${uploadRegeln.maxGroesseMB} MB.`);
      return;
    }
    gueltig.push(datei);
  });

  if (gueltig.length > uploadRegeln.maxDateien) {
    fehler.push(`Höchstens ${uploadRegeln.maxDateien} Fotos. Die übrigen wurden nicht übernommen.`);
    gueltig.length = uploadRegeln.maxDateien;
  }

  return { gueltig, fehler };
}

export function hatFehler(liste: Fehlerliste): boolean {
  return Object.values(liste).some(Boolean);
}
