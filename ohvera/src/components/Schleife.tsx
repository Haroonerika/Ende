import { useEffect, useRef, useState } from 'react';
import {
  ausspielungenProTag,
  produkt,
  schleifenSlots,
  slotBeschriftung,
  slotErklaerung,
} from '../content/site';
import { abonniereSchleife, bewegungReduziert } from '../lib/loop';

type Props = {
  /** Auf hellem Grund werden Spur und Beschriftung abgedunkelt. */
  hell?: boolean;
  /** Kompakte Variante ohne Kopfzeile */
  kompakt?: boolean;
};

/**
 * Die 100-Sekunden-Schleife als laufende Grafik.
 * Zehn Plätze im Hochformat, ein wandernder Fortschrittsindikator,
 * ein Sekundenzähler. Erklärt das Geschäftsmodell ohne Verkaufstext.
 */
export default function Schleife({ hell = false, kompakt = false }: Props) {
  const fuellungen = useRef<(HTMLDivElement | null)[]>([]);
  const spielkopf = useRef<HTMLDivElement>(null);
  const [sekunde, setSekunde] = useState(0);
  const [aktiv, setAktiv] = useState(0);
  const [reduziert] = useState(() => bewegungReduziert());

  useEffect(() => {
    if (reduziert) return;
    return abonniereSchleife((t) => {
      const index = Math.floor(t / produkt.spotSekunden);
      const anteil = (t % produkt.spotSekunden) / produkt.spotSekunden;

      fuellungen.current.forEach((element, i) => {
        if (!element) return;
        const hoehe = i < index ? 1 : i === index ? anteil : 0;
        element.style.transform = `scaleY(${hoehe})`;
      });

      if (spielkopf.current) {
        spielkopf.current.style.transform = `translateX(${(t / produkt.schleifeSekunden) * 100}%)`;
      }

      setSekunde((vorher) => {
        const jetzt = Math.floor(t);
        return vorher === jetzt ? vorher : jetzt;
      });
      setAktiv((vorher) => (vorher === index ? vorher : index));
    });
  }, [reduziert]);

  const aktiverSlot = schleifenSlots[aktiv] ?? schleifenSlots[0];
  const spurFarbe = hell ? 'bg-anthrazit/[0.07]' : 'bg-white/[0.07]';
  const rahmen = hell ? 'border-anthrazit/10' : 'border-white/10';
  const gedaempft = hell ? 'text-grau-stark' : 'text-grau';
  const stark = hell ? 'text-anthrazit' : 'text-offwhite';

  return (
    <div
      className={`rounded-lg border p-4 sm:p-6 ${rahmen} ${
        hell ? 'bg-weiss shadow-weich' : 'bg-tiefblau shadow-dunkel'
      }`}
    >
      {!kompakt && (
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className={`eyebrow ${gedaempft}`}>Die Schleife</p>
            <p className={`mt-1 text-sm font-medium ${stark}`}>
              {produkt.slotsGesamt} Plätze · {produkt.spotSekunden} Sekunden je Spot
            </p>
          </div>
          <p className={`font-mono text-2xl font-medium tabular-nums sm:text-3xl ${stark}`}>
            {String(sekunde).padStart(3, '0')}
            <span className={`text-base ${gedaempft}`}> / {produkt.schleifeSekunden} s</span>
          </p>
        </div>
      )}

      {/* Fortschrittsspur über der Grafik */}
      <div className={`relative mb-4 h-1 overflow-hidden rounded-full ${spurFarbe}`}>
        <div
          ref={spielkopf}
          className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-elektroblau"
          style={{ transform: 'translateX(0%)' }}
          aria-hidden="true"
        />
      </div>

      {/* Die zehn Plätze im Hochformat */}
      <div
        className="flex items-stretch gap-1 sm:gap-1.5"
        role="img"
        aria-label={`Visualisierung der Werbeschleife: ${produkt.slotsGesamt} Plätze zu je ${produkt.spotSekunden} Sekunden, davon ${produkt.slotsVerkaeuflich} frei buchbar und ${produkt.slotsReserviert} reserviert. Ein Durchlauf dauert ${produkt.schleifeSekunden} Sekunden.`}
      >
        {schleifenSlots.map((slot, i) => {
          const frei = slot.typ === 'frei';
          const istAktiv = i === aktiv;
          return (
            <div key={slot.nummer} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className={`relative w-full overflow-hidden rounded-[6px] border transition-shadow duration-200 ${spurFarbe} ${
                  frei ? 'border-elektroblau/40' : hell ? 'border-grau/40' : 'border-grau/30'
                } ${
                  istAktiv
                    ? 'ring-2 ring-elektroblau ring-offset-2 ' +
                      (hell ? 'ring-offset-weiss' : 'ring-offset-tiefblau')
                    : ''
                }`}
                style={{ aspectRatio: '9 / 16', maxHeight: '13rem' }}
              >
                {/* Schraffur macht reservierte Plätze auch ohne Farbe erkennbar */}
                {!frei && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(135deg, rgba(138,144,153,0.55) 0 2px, transparent 2px 7px)',
                    }}
                  />
                )}
                {/* Füllung, wächst von unten */}
                <div
                  ref={(element) => {
                    fuellungen.current[i] = element;
                  }}
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 top-0 origin-bottom ${
                    frei ? 'bg-elektroblau' : 'bg-grau/70'
                  }`}
                  style={{ transform: `scaleY(${reduziert && i === 0 ? 0.35 : 0})` }}
                />
                {/* Senkrechte Beschriftung im Balken */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 hidden items-center justify-center sm:flex ${
                    hell ? 'text-anthrazit/55' : 'text-offwhite/75'
                  }`}
                >
                  <span
                    className="font-mono text-[0.6rem] uppercase tracking-[0.14em]"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {slotBeschriftung[slot.typ]}
                  </span>
                </span>
              </div>
              <span
                aria-hidden="true"
                className={`font-mono text-[0.65rem] tabular-nums ${
                  istAktiv ? 'text-elektroblau' : gedaempft
                }`}
              >
                {String(slot.nummer).padStart(2, '0')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legende: Information nie allein über Farbe */}
      <div className={`mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs ${gedaempft}`}>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-sm bg-elektroblau" />
          {produkt.slotsVerkaeuflich} Plätze frei
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-sm border border-grau/50"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(138,144,153,0.6) 0 2px, transparent 2px 5px)',
            }}
          />
          {produkt.slotsReserviert} reserviert
        </span>
        <span className="font-mono tabular-nums">
          Slot {String(aktiverSlot.nummer).padStart(2, '0')} · {slotErklaerung[aktiverSlot.typ]}
        </span>
      </div>

      <p className={`mt-4 border-t pt-4 text-sm font-medium ${rahmen} ${stark}`}>
        Ein Durchlauf: {produkt.schleifeSekunden} Sekunden. {produkt.betriebStunden} Stunden am Tag.{' '}
        <span className="font-mono tabular-nums text-elektroblau">{ausspielungenProTag} Mal.</span>
      </p>

      {reduziert && (
        <p className={`mt-2 text-xs ${gedaempft}`}>
          Reduzierte Bewegung ist aktiv — die Schleife wird hier statisch dargestellt.
        </p>
      )}
    </div>
  );
}
