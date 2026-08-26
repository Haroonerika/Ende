import { Link } from 'react-router-dom';
import {
  ausspielungenProTag,
  paketHinweise,
  produkt,
  seiteWerben,
  seo,
  startseite,
  zusagen,
} from '../content/site';
import { useSeo } from '../lib/seo';

import Abschnitt from '../components/Abschnitt';
import Haken from '../components/Haken';
import Motivgalerie from '../components/Motivgalerie';
import Pakete from '../components/Pakete';
import Reveal from '../components/Reveal';
import Schleife from '../components/Schleife';
import Schritte from '../components/Schritte';

export default function Werben() {
  useSeo(seo.werben);

  return (
    <>
      <section className="sektion-dunkel px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <div className="huelle grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-grau">{seiteWerben.eyebrow}</p>
            <h1 className="h1 mt-4">{seiteWerben.h1}</h1>
            <p className="fliess mt-6 text-grau">{seiteWerben.einleitung}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/kampagne-starten" className="btn-primaer">
                Kampagne starten
              </Link>
              <a href="#pakete" className="btn-sekundaer-dunkel">
                Pakete ansehen
              </a>
            </div>
          </div>
          <Schleife />
        </div>
      </section>

      <Abschnitt id="pakete">
        <h2 className="h2">{startseite.paketeAbschnitt.h2}</h2>
        <div className="mt-10">
          <Pakete />
        </div>
      </Abschnitt>

      {/* Vergleichstabelle */}
      <Abschnitt dunkel>
        <h2 className="h2">{seiteWerben.vergleichTitel}</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
            <caption className="sr-only">
              Vergleich der Pakete BASIS, PLUS und PRO nach Leistungsmerkmalen
            </caption>
            <thead>
              <tr className="border-b border-white/15">
                <th scope="col" className="py-4 pr-4 font-medium text-grau">
                  Merkmal
                </th>
                <th scope="col" className="py-4 pr-4 font-display text-lg font-bold">
                  BASIS
                </th>
                <th scope="col" className="py-4 pr-4 font-display text-lg font-bold">
                  PLUS
                </th>
                <th scope="col" className="py-4 font-display text-lg font-bold text-elektroblau">
                  PRO
                </th>
              </tr>
            </thead>
            <tbody>
              {seiteWerben.vergleichZeilen.map((zeile) => (
                <tr key={zeile.merkmal} className="border-b border-white/10">
                  <th scope="row" className="py-4 pr-4 font-normal text-grau">
                    {zeile.merkmal}
                  </th>
                  <td className="py-4 pr-4">{zeile.basis}</td>
                  <td className="py-4 pr-4">{zeile.plus}</td>
                  <td className="py-4">{zeile.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-grau">{paketHinweise.exklusivitaet}</p>
      </Abschnitt>

      {/* Zusagen */}
      <Abschnitt>
        <h2 className="h2">{seiteWerben.zusagenTitel}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {zusagen.map((zusage, i) => (
            <Reveal key={zusage.titel} verzoegerung={i * 60} className="h-full">
              <article className="karte flex h-full gap-4 p-6">
                <Haken farbe="#1B57FF" />
                <div>
                  <h3 className="text-[1.05rem] font-semibold">{zusage.titel}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-grau-stark">
                    {zusage.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Abschnitt>

      {/* Ablauf */}
      <Abschnitt dunkel>
        <h2 className="h2 mb-10">{seiteWerben.ablaufTitel}</h2>
        <Schritte schritte={startseite.ablauf.schritte} dunkel />
      </Abschnitt>

      {/* Motive */}
      <Abschnitt>
        <h2 className="h2">{startseite.schaufenster.motiveTitel}</h2>
        <p className="fliess mt-4 text-grau-stark">{startseite.schaufenster.motiveText}</p>
        <div className="mt-8">
          <Motivgalerie />
        </div>
      </Abschnitt>

      {/* Abschluss */}
      <Abschnitt dunkel>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2">Ein Platz von {produkt.slotsVerkaeuflich}.</h2>
          <p className="fliess mx-auto mt-5 text-grau">
            {ausspielungenProTag} Ausspielungen pro Tag, {produkt.betriebStunden} Stunden Betrieb,
            Gestaltung inklusive. Die Anfrage ist unverbindlich.
          </p>
          <Link to="/kampagne-starten" className="btn-primaer mt-8">
            Kampagne starten
          </Link>
        </div>
      </Abschnitt>
    </>
  );
}
