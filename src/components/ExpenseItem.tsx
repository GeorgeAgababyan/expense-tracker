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
        "expense-row group flex items-center gap-3.5 px-3.5 py-3.5 sm:gap-4 sm:px-4",
        "animate-fade-up opacity-0",
        isExiting && "animate-exit overflow-hidden",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        animationDelay: isExiting ? undefined : `${100 + index * 45}ms`,
      }}
    >
      <div
        className={`category-icon ring-1 ${style.icon}`}
        aria-hidden
      >
        <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-amount text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-lg">
            {formatCurrency(expense.amount)}
          </p>
          <time className="shrink-0 text-[11px] font-medium tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
            {formatDate(expense.date)}
          </time>
        </div>
        <span
          className={`mt-1.5 inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${style.bg} ${style.text}`}
        >
          {expense.category}
        </span>
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
