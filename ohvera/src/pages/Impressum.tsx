/* ⚠️ Dieses Impressum ist ein Gerüst und muss VOR der Veröffentlichung
   juristisch geprüft werden. Der Text steht in src/content/site.ts. */

import { impressum, seo } from '../content/site';
import { useSeo } from '../lib/seo';
import Rechtstext from '../components/Rechtstext';

export default function Impressum() {
  useSeo(seo.impressum);
  return <Rechtstext titel="Impressum" abschnitte={impressum} />;
}
