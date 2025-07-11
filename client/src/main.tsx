import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from '@/App';
import { IdiomsContextProvider } from '@/context/idiomsContext';
import { UserProvider } from '@/context/userContext';
import '@/index.css';

const container = document.getElementById('root');
if (!container) {
  console.error('No root element found');
} else {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Auth0Provider
        domain={'dev-pn3ht3m1xyzl7nya.us.auth0.com'}
        clientId={'1CqdWEkyUXWDasuGa7fEYbrEkqeI1ayo'}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'https://api.idiomvault.com',
        }}
        cacheLocation='localstorage'
        useRefreshTokens={true}
      >
        <UserProvider>
          <IdiomsContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </IdiomsContextProvider>
        </UserProvider>
      </Auth0Provider>
    </StrictMode>,
  );
}
