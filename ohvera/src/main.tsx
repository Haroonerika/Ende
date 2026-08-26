import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

/* Schriften werden lokal gebündelt ausgeliefert — bewusst KEIN Google-Fonts-Server. */
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';

import './index.css';
import App from './App';

/* Normalerweise echte Pfade (/werben). Nur für die Einzeldatei-Vorschau,
   die ohne Server auskommen muss, wird auf Raute-Adressen umgestellt
   (VITE_VORSCHAU=1). Am Livebetrieb ändert das nichts. */
const Router = import.meta.env.VITE_VORSCHAU === '1' ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
