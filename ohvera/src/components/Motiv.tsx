import type { CSSProperties } from 'react';
import type { Beispielmotiv } from '../content/site';

/* ------------------------------------------------------------------
   Ein vollständiges Werbemotiv im Format 9:16.
   Wird an zwei Stellen verwendet: als Galerie auf der Startseite und
   im Bildschirm der Schaufenster-Szene. Deshalb skaliert die gesamte
   Typografie über Container-Einheiten (cqi) mit der Breite mit.

   Wichtig: erfundene, neutrale Betriebsbezeichnungen — niemals echte
   Firmennamen, niemals nachgebaute Logos bestehender Marken.
------------------------------------------------------------------- */

const farben = {
  dunkel: {
    flaeche: '#14161A',
    text: '#F5F6F7',
    gedaempft: 'rgba(245,246,247,0.62)',
    akzent: '#1B57FF',
    akzentText: '#FFFFFF',
    linie: 'rgba(245,246,247,0.18)',
    feld: 'rgba(245,246,247,0.08)',
  },
  hell: {
    flaeche: '#F5F6F7',
    text: '#14161A',
    gedaempft: '#5A6069',
    akzent: '#1B57FF',
    akzentText: '#FFFFFF',
    linie: 'rgba(20,22,26,0.14)',
    feld: 'rgba(20,22,26,0.05)',
  },
  blau: {
    flaeche: '#1B57FF',
    text: '#FFFFFF',
    gedaempft: 'rgba(255,255,255,0.78)',
    akzent: '#FFFFFF',
    akzentText: '#1B57FF',
    linie: 'rgba(255,255,255,0.28)',
    feld: 'rgba(255,255,255,0.14)',
  },
} as const;

/** Schriftgröße relativ zur Containerbreite — dasselbe Motiv funktioniert
    dadurch als große Galeriekarte wie als kleiner Bildschirm im Schaufenster. */
function groesse(cqi: number): CSSProperties {
  return { fontSize: `clamp(0.4rem, ${cqi}cqi, 6rem)` };
}

function QrFlaeche({ farbe, hintergrund }: { farbe: string; hintergrund: string }) {
  // Abstraktes Muster als Platzhalter für den späteren QR-Code des Kunden.
  const punkte = [
    [3, 3], [4, 3], [3, 4], [5, 4], [6, 3], [4, 5], [6, 5], [3, 6], [5, 6], [6, 6],
    [4, 6], [5, 3], [6, 4], [3, 5],
  ];
  return (
    <svg viewBox="0 0 10 10" width="100%" height="100%" aria-hidden="true" focusable="false">
      <rect width="10" height="10" fill={hintergrund} rx="0.6" />
      {[
        [0.8, 0.8],
        [6.4, 0.8],
        [0.8, 6.4],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="2.8" height="2.8" fill="none" stroke={farbe} strokeWidth="0.6" />
          <rect x={x + 0.9} y={y + 0.9} width="1" height="1" fill={farbe} />
        </g>
      ))}
      {punkte.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x + 1.2} y={y + 1.2} width="0.62" height="0.62" fill={farbe} />
      ))}
    </svg>
  );
}

export default function Motiv({ motiv }: { motiv: Beispielmotiv }) {
  /* Fertiges Motiv als Bilddatei */
  if (motiv.bild) {
    return (
      <img
        src={motiv.bild.pfad}
        alt={motiv.bild.alt}
        width={720}
        height={1280}
        loading="lazy"
        decoding="async"
        className="hochformat w-full rounded-lg object-cover"
        style={{
          boxShadow: '0 18px 44px -22px rgba(20,22,26,0.55)',
          outline: '1px solid rgba(138,144,153,0.28)',
          outlineOffset: '-1px',
        }}
      />
    );
  }

  const f = farben[motiv.variante ?? 'dunkel'];

  return (
    <div
      className="hochformat relative w-full overflow-hidden rounded-lg"
      style={{
        containerType: 'inline-size',
        background: f.flaeche,
        color: f.text,
        boxShadow: '0 18px 44px -22px rgba(20,22,26,0.55)',
        outline: '1px solid rgba(138,144,153,0.28)',
        outlineOffset: '-1px',
      }}
    >
      <div className="flex h-full flex-col" style={{ padding: '6cqi' }}>
        {/* Logo-Fläche — neutrale Betriebsbezeichnung, kein echtes Logo */}
        <div className="flex items-center" style={{ gap: '3cqi' }}>
          <div
            className="grid shrink-0 place-items-center rounded"
            style={{ width: '13cqi', height: '13cqi', background: f.feld, border: `1px solid ${f.linie}` }}
          >
            <svg viewBox="0 0 24 24" width="60%" height="60%" aria-hidden="true" focusable="false">
              <path d="M4 20V9l8-5 8 5v11" fill="none" stroke={f.akzent} strokeWidth="2" />
              <rect x="9.5" y="13" width="5" height="7" fill={f.akzent} />
            </svg>
          </div>
          <p
            className="font-display font-bold uppercase leading-tight"
            style={{ ...groesse(4.4), letterSpacing: '0.04em' }}
          >
            {motiv.logoWort}
          </p>
        </div>

        {/* Kernbotschaft */}
        <div style={{ marginTop: '7cqi' }}>
          <p
            className="font-mono uppercase"
            style={{ ...groesse(3.5), letterSpacing: '0.18em', color: f.gedaempft }}
          >
            {motiv.kicker}
          </p>
          <h3
            className="font-display font-extrabold"
            lang="de"
            style={{
              ...groesse(10),
              marginTop: '2.5cqi',
              lineHeight: 0.98,
              hyphens: 'auto',
              overflowWrap: 'anywhere',
            }}
          >
            {motiv.headline}
          </h3>
        </div>

        {/* Das Angebot */}
        <div
          className="inline-flex w-fit items-baseline rounded"
          style={{
            marginTop: '5cqi',
            padding: '2.6cqi 4cqi',
            background: f.akzent,
            color: f.akzentText,
          }}
        >
          <span className="font-mono font-medium" style={groesse(6.4)}>
            {motiv.angebot}
          </span>
        </div>

        {/* Details */}
        <ul style={{ marginTop: '6cqi', display: 'grid', gap: '2.4cqi' }}>
          {(motiv.details ?? []).map((zeile) => (
            <li
              key={zeile}
              className="flex items-start"
              style={{ ...groesse(4), gap: '2.4cqi', color: f.gedaempft }}
            >
              <span
                aria-hidden="true"
                className="shrink-0 rounded-full"
                style={{ width: '1.6cqi', height: '1.6cqi', background: f.akzent, marginTop: '1.6cqi' }}
              />
              {zeile}
            </li>
          ))}
        </ul>

        {/* Fuß: Kontaktzeile und QR-Fläche */}
        <div className="mt-auto flex items-end justify-between" style={{ gap: '4cqi', paddingTop: '6cqi' }}>
          <div style={{ borderTop: `1px solid ${f.linie}`, paddingTop: '3cqi', flex: 1 }}>
            <p style={{ ...groesse(3.9), fontWeight: 600 }}>{motiv.kontaktzeile}</p>
            <p
              className="font-mono uppercase"
              style={{ ...groesse(3), letterSpacing: '0.14em', color: f.gedaempft, marginTop: '1.4cqi' }}
            >
              {motiv.aktion}
            </p>
          </div>
          <div style={{ width: '20cqi', height: '20cqi' }}>
            <QrFlaeche farbe={f.text} hintergrund={f.feld} />
          </div>
        </div>
      </div>
    </div>
  );
}
