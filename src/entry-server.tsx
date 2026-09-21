import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/** Gera o HTML estático da página no build (pré-renderização). */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
