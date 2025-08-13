import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import useAuthToken from '@/hooks/useAuthToken';

type Theme = 'light' | 'dark' | 'system';
type Effective = 'light' | 'dark';

declare global {
  interface Window {
    __applyTheme?: (t: Effective) => void;
  }
}

interface UserContextType {
  roles: string[] | null;
  isAuthenticated: boolean;
  isAdmin: boolean;

  theme: Theme; // user's choice
  effectiveTheme: Effective; // applied (system -> light|dark)
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  themeLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  roles: null,
  isAuthenticated: false,
  isAdmin: false,
  theme: 'system',
  effectiveTheme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  themeLoading: false,
});
export { UserContext };

const systemPref = (): Effective =>
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { roles, token } = useAuthToken();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => setIsAuthenticated(!!token), [token]);
  useEffect(() => setIsAdmin(!!token && roles?.includes('Admin') === true), [token, roles]);

  // Theme choice (logical)
  const [theme, setThemeState] = useState<Theme>(() => {
    const choice = localStorage.getItem('theme-choice') as Theme | null;
    return choice ?? 'system';
  });

  const effectiveTheme: Effective = theme === 'system' ? systemPref() : theme;

  // Apply via the global helper (no duplicate logic)
  useEffect(() => {
    window.__applyTheme?.(effectiveTheme);
  }, [effectiveTheme]);

  const [themeLoading, setThemeLoading] = useState(false);

  // Hydrate from server when logged in
  useEffect(() => {
    if (!isAuthenticated || !token) return;
    const ctrl = new AbortController();

    (async () => {
      try {
        setThemeLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/me/settings`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: ctrl.signal,
        });
        if (!res.ok) return;
        const { data } = await res.json();
        const serverTheme = data?.theme as Theme | null;
        if (serverTheme === 'light' || serverTheme === 'dark' || serverTheme === 'system') {
          setThemeState(serverTheme);
          localStorage.setItem('theme-choice', serverTheme);
        }
      } finally {
        setThemeLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [isAuthenticated, token]);

  // Persist choice locally + server-side
  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme-choice', t);

    // Apply immediately (same helper; keeps SPA + other tabs in sync)
    window.__applyTheme?.(t === 'system' ? systemPref() : t);

    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/me/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ theme: t }),
      }).catch(() => {});
    }
  };

  const toggleTheme = () =>
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');

  return (
    <UserContext.Provider
      value={{
        roles,
        isAuthenticated,
        isAdmin,
        theme,
        effectiveTheme,
        setTheme,
        toggleTheme,
        themeLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
