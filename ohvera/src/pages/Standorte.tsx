import { Link } from 'react-router-dom';
import { seiteStandorte, seo, standorte, standortHinweis } from '../content/site';
import { useSeo } from '../lib/seo';

import Abschnitt from '../components/Abschnitt';
import Standortkarte from '../components/Standortkarte';

export default function Standorte() {
  useSeo(seo.standorte);

  return (
    <>
      <section className="sektion-dunkel px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
        <div className="huelle max-w-3xl">
          <p className="eyebrow text-grau">{seiteStandorte.eyebrow}</p>
          <h1 className="h1 mt-4">{seiteStandorte.h1}</h1>
          <p className="fliess mt-6 text-grau">{seiteStandorte.einleitung}</p>
        </div>
      </section>

      <Abschnitt>
        <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div>
            {standorte.map((standort) => (
              <Standortkarte key={standort.id} standort={standort} hell />
            ))}
          </div>
          <div>
            <h2 className="h2">{seiteStandorte.geplantTitel}</h2>
            <p className="fliess mt-5 text-grau-stark">{seiteStandorte.geplantText}</p>
            <p className="fliess mt-4 text-grau-stark">{standortHinweis}</p>

            <div className="mt-8 rounded-lg border border-dashed border-grau/40 p-6">
              <h3 className="h3">{seiteStandorte.partnerHinweis}</h3>
              <Link to="/standortpartner" className="btn-sekundaer-hell mt-5">
                Fläche anbieten
              </Link>
            </div>
          </div>
        </div>
      </Abschnitt>
    </>
  );
}
