import { useEffect, useState, useCallback } from 'react';
import { Theme, getLocalChoice, setLocalChoice, applyTheme } from '@/utils/theme';

type UseThemeOpts = { token?: string | null; apiBase?: string };

declare global {
  interface Window {
    __applyTheme?: (t: 'light' | 'dark') => void;
  }
}

const decodeSub = (jwt?: string | null) => {
  if (!jwt) return null;
  try {
    return JSON.parse(atob(jwt.split('.')[1]))?.sub ?? null;
  } catch {
    return null;
  }
};

export function useTheme({ token, apiBase }: UseThemeOpts) {
  const [theme, setThemeState] = useState<Theme>(() => getLocalChoice());
  const [loading, setLoading] = useState(false);

  // On login, apply locally cached theme for this user immediately
  // to prevent a flash of the default theme before server settings load.
  useEffect(() => {
    if (!token) return;

    const sub = decodeSub(token);
    if (!sub) return;

    const nsKey = `theme-choice:${sub}`;
    const cached = localStorage.getItem(nsKey) as Theme | null;

    if (cached === 'light' || cached === 'dark' || cached === 'system') {
      setThemeState(cached);
      applyTheme(cached);
      localStorage.setItem('theme-choice', cached);
    }
  }, [token]);

  // Apply the current theme choice to the document whenever it changes.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Fetch saved theme from the server after login.
  // If successful, update both state and localStorage.
  useEffect(() => {
    if (!token || !apiBase) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/api/v1/me/settings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const { data } = await res.json();
        const serverTheme = data?.theme as Theme | undefined;
        if (
          !cancelled &&
          (serverTheme === 'light' || serverTheme === 'dark' || serverTheme === 'system')
        ) {
          setLocalChoice(serverTheme);
          setThemeState(serverTheme);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, apiBase]);

  // Update theme locally and persist to server if logged in.
  const setTheme = useCallback(
    (t: Theme) => {
      setLocalChoice(t);
      setThemeState(t);
      if (token && apiBase) {
        fetch(`${apiBase}/api/v1/me/settings`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ theme: t }),
        }).catch(() => {});
      }
    },
    [token, apiBase],
  );

  const toggleTheme = useCallback(
    () => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'),
    [theme, setTheme],
  );

  return { theme, setTheme, toggleTheme, loading };
}
