import { referenzen } from '../content/site';
import Abschnitt from './Abschnitt';
import Reveal from './Reveal';

/* ------------------------------------------------------------------
   Referenzen.
   Solange das Array `referenzen` in src/content/site.ts leer ist,
   wird dieser Abschnitt NICHT gerendert. Sobald echte Gründungskunden
   zugestimmt haben, genügt ein Eintrag in der Inhaltsdatei — am Code
   muss niemand etwas ändern.
------------------------------------------------------------------- */

export default function Referenzen() {
  if (referenzen.length === 0) return null;

  return (
    <Abschnitt>
      <h2 className="h2">Was Kunden sagen.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {referenzen.map((referenz, i) => (
          <Reveal key={`${referenz.betrieb}-${i}`} verzoegerung={i * 60} className="h-full">
            <figure className="karte flex h-full flex-col p-6">
              {referenz.logo && (
                <img
                  src={referenz.logo}
                  alt={`Logo ${referenz.betrieb}`}
                  width="120"
                  height="40"
                  loading="lazy"
                  className="mb-5 h-10 w-auto object-contain"
                />
              )}
              <blockquote className="flex-1 text-[1.05rem] leading-relaxed">
                „{referenz.zitat}"
              </blockquote>
              <figcaption className="mt-5 border-t pt-4 text-sm trennlinie">
                <span className="font-semibold">{referenz.betrieb}</span>
                <span className="text-grau-stark"> · {referenz.ort}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Abschnitt>
  );
}
