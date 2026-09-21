import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// No build, o HTML já vem pré-renderizado (scripts/prerender.mjs): só "hidrata".
// No `npm run dev`, a div está vazia e o React renderiza do zero.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
