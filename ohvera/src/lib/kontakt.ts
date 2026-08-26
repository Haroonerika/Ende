/* ------------------------------------------------------------------
   Kontaktwege ableiten.
   Solange in src/content/site.ts ein Platzhalter wie
   [TELEFONNUMMER EINTRAGEN] steht, entsteht bewusst KEIN Link —
   der Platzhalter bleibt sichtbar stehen.
------------------------------------------------------------------- */

import { kontakt, istPlatzhalter } from '../content/site';

export type Kontaktweg = {
  id: 'email' | 'telefon' | 'whatsapp';
  bezeichnung: string;
  wert: string;
  /** null, solange nur ein Platzhalter hinterlegt ist */
  ziel: string | null;
  beschreibung: string;
  offen: boolean;
};

const nurZiffern = (wert: string) => wert.replace(/[^\d+]/g, '').replace(/^\+/, '');

export function kontaktwege(): Kontaktweg[] {
  const wege: Kontaktweg[] = [
    {
      id: 'email',
      bezeichnung: 'E-Mail',
      wert: kontakt.email,
      ziel: istPlatzhalter(kontakt.email) ? null : `mailto:${kontakt.email}`,
      beschreibung: 'Für alles, was schriftlich sein soll.',
      offen: istPlatzhalter(kontakt.email),
    },
    {
      id: 'telefon',
      bezeichnung: 'Telefon',
      wert: kontakt.telefon,
      ziel: istPlatzhalter(kontakt.telefon) ? null : `tel:${nurZiffern(kontakt.telefon)}`,
      beschreibung: 'Der schnellste Weg. Wenn ich nicht rangehe, rufe ich zurück.',
      offen: istPlatzhalter(kontakt.telefon),
    },
  ];

  if (kontakt.whatsappAktiv) {
    const offen = istPlatzhalter(kontakt.whatsappNummer);
    wege.push({
      id: 'whatsapp',
      bezeichnung: 'WhatsApp',
      wert: kontakt.whatsappNummer,
      ziel: offen ? null : `https://wa.me/${nurZiffern(kontakt.whatsappNummer)}`,
      beschreibung: 'Logo und Fotos schickst du am einfachsten hierüber.',
      offen,
    });
  }

  return wege;
}
