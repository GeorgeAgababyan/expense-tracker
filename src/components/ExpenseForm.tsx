"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SUBMIT_SUCCESS_ANIMATION_MS } from "@/lib/constants";
import { getTodayISO } from "@/lib/format";
import { parseAmountInput } from "@/lib/parse";
import { inputClass, labelClass } from "@/lib/ui";
import { EXPENSE_CATEGORIES, type NewExpense } from "@/types/expense";

type ExpenseFormProps = {
  onAdd: (expense: NewExpense) => void;
};

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
    <Card delay={100}>
      <SectionHeader
        overline="Добавить"
        title="Новый расход"
        description="Сумма, категория и дата — всё сохранится локально"
      />

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Сумма</span>
            <div className="relative">
              <span className="font-amount pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                ₽
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`${inputClass} font-amount pl-9 text-lg tracking-tight`}
              />
            </div>
          </label>

          <label className="block">
            <span className={labelClass}>Категория</span>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as NewExpense["category"])
              }
              className={inputClass}
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Дата</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        {error && (
          <p
            className="animate-fade-in mt-5 text-sm font-medium text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className={`btn-primary mt-8 w-full px-4 py-3.5 ${success ? "is-success" : ""}`}
        >
          Добавить расход
        </button>
      </form>
    </Card>
  );
}
