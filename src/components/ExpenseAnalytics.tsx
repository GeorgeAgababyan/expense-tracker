"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { CategoryDonutChart } from "@/components/CategoryDonutChart";
import { LoadingDots } from "@/components/ui/LoadingDots";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getCategoryBreakdown,
  type CategoryBreakdown,
} from "@/lib/analytics";
import { TOP_CATEGORIES_LIMIT } from "@/lib/constants";
import { CATEGORY_STYLES } from "@/lib/category-styles";
import {
  formatCurrency,
  formatPercent,
  pluralTransactionWord,
} from "@/lib/format";
import type { Expense } from "@/types/expense";

type ExpenseAnalyticsProps = {
  monthlyExpenses: Expense[];
  monthlyTotal: number;
  hydrated: boolean;
};

export function ExpenseAnalytics({
  monthlyExpenses,
  monthlyTotal,
  hydrated,
}: ExpenseAnalyticsProps) {
  const breakdown = useMemo(
    () => getCategoryBreakdown(monthlyExpenses),
    [monthlyExpenses],
  );

  const topCategories = breakdown.slice(0, TOP_CATEGORIES_LIMIT);
  const isEmpty = hydrated && breakdown.length === 0;

  return (
    <Card delay={60} hover={!isEmpty}>
      <SectionHeader
        overline="Аналитика"
        title="По категориям"
        description="Распределение трат за текущий месяц"
      />

      {!hydrated ? (
        <LoadingDots className="mt-10" />
      ) : isEmpty ? (
        <p className="text-body-muted mt-8 text-center text-sm">
          Добавьте расходы, чтобы увидеть статистику по категориям
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
            <CategoryDonutChart
              breakdown={breakdown}
              total={monthlyTotal}
            />

            <div>
              <h3 className="text-title-sm text-zinc-900 dark:text-zinc-50">
                Топ категорий
              </h3>
              <ol className="mt-4 space-y-3">
                {topCategories.map((item, index) => (
                  <TopCategoryRow
                    key={item.category}
                    item={item}
                    rank={index + 1}
                  />
                ))}
              </ol>
            </div>
          </div>

          <div className="card-divider" />

          <div>
            <h3 className="text-title-sm text-zinc-900 dark:text-zinc-50">
              Все категории
            </h3>
            <ul className="mt-5 space-y-4">
              {breakdown.map((item) => (
                <CategoryBreakdownRow key={item.category} item={item} />
              ))}
            </ul>
          </div>
        </>
      )}
    </Card>
  );
}

function TopCategoryRow({
  item,
  rank,
}: {
  item: CategoryBreakdown;
  rank: number;
}) {
  const style = CATEGORY_STYLES[item.category];

  return (
    <li className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 px-3 py-2.5 transition-colors duration-300 hover:border-zinc-200 hover:bg-white dark:border-zinc-800 dark:bg-zinc-800/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80">
      <span className="font-amount flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-sm font-semibold ${style.text}`}>
            {item.category}
          </span>
          <span className="font-amount text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {formatPercent(item.percentage)}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {formatCurrency(item.amount)} · {item.count}{" "}
          {pluralTransactionWord(item.count)}
        </p>
      </div>
    </li>
  );
}

function CategoryBreakdownRow({ item }: { item: CategoryBreakdown }) {
  const style = CATEGORY_STYLES[item.category];

  return (
    <li>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`}
            aria-hidden
          />
          <span className="truncate font-medium text-zinc-800 dark:text-zinc-200">
            {item.category}
          </span>
        </div>
        <div className="shrink-0 text-right">
          <span className="font-amount font-semibold text-zinc-900 dark:text-zinc-50">
            {formatPercent(item.percentage)}
          </span>
          <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
            {formatCurrency(item.amount)}
          </span>
        </div>
      </div>
      <div className="chart-bar-track h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="chart-bar-fill h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${item.percentage}%`,
            backgroundColor: style.chart,
          }}
          role="presentation"
        />
      </div>
    </li>
  );
}
