import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.spyOn(console, 'warn').mockImplementation((msg) => {
  if (
    typeof msg === 'string' &&
    (msg.includes('React Router Future Flag Warning') ||
      msg.includes('v7_startTransition') ||
      msg.includes('v7_relativeSplatPath'))
  ) {
    return;
  }
  console.warn(msg);
});

vi.mock('@/apis/idiomFinder', () => ({
  publicIdiomFinder: {
    get: vi.fn(),
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false, // change to true for small-screen behavior by default
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
