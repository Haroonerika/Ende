import { useEffect, useRef, useState } from 'react';
import { beispielmotive, startseite } from '../content/site';
import { bewegungReduziert } from '../lib/loop';
import Motiv from './Motiv';

/* ------------------------------------------------------------------
   Motive als ruhig laufendes Band.
   Läuft von allein, hält an, sobald jemand mit der Maus darüber geht,
   ein Element den Fokus bekommt oder jemand selbst scrollt. Bei
   reduzierter Bewegung steht es still und lässt sich nur schieben.
------------------------------------------------------------------- */

/** Geschwindigkeit in Pixeln pro Sekunde — bewusst langsam. */
const TEMPO = 26;

export default function Motivkarussell({ hell = true }: { hell?: boolean }) {
  const spur = useRef<HTMLDivElement>(null);
  const pausiert = useRef(false);
  const [reduziert] = useState(() => bewegungReduziert());

  useEffect(() => {
    if (reduziert) return;
    const element = spur.current;
    if (!element) return;

    let animation = 0;
    let zuletzt = performance.now();
    /* Eigene Position mitführen: scrollLeft rundet beim Zurücklesen,
       dadurch käme bei knapp einem halben Pixel je Bild nie Bewegung
       zustande. */
    let position = element.scrollLeft;

    const synchronisieren = () => {
      position = element.scrollLeft;
    };
    element.addEventListener('pointerdown', synchronisieren);
    element.addEventListener('wheel', synchronisieren, { passive: true });
    element.addEventListener('touchstart', synchronisieren, { passive: true });

    const schritt = (jetzt: number) => {
      const vergangen = jetzt - zuletzt;
      zuletzt = jetzt;

      if (!pausiert.current && element.scrollWidth > element.clientWidth) {
        position += (vergangen / 1000) * TEMPO;
        // Die Liste steht zweimal nebeneinander — bei der Hälfte zurücksetzen
        const haelfte = element.scrollWidth / 2;
        if (position >= haelfte) position -= haelfte;
        element.scrollLeft = position;
      }

      animation = requestAnimationFrame(schritt);
    };

    animation = requestAnimationFrame(schritt);
    return () => {
      cancelAnimationFrame(animation);
      element.removeEventListener('pointerdown', synchronisieren);
      element.removeEventListener('wheel', synchronisieren);
      element.removeEventListener('touchstart', synchronisieren);
    };
  }, [reduziert]);

  /** Nach eigenem Wischen kurz warten, bevor es weiterläuft. */
  const wieder = useRef<number>();
  function kurzAnhalten() {
    pausiert.current = true;
    window.clearTimeout(wieder.current);
    wieder.current = window.setTimeout(() => {
      pausiert.current = false;
    }, 2500);
  }

  const liste = [...beispielmotive, ...beispielmotive];

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausiert.current = true)}
      onMouseLeave={() => (pausiert.current = false)}
      onFocusCapture={() => (pausiert.current = true)}
      onBlurCapture={() => (pausiert.current = false)}
      onPointerDown={kurzAnhalten}
      onTouchStart={kurzAnhalten}
    >
      <div
        ref={spur}
        className="rail flex gap-4 overflow-x-auto pb-4 sm:gap-5"
        style={{ scrollSnapType: 'none', scrollBehavior: 'auto' }}
      >
        {liste.map((motiv, i) => {
          const zweiteHaelfte = i >= beispielmotive.length;
          return (
            <figure
              key={`${motiv.id}-${i}`}
              className="m-0 w-[224px] shrink-0 sm:w-[260px]"
              aria-hidden={zweiteHaelfte || undefined}
            >
              <Motiv motiv={motiv} />
              <figcaption className="mt-3">
                <span className="block text-sm font-medium">{motiv.branche}</span>
                <span
                  className={`mt-0.5 block font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
                    hell ? 'text-grau-stark' : 'text-grau'
                  }`}
                >
                  {startseite.schaufenster.kennzeichnung}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Weiche Kanten, damit das Band nicht abgeschnitten wirkt */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16"
        style={{
          background: `linear-gradient(90deg, ${hell ? 'var(--offwhite)' : 'var(--anthrazit)'}, transparent)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16"
        style={{
          background: `linear-gradient(270deg, ${hell ? 'var(--offwhite)' : 'var(--anthrazit)'}, transparent)`,
        }}
      />
    </div>
  );
}
