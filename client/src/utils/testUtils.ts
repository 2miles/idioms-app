import { vi } from 'vitest';

export function suppressConsoleOutput({ error = true, log = true, warn = false } = {}) {
  const spies: ReturnType<typeof vi.spyOn>[] = [];

  if (error) spies.push(vi.spyOn(console, 'error').mockImplementation(() => {}));
  if (log) spies.push(vi.spyOn(console, 'log').mockImplementation(() => {}));
  if (warn) spies.push(vi.spyOn(console, 'warn').mockImplementation(() => {}));

  return () => spies.forEach((spy) => spy.mockRestore());
}
