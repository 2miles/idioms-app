// utils/theme.ts
export type Theme = 'light' | 'dark' | 'system';
export type Effective = 'light' | 'dark';

export const systemPref = (): Effective =>
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const resolveEffective = (t: Theme): Effective => (t === 'system' ? systemPref() : t);

export const getLocalChoice = (): Theme =>
  (localStorage.getItem('theme-choice') as Theme) || 'system';

export const setLocalChoice = (t: Theme) => {
  localStorage.setItem('theme-choice', t);
};

// Core applicator (effective only)
function applyEffective(eff: Effective) {
  const html = document.documentElement;

  // flip theme classes
  html.classList.remove('theme-light', 'theme-dark');
  html.classList.add(`theme-${eff}`);

  // inform browser/controls which palette to use
  html.style.colorScheme = eff;

  // optional: cache effective for your first-paint script (if you use it)
  localStorage.setItem('theme', eff);
}

/**
 * Apply a logical theme ('light' | 'dark' | 'system')
 * - Resolves 'system' to an effective theme
 * - Updates <html> classes and color-scheme
 */
export const applyTheme = (choice: Theme) => {
  applyEffective(resolveEffective(choice));
};

/**
 * Compatibility shim:
 * If any old code still calls window.__applyTheme(effective),
 * keep it wired to the same applicator.
 */
declare global {
  interface Window {
    __applyTheme?: (t: Effective) => void;
  }
}
if (!window.__applyTheme) {
  window.__applyTheme = applyEffective;
}
