import { useEffect, useState } from 'react';

import { beispielmotive, produkt, startseite } from '../content/site';
import { useAktiverSlot } from '../lib/loop';
import Motiv from './Motiv';

/* ------------------------------------------------------------------
   Die Straßenperspektive: Blick von außen auf eine Schaufensterfront.
   Vollständig aus CSS und SVG gebaut — kein Foto, keine KI-Bilder,
   kein realer Ort. Eine Visualisierung, die sich nicht als Foto ausgibt.

   Das Motiv im Bildschirm wechselt im Takt der Schleife alle
   10 Sekunden — synchron zur Visualisierung im Hero.
------------------------------------------------------------------- */

/** Koordinatensystem der Szene */
const B = 1000;
const H = 640;

/** Lage des Bildschirms im Fenster */
const bildschirm = {
  x: 170,
  y: 168,
  breite: 124,
  hoehe: 220, // 124 × 16/9 — echtes Hochformat
};

/** Auf großen Schirmen die ganze Front, auf dem Smartphone der Ausschnitt
    um den Bildschirm — sonst wäre das Motiv dort nicht mehr lesbar. */
const ansichtWeit = { x: 0, y: 0, breite: B, hoehe: H };
const ansichtNah = { x: 146, y: 92, breite: 330, hoehe: 396 };

function useSchmalerSchirm(): boolean {
  const [schmal, setSchmal] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches,
  );

  useEffect(() => {
    const abfrage = window.matchMedia('(max-width: 639px)');
    const beiWechsel = () => setSchmal(abfrage.matches);
    abfrage.addEventListener('change', beiWechsel);
    return () => abfrage.removeEventListener('change', beiWechsel);
  }, []);

  return schmal;
}

