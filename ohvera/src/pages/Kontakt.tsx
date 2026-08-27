import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { kontakt, seiteKontakt, seo } from '../content/site';
import { kontaktwege } from '../lib/kontakt';
import { useSeo } from '../lib/seo';
import type { Nachrichtenzeile, Versandweg } from '../lib/submit';
import { fehltPflichtfeld, hatFehler, pruefeEmail, pruefeTelefon, type Fehlerliste } from '../lib/validierung';

import Abschnitt from '../components/Abschnitt';
import { Honigtopf, Kontrollkaestchen, Textfeld } from '../components/forms/Felder';
import Versandhinweis from '../components/forms/Versandhinweis';
import Versandknoepfe from '../components/forms/Versandknoepfe';

const LEER = {
  name: '',
  email: '',
  telefon: '',
  nachricht: '',
  datenschutz: false,
  website: '',
};

export default function Kontakt() {
  useSeo(seo.kontakt);
  const navigate = useNavigate();
  const wege = kontaktwege();

  const [daten, setDaten] = useState(LEER);
  const [fehler, setFehler] = useState<Fehlerliste>({});
  const [sendet, setSendet] = useState(false);
  const [versandFehler, setVersandFehler] = useState<string | null>(null);

  const setzeWert = <K extends keyof typeof LEER>(feld: K, wert: (typeof LEER)[K]) => {
    setDaten((vorher) => ({ ...vorher, [feld]: wert }));
    setFehler((vorher) => ({ ...vorher, [feld]: '' }));
  };

  function pruefeVorVersand(): boolean {
    const gefunden: Fehlerliste = {
      name: fehltPflichtfeld(daten.name, 'deinen Namen') ?? '',
      email: pruefeEmail(daten.email) ?? '',
      telefon: pruefeTelefon(daten.telefon) ?? '',
      nachricht: fehltPflichtfeld(daten.nachricht, 'eine kurze Nachricht') ?? '',
      datenschutz: daten.datenschutz
        ? ''
        : 'Bitte bestätigen, dass die Datenschutzerklärung gelesen wurde.',
    };
    setFehler(gefunden);
    if (hatFehler(gefunden)) return false;
    setVersandFehler(null);
    return true;
  }

  function nachrichtenzeilen(): Nachrichtenzeile[] {
    return [
      { bezeichnung: 'Name', wert: daten.name },
      { bezeichnung: 'E-Mail', wert: daten.email },
      { bezeichnung: 'Telefon', wert: daten.telefon },
      { bezeichnung: 'Nachricht', wert: daten.nachricht },
    ];
  }

  function beiErfolg(weg: Versandweg) {
    navigate('/danke', { state: { typ: 'kontakt', weg } });
  }

  return (
    <>
      <section className="sektion-dunkel px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
        <div className="huelle max-w-3xl">
          <p className="eyebrow text-grau">{seiteKontakt.eyebrow}</p>
          <h1 className="h1 mt-4">{seiteKontakt.h1}</h1>
          <p className="fliess mt-6 text-grau">{seiteKontakt.einleitung}</p>
          <p className="mt-4 text-sm text-grau">{kontakt.antwortzeit}</p>
        </div>
      </section>

      <Abschnitt>
        <h2 className="h2">{seiteKontakt.wegeTitel}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {wege.map((weg) => (
            <article key={weg.id} className="karte flex flex-col p-6">
              <h3 className="font-display text-lg font-bold">{weg.bezeichnung}</h3>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-grau-stark">
                {weg.beschreibung}
              </p>
              {weg.ziel ? (
                <a
                  href={weg.ziel}
                  className="mt-4 break-words font-medium text-anthrazit underline"
                  {...(weg.id === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {weg.wert}
                </a>
              ) : (
                <p className="mt-4 font-mono text-sm text-grau-stark">{weg.wert}</p>
              )}
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-grau-stark">
          Wer bucht, bekommt einen festen Ansprechpartner. Gründer: {kontakt.ansprechpartner}.
          Postanschrift siehe{' '}
          <Link to="/impressum" className="underline">
            Impressum
          </Link>
          .
        </p>
      </Abschnitt>

      <Abschnitt dunkel>
        <div className="mx-auto max-w-2xl">
          <h2 className="h2">{seiteKontakt.formularTitel}</h2>
          <p className="fliess mt-4 text-grau">{seiteKontakt.formularEinleitung}</p>
          <p className="mt-4">
            <Link to="/kampagne-starten" className="text-offwhite underline">
              Zum Kampagnenformular
            </Link>
          </p>

          <div className="karte mt-8 p-6 sm:p-8">
            <form onSubmit={(e) => e.preventDefault()} noValidate className="relative space-y-5">
              <Honigtopf wert={daten.website} onChange={(wert) => setzeWert('website', wert)} />
              <p className="hilfstext">Mit * markierte Felder sind Pflichtfelder.</p>

              <Textfeld
                id="k-name"
                label="Name"
                pflicht
                autoComplete="name"
                wert={daten.name}
                onChange={(wert) => setzeWert('name', wert)}
                fehler={fehler.name || undefined}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Textfeld
                  id="k-email"
                  label="E-Mail"
                  typ="email"
                  pflicht
                  autoComplete="email"
                  wert={daten.email}
                  onChange={(wert) => setzeWert('email', wert)}
                  fehler={fehler.email || undefined}
                />
                <Textfeld
                  id="k-telefon"
                  label="Telefon"
                  typ="tel"
                  autoComplete="tel"
                  wert={daten.telefon}
                  onChange={(wert) => setzeWert('telefon', wert)}
                  fehler={fehler.telefon || undefined}
                />
              </div>
              <Textfeld
                id="k-nachricht"
                label="Nachricht"
                mehrzeilig
                pflicht
                wert={daten.nachricht}
                onChange={(wert) => setzeWert('nachricht', wert)}
                fehler={fehler.nachricht || undefined}
              />
              <Kontrollkaestchen
                id="k-datenschutz"
                checked={daten.datenschutz}
                onChange={(wert) => setzeWert('datenschutz', wert)}
                fehler={fehler.datenschutz || undefined}
              >
                Ich habe die{' '}
                <Link to="/datenschutz" className="underline">
                  Datenschutzerklärung
                </Link>{' '}
                gelesen und bin einverstanden.
                <span className="text-elektroblau"> *</span>
              </Kontrollkaestchen>

              {versandFehler && <Versandhinweis nachricht={versandFehler} />}

              <Versandknoepfe
                typ="kontakt"
                pruefen={pruefeVorVersand}
                zeilen={nachrichtenzeilen}
                honigtopf={daten.website}
                onFehler={setVersandFehler}
                onErfolg={beiErfolg}
                sendet={sendet}
                setSendet={setSendet}
                beschriftung="Nachricht senden"
              />
            </form>
          </div>
        </div>
      </Abschnitt>
    </>
  );
}
