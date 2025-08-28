import { Auth0Provider } from '@auth0/auth0-react';

type Props = { children: React.ReactNode };

const onRedirectCallback = (appState?: { returnTo?: string }) => {
  const url = new URL(window.location.href);

  // drop OAuth handshake params and keep only your idiom list params
  ['code', 'state', 'session_state'].forEach((k) => url.searchParams.delete(k));
  const keep = new URLSearchParams();
  ['page', 'limit', 'sortField', 'sortOrder', 'search', 'searchColumn'].forEach((k) => {
    const v = url.searchParams.get(k);
    if (v !== null) keep.set(k, v);
  });

  const path = appState?.returnTo || url.pathname;
  const qs = keep.toString();
  window.history.replaceState({}, document.title, qs ? `${path}?${qs}` : path);
};

export default function AuthProvider({ children }: Props) {
  return (
    <Auth0Provider
      domain={'dev-pn3ht3m1xyzl7nya.us.auth0.com'}
      clientId={'1CqdWEkyUXWDasuGa7fEYbrEkqeI1ayo'}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://api.idiomvault.com',
        scope: 'openid profile email',
      }}
      cacheLocation='localstorage'
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
