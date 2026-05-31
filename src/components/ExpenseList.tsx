import type { Expense } from "@/types/expense";
import { EmptyState } from "@/components/EmptyState";
import { Card } from "@/components/ui/Card";
import { LoadingDots } from "@/components/ui/LoadingDots";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExpenseItem } from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  hydrated: boolean;
};

export function ExpenseList({ expenses, onDelete, hydrated }: ExpenseListProps) {
  const isEmpty = hydrated && expenses.length === 0;
  const hasExpenses = hydrated && expenses.length > 0;

  return (
    <Card delay={180} hover={!isEmpty}>
      <SectionHeader
        overline="История"
        title="Все расходы"
        description={hasExpenses ? "От новых к старым" : undefined}
        action={
          hasExpenses ? (
            <span className="font-amount mt-1 shrink-0 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-600 transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300">
              {expenses.length}
            </span>
          ) : undefined
        }
      />

      {!hydrated ? (
        <LoadingDots />
      ) : isEmpty ? (
        <div className="mt-4">
          <EmptyState />
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-2" role="list">
          {expenses.map((expense, index) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              index={index}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}
