import { useImBlick, useHochzaehlen } from '../lib/animation';

/** Zahl, die beim Sichtbarwerden hochzählt. */
export default function Zahl({
  wert,
  className = '',
  dauer,
}: {
  wert: number;
  className?: string;
  dauer?: number;
}) {
  const [ref, sichtbar] = useImBlick<HTMLSpanElement>(0.4);
  const stand = useHochzaehlen(wert, sichtbar, dauer);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {stand.toLocaleString('de-DE')}
    </span>
  );
}
