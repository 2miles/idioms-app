import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from '@/App';
import { IdiomsContextProvider } from '@/context/idiomsContext';
import { UserProvider } from '@/context/userContext';
import AuthProvider from '@/providers/AuthProvider';
import '@/index.css';

const container = document.getElementById('root');
if (!container) {
  console.error('No root element found');
} else {
  createRoot(container).render(
    <StrictMode>
      <AuthProvider>
        <UserProvider>
          <IdiomsContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </IdiomsContextProvider>
        </UserProvider>
      </AuthProvider>
    </StrictMode>,
  );
}
