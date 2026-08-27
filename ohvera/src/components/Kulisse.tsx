/* ------------------------------------------------------------------
   Hintergrundkulisse des Hero.
   Eine reduzierte Zeichnung: eine Ladenfront mit unserem Bildschirm,
   davor laufen Silhouetten vorbei. Bewusst flächig und abstrakt —
   keine echten Menschen, kein Foto, keine Details.

   Liegt hinter dem Inhalt, ist für Screenreader unsichtbar und steht
   still, wenn im System reduzierte Bewegung eingestellt ist.
------------------------------------------------------------------- */

type Figur = {
  /** Startversatz in Prozent der Laufstrecke */
  verzoegerung: number;
  /** Dauer eines Durchlaufs in Sekunden */
  dauer: number;
  /** Größe — kleinere Figuren wirken weiter entfernt */
  groesse: number;
  deckkraft: number;
  /** Läuft die Figur nach links statt nach rechts? */
  rueckwaerts?: boolean;
};

const figuren: Figur[] = [
  { verzoegerung: 0, dauer: 26, groesse: 1.15, deckkraft: 0.3 },
  { verzoegerung: -9, dauer: 34, groesse: 0.95, deckkraft: 0.2 },
  { verzoegerung: -17, dauer: 21, groesse: 1.3, deckkraft: 0.34, rueckwaerts: true },
  { verzoegerung: -4, dauer: 30, groesse: 1.05, deckkraft: 0.24, rueckwaerts: true },
  { verzoegerung: -23, dauer: 38, groesse: 0.82, deckkraft: 0.16 },
];

/** Eine Silhouette: Kopf, Körper, zwei schwingende Beine, ein Arm. */
function Silhouette({ spiegel }: { spiegel: boolean }) {
  return (
    <g transform={spiegel ? 'scale(-1,1)' : undefined}>
      <circle cx="0" cy="-52" r="7.5" />
      <path d="M-6 -44h12l3 26h-18z" />
      <rect className="kulisse-arm" x="-9" y="-42" width="4" height="19" rx="2" />
      <rect className="kulisse-bein-a" x="-5.5" y="-19" width="5" height="21" rx="2.5" />
      <rect className="kulisse-bein-b" x="1" y="-19" width="5" height="21" rx="2.5" />
    </g>
  );
}

/**
 * `alsBand` stellt die Kulisse als eigenen Streifen in den Textfluss —
 * auf dem Smartphone ist der Hero sonst so hoch, dass die Animation erst
 * nach dem Scrollen sichtbar wäre.
 */
export default function Kulisse({ alsBand = false }: { alsBand?: boolean }) {
  return (
    <div
      className={
        alsBand
          ? 'pointer-events-none relative h-[150px] w-full overflow-hidden'
          : 'pointer-events-none absolute inset-x-0 bottom-0 h-[300px] overflow-hidden sm:h-[340px]'
      }
      aria-hidden="true"
    >
      <svg
        viewBox={alsBand ? '330 40 560 260' : '0 0 1200 300'}
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="kulisse-schein" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B57FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1B57FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ladenfront, nur angedeutet */}
        <g stroke="rgba(138,144,153,0.13)" strokeWidth="2">
          <path d="M430 30v220M770 30v220M100 62v188M330 62v188" />
          <path d="M430 30h340M100 62h230" />
          <path d="M0 250h1200" strokeWidth="2.5" />
          <path d="M0 286h1200" stroke="rgba(138,144,153,0.08)" />
        </g>

        {/* Unser Bildschirm im Fenster */}
        <g>
          <ellipse cx="560" cy="150" rx="120" ry="115" fill="url(#kulisse-schein)" opacity="0.3" />
          <rect
            x="536"
            y="104"
            width="48"
            height="86"
            rx="3"
            fill="#1B57FF"
            opacity="0.42"
            className="kulisse-schirm"
          />
          <rect x="557" y="190" width="6" height="42" fill="rgba(138,144,153,0.16)" />
        </g>

        {/* Zweiter Bildschirm weiter hinten */}
        <rect
          x="192"
          y="120"
          width="34"
          height="60"
          rx="2"
          fill="#1B57FF"
          opacity="0.2"
          className="kulisse-schirm kulisse-schirm-spaet"
        />

        {/* Passanten */}
        <g fill="#8A9099">
          {figuren.map((figur, i) => (
            <g
              key={i}
              className={`kulisse-geht ${figur.rueckwaerts ? 'kulisse-geht-links' : ''}`}
              style={{
                animationDuration: `${figur.dauer}s`,
                animationDelay: `${figur.verzoegerung}s`,
                opacity: figur.deckkraft,
              }}
            >
              {/* Position als Attribut, Wippen per CSS — beides an einem
                  Element würde sich gegenseitig überschreiben. */}
              <g transform={`translate(0 ${250 + (1 - figur.groesse) * 22}) scale(${figur.groesse})`}>
                <g
                  className="kulisse-wippt"
                  style={{ animationDelay: `${figur.verzoegerung / 3}s` }}
                >
                  <Silhouette spiegel={Boolean(figur.rueckwaerts)} />
                </g>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
