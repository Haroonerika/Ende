import Reveal from './Reveal';

type Schritt = { titel: string; text: string };

/** Nummerierte Schrittfolge — die Nummerierung steht für eine echte Reihenfolge. */
export default function Schritte({ schritte, dunkel = false }: { schritte: readonly Schritt[]; dunkel?: boolean }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {schritte.map((schritt, i) => (
        <Reveal as="li" key={schritt.titel} verzoegerung={i * 70} className="h-full">
          <div
            className={`flex h-full flex-col rounded-lg p-6 ${
              dunkel ? 'karte-dunkel' : 'karte'
            }`}
          >
            <span
              className={`font-mono text-3xl font-medium tabular-nums ${
                dunkel ? 'text-elektroblau' : 'text-elektroblau'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
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
