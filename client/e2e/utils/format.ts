export function isoToDatetimeLocalForm(isoString: string): string {
  const date = new Date(isoString);
  const pad = (n: number) => n.toString().padStart(2, '0');

  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
}

export function generateOffsetTimestamp(secondsOffset: number): string {
  const d = new Date(Date.now() + secondsOffset * 1000);
  return isoToDatetimeLocalForm(d.toISOString());
}

//********* Usage example *********

// import { isoToDatetimeLocal } from '../utils/format';

// const formatted = isoToDatetimeLocal(testIdiom.timestamps);
// await expect(page.locator('#timestamp')).toHaveValue(formatted);
