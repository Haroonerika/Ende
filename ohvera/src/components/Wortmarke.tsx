import { marke } from '../content/site';

/** Wortmarke mit Bildschirm-Signet — rein typografisch, kein Bild. */
export default function Wortmarke({ hell = true }: { hell?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width="20"
        height="28"
        viewBox="0 0 20 28"
        aria-hidden="true"
        className="shrink-0"
        focusable="false"
      >
        <rect
          x="0.75"
          y="0.75"
          width="18.5"
          height="26.5"
          rx="3"
          fill="none"
          stroke={hell ? 'rgba(245,246,247,0.45)' : 'rgba(20,22,26,0.35)'}
          strokeWidth="1.5"
        />
        <rect x="4" y="4" width="12" height="12" rx="1.5" fill="#1B57FF" />
        <rect x="4" y="19" width="12" height="2" rx="1" fill="#8A9099" />
        <rect x="4" y="23" width="7" height="2" rx="1" fill="#8A9099" />
      </svg>
      <span
        className={`font-display text-[1.35rem] font-extrabold tracking-[0.02em] ${
          hell ? 'text-offwhite' : 'text-anthrazit'
        }`}
      >
        {marke.name}
      </span>
    </span>
  );
}
