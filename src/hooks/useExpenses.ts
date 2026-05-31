"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createExpense,
  filterExpensesByMonth,
  getCurrentMonth,
  loadExpenses,
  saveExpenses,
  sortExpensesByDate,
  sumExpenseAmounts,
} from "@/lib/expenses";
import type { Expense, NewExpense } from "@/types/expense";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const currentMonth = getCurrentMonth();

  useEffect(() => {
    setExpenses(sortExpensesByDate(loadExpenses()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveExpenses(expenses);
  }, [expenses, hydrated]);

  const addExpense = useCallback((data: NewExpense) => {
    setExpenses((prev) => sortExpensesByDate([createExpense(data), ...prev]));
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const monthlyExpenses = useMemo(
    () =>
      filterExpensesByMonth(
        expenses,
        currentMonth.year,
        currentMonth.month,
      ),
    [expenses, currentMonth.year, currentMonth.month],
  );

  const monthlyTotal = useMemo(
    () => sumExpenseAmounts(monthlyExpenses),
    [monthlyExpenses],
  );

  return {
    expenses,
    hydrated,
    addExpense,
    deleteExpense,
    monthlyExpenses,
    monthlyTotal,
    monthlyCount: monthlyExpenses.length,
    currentMonth,
  };
}
