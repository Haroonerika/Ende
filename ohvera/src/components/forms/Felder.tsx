import type { ChangeEvent, ReactNode } from 'react';

/* ------------------------------------------------------------------
   Formularbausteine.
   Jedes Feld verknüpft Hilfstext und Fehlermeldung über
   aria-describedby und setzt aria-invalid — Fehler sind damit auch
   für Screenreader eindeutig dem Feld zugeordnet.
------------------------------------------------------------------- */

export function Pflichtstern() {
  return (
    <span className="text-elektroblau" aria-hidden="true">
      {' '}
      *
    </span>
  );
}

export function Fehlermeldung({ id, text }: { id: string; text: string }) {
  return (
    <p className="fehlertext" id={id}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 shrink-0">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5v4.2M8 11.2v.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      {text}
    </p>
  );
}

type TextfeldProps = {
  id: string;
  label: string;
  wert: string;
  onChange: (wert: string) => void;
  pflicht?: boolean;
  typ?: 'text' | 'email' | 'tel';
  hilfstext?: string;
  fehler?: string;
  autoComplete?: string;
  mehrzeilig?: boolean;
  platzhalter?: string;
};

export function Textfeld({
  id,
  label,
  wert,
  onChange,
  pflicht = false,
  typ = 'text',
  hilfstext,
  fehler,
  autoComplete,
  mehrzeilig = false,
  platzhalter,
}: TextfeldProps) {
  const hilfeId = hilfstext ? `${id}-hilfe` : undefined;
  const fehlerId = fehler ? `${id}-fehler` : undefined;
  const beschrieben = [hilfeId, fehlerId].filter(Boolean).join(' ') || undefined;

  const gemeinsam = {
    id,
    name: id,
    value: wert,
    required: pflicht,
    autoComplete,
    placeholder: platzhalter,
    'aria-invalid': fehler ? true : undefined,
    'aria-describedby': beschrieben,
    className: `feld ${fehler ? 'feld-fehler' : ''}`,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
  };

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {pflicht && <Pflichtstern />}
      </label>
      {mehrzeilig ? (
        <textarea {...gemeinsam} rows={5} />
      ) : (
        <input {...gemeinsam} type={typ} inputMode={typ === 'tel' ? 'tel' : undefined} />
      )}
      {hilfstext && (
        <p className="hilfstext" id={hilfeId}>
          {hilfstext}
        </p>
      )}
      {fehler && fehlerId && <Fehlermeldung id={fehlerId} text={fehler} />}
    </div>
  );
}

type AuswahlProps = {
  id: string;
  label: string;
  wert: string;
  onChange: (wert: string) => void;
  optionen: readonly string[];
  pflicht?: boolean;
  hilfstext?: string;
  fehler?: string;
  leerText?: string;
};

export function Auswahlfeld({
  id,
  label,
  wert,
  onChange,
  optionen,
  pflicht = false,
  hilfstext,
  fehler,
  leerText = 'Bitte auswählen',
}: AuswahlProps) {
  const hilfeId = hilfstext ? `${id}-hilfe` : undefined;
  const fehlerId = fehler ? `${id}-fehler` : undefined;
  const beschrieben = [hilfeId, fehlerId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {pflicht && <Pflichtstern />}
      </label>
      <select
        id={id}
        name={id}
        value={wert}
        required={pflicht}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={beschrieben}
        className={`feld ${fehler ? 'feld-fehler' : ''}`}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{leerText}</option>
        {optionen.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {hilfstext && (
        <p className="hilfstext" id={hilfeId}>
          {hilfstext}
        </p>
      )}
      {fehler && fehlerId && <Fehlermeldung id={fehlerId} text={fehler} />}
    </div>
  );
}

type KachelProps = {
  name: string;
  legende: string;
  optionen: readonly string[];
  wert: string;
  onChange: (wert: string) => void;
  fehler?: string;
  hilfstext?: string;
  spalten?: 1 | 2;
};

/** Auswahl als große, gut treffbare Kacheln — technisch echte Radiobuttons. */
export function RadioKacheln({
  name,
  legende,
  optionen,
  wert,
  onChange,
  fehler,
  hilfstext,
  spalten = 2,
}: KachelProps) {
  const fehlerId = fehler ? `${name}-fehler` : undefined;
  const hilfeId = hilfstext ? `${name}-hilfe` : undefined;

  return (
    <fieldset aria-describedby={[hilfeId, fehlerId].filter(Boolean).join(' ') || undefined}>
      <legend className="h3 mb-1">{legende}</legend>
      {hilfstext && (
        <p className="hilfstext mb-4" id={hilfeId}>
          {hilfstext}
        </p>
      )}
      <div className={`mt-4 grid gap-3 ${spalten === 2 ? 'sm:grid-cols-2' : ''}`}>
        {optionen.map((option) => {
          const aktiv = wert === option;
          const id = `${name}-${option.replace(/\W+/g, '-').toLowerCase()}`;
          return (
            <label key={option} htmlFor={id} className={`auswahl ${aktiv ? 'auswahl-aktiv' : ''}`}>
              <input
                type="radio"
                id={id}
                name={name}
                value={option}
                checked={aktiv}
                onChange={() => onChange(option)}
                className="h-5 w-5 shrink-0 accent-[#1B57FF]"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      {fehler && fehlerId && <Fehlermeldung id={fehlerId} text={fehler} />}
    </fieldset>
  );
}

type KaestchenProps = {
  id: string;
  checked: boolean;
  onChange: (wert: boolean) => void;
  fehler?: string;
  children: ReactNode;
};

export function Kontrollkaestchen({ id, checked, onChange, fehler, children }: KaestchenProps) {
  const fehlerId = fehler ? `${id}-fehler` : undefined;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={fehler ? true : undefined}
          aria-describedby={fehlerId}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#1B57FF]"
        />
        <label htmlFor={id} className="text-sm leading-relaxed">
          {children}
        </label>
      </div>
      {fehler && fehlerId && <Fehlermeldung id={fehlerId} text={fehler} />}
    </div>
  );
}

/** Honeypot: für Menschen unsichtbar, für Skripte verlockend. */
export function Honigtopf({ wert, onChange }: { wert: string; onChange: (wert: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="website">Website (bitte frei lassen)</label>
      <input
        type="text"
        id="website"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={wert}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
