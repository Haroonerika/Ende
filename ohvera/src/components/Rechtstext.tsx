import type { Rechtsabschnitt } from '../content/site';
import { rechtshinweis } from '../content/site';

/**
 * Darstellung der Rechtstexte.
 * Der Entwurfshinweis steht bewusst sichtbar über dem Text, solange
 * noch Platzhalter enthalten sind — er muss vor der Veröffentlichung
 * zusammen mit den Platzhaltern verschwinden.
 */
export default function Rechtstext({
  titel,
  abschnitte,
}: {
  titel: string;
  abschnitte: Rechtsabschnitt[];
}) {
  const enthaeltPlatzhalter = abschnitte.some(
    (abschnitt) =>
      abschnitt.absaetze.some((text) => text.includes('[')) ||
      (abschnitt.liste ?? []).some((text) => text.includes('[')),
  );

  return (
    <>
      <section className="sektion-dunkel px-5 pb-12 pt-12 sm:px-8 sm:pt-16">
        <div className="huelle max-w-3xl">
          <h1 className="h1">{titel}</h1>
        </div>
      </section>

      <section className="sektion sektion-hell">
        <div className="huelle max-w-3xl">
          {enthaeltPlatzhalter && (
            <p
              role="note"
              className="mb-10 rounded-lg border-2 border-dashed p-5 text-[0.95rem] leading-relaxed"
              style={{ borderColor: '#B3261E', color: '#B3261E' }}
            >
              <strong>Entwurf:</strong> {rechtshinweis}
            </p>
          )}

          <div className="space-y-10">
            {abschnitte.map((abschnitt) => (
              <section key={abschnitt.titel}>
                <h2 className="text-xl font-semibold">{abschnitt.titel}</h2>
                <div className="mt-3 space-y-3">
                  {abschnitt.absaetze.map((absatz) => (
                    <p key={absatz} className="fliess text-[1rem] text-grau-stark">
                      {absatz}
                    </p>
                  ))}
                </div>
                {abschnitt.liste && (
                  <ul className="mt-4 space-y-2">
                    {abschnitt.liste.map((punkt) => (
                      <li key={punkt} className="fliess flex gap-3 text-[1rem] text-grau-stark">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-grau" />
                        {punkt}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
