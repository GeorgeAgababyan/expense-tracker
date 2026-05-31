/** Parses amount field; returns null when invalid or non-positive. */
export function parseAmountInput(raw: string): number | null {
  const parsed = Number.parseFloat(raw.trim().replace(",", "."));
  if (!raw.trim() || Number.isNaN(parsed) || parsed <= 0) return null;
  return Math.round(parsed * 100) / 100;
}
