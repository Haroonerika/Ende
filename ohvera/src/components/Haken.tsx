/** Kleines Häkchen für Aufzählungen. */
export default function Haken({ farbe = 'currentColor' }: { farbe?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      className="mt-0.5 shrink-0"
    >
      <path
        d="M4 10.5l4 4 8-9"
        fill="none"
        stroke={farbe}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
