import { Link } from 'react-router-dom';
import {
  ausspielungenProTag,
  produkt,
  schleifenrechnung,
  seiteSoFunktionierts,
  seiteStandortpartner,
  seo,
  startseite,
} from '../content/site';
import { useSeo } from '../lib/seo';

import Abschnitt from '../components/Abschnitt';
import Reveal from '../components/Reveal';
import Schleife from '../components/Schleife';
import Schritte from '../components/Schritte';

export default function SoFunktionierts() {
  useSeo(seo.soFunktionierts);

  return (
    <>
      <section className="sektion-dunkel px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <div className="huelle grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-grau">{seiteSoFunktionierts.eyebrow}</p>
            <h1 className="h1 mt-4">{seiteSoFunktionierts.h1}</h1>
            <p className="fliess mt-6 text-grau">{seiteSoFunktionierts.einleitung}</p>
          </div>
          <Schleife />
        </div>
      </section>

      {/* Weg 1: Werbekunden */}
      <Abschnitt>
        <p className="eyebrow text-grau-stark">Weg 1 · Werbekunden</p>
        <h2 className="h2 mt-3">{startseite.ablauf.h2}</h2>
        <div className="mt-10">
          <Schritte schritte={startseite.ablauf.schritte} />
        </div>
        <Link to="/kampagne-starten" className="btn-primaer mt-10">
          Kampagne starten
        </Link>
      </Abschnitt>

      {/* Weg 2: Standortpartner */}
      <Abschnitt dunkel>
        <p className="eyebrow text-grau">Weg 2 · Standortpartner</p>
        <h2 className="h2 mt-3">{seiteStandortpartner.ablaufTitel}</h2>
        <div className="mt-10">
          <Schritte schritte={seiteStandortpartner.ablauf} dunkel />
        </div>
        <Link to="/standortpartner" className="btn-sekundaer-dunkel mt-10">
          Standortpartner werden
        </Link>
      </Abschnitt>

      {/* Die Rechnung */}
      <Abschnitt>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="h2">{seiteSoFunktionierts.rechnungTitel}</h2>
            <ol className="mt-8 divide-y trennlinie border-y">
              {schleifenrechnung.map((zeile) => (
                <li key={zeile.formel} className="flex items-baseline justify-between gap-6 py-4">
                  <span className="text-[0.95rem] text-grau-stark">{zeile.erklaerung}</span>
                  <span className="shrink-0 font-mono text-[0.95rem] font-medium tabular-nums">
                    {zeile.formel}
                  </span>
                </li>
              ))}
            </ol>
            <p className="fliess mt-6 text-sm text-grau-stark">
              {seiteSoFunktionierts.rechnungHinweis}
            </p>
            <p className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">
              <span className="font-mono tabular-nums text-elektroblau">{ausspielungenProTag}</span>{' '}
              Ausspielungen pro Tag.
            </p>
          </div>

          <Reveal>
            <Schleife hell />
          </Reveal>
        </div>
      </Abschnitt>

      {/* Technik */}
      <Abschnitt dunkel>
        <h2 className="h2">{seiteSoFunktionierts.technikTitel}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {seiteSoFunktionierts.technik.map((punkt, i) => (
            <Reveal key={punkt.titel} verzoegerung={i * 60} className="h-full">
              <article className="karte-dunkel h-full p-6">
                <h3 className="text-[1.05rem] font-semibold">{punkt.titel}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-grau">{punkt.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <dl className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-grau">Format</dt>
            <dd className="font-mono text-lg tabular-nums">
              {produkt.formatBreite} × {produkt.formatHoehe}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-grau">Spotlänge</dt>
            <dd className="font-mono text-lg tabular-nums">{produkt.spotSekunden} Sekunden</dd>
          </div>
          <div>
            <dt className="text-sm text-grau">Betriebszeit</dt>
            <dd className="font-mono text-lg tabular-nums">
              {produkt.betriebVon}–{produkt.betriebBis} Uhr
            </dd>
          </div>
        </dl>
      </Abschnitt>
    </>
  );
}
