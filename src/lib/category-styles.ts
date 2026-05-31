import type { ExpenseCategory } from "@/types/expense";

export const CATEGORY_STYLES: Record<
  ExpenseCategory,
  { bg: string; text: string; dot: string; chart: string }
> = {
  Еда: {
    bg: "bg-amber-500/15",
    text: "text-amber-800 dark:text-amber-200",
    dot: "bg-amber-500",
    chart: "#f59e0b",
  },
  Транспорт: {
    bg: "bg-sky-500/15",
    text: "text-sky-800 dark:text-sky-200",
    dot: "bg-sky-500",
    chart: "#0ea5e9",
  },
  Покупки: {
    bg: "bg-violet-500/15",
    text: "text-violet-800 dark:text-violet-200",
    dot: "bg-violet-500",
    chart: "#8b5cf6",
  },
  Развлечения: {
    bg: "bg-pink-500/15",
    text: "text-pink-800 dark:text-pink-200",
    dot: "bg-pink-500",
    chart: "#ec4899",
  },
  Счета: {
    bg: "bg-orange-500/15",
    text: "text-orange-800 dark:text-orange-200",
    dot: "bg-orange-500",
    chart: "#f97316",
  },
  Здоровье: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-800 dark:text-emerald-200",
    dot: "bg-emerald-500",
    chart: "#10b981",
  },
  Другое: {
    bg: "bg-zinc-500/15",
    text: "text-zinc-700 dark:text-zinc-300",
    dot: "bg-zinc-500",
    chart: "#71717a",
  },
};
