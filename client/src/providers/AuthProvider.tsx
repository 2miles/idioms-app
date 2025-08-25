import { Auth0Provider } from '@auth0/auth0-react';

type Props = { children: React.ReactNode };

const onRedirectCallback = (appState?: { returnTo?: string }) => {
  const url = new URL(window.location.href);

  // drop OAuth handshake params
  ['code', 'state', 'session_state'].forEach((k) => url.searchParams.delete(k));

  // keep only your idiom list params
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
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://api.idiomvault.com',
        scope: 'openid profile email',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
