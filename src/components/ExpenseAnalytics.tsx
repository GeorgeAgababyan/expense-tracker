"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { CategoryDonutChart } from "@/components/CategoryDonutChart";
import { EmptyState } from "@/components/EmptyState";
import { LoadingDots } from "@/components/ui/LoadingDots";
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
import { sectionDescClass, sectionTitleClass } from "@/lib/ui";
import type { Expense } from "@/types/expense";

type ExpenseAnalyticsProps = {
  monthlyExpenses: Expense[];
  monthlyTotal: number;
  hydrated: boolean;
};

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ExpenseAnalytics({
  monthlyExpenses,
  monthlyTotal,
  hydrated,
}: ExpenseAnalyticsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const breakdown = useMemo(
    () => getCategoryBreakdown(monthlyExpenses),
    [monthlyExpenses],
  );

  const topCategories = breakdown.slice(0, TOP_CATEGORIES_LIMIT);
  const isEmpty = hydrated && breakdown.length === 0;

  return (
    <Card delay={80} hover={false} className="overflow-hidden">
      <button
        type="button"
        className="flex w-full min-w-0 items-start justify-between gap-3 text-left"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="analytics-panel"
      >
        <div className="min-w-0 flex-1">
          <p className="text-overline">Аналитика</p>
          <h2 className={`${sectionTitleClass} mt-1`}>По категориям</h2>
          {isOpen && (
            <p className={sectionDescClass}>Доли расходов за текущий месяц</p>
          )}
        </div>
        <span
          className={`chevron-btn mt-0.5 ${isOpen ? "is-open" : ""}`}
          aria-hidden
        >
          <ChevronIcon />
        </span>
      </button>

      <div
        id="analytics-panel"
        className={`collapsible-panel ${isOpen ? "is-open" : ""}`}
      >
        <div className="collapsible-panel__inner">
          {!hydrated ? (
            <LoadingDots className="mt-6" />
          ) : isEmpty ? (
            <div className="mt-2">
              <EmptyState variant="analytics" />
            </div>
          ) : (
            <div className="pt-6">
              <div className="grid min-w-0 gap-6 overflow-hidden sm:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] sm:items-start sm:gap-5">
                <CategoryDonutChart
                  breakdown={breakdown}
                  total={monthlyTotal}
                />

                <div className="min-w-0 overflow-hidden">
                  <h3 className="text-title-sm text-zinc-900 dark:text-zinc-50">
                    Топ категорий
                  </h3>
                  <ol className="mt-3 max-w-full space-y-2">
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

              <div className="min-w-0">
                <h3 className="text-title-sm text-zinc-900 dark:text-zinc-50">
                  Все категории
                </h3>
                <ul className="mt-4 space-y-4">
                  {breakdown.map((item, index) => (
                    <CategoryBreakdownRow
                      key={item.category}
                      item={item}
                      index={index}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
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
    <li className="fintech-tile fintech-tile-contained flex min-w-0 max-w-full items-center gap-2 px-2.5 py-2 sm:gap-2.5 sm:px-3 sm:py-2.5">
      <span className="rank-badge font-amount shrink-0">{rank}</span>
      <div
        className={`category-icon h-9 w-9 shrink-0 ring-1 sm:h-10 sm:w-10 ${style.icon}`}
        aria-hidden
      >
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <span
            className={`truncate text-sm font-semibold ${style.text}`}
          >
            {item.category}
          </span>
          <span className="font-amount shrink-0 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {formatPercent(item.percentage)}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
          {formatCurrency(item.amount)} · {item.count}{" "}
          {pluralTransactionWord(item.count)}
        </p>
      </div>
    </li>
  );
}

function CategoryBreakdownRow({
  item,
  index,
}: {
  item: CategoryBreakdown;
  index: number;
}) {
  const style = CATEGORY_STYLES[item.category];

  return (
    <li
      className="animate-fade-up min-w-0 opacity-0"
      style={{ animationDelay: `${200 + index * 35}ms` }}
    >
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`}
            aria-hidden
          />
          <span className="truncate font-medium text-zinc-800 dark:text-zinc-200">
            {item.category}
          </span>
        </div>
        <div className="shrink-0 text-right">
          <span className="font-amount text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {formatPercent(item.percentage)}
          </span>
          <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
            {formatCurrency(item.amount)}
          </span>
        </div>
      </div>
      <div className="chart-bar-track">
        <div
          className="chart-bar-fill h-full"
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
