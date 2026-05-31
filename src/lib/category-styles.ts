import type { ExpenseCategory } from "@/types/expense";

export type CategoryStyle = {
  /** Soft tile background */
  bg: string;
  /** Category label */
  text: string;
  /** Accent dot / bar */
  dot: string;
  /** Chart segment */
  chart: string;
  /** Icon circle */
  icon: string;
};

export const CATEGORY_STYLES: Record<ExpenseCategory, CategoryStyle> = {
  Еда: {
    bg: "bg-[#FFF7ED] dark:bg-[#FB923C]/12",
    text: "text-[#C2410C] dark:text-[#FDBA74]",
    dot: "bg-[#FB923C]",
    chart: "#FB923C",
    icon: "bg-[#FFEDD5] ring-[#FDBA74]/40 dark:bg-[#FB923C]/15 dark:ring-[#FB923C]/25",
  },
  Транспорт: {
    bg: "bg-[#EFF6FF] dark:bg-[#60A5FA]/12",
    text: "text-[#1D4ED8] dark:text-[#93C5FD]",
    dot: "bg-[#60A5FA]",
    chart: "#60A5FA",
    icon: "bg-[#DBEAFE] ring-[#93C5FD]/40 dark:bg-[#60A5FA]/15 dark:ring-[#60A5FA]/25",
  },
  Покупки: {
    bg: "bg-[#F5F3FF] dark:bg-[#A78BFA]/12",
    text: "text-[#6D28D9] dark:text-[#C4B5FD]",
    dot: "bg-[#A78BFA]",
    chart: "#A78BFA",
    icon: "bg-[#EDE9FE] ring-[#C4B5FD]/40 dark:bg-[#A78BFA]/15 dark:ring-[#A78BFA]/25",
  },
  Развлечения: {
    bg: "bg-[#FDF2F8] dark:bg-[#F472B6]/12",
    text: "text-[#BE185D] dark:text-[#F9A8D4]",
    dot: "bg-[#F472B6]",
    chart: "#F472B6",
    icon: "bg-[#FCE7F3] ring-[#F9A8D4]/40 dark:bg-[#F472B6]/15 dark:ring-[#F472B6]/25",
  },
  Счета: {
    bg: "bg-[#FFF7ED] dark:bg-[#F97316]/12",
    text: "text-[#EA580C] dark:text-[#FDBA74]",
    dot: "bg-[#F97316]",
    chart: "#F97316",
    icon: "bg-[#FFEDD5] ring-[#FDBA74]/40 dark:bg-[#F97316]/15 dark:ring-[#F97316]/25",
  },
  Здоровье: {
    bg: "bg-[#ECFDF5] dark:bg-[#34D399]/12",
    text: "text-[#047857] dark:text-[#6EE7B7]",
    dot: "bg-[#34D399]",
    chart: "#34D399",
    icon: "bg-[#D1FAE5] ring-[#6EE7B7]/40 dark:bg-[#34D399]/15 dark:ring-[#34D399]/25",
  },
  Другое: {
    bg: "bg-[#F4F4F5] dark:bg-zinc-500/12",
    text: "text-[#52525B] dark:text-zinc-400",
    dot: "bg-[#A1A1AA]",
    chart: "#A1A1AA",
    icon: "bg-[#E4E4E7] ring-[#D4D4D8]/50 dark:bg-zinc-500/15 dark:ring-zinc-500/25",
  },
};
