import { Link } from 'react-router-dom';

import {
  ausspielungenProTag,
  bildschirmeGesamt,
  faq,
  paketHinweise,
  seo,
  sicherheiten,
  staedteGesamt,
  standorte,
  standortHinweis,
  startseite,
} from '../content/site';
import { useJsonLd, useSeo } from '../lib/seo';

import Abschnitt from '../components/Abschnitt';
import Faq from '../components/Faq';
import Haken from '../components/Haken';
import Icon, { type IconName } from '../components/Icon';
import Kennzahlen from '../components/Kennzahlen';
import Motivgalerie from '../components/Motivgalerie';
import Pakete from '../components/Pakete';
import Referenzen from '../components/Referenzen';
import Reveal from '../components/Reveal';
import Schaufenster from '../components/Schaufenster';
import Schleife from '../components/Schleife';
import Standortkarte from '../components/Standortkarte';
import Titel from '../components/Titel';
import Zahl from '../components/Zahl';

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

  const { hero, dreiSchritte, schaufenster, paketeAbschnitt, standorteAbschnitt } = startseite;
  const faqKurz = faq.filter((eintrag) => eintrag.wichtig);

  return (
    <>
      {/* ============================================ 1 · Hero */}
      <section className="sektion-dunkel px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16">
        <div className="huelle grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 text-grau">
              <Icon name="standort" groesse={16} className="text-elektroblau" />
              {bildschirmeGesamt} Bildschirme · {staedteGesamt} Städte · alle in Betrieb
            </p>

            <h1 className="h1 mt-5">{hero.h1}</h1>
            <p className="fliess mt-6 text-grau">{hero.unterzeile}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to={hero.ctaPrimaer.ziel} className="btn-primaer">
                {hero.ctaPrimaer.text}
              </Link>
              <Link to={hero.ctaSekundaer.ziel} className="btn-sekundaer-dunkel">
                {hero.ctaSekundaer.text}
              </Link>
            </div>

            <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-xl text-offwhite">{hero.preisanker.ab}</span>
              <span className="text-sm text-grau">{hero.preisanker.zusatz}</span>
            </p>

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

        <div className="huelle mt-14 sm:mt-20">
          <Kennzahlen />
        </div>
      </section>

      {/* ============================================ 2 · In drei Schritten */}
      <Abschnitt id="ablauf">
        <Titel className="h2">{dreiSchritte.h2}</Titel>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {dreiSchritte.schritte.map((schritt, i) => (
            <Reveal as="li" key={schritt.titel} verzoegerung={i * 90} className="h-full">
              <div className="karte karte-heben flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-elektroblau/10 text-elektroblau">
                    <Icon name={schritt.icon as IconName} groesse={26} />
                  </span>
                  <span className="font-mono text-3xl font-medium tabular-nums text-grau/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.15rem] font-semibold leading-snug">{schritt.titel}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-grau-stark">{schritt.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 flex items-center gap-2.5 text-[0.95rem] text-grau-stark">
          <Icon name="haken" groesse={18} className="text-elektroblau" />
          {dreiSchritte.hinweis}
        </p>
      </Abschnitt>

      {/* ============================================ 3 · Standorte */}
      <Abschnitt dunkel id="standorte">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Titel className="h2">{standorteAbschnitt.h2}</Titel>
            <p className="fliess mt-4 text-grau">{standorteAbschnitt.unterzeile}</p>
          </div>
          <Link to="/standorte" className="btn-sekundaer-dunkel">
            Alle Standorte
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {standorte.map((standort, i) => (
            <Reveal key={standort.id} verzoegerung={i * 70} className="h-full">
              <Standortkarte standort={standort} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-lesbar text-sm text-grau">{standortHinweis}</p>
      </Abschnitt>

      {/* ============================================ 4 · So sieht es aus */}
      <Abschnitt id="so-sieht-es-aus">
        <Titel className="h2 max-w-[20ch]">{schaufenster.h2}</Titel>

        <Reveal richtung="zoom" className="mt-10">
          <Schaufenster />
        </Reveal>

        <div className="mt-14">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{schaufenster.motiveTitel}</h3>
          <p className="fliess mt-3 text-grau-stark">{schaufenster.motiveText}</p>
          <div className="mt-8">
            <Motivgalerie />
          </div>
          <p className="mt-8 flex items-center gap-2.5 border-t pt-6 text-lg font-medium trennlinie">
            <Icon name="stift" groesse={22} className="text-elektroblau" />
            {schaufenster.abschlusssatz}
          </p>
        </div>
      </Abschnitt>

      {/* ============================================ 5 · Pakete */}
      <section className="bg-weiss px-5 py-16 sm:px-8 sm:py-24 lg:py-28" id="pakete">
        <div className="huelle">
          <Titel className="h2">{paketeAbschnitt.h2}</Titel>

          {/* Bedenken zuerst, dann Preise */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sicherheiten.map((punkt, i) => (
              <Reveal key={punkt.titel} verzoegerung={i * 70} className="h-full">
                <div className="karte karte-heben flex h-full gap-3.5 p-5">
                  <span className="mt-0.5 shrink-0 text-elektroblau">
                    <Icon name={punkt.icon as IconName} groesse={22} />
                  </span>
                  <div>
                    <h3 className="text-[0.975rem] font-semibold leading-snug">{punkt.titel}</h3>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-grau-stark">
                      {punkt.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <Pakete />
          </div>

          <p className="mt-10">
            <Link to="/werben" className="btn-sekundaer-hell">
              Pakete im Detail vergleichen
            </Link>
          </p>
        </div>
      </section>

      {/* ============================================ 6 · Versprechen */}
      <Abschnitt dunkel id="versprechen">
        <Titel className="h2 max-w-[20ch]">{startseite.versprechen.h2}</Titel>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal richtung="links">
            <div className="karte-dunkel h-full p-6 sm:p-8">
              <h3 className="h3 text-offwhite">{startseite.versprechen.ja.titel}</h3>
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

          <Reveal richtung="rechts" verzoegerung={80}>
            <div className="h-full rounded-lg border border-dashed border-grau/40 p-6 sm:p-8">
              <h3 className="h3 text-grau">{startseite.versprechen.nein.titel}</h3>
              <ul className="mt-6 space-y-4">
                {startseite.versprechen.nein.punkte.map((punkt) => (
                  <li
                    key={punkt}
                    className="border-l-2 pl-4 text-[0.975rem] leading-relaxed text-grau"
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

      {/* ============================================ 7 · Team */}
      <Abschnitt>
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <div>
            <div
              className="hochformat flex w-full max-w-[240px] items-center justify-center rounded-lg border border-dashed border-grau/45 bg-weiss p-6 text-center"
              role="img"
              aria-label="Platzhalter für ein Foto von Haroon Mishkoo"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-grau-stark">
                {startseite.person.fotoPlatzhalter}
              </span>
            </div>
            <p className="mt-3 text-sm text-grau-stark">{startseite.person.fotoUnterschrift}</p>
          </div>

          <div>
            <Titel className="h2">{startseite.person.h2}</Titel>
            <p className="fliess mt-6 text-grau-stark">{startseite.person.text}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {startseite.person.rollen.map((rolle, i) => (
                <Reveal key={rolle.titel} verzoegerung={i * 70} className="h-full">
                  <div className="karte karte-heben flex h-full gap-4 p-5">
                    <span className="font-mono text-3xl font-medium tabular-nums text-elektroblau">
                      {rolle.anzahl}
                    </span>
                    <div>
                      <h3 className="text-[0.975rem] font-semibold">{rolle.titel}</h3>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-grau-stark">
                        {rolle.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Erscheint automatisch, sobald echte Referenzen eingetragen sind */}
      <Referenzen />

      {/* ============================================ 8 · Fragen */}
      <section className="bg-weiss px-5 py-16 sm:px-8 sm:py-24 lg:py-28" id="faq">
        <div className="huelle">
          <div className="mb-10 text-center">
            <Titel className="h2">{startseite.faqAbschnitt.h2}</Titel>
            <p className="mx-auto mt-4 max-w-lesbar text-grau-stark">
              {startseite.faqAbschnitt.unterzeile}
            </p>
          </div>

          <Faq eintraege={faqKurz} />

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-4">
            <Link to="/werben#faq" className="text-[0.95rem] font-medium underline">
              Alle {faq.length} Fragen ansehen
            </Link>
            <Link to="/kontakt" className="btn-sekundaer-hell">
              {startseite.faqAbschnitt.abschlussTitel}
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ 9 · Zwei Wege */}
      <Abschnitt dunkel>
        <Titel className="h2 text-center">{startseite.abschluss.h2}</Titel>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {startseite.abschluss.karten.map((karte, i) => (
            <Reveal key={karte.titel} verzoegerung={i * 80} className="h-full">
              <article className="karte-dunkel karte-heben flex h-full flex-col p-7">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-elektroblau/15 text-elektroblau">
                  <Icon name={i === 0 ? 'bildschirm' : 'schaufenster'} groesse={24} />
                </span>
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

        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm text-grau">
          <span className="inline-flex items-center gap-2">
            <Icon name="netz" groesse={18} className="text-elektroblau" />
            <Zahl wert={bildschirmeGesamt} className="text-offwhite" /> Bildschirme in{' '}
            {staedteGesamt} Städten
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon name="schleife" groesse={18} className="text-elektroblau" />
            <Zahl wert={ausspielungenProTag} className="text-offwhite" /> Ausspielungen pro Tag
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon name="euro" groesse={18} className="text-elektroblau" />
            {paketHinweise.preis.split('.')[0]}
          </span>
        </p>
      </Abschnitt>
    </>
  );
}
