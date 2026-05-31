import { sumExpenseAmounts } from "@/lib/expenses";
import { roundToDecimal } from "@/lib/format";
import type { Expense, ExpenseCategory } from "@/types/expense";

export type CategoryBreakdown = {
  category: ExpenseCategory;
  amount: number;
  count: number;
  /** Share of monthly spend, 0–100 */
  percentage: number;
};

/** Groups monthly expenses by category, sorted by amount (desc). */
export function getCategoryBreakdown(
  monthlyExpenses: Expense[],
): CategoryBreakdown[] {
  const total = sumExpenseAmounts(monthlyExpenses);
  const totals = new Map<ExpenseCategory, { amount: number; count: number }>();

  for (const expense of monthlyExpenses) {
    const current = totals.get(expense.category) ?? { amount: 0, count: 0 };
    totals.set(expense.category, {
      amount: current.amount + expense.amount,
      count: current.count + 1,
    });
  }

  return Array.from(totals.entries())
    .map(([category, { amount, count }]) => ({
      category,
      amount,
      count,
      percentage:
        total > 0 ? roundToDecimal((amount / total) * 100, 1) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}
