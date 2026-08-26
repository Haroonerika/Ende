import { sicherheiten } from '../content/site';
import Haken from './Haken';
import Reveal from './Reveal';

/** Die vier häufigsten Bedenken — direkt dort, wo über den Preis nachgedacht wird. */
export default function Sicherheiten() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {sicherheiten.map((punkt, i) => (
        <Reveal key={punkt.titel} verzoegerung={i * 70} className="h-full">
          <div className="karte karte-heben flex h-full gap-3 p-5">
            <Haken farbe="#1B57FF" />
            <div>
              <h3 className="text-[0.975rem] font-semibold leading-snug">{punkt.titel}</h3>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-grau-stark">{punkt.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
