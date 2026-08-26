import { Link } from 'react-router-dom';
import { pakete, paketHinweise } from '../content/site';
import Haken from './Haken';
import Reveal from './Reveal';

/** Die Paketkarten. PRO ist hervorgehoben, NETWORK ist nicht buchbar. */
export default function Pakete() {
  return (
    <>
      <div className="grid gap-5 lg:grid-cols-4">
        {pakete.map((paket, i) => {
          const hervor = Boolean(paket.empfohlen);
          const inaktiv = !paket.buchbar;

          return (
            <Reveal key={paket.id} verzoegerung={i * 60} className="h-full">
              <article
                className={`flex h-full flex-col rounded-lg p-6 ${
                  hervor
                    ? 'bg-anthrazit text-offwhite shadow-weich-lg ring-2 ring-elektroblau'
                    : inaktiv
                      ? 'border border-dashed border-grau/40 bg-transparent text-grau-stark'
                      : 'karte'
                }`}
                aria-label={`Paket ${paket.name}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-extrabold tracking-[0.03em]">
                    {paket.name}
                  </h3>
                  {hervor && <span className="badge-blau">Empfohlen</span>}
                  {inaktiv && <span className="badge-grau">Bald</span>}
                </div>

                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    hervor ? 'text-grau' : inaktiv ? 'text-grau-stark' : 'text-grau-stark'
                  }`}
                >
                  {paket.einzeiler}
                </p>

                <p className="mt-5 flex items-baseline gap-1.5">
                  {paket.preis !== null ? (
                    <>
                      <span className="font-mono text-4xl font-medium tabular-nums">
                        {paket.preis}
                      </span>
                      <span
                        className={`font-mono text-sm ${hervor ? 'text-grau' : 'text-grau-stark'}`}
                      >
                        {paket.preisZusatz}
                      </span>
                    </>
                  ) : (
                    <span className="font-mono text-sm uppercase tracking-[0.12em] text-grau">
                      Preis steht noch nicht fest
                    </span>
                  )}
                </p>

                <ul className="mt-6 flex-1 space-y-3 text-[0.925rem] leading-relaxed">
                  {paket.merkmale.map((merkmal) => (
                    <li key={merkmal.text} className="flex gap-2.5">
                      <Haken farbe={inaktiv ? '#8A9099' : '#1B57FF'} />
                      <span className={merkmal.hervorgehoben ? 'font-semibold' : undefined}>
                        {merkmal.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {paket.laufzeit && (
                  <p
                    className={`mt-6 border-t pt-4 font-mono text-xs uppercase tracking-[0.1em] ${
                      hervor ? 'border-white/15 text-grau' : 'trennlinie border-t text-grau-stark'
                    }`}
                  >
                    {paket.laufzeit}
                  </p>
                )}

                {paket.hinweis && (
                  <p className="mt-6 border-t border-dashed border-grau/30 pt-4 text-sm">
                    {paket.hinweis}
                  </p>
                )}

                {paket.buchbar ? (
                  <Link
                    to={`/kampagne-starten?paket=${paket.id}`}
                    className={`mt-5 w-full ${hervor ? 'btn-primaer' : 'btn-sekundaer-hell'}`}
                  >
                    {paket.name} anfragen
                  </Link>
                ) : (
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-grau">
                    Nicht buchbar
                  </p>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 space-y-2 text-sm text-grau-stark">
        <p>{paketHinweise.preis}</p>
        <p>{paketHinweise.pilotpreis}</p>
        <p className="flex items-start gap-2 font-medium text-anthrazit">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-elektroblau" />
          {paketHinweise.exklusivitaet}
        </p>
      </div>
    </>
  );
}
