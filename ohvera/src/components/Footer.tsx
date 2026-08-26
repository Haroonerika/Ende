import { Link } from 'react-router-dom';
import { footer, marke, navigation } from '../content/site';
import { kontaktwege } from '../lib/kontakt';
import Wortmarke from './Wortmarke';

export default function Footer() {
  const wege = kontaktwege();
  const jahr = new Date().getFullYear();

  return (
    <footer className="bg-anthrazit px-5 pb-10 pt-16 text-offwhite sm:px-8">
      <div className="huelle">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wortmarke />
            <p className="fliess mt-4 text-[0.95rem] leading-relaxed text-grau">
              {footer.beschreibung}
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <h2 className="eyebrow mb-4 text-grau">Seiten</h2>
            <ul className="space-y-2.5">
              {navigation.hauptmenue.map((punkt) => (
                <li key={punkt.ziel}>
                  <Link to={punkt.ziel} className="text-[0.95rem] text-offwhite hover:underline">
                    {punkt.text}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={navigation.hauptCta.ziel}
                  className="text-[0.95rem] text-offwhite hover:underline"
                >
                  {navigation.hauptCta.text}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-4 text-grau">Kontakt</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {wege.map((weg) => (
                <li key={weg.id}>
                  <span className="text-grau">{weg.bezeichnung}: </span>
                  {weg.ziel ? (
                    <a href={weg.ziel} className="text-offwhite hover:underline">
                      {weg.wert}
                    </a>
                  ) : (
                    <span className="font-mono text-[0.85rem] text-grau">{weg.wert}</span>
                  )}
                </li>
              ))}
              <li className="text-grau">Ansprechpartner: {marke.inhaber}</li>
            </ul>
          </div>
        </div>

        <p className="fliess mt-8 text-sm leading-relaxed text-grau">{footer.hinweis}</p>

        <div className="mt-6 flex flex-col gap-4 text-sm text-grau sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {jahr} {marke.name} · {marke.domain}
          </p>
          <ul className="flex gap-6">
            {navigation.rechtliches.map((punkt) => (
              <li key={punkt.ziel}>
                <Link to={punkt.ziel} className="hover:text-offwhite hover:underline">
                  {punkt.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
