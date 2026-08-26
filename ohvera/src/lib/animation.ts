/* ------------------------------------------------------------------
   Bewegung beim Scrollen.
   Alles hier respektiert `prefers-reduced-motion`: Wer im System
   reduzierte Bewegung eingestellt hat, sieht sofort den Endzustand.
------------------------------------------------------------------- */

import { useEffect, useRef, useState } from 'react';
import { bewegungReduziert } from './loop';

/**
 * Meldet, sobald das Element im sichtbaren Bereich angekommen ist.
 * Beobachtet danach nicht weiter — einmal gezeigt ist gezeigt.
 */
export function useImBlick<T extends HTMLElement>(schwelle = 0.15) {
  const ref = useRef<T>(null);
  const [sichtbar, setSichtbar] = useState(() => bewegungReduziert());

  useEffect(() => {
    if (sichtbar) return;
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setSichtbar(true);
      return;
    }
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((eintrag) => {
          if (eintrag.isIntersecting) {
            setSichtbar(true);
            beobachter.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: schwelle },
    );
    beobachter.observe(element);
    return () => beobachter.disconnect();
  }, [sichtbar, schwelle]);

  return [ref, sichtbar] as const;
}

/**
 * Zählt eine Zahl hoch, sobald sie sichtbar wird.
 * Bricht sauber auf dem Zielwert ab — nie eine falsche Zahl am Ende.
 */
export function useHochzaehlen(ziel: number, aktiv: boolean, dauer = 1000) {
  const [wert, setWert] = useState(() => (bewegungReduziert() ? ziel : 0));

  useEffect(() => {
    if (!aktiv || bewegungReduziert()) {
      setWert(ziel);
      return;
    }

    let animation = 0;
    const start = performance.now();

    const schritt = (jetzt: number) => {
      const anteil = Math.min((jetzt - start) / dauer, 1);
      // Weich auslaufend, damit die Zahl nicht abrupt stehen bleibt
      const geglaettet = 1 - Math.pow(1 - anteil, 3);
      setWert(Math.round(ziel * geglaettet));
      if (anteil < 1) animation = requestAnimationFrame(schritt);
    };

    animation = requestAnimationFrame(schritt);
    return () => cancelAnimationFrame(animation);
  }, [ziel, aktiv, dauer]);

  return wert;
}

/** Wie weit die Seite gescrollt ist, als Wert zwischen 0 und 1. */
export function useScrollFortschritt() {
  const [anteil, setAnteil] = useState(0);

  useEffect(() => {
    let angefordert = false;

    const messen = () => {
      angefordert = false;
      const hoehe = document.documentElement.scrollHeight - window.innerHeight;
      setAnteil(hoehe > 0 ? Math.min(window.scrollY / hoehe, 1) : 0);
    };

    const beiScroll = () => {
      if (angefordert) return;
      angefordert = true;
      requestAnimationFrame(messen);
    };

    messen();
    window.addEventListener('scroll', beiScroll, { passive: true });
    window.addEventListener('resize', beiScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', beiScroll);
      window.removeEventListener('resize', beiScroll);
    };
  }, []);

  return anteil;
}

/** Meldet, ob weiter als die angegebene Höhe gescrollt wurde. */
export function useTieferAls(pixel: number) {
  const [tiefer, setTiefer] = useState(false);

  useEffect(() => {
    let angefordert = false;
    const messen = () => {
      angefordert = false;
      setTiefer(window.scrollY > pixel);
    };
    const beiScroll = () => {
      if (angefordert) return;
      angefordert = true;
      requestAnimationFrame(messen);
    };
    messen();
    window.addEventListener('scroll', beiScroll, { passive: true });
    return () => window.removeEventListener('scroll', beiScroll);
  }, [pixel]);

  return tiefer;
}
