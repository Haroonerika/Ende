import { Link } from 'react-router-dom';
import { schleifenSlots, type Standort } from '../content/site';

/** Eine Standortkarte im Hochformat. Kein Foto, keine Adresse, kein Firmenname. */
export default function Standortkarte({ standort, hell = false }: { standort: Standort; hell?: boolean }) {
  const gedaempft = hell ? 'text-grau-stark' : 'text-grau';

  return (
    <article
      className={`flex w-full max-w-[360px] flex-col rounded-lg p-6 ${
        hell ? 'karte' : 'karte-dunkel'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={hell ? 'badge-grau' : 'badge-grau-dunkel'}>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-grau" />
          {standort.statusText}
        </span>
        <span className={`font-mono text-xs ${gedaempft}`}>{standort.ort}</span>
      </div>

      {/* Belegung als Grafik: dieselbe Bildsprache wie die Schleife */}
      <div className="mt-6 flex items-end gap-1" aria-hidden="true">
        {schleifenSlots.map((slot) => (
          <div
            key={slot.nummer}
            className={`h-14 flex-1 rounded-[4px] ${
              slot.typ === 'frei' ? 'bg-elektroblau/85' : 'bg-grau/30'
            }`}
            style={
              slot.typ === 'frei'
                ? undefined
                : {
                    backgroundImage:
                      'repeating-linear-gradient(135deg, rgba(138,144,153,0.5) 0 2px, transparent 2px 6px)',
                  }
            }
          />
        ))}
      </div>

      <h3 className={`mt-6 font-display text-xl font-bold ${hell ? 'text-anthrazit' : 'text-offwhite'}`}>
        {standort.titel}
      </h3>

      <dl className="mt-5 flex-1 space-y-3 text-sm">
        {standort.zeilen.map((zeile) => (
          <div key={zeile.bezeichnung} className="flex items-baseline justify-between gap-4 border-b pb-2.5 trennlinie">
            <dt className={gedaempft}>{zeile.bezeichnung}</dt>
            <dd className="text-right font-mono text-[0.8rem] tabular-nums">{zeile.wert}</dd>
          </div>
        ))}
      </dl>

      {standort.cta && (
        <Link to={standort.cta.ziel} className="btn-primaer mt-6 w-full">
          {standort.cta.text}
        </Link>
      )}
    </article>
  );
}
