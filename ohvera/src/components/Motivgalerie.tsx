import { beispielmotive, startseite } from '../content/site';
import Motiv from './Motiv';

/**
 * Die Beispielmotive einzeln — auf Mobilgeräten horizontal scrollbar,
 * ab Tablet als Raster. Jedes Motiv trägt eine ruhige Kennzeichnung.
 */
export default function Motivgalerie() {
  return (
    <div className="rail -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {beispielmotive.map((motiv) => (
        <figure key={motiv.id} className="m-0 w-[74vw] max-w-[300px] shrink-0 sm:w-auto sm:max-w-none">
          <Motiv motiv={motiv} />
          <figcaption className="mt-3">
            <span className="block text-sm font-medium">{motiv.branche}</span>
            <span className="mt-0.5 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-grau-stark">
              {startseite.schaufenster.kennzeichnung}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