export default function Schaufenster() {
  const slot = useAktiverSlot();
  /* Die fertigen Motive laufen im Bildschirm — sie zeigen echte Arbeit. */
  const motive = beispielmotive.filter((motiv) => motiv.bild);
  const aktiv = slot % motive.length;
  const ansicht = useSchmalerSchirm() ? ansichtNah : ansichtWeit;

  return (
    <figure className="m-0">
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: `${ansicht.breite} / ${ansicht.hoehe}`, background: '#14161A' }}
      >
        {/* Ebene 1: die Architektur */}
        <svg
          viewBox={`${ansicht.x} ${ansicht.y} ${ansicht.breite} ${ansicht.hoehe}`}
          width="100%"
          height="100%"
          className="absolute inset-0"
          role="img"
          aria-label="Illustration: Blick von der Straße auf eine Schaufensterfront mit einem hochformatigen Werbebildschirm im oberen Bereich des Fensters."
        >
          <defs>
            <linearGradient id="glas" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#141A24" />
              <stop offset="55%" stopColor="#080A0E" />
              <stop offset="100%" stopColor="#111721" />
            </linearGradient>
            <linearGradient id="fassade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F2635" />
              <stop offset="100%" stopColor="#171D28" />
            </linearGradient>
            <radialGradient id="schein" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1B57FF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1B57FF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gehweg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#242A33" />
              <stop offset="100%" stopColor="#171B21" />
            </linearGradient>
          </defs>

          {/* Fassade */}
          <rect x="0" y="0" width={B} height="560" fill="url(#fassade)" />
          {[26, 96].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2={B}
              y2={y}
              stroke="rgba(138,144,153,0.14)"
              strokeWidth="1.5"
            />
          ))}
          {/* Angedeutetes Mauerwerk */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`fuge-${i}`}
              x1={i * 250}
              y1="0"
              x2={i * 250}
              y2="26"
              stroke="rgba(138,144,153,0.12)"
              strokeWidth="1.5"
            />
          ))}

          {/* Blende über dem Fenster — bewusst ohne Firmennamen */}
          <rect x="120" y="42" width="560" height="40" rx="4" fill="rgba(138,144,153,0.1)" />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={150 + i * 90}
              y="58"
              width={i === 1 ? 70 : 56}
              height="8"
              rx="4"
              fill="rgba(138,144,153,0.28)"
            />
          ))}

          {/* Schaufenster */}
          <rect x="120" y="104" width="560" height="420" rx="3" fill="url(#glas)" />
          {/* Innenraum, sehr reduziert angedeutet */}
          <rect x="150" y="404" width="500" height="6" fill="rgba(138,144,153,0.14)" />
          <rect x="470" y="410" width="150" height="110" rx="3" fill="rgba(138,144,153,0.08)" />
          <rect x="352" y="150" width="6" height="374" fill="rgba(138,144,153,0.16)" />

          {/* Lichtschein des Bildschirms auf der Scheibe */}
          <ellipse
            cx={bildschirm.x + bildschirm.breite / 2}
            cy={bildschirm.y + bildschirm.hoehe / 2}
            rx="190"
            ry="230"
            fill="url(#schein)"
          />

          {/* Gehäuse des Bildschirms */}
          <rect
            x={bildschirm.x - 7}
            y={bildschirm.y - 7}
            width={bildschirm.breite + 14}
            height={bildschirm.hoehe + 14}
            rx="6"
            fill="#0B0D11"
            stroke="rgba(138,144,153,0.35)"
            strokeWidth="1.5"
          />
          {/* Standfuß */}
          <rect
            x={bildschirm.x + bildschirm.breite / 2 - 6}
            y={bildschirm.y + bildschirm.hoehe + 7}
            width="12"
            height="96"
            fill="#0B0D11"
          />
          <rect
            x={bildschirm.x + bildschirm.breite / 2 - 42}
            y={bildschirm.y + bildschirm.hoehe + 100}
            width="84"
            height="10"
            rx="3"
            fill="#0B0D11"
          />

          {/* Fensterrahmen über allem */}
          <rect
            x="120"
            y="104"
            width="560"
            height="420"
            rx="3"
            fill="none"
            stroke="rgba(138,144,153,0.5)"
            strokeWidth="5"
          />

          {/* Eingangstür */}
          <rect x="712" y="104" width="160" height="420" rx="3" fill="#12151B" />
          <rect
            x="712"
            y="104"
            width="160"
            height="420"
            rx="3"
            fill="none"
            stroke="rgba(138,144,153,0.45)"
            strokeWidth="5"
          />
          <rect x="740" y="140" width="104" height="240" rx="2" fill="rgba(138,144,153,0.07)" />
          <rect x="852" y="290" width="6" height="52" rx="3" fill="rgba(138,144,153,0.55)" />

          {/* Spiegelungen im Glas */}
          <g style={{ mixBlendMode: 'screen' }}>
            <polygon points="150,524 330,104 430,104 250,524" fill="rgba(245,246,247,0.05)" />
            <polygon points="430,524 560,224 610,224 480,524" fill="rgba(245,246,247,0.035)" />
            <polygon points="726,524 806,104 838,104 758,524" fill="rgba(245,246,247,0.04)" />
          </g>

          {/* Gehweg */}
          <rect x="0" y="560" width={B} height="80" fill="url(#gehweg)" />
          <line x1="0" y1="560" x2={B} y2="560" stroke="rgba(138,144,153,0.35)" strokeWidth="2" />
          <line x1="0" y1="616" x2={B} y2="616" stroke="rgba(138,144,153,0.16)" strokeWidth="2" />
          {/* Lichtschein des Schaufensters auf dem Gehweg */}
          <polygon points="140,562 660,562 760,640 40,640" fill="rgba(27,87,255,0.07)" />

          {/* Passanten als Maßstab — abstrakt, keine Personen */}
          <g fill="rgba(138,144,153,0.3)">
            <circle cx="922" cy="452" r="15" />
            <path d="M900 560v-70a22 22 0 0144 0v70z" />
            <circle cx="66" cy="466" r="13" />
            <path d="M47 560v-62a19 19 0 0138 0v62z" />
          </g>
        </svg>

        {/* Ebene 2: das laufende Werbemotiv im Bildschirm.
            Für Screenreader ausgeblendet — dieselben Motive stehen
            direkt darunter noch einmal einzeln und beschriftet. */}
        <div
          aria-hidden="true"
          className="absolute overflow-hidden rounded-[3px]"
          style={{
            left: `${((bildschirm.x - ansicht.x) / ansicht.breite) * 100}%`,
            top: `${((bildschirm.y - ansicht.y) / ansicht.hoehe) * 100}%`,
            width: `${(bildschirm.breite / ansicht.breite) * 100}%`,
            height: `${(bildschirm.hoehe / ansicht.hoehe) * 100}%`,
          }}
        >
          {motive.map((motiv, i) => (
            <div
              key={motiv.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === aktiv ? 1 : 0 }}
            >
              <Motiv motiv={motiv} />
            </div>
          ))}
          {/* Leichte Scheibenspiegelung über dem Bildschirm */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 34%, rgba(255,255,255,0) 58%)',
            }}
          />
        </div>
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-grau">
        <span>{startseite.schaufenster.bildunterschrift}</span>
        <span className="font-mono text-xs tabular-nums">
          43 Zoll · {produkt.formatBreite} × {produkt.formatHoehe} · hinter der Scheibe
        </span>
      </figcaption>
    </figure>
  );
}
