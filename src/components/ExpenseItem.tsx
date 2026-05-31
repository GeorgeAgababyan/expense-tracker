"use client";

import { useState } from "react";
import { DELETE_EXPENSE_ANIMATION_MS } from "@/lib/constants";
import { CATEGORY_STYLES } from "@/lib/category-styles";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Expense } from "@/types/expense";

type ExpenseItemProps = {
  expense: Expense;
  onDelete: (id: string) => void;
  index: number;
};

export function ExpenseItem({ expense, onDelete, index }: ExpenseItemProps) {
  const [isExiting, setIsExiting] = useState(false);
  const style = CATEGORY_STYLES[expense.category];

  function handleDelete() {
    setIsExiting(true);
    window.setTimeout(() => onDelete(expense.id), DELETE_EXPENSE_ANIMATION_MS);
  }

  return (
    <li
      className={[
        "expense-row group flex items-center gap-4 px-4 py-4 sm:px-5",
        "animate-fade-up opacity-0",
        isExiting && "animate-exit overflow-hidden",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        animationDelay: isExiting ? undefined : `${120 + index * 40}ms`,
      }}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.bg}`}
        aria-hidden
      >
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-amount text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {formatCurrency(expense.amount)}
          </p>
          <time className="shrink-0 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            {formatDate(expense.date)}
          </time>
        </div>
        <p
          className={`mt-1 inline-flex text-xs font-semibold ${style.text}`}
        >
          {expense.category}
        </p>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isExiting}
        className="btn-ghost-danger shrink-0 disabled:pointer-events-none"
        aria-label={`Удалить расход ${formatCurrency(expense.amount)}`}
      >
        Удалить
      </button>
    </li>
  );
}
