import { kostenrechnung } from '../content/site';

/** Der Monatspreis heruntergebrochen. Reine Division, klar als solche benannt. */
export default function Kostenrechnung() {
  return (
    <div className="karte p-6">
      <h3 className="h3">{kostenrechnung.titel}</h3>
      <dl className="mt-5 divide-y trennlinie border-y">
        {kostenrechnung.zeilen.map((zeile) => (
          <div key={zeile.bezeichnung} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="text-[0.95rem] text-grau-stark">{zeile.bezeichnung}</dt>
            <dd className="font-mono text-lg font-medium tabular-nums">{zeile.wert}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-grau-stark">{kostenrechnung.hinweis}</p>
    </div>
  );
}
