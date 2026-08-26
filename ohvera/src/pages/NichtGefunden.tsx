import { Link } from 'react-router-dom';
import { marke } from '../content/site';
import { useSeo } from '../lib/seo';
import Abschnitt from '../components/Abschnitt';

export default function NichtGefunden() {
  useSeo({
    titel: `Seite nicht gefunden | ${marke.name}`,
    beschreibung: 'Diese Seite gibt es nicht.',
    pfad: '/404',
  });

  return (
    <Abschnitt dunkel>
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="font-mono text-5xl font-medium tabular-nums text-elektroblau">404</p>
        <h1 className="h1 mt-6">Diese Seite gibt es nicht.</h1>
        <p className="fliess mx-auto mt-5 text-grau">
          Vielleicht hat sich ein Tippfehler eingeschlichen. Von hier kommst du überall hin.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primaer">
            Zur Startseite
          </Link>
          <Link to="/werben" className="btn-sekundaer-dunkel">
            Werbung schalten
          </Link>
        </div>
      </div>
    </Abschnitt>
  );
}
