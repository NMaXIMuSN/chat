import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import './styles.scss'
import { StoreProvider } from './app/providers/StoreProviders';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CookiesProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
  </CookiesProvider>
);
