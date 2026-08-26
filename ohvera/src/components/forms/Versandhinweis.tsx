import { Link } from 'react-router-dom';
import { kontaktwege } from '../../lib/kontakt';

/**
 * Ehrliche Rückmeldung, wenn der Versand nicht geklappt hat.
 * Es wird kein Erfolg vorgetäuscht — stattdessen stehen hier die
 * Kontaktwege, über die die Anfrage sicher ankommt.
 */
export default function Versandhinweis({ nachricht }: { nachricht: string }) {
  const wege = kontaktwege();

  return (
    <div
      role="alert"
      className="rounded-lg border-2 p-5"
      style={{ borderColor: '#B3261E', background: 'rgba(179,38,30,0.04)' }}
    >
      <h3 className="text-[1.05rem] font-semibold" style={{ color: '#B3261E' }}>
        Die Anfrage wurde nicht abgeschickt.
      </h3>
      <p className="fliess mt-2 text-[0.95rem] text-anthrazit">{nachricht}</p>

      <ul className="mt-4 space-y-2 text-[0.95rem]">
        {wege.map((weg) => (
          <li key={weg.id}>
            <span className="text-grau-stark">{weg.bezeichnung}: </span>
            {weg.ziel ? (
              <a href={weg.ziel} className="font-medium underline">
                {weg.wert}
              </a>
            ) : (
              <span className="font-mono text-[0.85rem] text-grau-stark">{weg.wert}</span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-grau-stark">
        Mehr dazu auf der <Link to="/kontakt" className="underline">Kontaktseite</Link>.
      </p>
    </div>
  );
}
