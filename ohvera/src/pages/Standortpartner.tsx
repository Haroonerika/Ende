import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  partnerformular,
  seiteStandortpartner,
  seo,
  uploadRegeln,
} from '../content/site';
import { useSeo } from '../lib/seo';
import { versandEingerichtet, type Nachrichtenzeile, type Versandweg } from '../lib/submit';
import {
  fehltPflichtfeld,
  hatFehler,
  pruefeAuswahl,
  pruefeDateien,
  pruefeEmail,
  pruefeTelefon,
  type Fehlerliste,
} from '../lib/validierung';

import Abschnitt from '../components/Abschnitt';
import Haken from '../components/Haken';
import Reveal from '../components/Reveal';
import {
  Auswahlfeld,
  Fehlermeldung,
  Honigtopf,
  Kontrollkaestchen,
  Textfeld,
} from '../components/forms/Felder';
import Versandhinweis from '../components/forms/Versandhinweis';
import Versandknoepfe from '../components/forms/Versandknoepfe';

const LEER = {
  name: '',
  unternehmen: '',
  art: '',
  adresse: '',
  email: '',
  telefon: '',
  fenstergroesse: '',
  ausrichtung: '',
  oeffnungszeiten: '',
  strom: '',
  wlan: '',
  nachricht: '',
  datenschutz: false,
  website: '',
};

