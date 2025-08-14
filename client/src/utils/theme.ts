export type Theme = 'light' | 'dark' | 'system';
export type Effective = 'light' | 'dark';

export const systemPref = (): Effective =>
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const resolveEffective = (t: Theme): Effective => (t === 'system' ? systemPref() : t);

export const getLocalChoice = (): Theme =>
  (localStorage.getItem('theme-choice') as Theme) || 'system';

export const setLocalChoice = (t: Theme) => localStorage.setItem('theme-choice', t);

export const applyTheme = (t: Theme) => window.__applyTheme?.(resolveEffective(t));
