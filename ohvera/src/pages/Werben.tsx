import { Link } from 'react-router-dom';
import {
  ausspielungenProTag,
  bildschirmeGesamt,
  paketHinweise,
  produkt,
  seiteWerben,
  seo,
  staedteGesamt,
  startseite,
  zusagen,
} from '../content/site';
import { useSeo } from '../lib/seo';

import Abschnitt from '../components/Abschnitt';
import Faq from '../components/Faq';
import Haken from '../components/Haken';
import Icon from '../components/Icon';
import Kostenrechnung from '../components/Kostenrechnung';
import Motivgalerie from '../components/Motivgalerie';
import Pakete from '../components/Pakete';
import Reveal from '../components/Reveal';
import Schleife from '../components/Schleife';
import Schritte from '../components/Schritte';
import Titel from '../components/Titel';

/* Diese Seite trägt die Argumentation, die auf der Startseite bewusst
   fehlt: das Problem, der Kreativservice, alle Zusagen, der Preis im
   Detail und die vollständige Fragenliste. */

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

      {/* Warum überhaupt */}
      <Abschnitt>
        <Titel className="h2 max-w-[18ch]">{startseite.problem.h2}</Titel>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {startseite.problem.punkte.map((punkt, i) => (
            <Reveal key={punkt.titel} verzoegerung={i * 70} className="h-full">
              <article className="karte karte-heben flex h-full flex-col p-6 sm:p-7">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-elektroblau/10 text-elektroblau">
                  <Icon name={['protokoll', 'nachricht', 'euro'][i] as 'protokoll'} groesse={22} />
                </span>
                <h3 className="text-[1.05rem] font-semibold leading-snug">{punkt.titel}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-grau-stark">{punkt.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Abschnitt>

      {/* Kreativservice */}
      <Abschnitt dunkel>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <Titel className="h2">{startseite.kreativ.h2}</Titel>
            <p className="fliess mt-6 text-grau">{startseite.kreativ.text}</p>
          </div>
          <Reveal richtung="rechts">
            <Motivgalerie />
          </Reveal>
        </div>
      </Abschnitt>

      {/* Pakete */}
      <Abschnitt id="pakete">
        <Titel className="h2">{startseite.paketeAbschnitt.h2}</Titel>
        <div className="mt-10">
          <Pakete />
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal richtung="links">
            <Kostenrechnung />
          </Reveal>
          <Reveal richtung="rechts" className="lg:pt-2">
            <div className="rounded-lg border border-dashed border-grau/40 p-6">
              <h3 className="h3">Noch unsicher, welches Paket?</h3>
              <p className="fliess mt-3 text-grau-stark">
                Dann schreib uns kurz, was du bewerben willst — wir sagen dir ehrlich, welches
                Paket passt. Auch wenn das BASIS ist.
              </p>
              <Link to="/kampagne-starten" className="btn-primaer mt-6">
                Unverbindlich anfragen
              </Link>
            </div>
          </Reveal>
        </div>
      </Abschnitt>

      {/* Vergleichstabelle */}
      <Abschnitt dunkel>
        <Titel className="h2">{seiteWerben.vergleichTitel}</Titel>
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
        <Titel className="h2">{seiteWerben.zusagenTitel}</Titel>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {zusagen.map((zusage, i) => (
            <Reveal key={zusage.titel} verzoegerung={i * 60} className="h-full">
              <article className="karte karte-heben flex h-full gap-4 p-6">
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
        <Titel className="h2">{seiteWerben.ablaufTitel}</Titel>
        <div className="mt-10">
          <Schritte schritte={startseite.ablauf.schritte} dunkel />
        </div>
      </Abschnitt>

      {/* Alle Fragen */}
      <Abschnitt id="faq">
        <div className="mb-10 text-center">
          <Titel className="h2">{startseite.faqAbschnitt.h2}</Titel>
          <p className="mx-auto mt-4 max-w-lesbar text-grau-stark">
            {startseite.faqAbschnitt.unterzeile}
          </p>
        </div>
        <Faq />
      </Abschnitt>

      {/* Abschluss */}
      <Abschnitt dunkel>
        <div className="mx-auto max-w-2xl text-center">
          <Titel className="h2">
            Ein Platz von {produkt.slotsVerkaeuflich}. Auf einem von {bildschirmeGesamt}.
          </Titel>
          <p className="fliess mx-auto mt-5 text-grau">
            {ausspielungenProTag} Ausspielungen pro Tag, {produkt.betriebStunden} Stunden Betrieb,
            Gestaltung inklusive — in {staedteGesamt} Städten. Die Anfrage ist unverbindlich.
          </p>
          <Link to="/kampagne-starten" className="btn-primaer mt-8">
            Kampagne starten
          </Link>
        </div>
      </Abschnitt>
    </>
  );
}
