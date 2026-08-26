import { useState } from 'react';
import { faq } from '../content/site';

/** FAQ als Akkordeon. Vollständig über die Tastatur bedienbar. */
export default function Faq() {
  const [offen, setOffen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y trennlinie border-y">
      {faq.map((eintrag, i) => {
        const istOffen = offen === i;
        return (
          <div key={eintrag.frage}>
            <h3>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
                aria-expanded={istOffen}
                aria-controls={`faq-antwort-${i}`}
                id={`faq-frage-${i}`}
                onClick={() => setOffen(istOffen ? null : i)}
              >
                <span className="text-[1.05rem] font-semibold leading-snug">{eintrag.frage}</span>
                <span
                  aria-hidden="true"
                  className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-transform duration-200 ${
                    istOffen ? 'rotate-45 border-elektroblau text-elektroblau' : 'border-grau/50 text-grau-stark'
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" focusable="false">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-antwort-${i}`}
              role="region"
              aria-labelledby={`faq-frage-${i}`}
              hidden={!istOffen}
            >
              <p className="fliess pb-6 pr-8 text-grau-stark">{eintrag.antwort}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
