/* ------------------------------------------------------------------
   Die gemeinsame Uhr der 100-Sekunden-Schleife.
   Hero-Visualisierung und Schaufenster-Szene hängen an derselben Zeit,
   damit der Motivwechsel im Schaufenster zum Slotwechsel passt.

   Bei `prefers-reduced-motion: reduce` läuft die Uhr NICHT. Sie bleibt
   bei 0 stehen, die Komponenten zeigen dann einen statischen Zustand
   mit derselben Information.
------------------------------------------------------------------- */

import { useEffect, useState } from 'react';
import { produkt } from '../content/site';

type Zuhoerer = (sekunde: number) => void;

const LAENGE = produkt.schleifeSekunden;
const zuhoerer = new Set<Zuhoerer>();

let animation = 0;
let start = 0;

export function bewegungReduziert(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function schritt() {
  const t = ((performance.now() - start) / 1000) % LAENGE;
  zuhoerer.forEach((fn) => fn(t));
  animation = requestAnimationFrame(schritt);
}

function starten() {
  if (animation || bewegungReduziert()) return;
  start = performance.now();
  animation = requestAnimationFrame(schritt);
}

function stoppen() {
  if (!animation) return;
  cancelAnimationFrame(animation);
  animation = 0;
}

/** Meldet eine Funktion an, die bei jedem Bild mit der Schleifenzeit aufgerufen wird. */
export function abonniereSchleife(fn: Zuhoerer): () => void {
  zuhoerer.add(fn);
  fn(0);
  starten();
  return () => {
    zuhoerer.delete(fn);
    if (zuhoerer.size === 0) stoppen();
  };
}

/**
 * Liefert den aktiven Slot (0-basiert) und löst nur dann ein Rendern aus,
 * wenn sich der Slot tatsächlich ändert — also höchstens alle 10 Sekunden.
 */
export function useAktiverSlot(): number {
  const [slot, setSlot] = useState(0);

  useEffect(() => {
    return abonniereSchleife((t) => {
      const aktuell = Math.floor(t / produkt.spotSekunden);
      setSlot((vorher) => (vorher === aktuell ? vorher : aktuell));
    });
  }, []);

  return slot;
}
