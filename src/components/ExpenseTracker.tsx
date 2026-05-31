"use client";

import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseAnalytics } from "./ExpenseAnalytics";
import { ExpenseForm } from "./ExpenseForm";
import { ExpenseList } from "./ExpenseList";
import { MonthlySummary } from "./MonthlySummary";

export function ExpenseTracker() {
  const {
    expenses,
    hydrated,
    addExpense,
    deleteExpense,
    monthlyExpenses,
    monthlyTotal,
    monthlyCount,
    currentMonth,
  } = useExpenses();

  return (
    <div className="layout-stack w-full">
      <MonthlySummary
        year={currentMonth.year}
        month={currentMonth.month}
        total={monthlyTotal}
        count={monthlyCount}
      />
      <ExpenseAnalytics
        monthlyExpenses={monthlyExpenses}
        monthlyTotal={monthlyTotal}
        hydrated={hydrated}
      />
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        hydrated={hydrated}
      />
    </div>
  );
}
