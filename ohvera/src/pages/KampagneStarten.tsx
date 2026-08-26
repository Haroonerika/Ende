import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { kampagnenformular, pakete, seo } from '../content/site';
import { useSeo } from '../lib/seo';
import { submitLead } from '../lib/submit';
import {
  fehltPflichtfeld,
  hatFehler,
  pruefeAuswahl,
  pruefeEmail,
  pruefeTelefon,
  type Fehlerliste,
} from '../lib/validierung';

import Abschnitt from '../components/Abschnitt';
import {
  Kontrollkaestchen,
  Honigtopf,
  RadioKacheln,
  Textfeld,
} from '../components/forms/Felder';
import Versandhinweis from '../components/forms/Versandhinweis';

type Formulardaten = {
  ziel: string;
  paket: string;
  start: string;
  material: string;
  name: string;
  unternehmen: string;
  branche: string;
  email: string;
  telefon: string;
  nachricht: string;
  datenschutz: boolean;
  website: string;
};

const LEER: Formulardaten = {
  ziel: '',
  paket: '',
  start: '',
  material: '',
  name: '',
  unternehmen: '',
  branche: '',
  email: '',
  telefon: '',
  nachricht: '',
  datenschutz: false,
  website: '',
};

const ANZAHL_SCHRITTE = kampagnenformular.schritte.length + 1;

