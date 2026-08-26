import { Outlet } from 'react-router-dom';
import { marke } from '../content/site';
import { useJsonLd } from '../lib/seo';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  /* Strukturierte Daten: nur Organization — bewusst KEIN LocalBusiness,
     solange keine bestätigte Geschäftsanschrift existiert. */
  useJsonLd('ld-organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: marke.name,
    url: marke.url,
    description: marke.kurzbeschreibung,
    founder: { '@type': 'Person', name: marke.inhaber },
    areaServed: 'Haren (Ems), Meppen, Lingen',
  });

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-elektroblau focus:px-4 focus:py-3 focus:font-semibold focus:text-weiss"
      >
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