export default function Standortpartner() {
  useSeo(seo.standortpartner);
  const navigate = useNavigate();

  const [daten, setDaten] = useState(LEER);
  const [dateien, setDateien] = useState<File[]>([]);
  const [dateifehler, setDateifehler] = useState<string[]>([]);
  const [fehler, setFehler] = useState<Fehlerliste>({});
  const [sendet, setSendet] = useState(false);
  const [versandFehler, setVersandFehler] = useState<string | null>(null);
  const dateiFeld = useRef<HTMLInputElement>(null);

  const setzeWert = <K extends keyof typeof LEER>(feld: K, wert: (typeof LEER)[K]) => {
    setDaten((vorher) => ({ ...vorher, [feld]: wert }));
    setFehler((vorher) => ({ ...vorher, [feld]: '' }));
  };

  function dateienUebernehmen(liste: FileList | null) {
    if (!liste) return;
    const zusammen = [...dateien, ...Array.from(liste)];
    const { gueltig, fehler: meldungen } = pruefeDateien(zusammen);
    setDateien(gueltig);
    setDateifehler(meldungen);
    if (dateiFeld.current) dateiFeld.current.value = '';
  }

  function dateiEntfernen(index: number) {
    setDateien((vorher) => vorher.filter((_, i) => i !== index));
    setDateifehler([]);
  }

  function pruefeVorVersand(): boolean {
    const gefunden: Fehlerliste = {
      name: fehltPflichtfeld(daten.name, 'deinen Namen') ?? '',
      unternehmen: fehltPflichtfeld(daten.unternehmen, 'den Namen deines Betriebs') ?? '',
      art: pruefeAuswahl(daten.art, 'die Art des Standorts') ?? '',
      adresse: fehltPflichtfeld(daten.adresse, 'die Adresse des Standorts') ?? '',
      email: pruefeEmail(daten.email) ?? '',
      telefon: pruefeTelefon(daten.telefon, true) ?? '',
      ausrichtung: pruefeAuswahl(daten.ausrichtung, 'die Ausrichtung des Fensters') ?? '',
      datenschutz: daten.datenschutz
        ? ''
        : 'Bitte bestätigen, dass die Datenschutzerklärung gelesen wurde.',
    };

    setFehler(gefunden);
    if (hatFehler(gefunden)) {
      document.getElementById('partnerformular')?.scrollIntoView({ block: 'start' });
      return false;
    }
    setVersandFehler(null);
    return true;
  }

  function nachrichtenzeilen(): Nachrichtenzeile[] {
    return [
      { bezeichnung: 'Name', wert: daten.name },
      { bezeichnung: 'Unternehmen', wert: daten.unternehmen },
      { bezeichnung: 'Art des Standorts', wert: daten.art },
      { bezeichnung: 'Adresse', wert: daten.adresse },
      { bezeichnung: 'E-Mail', wert: daten.email },
      { bezeichnung: 'Telefon', wert: daten.telefon },
      { bezeichnung: 'Schaufenstergröße', wert: daten.fenstergroesse },
      { bezeichnung: 'Ausrichtung des Fensters', wert: daten.ausrichtung },
      { bezeichnung: 'Öffnungszeiten', wert: daten.oeffnungszeiten },
      { bezeichnung: 'Strom in Fensternähe', wert: daten.strom },
      { bezeichnung: 'WLAN', wert: daten.wlan },
      { bezeichnung: 'Nachricht', wert: daten.nachricht },
    ];
  }

  function beiErfolg(weg: Versandweg) {
    navigate('/danke', { state: { typ: 'standortpartner', weg } });
  }

  return (
    <>
      <section className="sektion-dunkel px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
        <div className="huelle max-w-3xl">
          <p className="eyebrow text-grau">{seiteStandortpartner.eyebrow}</p>
          <h1 className="h1 mt-4">{seiteStandortpartner.h1}</h1>
          <p className="fliess mt-6 text-grau">{seiteStandortpartner.einleitung}</p>
          <a href="#partnerformular" className="btn-primaer mt-8">
            Fläche anbieten
          </a>
        </div>
      </section>

      <Abschnitt>
        <h2 className="h2">{seiteStandortpartner.gegenleistungTitel}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {seiteStandortpartner.gegenleistung.map((punkt, i) => (
            <Reveal key={punkt.titel} verzoegerung={i * 60} className="h-full">
              <article className="karte h-full p-6">
                <h3 className="text-[1.05rem] font-semibold">{punkt.titel}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-grau-stark">{punkt.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Abschnitt>

      <Abschnitt dunkel>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="h2">{seiteStandortpartner.vorausTitel}</h2>
            <ul className="mt-8 space-y-4">
              {seiteStandortpartner.voraussetzungen.map((punkt) => (
                <li key={punkt} className="flex gap-3 text-[1rem] leading-relaxed">
                  <Haken farbe="#1B57FF" />
                  {punkt}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2">{seiteStandortpartner.ablaufTitel}</h2>
            <ol className="mt-8 space-y-5">
              {seiteStandortpartner.ablauf.map((schritt, i) => (
                <li key={schritt.titel} className="flex gap-4">
                  <span className="font-mono text-lg tabular-nums text-elektroblau">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="font-semibold">{schritt.titel}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-grau">
                      {schritt.text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Abschnitt>

      {/* Formular */}
      <Abschnitt id="partnerformular">
        <div className="mx-auto max-w-2xl">
          <h2 className="h2">{seiteStandortpartner.formularTitel}</h2>
          <p className="fliess mt-4 text-grau-stark">{seiteStandortpartner.formularEinleitung}</p>
          <p className="hilfstext mt-4">Mit * markierte Felder sind Pflichtfelder.</p>

          <form onSubmit={(e) => e.preventDefault()} noValidate className="relative mt-8 space-y-5">
            <Honigtopf wert={daten.website} onChange={(wert) => setzeWert('website', wert)} />

            <Textfeld
              id="p-name"
              label="Name"
              pflicht
              autoComplete="name"
              wert={daten.name}
              onChange={(wert) => setzeWert('name', wert)}
              fehler={fehler.name || undefined}
            />
            <Textfeld
              id="p-unternehmen"
              label="Unternehmen"
              pflicht
              autoComplete="organization"
              wert={daten.unternehmen}
              onChange={(wert) => setzeWert('unternehmen', wert)}
              fehler={fehler.unternehmen || undefined}
            />
            <Auswahlfeld
              id="p-art"
              label="Art des Standorts"
              pflicht
              optionen={partnerformular.standortarten}
              wert={daten.art}
              onChange={(wert) => setzeWert('art', wert)}
              fehler={fehler.art || undefined}
            />
            <Textfeld
              id="p-adresse"
              label="Adresse des Standorts"
              pflicht
              autoComplete="street-address"
              platzhalter="Straße, Hausnummer, PLZ, Ort"
              wert={daten.adresse}
              onChange={(wert) => setzeWert('adresse', wert)}
              fehler={fehler.adresse || undefined}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Textfeld
                id="p-email"
                label="E-Mail"
                typ="email"
                pflicht
                autoComplete="email"
                wert={daten.email}
                onChange={(wert) => setzeWert('email', wert)}
                fehler={fehler.email || undefined}
              />
              <Textfeld
                id="p-telefon"
                label="Telefon"
                typ="tel"
                pflicht
                autoComplete="tel"
                wert={daten.telefon}
                onChange={(wert) => setzeWert('telefon', wert)}
                fehler={fehler.telefon || undefined}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Textfeld
                id="p-groesse"
                label="Ungefähre Schaufenstergröße"
                platzhalter="z. B. 2,40 m breit, 2,10 m hoch"
                wert={daten.fenstergroesse}
                onChange={(wert) => setzeWert('fenstergroesse', wert)}
              />
              <Auswahlfeld
                id="p-ausrichtung"
                label="Ausrichtung des Fensters"
                pflicht
                hilfstext="Entscheidet über die nötige Helligkeit des Geräts."
                optionen={partnerformular.ausrichtungen}
                wert={daten.ausrichtung}
                onChange={(wert) => setzeWert('ausrichtung', wert)}
                fehler={fehler.ausrichtung || undefined}
              />
            </div>

            <Textfeld
              id="p-oeffnungszeiten"
              label="Öffnungszeiten"
              platzhalter="z. B. Mo–Fr 9–18 Uhr, Sa 9–13 Uhr"
              wert={daten.oeffnungszeiten}
              onChange={(wert) => setzeWert('oeffnungszeiten', wert)}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Auswahlfeld
                id="p-strom"
                label="Stromanschluss in Fensternähe"
                optionen={partnerformular.jaNeinUnklar}
                wert={daten.strom}
                onChange={(wert) => setzeWert('strom', wert)}
              />
              <Auswahlfeld
                id="p-wlan"
                label="WLAN vorhanden"
                optionen={partnerformular.jaNein}
                wert={daten.wlan}
                onChange={(wert) => setzeWert('wlan', wert)}
              />
            </div>

            {/* Foto-Upload — nur sinnvoll, wenn ein Empfänger Dateien annimmt.
                Ohne Backend geht die Anfrage über WhatsApp oder E-Mail; Fotos
                hängst du dort direkt an. */}
            {versandEingerichtet ? (
            <div>
              <label htmlFor="p-fotos" className="label">
                Fotos der Fläche
              </label>
              <input
                ref={dateiFeld}
                type="file"
                id="p-fotos"
                name="fotos"
                multiple
                accept={uploadRegeln.erlaubteEndungen.join(',')}
                onChange={(e) => dateienUebernehmen(e.target.files)}
                aria-describedby="p-fotos-hilfe"
                className="feld cursor-pointer py-2.5 file:mr-3 file:rounded file:border-0 file:bg-anthrazit file:px-4 file:py-2 file:text-sm file:font-medium file:text-offwhite"
              />
              <p className="hilfstext" id="p-fotos-hilfe">
                {partnerformular.uploadHinweis} Die Fotos dienen nur der Prüfung, werden nicht
                veröffentlicht und nicht öffentlich zugänglich gemacht. Bitte keine Bilder, auf denen
                Personen erkennbar sind.
              </p>

              {dateien.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {dateien.map((datei, i) => (
                    <li
                      key={`${datei.name}-${i}`}
                      className="flex items-center justify-between gap-4 rounded border px-3 py-2 text-sm trennlinie"
                    >
                      <span className="truncate">
                        {datei.name}{' '}
                        <span className="font-mono text-xs text-grau-stark">
                          {(datei.size / (1024 * 1024)).toFixed(1)} MB
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => dateiEntfernen(i)}
                        className="shrink-0 rounded px-2 py-1 text-sm font-medium underline"
                      >
                        Entfernen
                        <span className="sr-only"> — {datei.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {dateifehler.length > 0 && (
                <div className="mt-2 space-y-1">
                  {dateifehler.map((meldung) => (
                    <Fehlermeldung key={meldung} id={`dateifehler-${meldung.length}`} text={meldung} />
                  ))}
                </div>
              )}
            </div>
            ) : (
              <div className="rounded-lg border border-dashed border-grau/40 p-5">
                <h3 className="text-[0.975rem] font-semibold">Fotos vom Schaufenster</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-grau-stark">
                  Die schickst du am einfachsten direkt in den Chat, der sich beim Abschicken
                  öffnet — zwei Bilder von außen und eines von innen reichen mir. Bitte keine
                  Aufnahmen, auf denen Personen erkennbar sind.
                </p>
              </div>
            )}

            <Textfeld
              id="p-nachricht"
              label="Nachricht"
              mehrzeilig
              hilfstext="Alles, was ich über die Fläche wissen sollte."
              wert={daten.nachricht}
              onChange={(wert) => setzeWert('nachricht', wert)}
            />

            <Kontrollkaestchen
              id="p-datenschutz"
              checked={daten.datenschutz}
              onChange={(wert) => setzeWert('datenschutz', wert)}
              fehler={fehler.datenschutz || undefined}
            >
              Ich habe die{' '}
              <Link to="/datenschutz" className="underline">
                Datenschutzerklärung
              </Link>{' '}
              gelesen und bin damit einverstanden, dass meine Angaben zur Bearbeitung der Anfrage
              gespeichert werden.
              <span className="text-elektroblau"> *</span>
            </Kontrollkaestchen>

            {versandFehler && <Versandhinweis nachricht={versandFehler} />}

            <div className="border-t pt-6 trennlinie">
              <Versandknoepfe
                typ="standortpartner"
                pruefen={pruefeVorVersand}
                zeilen={nachrichtenzeilen}
                honigtopf={daten.website}
                onFehler={setVersandFehler}
                onErfolg={beiErfolg}
                sendet={sendet}
                setSendet={setSendet}
                beschriftung="Fläche anbieten"
              />
            </div>
          </form>
        </div>
      </Abschnitt>

      <Abschnitt dunkel>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2">Lieber erst reden?</h2>
          <p className="fliess mx-auto mt-5 text-grau">
            Du kannst mich auch einfach anrufen oder anschreiben. Ich erkläre dir in fünf Minuten,
            worum es geht.
          </p>
          <Link to="/kontakt" className="btn-sekundaer-dunkel mt-8">
            Zum Kontakt
          </Link>
        </div>
      </Abschnitt>
    </>
  );
}
