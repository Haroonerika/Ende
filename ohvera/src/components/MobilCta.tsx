import { Link, useLocation } from 'react-router-dom';
import { navigation, pakete } from '../content/site';
import { useTieferAls } from '../lib/animation';

/** Seiten, auf denen die Leiste stört, weil dort schon ein Formular steht. */
const AUSGENOMMEN = ['/kampagne-starten', '/standortpartner', '/kontakt', '/danke'];

/**
 * Schmale Leiste am unteren Rand des Smartphones.
 * Erscheint erst, wenn der Hero vorbei ist — vorher steht der Knopf ohnehin
 * groß auf dem Schirm.
 */
export default function MobilCta() {
  const sichtbar = useTieferAls(680);
  const ort = useLocation();
  const guenstigstes = pakete.find((paket) => paket.buchbar)?.preis;

  if (AUSGENOMMEN.includes(ort.pathname)) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-anthrazit/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden ${
        sichtbar ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!sichtbar}
    >
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 text-[0.8rem] leading-tight text-grau">
          <span className="block font-mono text-base text-offwhite">ab {guenstigstes} €</span>
          im Monat, Gestaltung inklusive
        </p>
        <Link
          to={navigation.hauptCta.ziel}
          className="btn-primaer shrink-0 px-5 py-3 text-[0.9rem]"
          tabIndex={sichtbar ? 0 : -1}
        >
          {navigation.hauptCta.text}
        </Link>
      </div>
    </div>
  );
}
