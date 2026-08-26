import Reveal from './Reveal';

type Schritt = { titel: string; text: string; marke?: string };

/** Nummerierte Schrittfolge — die Nummerierung steht für eine echte Reihenfolge. */
export default function Schritte({ schritte, dunkel = false }: { schritte: readonly Schritt[]; dunkel?: boolean }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {schritte.map((schritt, i) => (
        <Reveal as="li" key={schritt.titel} verzoegerung={i * 70} className="h-full">
          <div
            className={`karte-heben flex h-full flex-col rounded-lg p-6 ${
              dunkel ? 'karte-dunkel' : 'karte'
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-3xl font-medium tabular-nums text-elektroblau">
                {String(i + 1).padStart(2, '0')}
              </span>
              {schritt.marke && (
                <span
                  className={`font-mono text-[0.7rem] uppercase tracking-[0.12em] ${
                    dunkel ? 'text-grau' : 'text-grau-stark'
                  }`}
                >
                  {schritt.marke}
                </span>
              )}
            </div>
            <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug">{schritt.titel}</h3>
            <p className={`mt-2 text-[0.95rem] leading-relaxed ${dunkel ? 'text-grau' : 'text-grau-stark'}`}>
              {schritt.text}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
