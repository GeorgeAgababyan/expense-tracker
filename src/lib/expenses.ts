import type { Expense, NewExpense } from "@/types/expense";

const STORAGE_KEY = "expense-tracker:expenses";
const DATE_NOON_SUFFIX = "T12:00:00";

export type MonthPeriod = {
  year: number;
  month: number;
};

export function parseExpenseDate(isoDate: string): Date {
  return new Date(isoDate + DATE_NOON_SUFFIX);
}

export function isExpenseInMonth(
  expense: Expense,
  year: number,
  month: number,
): boolean {
  const d = parseExpenseDate(expense.date);
  return d.getFullYear() === year && d.getMonth() === month;
}

export function filterExpensesByMonth(
  expenses: Expense[],
  year: number,
  month: number,
): Expense[] {
  return expenses.filter((e) => isExpenseInMonth(e, year, month));
}

export function sumExpenseAmounts(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function loadExpenses(): Expense[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Expense[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function createExpense(data: NewExpense): Expense {
  return {
    ...data,
    id: crypto.randomUUID(),
  };
}

export function sortExpensesByDate(expenses: Expense[]): Expense[] {
  return [...expenses].sort(
    (a, b) =>
      parseExpenseDate(b.date).getTime() - parseExpenseDate(a.date).getTime(),
  );
}

export function getMonthlyTotal(
  expenses: Expense[],
  year: number,
  month: number,
): number {
  return sumExpenseAmounts(filterExpensesByMonth(expenses, year, month));
}

export function getCurrentMonth(): MonthPeriod {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}
