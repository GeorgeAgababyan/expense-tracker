import { parseExpenseDate } from "@/lib/expenses";

const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const monthFormatter = new Intl.DateTimeFormat("ru-RU", {
  month: "long",
  year: "numeric",
});

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

type PluralForms = [string, string, string];

export function roundToDecimal(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatPercent(value: number): string {
  const rounded = roundToDecimal(value, 1);
  const text = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);
  return `${text}%`;
}

export function formatMonth(year: number, month: number): string {
  return monthFormatter.format(new Date(year, month, 1));
}

export function formatDate(date: string): string {
  return dateFormatter.format(parseExpenseDate(date));
}

export function getTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Russian plural: one, few (2–4), many (0, 5–20, …). */
export function pluralRu(count: number, forms: PluralForms): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

export const pluralExpenseWord = (count: number) =>
  pluralRu(count, ["расход", "расхода", "расходов"]);

export const pluralTransactionWord = (count: number) =>
  pluralRu(count, ["трата", "траты", "трат"]);
