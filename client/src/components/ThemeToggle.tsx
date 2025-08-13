// src/components/ThemeToggle.tsx
import { useUser } from '@/context/userContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, themeLoading } = useUser();
  const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';

  return (
    <button onClick={toggleTheme} disabled={themeLoading} aria-busy={themeLoading}>
      {themeLoading ? 'Loading…' : `Theme: ${theme} → ${next}`}
    </button>
    // This button toggles the theme between light, dark, and system preferences.
  );
}
