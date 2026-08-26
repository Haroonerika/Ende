/* ------------------------------------------------------------------
   SEO: Titel, Meta-Description, Open Graph und Canonical je Seite.
   Die Inhalte kommen aus src/content/site.ts (Objekt `seo`).
------------------------------------------------------------------- */

import { useEffect } from 'react';
import { marke } from '../content/site';

type SeoAngaben = {
  titel: string;
  beschreibung: string;
  pfad: string;
};

function setzeMeta(auswahl: string, attribut: 'name' | 'property', wert: string, inhalt: string) {
  let element = document.head.querySelector<HTMLMetaElement>(auswahl);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribut, wert);
    document.head.appendChild(element);
  }
  element.setAttribute('content', inhalt);
}

export function useSeo({ titel, beschreibung, pfad }: SeoAngaben) {
  useEffect(() => {
    const url = `${marke.url}${pfad}`;

    document.title = titel;
    setzeMeta('meta[name="description"]', 'name', 'description', beschreibung);

    setzeMeta('meta[property="og:title"]', 'property', 'og:title', titel);
    setzeMeta('meta[property="og:description"]', 'property', 'og:description', beschreibung);
    setzeMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setzeMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setzeMeta('meta[property="og:locale"]', 'property', 'og:locale', 'de_DE');
    setzeMeta('meta[property="og:site_name"]', 'property', 'og:site_name', marke.name);
    setzeMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [titel, beschreibung, pfad]);
}

/**
 * Strukturierte Daten. Bewusst nur `Organization` und `FAQPage` —
 * KEIN `LocalBusiness`, solange keine bestätigte Geschäftsanschrift existiert.
 */
export function useJsonLd(id: string, daten: object | null) {
  useEffect(() => {
    if (!daten) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(daten);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [id, daten]);
}