export default function KampagneStarten() {
  useSeo(seo.kampagneStarten);
  const navigate = useNavigate();
  const [suchparameter] = useSearchParams();

  const [schritt, setSchritt] = useState(0);
  const [daten, setDaten] = useState<Formulardaten>(() => {
    // Vorauswahl, wenn von einer Paketkarte aus gekommen: /kampagne-starten?paket=pro
    const gewuenscht = suchparameter.get('paket');
    const treffer = pakete.find((paket) => paket.id === gewuenscht && paket.buchbar);
    return treffer ? { ...LEER, paket: treffer.name } : LEER;
  });
  const [fehler, setFehler] = useState<Fehlerliste>({});
  const [sendet, setSendet] = useState(false);
  const [versandFehler, setVersandFehler] = useState<string | null>(null);

  const ueberschrift = useRef<HTMLHeadingElement>(null);
  const ersterDurchlauf = useRef(true);

  // Nach jedem Schrittwechsel den Fokus auf die neue Frage setzen
  useEffect(() => {
    if (ersterDurchlauf.current) {
      ersterDurchlauf.current = false;
      return;
    }
    ueberschrift.current?.focus();
  }, [schritt]);

  const setzeWert = <K extends keyof Formulardaten>(feld: K, wert: Formulardaten[K]) => {
    setDaten((vorher) => ({ ...vorher, [feld]: wert }));
    setFehler((vorher) => ({ ...vorher, [feld]: '' }));
  };

  function pruefeSchritt(index: number): Fehlerliste {
    if (index < kampagnenformular.schritte.length) {
      const frage = kampagnenformular.schritte[index];
      const wert = daten[frage.id as keyof Formulardaten];
      return {
        [frage.id]: pruefeAuswahl(String(wert ?? ''), 'eine Antwort') ?? '',
      };
    }

    return {
      name: fehltPflichtfeld(daten.name, 'deinen Namen') ?? '',
      unternehmen: fehltPflichtfeld(daten.unternehmen, 'den Namen deines Unternehmens') ?? '',
      branche: fehltPflichtfeld(daten.branche, 'deine Branche') ?? '',
      email: pruefeEmail(daten.email) ?? '',
      telefon: pruefeTelefon(daten.telefon) ?? '',
      datenschutz: daten.datenschutz
        ? ''
        : 'Bitte bestätigen, dass die Datenschutzerklärung gelesen wurde.',
    };
  }

  function weiter() {
    const gefunden = pruefeSchritt(schritt);
    setFehler(gefunden);
    if (hatFehler(gefunden)) return;
    setSchritt((s) => Math.min(s + 1, ANZAHL_SCHRITTE - 1));
  }

  function zurueck() {
    setVersandFehler(null);
    setSchritt((s) => Math.max(s - 1, 0));
  }

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    const gefunden = pruefeSchritt(ANZAHL_SCHRITTE - 1);
    setFehler(gefunden);
    if (hatFehler(gefunden)) return;

    setSendet(true);
    setVersandFehler(null);

    const ergebnis = await submitLead('kampagne', {
      ziel: daten.ziel,
      paket: daten.paket,
      start: daten.start,
      material: daten.material,
      name: daten.name,
      unternehmen: daten.unternehmen,
      branche: daten.branche,
      email: daten.email,
      telefon: daten.telefon,
      nachricht: daten.nachricht,
      datenschutz: daten.datenschutz,
      website: daten.website,
    });

    setSendet(false);

    if (ergebnis.ok) {
      navigate('/danke', { state: { typ: 'kampagne' } });
    } else {
      setVersandFehler(ergebnis.nachricht);
    }
  }

  const istKontaktschritt = schritt === ANZAHL_SCHRITTE - 1;
  const aktuelleFrage = istKontaktschritt
    ? kampagnenformular.kontaktschritt.frage
    : kampagnenformular.schritte[schritt].frage;

  return (
    <>
      <section className="sektion-dunkel px-5 pb-12 pt-12 sm:px-8 sm:pt-16">
        <div className="huelle max-w-3xl">
          <p className="eyebrow text-grau">{kampagnenformular.eyebrow}</p>
          <h1 className="h1 mt-4">{kampagnenformular.h1}</h1>
          <p className="fliess mt-5 text-grau">{kampagnenformular.einleitung}</p>
        </div>
      </section>

      <Abschnitt>
        <div className="mx-auto max-w-2xl">
          {/* Fortschritt */}
          <div className="mb-8">
            <div className="mb-3 flex items-baseline justify-between">
              <p className="font-mono text-sm tabular-nums text-grau-stark">
                Schritt {schritt + 1} von {ANZAHL_SCHRITTE}
              </p>
              <p className="font-mono text-sm tabular-nums text-grau-stark">
                {Math.round(((schritt + 1) / ANZAHL_SCHRITTE) * 100)} %
              </p>
            </div>
            <div className="flex gap-1.5" role="presentation">
              {Array.from({ length: ANZAHL_SCHRITTE }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i <= schritt ? 'bg-elektroblau' : 'bg-grau/25'
                  }`}
                />
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              Schritt {schritt + 1} von {ANZAHL_SCHRITTE}: {aktuelleFrage}
            </p>
          </div>

          <form onSubmit={absenden} noValidate className="relative">
            <Honigtopf wert={daten.website} onChange={(wert) => setzeWert('website', wert)} />

            <h2 className="sr-only" tabIndex={-1} ref={ueberschrift}>
              {aktuelleFrage}
            </h2>

            {!istKontaktschritt && (
              <RadioKacheln
                key={kampagnenformular.schritte[schritt].id}
                name={kampagnenformular.schritte[schritt].id}
                legende={aktuelleFrage}
                optionen={kampagnenformular.schritte[schritt].optionen}
                wert={String(daten[kampagnenformular.schritte[schritt].id as keyof Formulardaten])}
                onChange={(wert) =>
                  setzeWert(kampagnenformular.schritte[schritt].id as keyof Formulardaten, wert)
                }
                fehler={fehler[kampagnenformular.schritte[schritt].id] || undefined}
              />
            )}

            {istKontaktschritt && (
              <div className="space-y-5">
                <div>
                  <h3 className="h3">{kampagnenformular.kontaktschritt.frage}</h3>
                  <p className="hilfstext">Mit * markierte Felder sind Pflichtfelder.</p>
                </div>

                <Textfeld
                  id="name"
                  label="Name"
                  pflicht
                  autoComplete="name"
                  wert={daten.name}
                  onChange={(wert) => setzeWert('name', wert)}
                  fehler={fehler.name || undefined}
                />
                <Textfeld
                  id="unternehmen"
                  label="Unternehmen"
                  pflicht
                  autoComplete="organization"
                  wert={daten.unternehmen}
                  onChange={(wert) => setzeWert('unternehmen', wert)}
                  fehler={fehler.unternehmen || undefined}
                />
                <Textfeld
                  id="branche"
                  label="Branche"
                  pflicht
                  platzhalter="z. B. Bäckerei, Dachdeckerei, Autohaus"
                  hilfstext={kampagnenformular.kontaktschritt.hinweisBranche}
                  wert={daten.branche}
                  onChange={(wert) => setzeWert('branche', wert)}
                  fehler={fehler.branche || undefined}
                />
                <Textfeld
                  id="email"
                  label="E-Mail"
                  typ="email"
                  pflicht
                  autoComplete="email"
                  wert={daten.email}
                  onChange={(wert) => setzeWert('email', wert)}
                  fehler={fehler.email || undefined}
                />
                <Textfeld
                  id="telefon"
                  label="Telefon"
                  typ="tel"
                  autoComplete="tel"
                  hilfstext="Freiwillig — meist geht es am Telefon schneller."
                  wert={daten.telefon}
                  onChange={(wert) => setzeWert('telefon', wert)}
                  fehler={fehler.telefon || undefined}
                />
                <Textfeld
                  id="nachricht"
                  label="Nachricht"
                  mehrzeilig
                  hilfstext="Was soll beworben werden? Ein bis zwei Sätze genügen."
                  wert={daten.nachricht}
                  onChange={(wert) => setzeWert('nachricht', wert)}
                />

                <Kontrollkaestchen
                  id="datenschutz"
                  checked={daten.datenschutz}
                  onChange={(wert) => setzeWert('datenschutz', wert)}
                  fehler={fehler.datenschutz || undefined}
                >
                  Ich habe die{' '}
                  <Link to="/datenschutz" className="underline">
                    Datenschutzerklärung
                  </Link>{' '}
                  gelesen und bin damit einverstanden, dass meine Angaben zur Bearbeitung der
                  Anfrage gespeichert werden.
                  <span className="text-elektroblau"> *</span>
                </Kontrollkaestchen>

                {versandFehler && <Versandhinweis nachricht={versandFehler} />}
              </div>
            )}

            {/* Steuerung */}
            <div className="mt-10 flex flex-col-reverse gap-3 border-t pt-6 trennlinie sm:flex-row sm:justify-between">
              {schritt > 0 ? (
                <button type="button" className="btn-sekundaer-hell" onClick={zurueck}>
                  Zurück
                </button>
              ) : (
                <span />
              )}

              {istKontaktschritt ? (
                <button type="submit" className="btn-primaer" disabled={sendet}>
                  {sendet ? 'Wird gesendet …' : 'Anfrage absenden'}
                </button>
              ) : (
                <button type="button" className="btn-primaer" onClick={weiter}>
                  Weiter
                </button>
              )}
            </div>

            <p className="mt-6 text-sm text-grau-stark">
              Deine Angaben bleiben erhalten, wenn du zurückgehst. Die Anfrage ist unverbindlich.
            </p>
          </form>
        </div>
      </Abschnitt>
    </>
  );
}
