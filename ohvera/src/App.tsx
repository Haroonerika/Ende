import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import Start from './pages/Start';
import Werben from './pages/Werben';
import Standorte from './pages/Standorte';
import Standortpartner from './pages/Standortpartner';
import SoFunktionierts from './pages/SoFunktionierts';
import KampagneStarten from './pages/KampagneStarten';
import Kontakt from './pages/Kontakt';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import Danke from './pages/Danke';
import NichtGefunden from './pages/NichtGefunden';

/** Bei jedem Seitenwechsel nach oben springen. */
function NachObenBeiWechsel() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <NachObenBeiWechsel />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Start />} />
          <Route path="/werben" element={<Werben />} />
          <Route path="/standorte" element={<Standorte />} />
          <Route path="/standortpartner" element={<Standortpartner />} />
          <Route path="/so-funktionierts" element={<SoFunktionierts />} />
          <Route path="/kampagne-starten" element={<KampagneStarten />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/danke" element={<Danke />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NichtGefunden />} />
        </Route>
      </Routes>
    </>
  );
}
