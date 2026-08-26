/* ⚠️ Diese Datenschutzerklärung ist ein Gerüst und muss VOR der
   Veröffentlichung juristisch geprüft und an die tatsächlichen
   Datenflüsse angepasst werden. Der Text steht in src/content/site.ts. */

import { datenschutz, seo } from '../content/site';
import { useSeo } from '../lib/seo';
import Rechtstext from '../components/Rechtstext';

export default function Datenschutz() {
  useSeo(seo.datenschutz);
  return <Rechtstext titel="Datenschutzerklärung" abschnitte={datenschutz} />;
}
