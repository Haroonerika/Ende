import { Link } from 'react-router-dom';
import {
  ausspielungenNetzProTag,
  bildschirmeGesamt,
  plaetzeGesamt,
  produkt,
  seiteStandorte,
  seo,
  staedteGesamt,
  standorte,
  standortHinweis,
} from '../content/site';
import { useSeo } from '../lib/seo';

import Abschnitt from '../components/Abschnitt';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import Standortkarte from '../components/Standortkarte';
import Titel from '../components/Titel';
import Zahl from '../components/Zahl';

export default function Standorte() {
  useSeo(seo.standorte);

  const kennzahlen = [
    { icon: 'bildschirm', wert: bildschirmeGesamt, einheit: 'Bildschirme', text: 'alle in Betrieb' },
    { icon: 'standort', wert: staedteGesamt, einheit: 'Städte', text: 'im Emsland und der Grafschaft' },
    { icon: 'schleife', wert: plaetzeGesamt, einheit: 'Plätze', text: 'buchbar im gesamten Netz' },
    {
      icon: 'uhr',
      wert: ausspielungenNetzProTag,
      einheit: 'Ausspielungen',
      text: 'pro Tag über alle Bildschirme',
    },
  ] as const;

  return (
    <>
      <section className="sektion-dunkel px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
        <div className="huelle">
          <div className="max-w-3xl">
            <p className="eyebrow text-grau">{seiteStandorte.eyebrow}</p>
            <h1 className="h1 mt-4">{seiteStandorte.h1}</h1>
            <p className="fliess mt-6 text-grau">{seiteStandorte.einleitung}</p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 lg:grid-cols-4">
            {kennzahlen.map((eintrag, i) => (
              <Reveal key={eintrag.einheit} verzoegerung={i * 70} as="div">
                <dt className="sr-only">{eintrag.text}</dt>
                <dd>
                  <Icon name={eintrag.icon} groesse={22} className="text-elektroblau" />
                  <span className="mt-3 block">
                    <Zahl wert={eintrag.wert} className="text-3xl font-medium sm:text-4xl" />
                    <span className="ml-1.5 font-mono text-sm text-grau">{eintrag.einheit}</span>
                  </span>
                  <span className="mt-1.5 block text-[0.85rem] leading-snug text-grau">
                    {eintrag.text}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <Abschnitt>
        <Titel className="h2">Wo die Bildschirme hängen</Titel>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {standorte.map((standort, i) => (
            <Reveal key={standort.id} verzoegerung={i * 70} className="h-full">
              <Standortkarte standort={standort} hell />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-lesbar text-sm text-grau-stark">{standortHinweis}</p>
      </Abschnitt>

      <Abschnitt dunkel>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Titel className="h2">{seiteStandorte.geplantTitel}</Titel>
            <p className="fliess mt-5 text-grau">{seiteStandorte.geplantText}</p>
          </div>

          <div className="space-y-5">
            <div className="karte-dunkel p-6">
              <h3 className="h3 text-offwhite">Jeder Bildschirm arbeitet gleich</h3>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  ['Format', `Hochformat ${produkt.formatBreite} × ${produkt.formatHoehe}`],
                  ['Betriebszeit', `${produkt.betriebVon}–${produkt.betriebBis} Uhr`],
                  ['Schleife', `${produkt.schleifeSekunden} Sekunden, ${produkt.slotsGesamt} Plätze`],
                  ['Buchbar', `${produkt.slotsVerkaeuflich} Plätze je Bildschirm`],
                ].map(([bezeichnung, wert]) => (
                  <div
                    key={bezeichnung}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2.5"
                  >
                    <dt className="text-grau">{bezeichnung}</dt>
                    <dd className="text-right font-mono text-[0.8rem] tabular-nums">{wert}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-lg border border-dashed border-grau/40 p-6">
              <h3 className="h3 text-offwhite">{seiteStandorte.partnerHinweis}</h3>
              <Link to="/standortpartner" className="btn-sekundaer-dunkel mt-5">
                Fläche anbieten
              </Link>
            </div>
          </div>
        </div>
      </Abschnitt>

      <Abschnitt>
        <div className="mx-auto max-w-2xl text-center">
          <Titel className="h2">In welcher Stadt willst du gesehen werden?</Titel>
          <p className="fliess mx-auto mt-5 text-grau-stark">
            Sag uns die Stadt, wir sagen dir, welche Plätze dort frei sind. Wer überall laufen will,
            nimmt NETWORK.
          </p>
          <Link to="/kampagne-starten" className="btn-primaer mt-8">
            Platz anfragen
          </Link>
        </div>
      </Abschnitt>
    </>
  );
}
