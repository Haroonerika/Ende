import {
  anfrageOeffnen,
  submitLead,
  versandEingerichtet,
  type LeadTyp,
  type Nachrichtenzeile,
  type Versandweg,
} from '../../lib/submit';

/* ------------------------------------------------------------------
   Die beiden Absende-Knöpfe.
   Ohne Backend öffnen sie WhatsApp oder das E-Mail-Programm mit einer
   fertig ausgefüllten Nachricht. Sobald ein Endpoint hinterlegt ist,
   erscheint stattdessen ein einzelner Absenden-Knopf.
------------------------------------------------------------------- */

type Props = {
  typ: LeadTyp;
  /** Prüft das Formular. Gibt false zurück, wenn etwas fehlt. */
  pruefen: () => boolean;
  /** Baut die Zeilen der Nachricht — wird erst nach der Prüfung aufgerufen. */
  zeilen: () => Nachrichtenzeile[];
  honigtopf: string;
  onFehler: (nachricht: string) => void;
  onErfolg: (weg: Versandweg) => void;
  sendet: boolean;
  setSendet: (wert: boolean) => void;
  /** Beschriftung des Hauptknopfes */
  beschriftung?: string;
};

function WhatsappZeichen() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 2a8 8 0 016.4 12.8l-.3.4.6 2.2-2.3-.6-.4.2A8 8 0 1112 4zm-3.4 4.3c-.2 0-.5.1-.7.3-.3.3-.9.8-.9 2s.9 2.3 1 2.5c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.7.9c-.1.2-.3.2-.6.1-1.4-.6-2.4-1.9-2.7-2.4-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3 0-.5l-.8-2c-.2-.4-.4-.4-.6-.4z"
      />
    </svg>
  );
}

export default function Versandknoepfe({
  typ,
  pruefen,
  zeilen,
  honigtopf,
  onFehler,
  onErfolg,
  sendet,
  setSendet,
  beschriftung = 'Anfrage absenden',
}: Props) {
  function senden(weg: Versandweg) {
    if (!pruefen()) return;
    const ergebnis = anfrageOeffnen(typ, weg, zeilen(), honigtopf);
    if (ergebnis.ok) onErfolg(ergebnis.weg);
    else onFehler(ergebnis.nachricht);
  }

  async function serverVersand() {
    if (!pruefen()) return;
    setSendet(true);
    const daten = Object.fromEntries(zeilen().map((z) => [z.bezeichnung, z.wert]));
    const ergebnis = await submitLead(typ, { ...daten, website: honigtopf });
    setSendet(false);
    if (ergebnis.ok) onErfolg('email');
    else onFehler(ergebnis.nachricht);
  }

  if (versandEingerichtet) {
    return (
      <button type="button" className="btn-primaer w-full sm:w-auto" disabled={sendet} onClick={serverVersand}>
        {sendet ? 'Wird gesendet …' : beschriftung}
      </button>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn-primaer flex-1" onClick={() => senden('whatsapp')}>
          <WhatsappZeichen />
          Per WhatsApp senden
        </button>
        <button type="button" className="btn-sekundaer-hell flex-1" onClick={() => senden('email')}>
          Per E-Mail senden
        </button>
      </div>
      <p className="hilfstext mt-3">
        Beides öffnet eine fertig ausgefüllte Nachricht — du musst nur noch auf Senden drücken.
        Nichts wird ohne dein Zutun verschickt.
      </p>
    </div>
  );
}
