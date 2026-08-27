import { produkt, type Standort, istPlatzhalter } from '../content/site';
import Icon from './Icon';
import Zahl from './Zahl';

/**
 * Eine Stadt mit ihren Bildschirmen.
 * Keine Firmennamen, keine Adressen — nur Stadt, Anzahl und Lage.
 */
export default function Standortkarte({
  standort,
  hell = false,
}: {
  standort: Standort;
  hell?: boolean;
}) {
  const gedaempft = hell ? 'text-grau-stark' : 'text-grau';
  const lageOffen = istPlatzhalter(standort.lage);

  return (
    <article
      className={`karte-heben flex h-full flex-col rounded-lg p-6 ${hell ? 'karte' : 'karte-dunkel'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={hell ? 'badge-grau' : 'badge-grau-dunkel'}>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-elektroblau" />
          {standort.statusText}
        </span>
        <Icon name="standort" groesse={22} className={gedaempft} />
      </div>

      <h3
        className={`mt-5 font-display text-xl font-bold ${hell ? 'text-anthrazit' : 'text-offwhite'}`}
      >
        {standort.stadt}
      </h3>

      <p className="mt-3 flex items-baseline gap-2">
        <Zahl
          wert={standort.bildschirme}
          className={`text-4xl font-medium ${hell ? 'text-anthrazit' : 'text-offwhite'}`}
        />
        <span className={`font-mono text-sm ${gedaempft}`}>
          {standort.bildschirme === 1 ? 'Bildschirm' : 'Bildschirme'}
        </span>
      </p>

      {/* Balken statt Aufzählung: Auf einen Blick sichtbar, wie viele es sind */}
      <div className="mt-4 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: standort.bildschirme }).map((_, i) => (
          <span key={i} className="h-8 flex-1 rounded-[4px] bg-elektroblau/85" />
        ))}
      </div>

      <p className={`mt-5 flex-1 text-sm leading-relaxed ${gedaempft}`}>
        {lageOffen ? (
          <span className="font-mono text-xs">{standort.lage}</span>
        ) : (
          standort.lage
        )}
      </p>

      <p className={`mt-5 border-t pt-4 font-mono text-xs ${hell ? 'trennlinie' : 'border-white/10'} ${gedaempft}`}>
        {produkt.slotsVerkaeuflich} buchbare Plätze je Bildschirm
      </p>
    </article>
  );
}
