"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SUBMIT_SUCCESS_ANIMATION_MS } from "@/lib/constants";
import { getTodayISO } from "@/lib/format";
import { parseAmountInput } from "@/lib/parse";
import { inputClass } from "@/lib/ui";
import { EXPENSE_CATEGORIES, type NewExpense } from "@/types/expense";

type ExpenseFormProps = {
  onAdd: (expense: NewExpense) => void;
};

const compactInput = `${inputClass} input-field--compact`;

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<NewExpense["category"]>("Еда");
  const [date, setDate] = useState(getTodayISO);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = parseAmountInput(amount);
    if (parsed === null) {
      setError("Введите корректную сумму больше нуля");
      return;
    }

    onAdd({ amount: parsed, category, date });

    setAmount("");
    setDate(getTodayISO());
    setSuccess(true);
    window.setTimeout(() => setSuccess(false), SUBMIT_SUCCESS_ANIMATION_MS);
  }

  return (
    <Card delay={100} className="!p-4 sm:!p-5">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="relative block sm:col-span-2">
            <span className="sr-only">Сумма</span>
            <span
              className="font-amount pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400"
              aria-hidden
            >
              ₽
            </span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="Сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`${compactInput} font-amount w-full pl-8`}
              aria-label="Сумма"
            />
          </label>

          <label className="block">
            <span className="sr-only">Категория</span>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as NewExpense["category"])
              }
              className={compactInput}
              aria-label="Категория"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Дата</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={compactInput}
              aria-label="Дата"
            />
          </label>
        </div>

        {error && (
          <p
            className="animate-fade-in text-sm font-medium text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className={`btn-primary w-full px-4 py-3 text-sm ${success ? "is-success" : ""}`}
        >
          Добавить расход
        </button>
      </form>
    </Card>
  );
}
