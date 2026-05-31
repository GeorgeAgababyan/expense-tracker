"use client";

import {
  formatCurrency,
  formatMonth,
  pluralExpenseWord,
} from "@/lib/format";

type MonthlySummaryProps = {
  year: number;
  month: number;
  total: number;
  count: number;
};

export function MonthlySummary({
  year,
  month,
  total,
  count,
}: MonthlySummaryProps) {
  return (
    <section
      className="summary-card animate-fade-up p-6 opacity-0 sm:p-8"
      style={{ animationDelay: "0ms" }}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-overline text-zinc-400 dark:text-zinc-500">
            Итог за месяц
          </p>
          <p className="mt-2 text-sm font-medium capitalize text-zinc-500 dark:text-zinc-400">
            {formatMonth(year, month)}
          </p>
        </div>

        <div className="sm:text-right">
          <p
            key={total}
            className="font-amount text-title-lg animate-count-pop text-zinc-900 dark:text-zinc-50"
          >
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="card-divider !mt-6 !mb-0 sm:!mt-8" />

      <p className="text-body-muted text-sm">
        {count === 0
          ? "В этом месяце трат ещё не было"
          : `${count} ${pluralExpenseWord(count)} в текущем месяце`}
      </p>
    </section>
  );
}
