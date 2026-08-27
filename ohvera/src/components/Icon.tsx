import type { ReactNode } from 'react';

/* ------------------------------------------------------------------
   Iconsatz.
   Alle Icons auf demselben 24er-Raster, gleiche Strichstärke, keine
   Flächen — dadurch wirken sie wie ein Satz und nicht wie Fundstücke.
   Sie übernehmen die Textfarbe (currentColor).
------------------------------------------------------------------- */

const formen: Record<string, ReactNode> = {
  // Bildschirm im Hochformat
  bildschirm: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2" />
      <path d="M10 5.5h4" />
    </>
  ),
  // Schaufenster mit Bildschirm
  schaufenster: (
    <>
      <path d="M3 20.5V8l9-5 9 5v12.5" />
      <rect x="7.5" y="11" width="4.5" height="7" rx="1" />
      <path d="M15 11h3M15 14h3M15 17h2" />
    </>
  ),
  // Gestaltung
  stift: (
    <>
      <path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 013 3L8 18.5 3.5 20z" />
      <path d="M13.5 7l3 3" />
    </>
  ),
  // Schleife
  schleife: (
    <>
      <path d="M4 9a5 5 0 015-5h9" />
      <path d="M15 1.5L18.5 4 15 6.5" />
      <path d="M20 15a5 5 0 01-5 5H6" />
      <path d="M9 17.5L5.5 20 9 22.5" />
    </>
  ),
  uhr: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  standort: (
    <>
      <path d="M12 21.5s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </>
  ),
  schild: (
    <>
      <path d="M12 2.5l7.5 3v6c0 4.6-3.1 8.6-7.5 10-4.4-1.4-7.5-5.4-7.5-10v-6z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </>
  ),
  protokoll: (
    <>
      <path d="M6 2.5h8l4.5 4.5v14a1 1 0 01-1 1H6a1 1 0 01-1-1v-17a1 1 0 011-1z" />
      <path d="M14 2.5V7h4.5" />
      <path d="M8.5 13.5l2 2 4-4.5" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5a7.5 7.5 0 0115 0" />
    </>
  ),
  nachricht: (
    <>
      <path d="M3.5 6.5a2 2 0 012-2h13a2 2 0 012 2v9a2 2 0 01-2 2H9l-5.5 4z" />
      <path d="M8 9.5h8M8 13h5" />
    </>
  ),
  wechsel: (
    <>
      <path d="M3.5 8h13.5" />
      <path d="M13.5 4.5L17 8l-3.5 3.5" />
      <path d="M20.5 16H7" />
      <path d="M10.5 12.5L7 16l3.5 3.5" />
    </>
  ),
  euro: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.6a4.2 4.2 0 100 6.8" />
      <path d="M6.8 11h5.4M6.8 13.4h5.4" />
    </>
  ),
  kalender: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  blitz: <path d="M13.5 2.5L5 13.5h6l-1 8L19 10h-6z" />,
  haken: <path d="M4.5 12.5l5 5 10-11" />,
  netz: (
    <>
      <circle cx="12" cy="4.5" r="2.5" />
      <circle cx="4.5" cy="19" r="2.5" />
      <circle cx="19.5" cy="19" r="2.5" />
      <path d="M10.2 6.4L6 16.6M13.8 6.4L18 16.6M7 19h10" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 2.8a9.2 9.2 0 00-7.9 13.9L2.8 21.2l4.7-1.2A9.2 9.2 0 1012 2.8z" />
      <path d="M8.8 8.4c.4-.1.7 0 .9.4l.7 1.6c.1.3 0 .5-.2.7l-.5.5c.4.8 1.3 1.9 2.6 2.4.2.1.4 0 .5-.1l.6-.8c.2-.2.4-.2.6-.1l1.7.8c.3.2.4.5.3.8-.2.6-.8 1.2-1.6 1.3-.5.1-1 .1-2.8-.6-2.3-.9-3.7-3.2-3.8-3.4-.1-.2-.9-1.2-.9-2.2s.5-1.5.8-1.8z" />
    </>
  ),
};

export type IconName = keyof typeof formen;

export default function Icon({
  name,
  groesse = 24,
  className = '',
}: {
  name: IconName;
  groesse?: number;
  className?: string;
}) {
  return (
    <svg
      width={groesse}
      height={groesse}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {formen[name]}
    </svg>
  );
}
