import { Link, useLocation } from 'react-router-dom';
import { kampagnenformular, partnerformular, seo } from '../content/site';
import { useSeo } from '../lib/seo';
import Abschnitt from '../components/Abschnitt';

type Zustand = { typ?: 'kampagne' | 'standortpartner' | 'kontakt' };

/** Erfolgsseite. Sagt konkret, was als Nächstes passiert. */
export default function Danke() {
  useSeo(seo.danke);
  const ort = useLocation();
  const typ = (ort.state as Zustand | null)?.typ ?? 'kontakt';

  const inhalt =
    typ === 'standortpartner'
      ? partnerformular.erfolg
      : typ === 'kampagne'
        ? kampagnenformular.erfolg
        : {
            h1: 'Danke für deine Nachricht.',
            text: 'Deine Nachricht liegt bei mir.',
            schritte: [
              'Ich melde mich innerhalb von zwei Werktagen bei dir.',
              'Wenn es eilig ist, ruf mich einfach an — das geht schneller.',
            ],
          };

  return (
    <>
      <section className="sektion-dunkel px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="huelle max-w-2xl">
          <span className="badge-blau">Angekommen</span>
          <h1 className="h1 mt-5">{inhalt.h1}</h1>
          <p className="fliess mt-6 text-grau">{inhalt.text}</p>
        </div>
      </section>

      <Abschnitt>
        <div className="max-w-2xl">
          <h2 className="h2">Was als Nächstes passiert</h2>
          <ol className="mt-8 divide-y trennlinie border-y">
            {inhalt.schritte.map((schritt, i) => (
              <li key={schritt} className="flex gap-5 py-5">
                <span className="font-mono text-lg tabular-nums text-elektroblau">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[1rem] leading-relaxed">{schritt}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="btn-primaer">
              Zur Startseite
            </Link>
            <Link to="/so-funktionierts" className="btn-sekundaer-hell">
              So funktioniert's
            </Link>
          </div>
        </div>
      </Abschnitt>
    </>
  );
}
