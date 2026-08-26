import type { ElementType, ReactNode } from 'react';
import { useImBlick } from '../lib/animation';

/**
 * Überschrift, die beim Scrollen von unten in ihre Zeile einläuft.
 * Bei reduzierter Bewegung steht sie sofort da.
 */
export default function Titel({
  children,
  als = 'h2',
  className = 'h2',
}: {
  children: ReactNode;
  als?: ElementType;
  className?: string;
}) {
  const [ref, sichtbar] = useImBlick<HTMLHeadingElement>(0.2);
  const Tag: ElementType = als;

  return (
    <Tag ref={ref} className={className}>
      <span className={`titel-maske ${sichtbar ? 'sichtbar' : ''}`}>
        <span className="titel-innen">{children}</span>
      </span>
    </Tag>
  );
}
