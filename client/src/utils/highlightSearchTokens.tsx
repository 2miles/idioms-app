import React from 'react';

export function highlightTokens(text: string, rawQuery: string): React.ReactNode {
  if (!text) return text;

  const tokens = (rawQuery || '')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  if (tokens.length === 0) return text;

  // Prefer longer tokens first to reduce nested/partial oddities
  const sorted = [...new Set(tokens)].sort((a, b) => b.length - a.length);

  const pattern = sorted.map(escapeRegExp).join('|');
  const re = new RegExp(`(${pattern})`, 'gi');

  const parts = text.split(re);

  return parts.map((part, i) => (re.test(part) ? <mark key={i}>{part}</mark> : part));
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
