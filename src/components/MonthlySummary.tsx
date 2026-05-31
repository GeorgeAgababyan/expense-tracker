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
      className="summary-card summary-card--compact animate-fade-up relative z-[1] opacity-0"
      style={{ animationDelay: "0ms" }}
    >
      <div className="relative z-10 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-overline !text-[10px]">Потрачено в этом месяце</p>
          <p className="summary-month mt-0.5 truncate text-xs font-medium capitalize">
            {formatMonth(year, month)}
          </p>
        </div>
        <p
          key={total}
          className="font-amount text-title-lg shrink-0 animate-count-pop leading-none"
        >
          {formatCurrency(total)}
        </p>
      </div>

      <p className="text-body-muted relative z-10 mt-2.5 text-xs leading-snug">
        {count === 0
          ? "Пока без трат"
          : `${count} ${pluralExpenseWord(count)}`}
      </p>
    </section>
  );
}
