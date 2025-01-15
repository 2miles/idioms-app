import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import App from '@/App';
import '@/index.css';

const container = document.getElementById('root');
if (!container) {
  console.error('No root element found');
} else {
  const domain = 'dev-pn3ht3m1xyzl7nya.us.auth0.com';
  const clientId = '1CqdWEkyUXWDasuGa7fEYbrEkqeI1ayo';

  if (!domain || !clientId) {
    console.error('Auth0 domain or clientId is not defined in the environment variables');
  } else {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </StrictMode>,
    );
  }
}
