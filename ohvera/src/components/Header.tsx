import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../content/site';
import Wortmarke from './Wortmarke';

export default function Header() {
  const [offen, setOffen] = useState(false);
  const menueRef = useRef<HTMLDivElement>(null);
  const knopfRef = useRef<HTMLButtonElement>(null);
  const ort = useLocation();

  // Menü bei Seitenwechsel schließen
  useEffect(() => {
    setOffen(false);
  }, [ort.pathname]);

  // Escape schließt, Hintergrund bleibt beim Scrollen stehen
  useEffect(() => {
    if (!offen) return;
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOffen(false);
        knopfRef.current?.focus();
      }
    };
    document.addEventListener('keydown', beiTaste);
    const vorher = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', beiTaste);
      document.body.style.overflow = vorher;
    };
  }, [offen]);

  const linkKlasse = ({ isActive }: { isActive: boolean }) =>
    [
      'relative py-2 text-[0.95rem] font-medium transition-colors',
      isActive ? 'text-offwhite' : 'text-grau hover:text-offwhite',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-anthrazit">
      <div className="huelle flex h-[68px] items-center justify-between px-5 sm:px-8">
        <Link to="/" className="rounded" aria-label={`${'OHVERA'} Startseite`}>
          <Wortmarke />
        </Link>

        {/* Desktop-Navigation */}
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
          {navigation.hauptmenue.map((punkt) => (
            <NavLink key={punkt.ziel} to={punkt.ziel} className={linkKlasse}>
              {({ isActive }) => (
                <>
                  {punkt.text}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-0.5 w-full bg-elektroblau transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <Link to={navigation.hauptCta.ziel} className="btn-primaer min-h-[44px] px-5 py-2.5">
            {navigation.hauptCta.text}
          </Link>
        </nav>

        {/* Mobiler Umschalter */}
        <button
          ref={knopfRef}
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded text-offwhite lg:hidden"
          aria-expanded={offen}
          aria-controls="mobilmenue"
          onClick={() => setOffen((z) => !z)}
        >
          <span className="sr-only">{offen ? 'Menü schließen' : 'Menü öffnen'}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {offen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobiles Menü: Links oben, CTAs gut erreichbar am unteren Rand */}
      {offen && (
        <div
          id="mobilmenue"
          ref={menueRef}
          className="fixed inset-x-0 bottom-0 top-[68px] z-40 flex flex-col justify-between overflow-y-auto bg-anthrazit lg:hidden"
        >
          <nav aria-label="Hauptnavigation mobil" className="px-5 pt-4">
            <ul className="divide-y divide-white/10">
              {navigation.hauptmenue.map((punkt) => (
                <li key={punkt.ziel}>
                  <NavLink
                    to={punkt.ziel}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 font-display text-2xl font-bold ${
                        isActive ? 'text-elektroblau' : 'text-offwhite'
                      }`
                    }
                  >
                    {punkt.text}
                    <span aria-hidden="true" className="text-grau">
                      →
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sticky bottom-0 space-y-3 border-t border-white/10 bg-anthrazit p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Link to={navigation.hauptCta.ziel} className="btn-primaer w-full">
              {navigation.hauptCta.text}
            </Link>
            <Link to={navigation.zweitCta.ziel} className="btn-sekundaer-dunkel w-full">
              {navigation.zweitCta.text}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
