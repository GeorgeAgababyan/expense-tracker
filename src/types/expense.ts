export const EXPENSE_CATEGORIES = [
  "Еда",
  "Транспорт",
  "Покупки",
  "Развлечения",
  "Счета",
  "Здоровье",
  "Другое",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type Expense = {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
};

export type NewExpense = Omit<Expense, "id">;
