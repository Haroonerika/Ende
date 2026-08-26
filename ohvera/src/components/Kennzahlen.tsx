import { startseite } from '../content/site';
import Reveal from './Reveal';
import Zahl from './Zahl';

/**
 * „Was du buchst, in Zahlen" — beantwortet direkt unter dem Hero die Frage,
 * die sonst offen bleibt. Bewusst nur Technik- und Schleifenwerte.
 */
export default function Kennzahlen() {
  const { titel, hinweis, zahlen } = startseite.aufEinenBlick;

  return (
    <div className="border-t border-white/10 pt-10">
      <h2 className="eyebrow text-grau">{titel}</h2>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {zahlen.map((eintrag, i) => (
          <Reveal key={eintrag.bezeichnung} verzoegerung={i * 80} as="div">
            <dt className="sr-only">{eintrag.bezeichnung}</dt>
            <dd>
              <span className="block">
                <Zahl wert={eintrag.wert} className="text-3xl font-medium text-offwhite sm:text-4xl" />
                <span className="ml-1.5 font-mono text-sm text-elektroblau">{eintrag.einheit}</span>
              </span>
              <span className="mt-1.5 block text-[0.85rem] leading-snug text-grau">
                {eintrag.bezeichnung}
              </span>
            </dd>
          </Reveal>
        ))}
      </dl>

      <p className="mt-8 max-w-lesbar text-sm text-grau">{hinweis}</p>
    </div>
  );
}
