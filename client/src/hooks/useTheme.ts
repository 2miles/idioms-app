import { useEffect, useState, useCallback } from 'react';
import { Theme, getLocalChoice, setLocalChoice, applyTheme } from '@/utils/theme';

type UseThemeOpts = { token?: string | null; apiBase?: string };

declare global {
  interface Window {
    __applyTheme?: (t: 'light' | 'dark') => void;
  }
}

export function useTheme({ token, apiBase }: UseThemeOpts) {
  const [theme, setThemeState] = useState<Theme>(() => getLocalChoice());
  const [loading, setLoading] = useState(false);

  // Apply whenever local choice changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Hydrate from server if we have a token
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

  // Public setter: local + apply + (optional) server persist
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
