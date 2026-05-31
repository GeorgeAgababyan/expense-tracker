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
    <Card delay={140} hover={!isEmpty}>
      <SectionHeader
        overline="История"
        title="Транзакции"
        description={hasExpenses ? "Последние расходы" : undefined}
        action={
          hasExpenses ? (
            <span className="badge-count font-amount mt-0.5">
              {expenses.length}
            </span>
          ) : undefined
        }
      />

      {!hydrated ? (
        <LoadingDots />
      ) : isEmpty ? (
        <div className="mt-1">
          <EmptyState variant="list" />
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-2" role="list">
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
