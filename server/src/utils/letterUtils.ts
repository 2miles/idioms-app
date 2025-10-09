// utils/letterUtils.ts
export function normalizeLetterParam(rawLetter?: string): string | null {
  if (!rawLetter) return null;

  const upper = rawLetter.toUpperCase();

  if (/^[A-Z]$/.test(upper)) {
    return upper;
  }
  if (rawLetter === 'num') {
    return 'num';
  }
  return null;
}
