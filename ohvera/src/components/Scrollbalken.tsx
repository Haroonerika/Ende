import { useScrollFortschritt } from '../lib/animation';

/** Dünne Fortschrittslinie am oberen Rand — zeigt, wie weit die Seite noch geht. */
export default function Scrollbalken() {
  const anteil = useScrollFortschritt();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      aria-hidden="true"
    >
      <div
        className="h-full bg-elektroblau"
        style={{ width: `${anteil * 100}%`, transition: 'width 80ms linear' }}
      />
    </div>
  );
}
