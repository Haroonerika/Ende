import { Link } from 'react-router-dom';

import {
  ausspielungenProTag,
  faq,
  produkt,
  standorte,
  standortHinweis,
  startseite,
  seo,
  zusagen,
} from '../content/site';
import { useJsonLd, useSeo } from '../lib/seo';

import Abschnitt from '../components/Abschnitt';
import Faq from '../components/Faq';
import Haken from '../components/Haken';
import Motivgalerie from '../components/Motivgalerie';
import Pakete from '../components/Pakete';
import Referenzen from '../components/Referenzen';
import Reveal from '../components/Reveal';
import Schaufenster from '../components/Schaufenster';
import Schleife from '../components/Schleife';
import Schritte from '../components/Schritte';
import Standortkarte from '../components/Standortkarte';

export default function Start() {
  useSeo(seo.start);
  useJsonLd('ld-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((eintrag) => ({
      '@type': 'Question',
      name: eintrag.frage,
      acceptedAnswer: { '@type': 'Answer', text: eintrag.antwort },
    })),
  });

  const { hero, problem, ablauf, kreativ, schaufenster, paketeAbschnitt, standorteAbschnitt } =
    startseite;

  return (
    <>
      {/* ---------------------------------------------- Hero */}
      <section className="sektion-dunkel px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
        <div className="huelle grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 text-grau">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-elektroblau" />
              Im Aufbau · Pilotphase
            </p>
            <h1 className="h1 mt-5">{hero.h1}</h1>
            <p className="fliess mt-6 text-grau">{hero.unterzeile}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={hero.ctaPrimaer.ziel} className="btn-primaer">
                {hero.ctaPrimaer.text}
              </Link>
              <Link to={hero.ctaSekundaer.ziel} className="btn-sekundaer-dunkel">
                {hero.ctaSekundaer.text}
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-grau">
              {hero.vertrauenszeile.map((punkt) => (
                <li key={punkt} className="flex items-center gap-2">
                  <Haken farbe="#1B57FF" />
                  {punkt}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <Schleife />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Problem */}
      <Abschnitt>
        <h2 className="h2 max-w-[18ch]">{problem.h2}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problem.punkte.map((punkt, i) => (
            <Reveal key={punkt.titel} verzoegerung={i * 70} className="h-full">
              <article className="karte flex h-full flex-col p-6 sm:p-7">
                <span
                  aria-hidden="true"
                  className="mb-6 block h-24 w-[54px] rounded border border-grau/25 bg-offwhite"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(180deg, rgba(138,144,153,0.22) 0 1px, transparent 1px 9px)',
                  }}
                />
                <h3 className="text-[1.05rem] font-semibold leading-snug">{punkt.titel}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-grau-stark">{punkt.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Abschnitt>

      {/* ---------------------------------------------- So funktioniert's */}
      <Abschnitt dunkel id="ablauf">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="h2">{ablauf.h2}</h2>
          <Link to="/so-funktionierts" className="btn-sekundaer-dunkel">
            Ausführlich ansehen
          </Link>
        </div>
        <Schritte schritte={ablauf.schritte} dunkel />
      </Abschnitt>

      {/* ---------------------------------------------- Kreativservice */}
      <Abschnitt>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="h2">{kreativ.h2}</h2>
            <p className="fliess mt-6 text-grau-stark">{kreativ.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {zusagen.map((zusage) => (
                <li key={zusage.titel} className="flex gap-2.5">
                  <Haken farbe="#1B57FF" />
                  <span>
                    <span className="font-semibold">{zusage.titel}.</span>{' '}
                    <span className="text-grau-stark">{zusage.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <Schleife hell />
          </Reveal>
        </div>
      </Abschnitt>

      {/* ---------------------------------------------- So sieht es aus */}
      <Abschnitt dunkel id="so-sieht-es-aus">
        <h2 className="h2 max-w-[20ch]">{schaufenster.h2}</h2>

        <Reveal className="mt-10">
          <Schaufenster />
        </Reveal>

        <div className="mt-16">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{schaufenster.motiveTitel}</h3>
          <p className="fliess mt-3 text-grau">{schaufenster.motiveText}</p>
          <div className="mt-8">
            <Motivgalerie />
          </div>
          <p className="mt-8 border-t border-white/10 pt-6 text-lg font-medium">
            {schaufenster.abschlusssatz}
          </p>
        </div>
      </Abschnitt>

      {/* ---------------------------------------------- Pakete */}
      <Abschnitt id="pakete">
        <h2 className="h2">{paketeAbschnitt.h2}</h2>
        <div className="mt-10">
          <Pakete />
        </div>
      </Abschnitt>

      {/* ---------------------------------------------- Standorte */}
      <Abschnitt dunkel id="standorte">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-16">
          <div>
            <h2 className="h2">{standorteAbschnitt.h2}</h2>
            <p className="fliess mt-6 text-grau">{standortHinweis}</p>
            <dl className="mt-8 grid max-w-md gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-grau">Betriebszeit</dt>
                <dd className="font-mono text-lg tabular-nums">
                  {produkt.betriebVon}–{produkt.betriebBis} Uhr
                </dd>
              </div>
              <div>
                <dt className="text-sm text-grau">Ausspielungen pro Tag</dt>
                <dd className="font-mono text-lg tabular-nums">{ausspielungenProTag}</dd>
              </div>
            </dl>
          </div>
          <Reveal className="flex justify-center lg:justify-end">
            {standorte.map((standort) => (
              <Standortkarte key={standort.id} standort={standort} />
            ))}
          </Reveal>
        </div>
      </Abschnitt>

      {/* ---------------------------------------------- Was ich verspreche */}
      <Abschnitt id="versprechen">
        <h2 className="h2 max-w-[20ch]">{startseite.versprechen.h2}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="karte h-full p-6 sm:p-8">
              <h3 className="h3">{startseite.versprechen.ja.titel}</h3>
              <ul className="mt-6 space-y-3.5">
                {startseite.versprechen.ja.punkte.map((punkt) => (
                  <li key={punkt} className="flex gap-2.5 text-[1rem] leading-relaxed">
                    <Haken farbe="#1B57FF" />
                    {punkt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal verzoegerung={80}>
            <div className="h-full rounded-lg border border-dashed border-grau/40 p-6 sm:p-8">
              <h3 className="h3 text-grau-stark">{startseite.versprechen.nein.titel}</h3>
              <ul className="mt-6 space-y-4">
                {startseite.versprechen.nein.punkte.map((punkt) => (
                  <li
                    key={punkt}
                    className="border-l-2 pl-4 text-[0.975rem] leading-relaxed text-grau-stark"
                    style={{ borderColor: 'rgba(138,144,153,0.4)' }}
                  >
                    {punkt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Abschnitt>

      {/* ---------------------------------------------- Wer dahintersteht */}
      <section className="bg-weiss px-5 py-16 sm:px-8 sm:py-24">
        <div className="huelle grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <div>
            <div
              className="hochformat flex w-full max-w-[260px] items-center justify-center rounded-lg border border-dashed border-grau/45 bg-offwhite p-6 text-center"
              role="img"
              aria-label="Platzhalter für ein Foto von Haroon Mishkoo"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-grau-stark">
                {startseite.person.fotoPlatzhalter}
              </span>
            </div>
          </div>
          <div>
            <h2 className="h2">{startseite.person.h2}</h2>
            <p className="fliess mt-6 text-grau-stark">{startseite.person.text}</p>
            <Link to="/kontakt" className="btn-sekundaer-hell mt-8">
              Direkt Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      {/* Erscheint automatisch, sobald echte Referenzen eingetragen sind */}
      <Referenzen />

      {/* ---------------------------------------------- Standortpartner */}
      <Abschnitt dunkel id="standortpartner">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="h2">{startseite.partner.h2}</h2>
            <p className="fliess mt-6 text-grau">{startseite.partner.text}</p>
            <Link to={startseite.partner.cta.ziel} className="btn-primaer mt-8">
              {startseite.partner.cta.text}
            </Link>
          </div>
          <Reveal>
            <div className="karte-dunkel p-6">
              <p className="eyebrow text-grau">Der Platz des Standortpartners</p>
              <p className="mt-4 font-mono text-5xl font-medium tabular-nums text-elektroblau">
                01
              </p>
              <p className="mt-2 text-lg font-medium">
                Ein fester Platz in der Schleife — dauerhaft und kostenlos.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-grau">
                Von den {produkt.slotsGesamt} Plätzen sind {produkt.slotsVerkaeuflich} buchbar. Einer
                gehört dem Standortpartner, einer OHVERA.
              </p>
            </div>
          </Reveal>
        </div>
      </Abschnitt>

      {/* ---------------------------------------------- FAQ */}
      <Abschnitt id="faq">
        <h2 className="h2 mb-10 text-center">{startseite.faqAbschnitt.h2}</h2>
        <Faq />
      </Abschnitt>

      {/* ---------------------------------------------- Abschluss */}
      <Abschnitt dunkel>
        <h2 className="h2 text-center">{startseite.abschluss.h2}</h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {startseite.abschluss.karten.map((karte, i) => (
            <Reveal key={karte.titel} verzoegerung={i * 80} className="h-full">
              <article className="karte-dunkel flex h-full flex-col p-7">
                <h3 className="font-display text-xl font-bold">{karte.titel}</h3>
                <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-grau">{karte.text}</p>
                <Link
                  to={karte.cta.ziel}
                  className={`mt-6 w-full ${i === 0 ? 'btn-primaer' : 'btn-sekundaer-dunkel'}`}
                >
                  {karte.cta.text}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Abschnitt>
    </>
  );
}
