import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  id?: string;
  dunkel?: boolean;
  className?: string;
  /** Für Abschnitte, die nahtlos an den vorherigen anschließen sollen */
  schmal?: boolean;
};

/** Sektionsrahmen mit dem Hell-Dunkel-Rhythmus der Seite. */
export default function Abschnitt({ children, id, dunkel = false, className = '', schmal = false }: Props) {
  return (
    <section
      id={id}
      className={`${schmal ? 'px-5 py-12 sm:px-8 sm:py-16' : 'sektion'} ${
        dunkel ? 'sektion-dunkel' : 'sektion-hell'
      } ${className}`}
    >
      <div className="huelle">{children}</div>
    </section>
  );
}
