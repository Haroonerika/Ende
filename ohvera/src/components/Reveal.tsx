import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';
import { bewegungReduziert } from '../lib/loop';

type Props = {
  children: ReactNode;
  /** Verzögerung in Millisekunden, für gestaffelte Reihen */
  verzoegerung?: number;
  className?: string;
  as?: ElementType;
};

/** Dezentes Scroll-Reveal. Bei reduzierter Bewegung sofort sichtbar. */
export default function Reveal({ children, verzoegerung = 0, className = '', as }: Props) {
  const Tag: ElementType = as ?? 'div';
  const ref = useRef<HTMLElement>(null);
  const [sichtbar, setSichtbar] = useState(() => bewegungReduziert());

  useEffect(() => {
    if (sichtbar) return;
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setSichtbar(true);
      return;
    }
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((eintrag) => {
          if (eintrag.isIntersecting) {
            setSichtbar(true);
            beobachter.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    beobachter.observe(element);
    return () => beobachter.disconnect();
  }, [sichtbar]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${sichtbar ? 'sichtbar' : ''} ${className}`}
      style={verzoegerung ? { transitionDelay: `${verzoegerung}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
